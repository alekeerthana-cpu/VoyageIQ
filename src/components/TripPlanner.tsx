import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Trash2, Sparkles, Wallet, Check, Save, Download, RefreshCw, AlertCircle, MapPin } from 'lucide-react';
import { Destination, PlannedTrip, TravelStyle, ExpenseBreakdown } from '../types/travel';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { savePlannedTrip } from '../services/tripStorage';
import { DestinationMiniMap } from './DestinationMiniMap';

interface TripPlannerProps {
  initialDestination?: Destination | null;
  onTripSaved?: (trip: PlannedTrip) => void;
}

export const TripPlanner: React.FC<TripPlannerProps> = ({
  initialDestination,
  onTripSaved
}) => {
  const selectedDest = initialDestination || DESTINATIONS_DATA[0];

  const [destinationId, setDestinationId] = useState(selectedDest.id);
  const [startDate, setStartDate] = useState('2026-11-14');
  const [endDate, setEndDate] = useState('2026-11-16');
  const [travelersCount, setTravelersCount] = useState(2);
  const [targetBudget, setTargetBudget] = useState(15000);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>('budget-friendly');
  const [notes, setNotes] = useState('Pack hiking shoes, camera, and light jacket.');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Active destination object
  const currentDestination = DESTINATIONS_DATA.find(d => d.id === destinationId) || selectedDest;

  // Day-wise itinerary state
  const [days, setDays] = useState<{
    dayNumber: number;
    title: string;
    activities: { id: string; timeOfDay: 'Morning' | 'Afternoon' | 'Evening'; text: string; costInr: number }[];
  }[]>([]);

  // Initialize or reset days from current destination sample itinerary
  useEffect(() => {
    if (currentDestination) {
      const initialDays = currentDestination.sampleItinerary.map(item => ({
        dayNumber: item.day,
        title: item.title,
        activities: [
          { id: `m-${item.day}`, timeOfDay: 'Morning' as const, text: item.morning, costInr: Math.round(item.estCostInr * 0.35) },
          { id: `a-${item.day}`, timeOfDay: 'Afternoon' as const, text: item.afternoon, costInr: Math.round(item.estCostInr * 0.40) },
          { id: `e-${item.day}`, timeOfDay: 'Evening' as const, text: item.evening, costInr: Math.round(item.estCostInr * 0.25) }
        ]
      }));
      setDays(initialDays);
      setTargetBudget(currentDestination.estimatedCostInr);
    }
  }, [destinationId]);

  // Compute live expense breakdown
  const activityCostTotal = days.reduce(
    (total, day) => total + day.activities.reduce((dTotal, a) => dTotal + (a.costInr || 0), 0),
    0
  );

  // Scaled estimates for accommodation, transit, and food based on days count & travelers
  const daysCount = days.length || 3;
  const accommodationCost = Math.round((currentDestination.expensesBreakdown.accommodation / currentDestination.idealDurationDays) * daysCount * (travelersCount > 1 ? 1.4 : 1));
  const transportCost = Math.round(currentDestination.expensesBreakdown.transport * (travelersCount > 1 ? 1.3 : 1));
  const foodCost = Math.round((currentDestination.expensesBreakdown.food / currentDestination.idealDurationDays) * daysCount * travelersCount);

  const totalCalculatedExpense = accommodationCost + transportCost + foodCost + activityCostTotal;
  const budgetDelta = targetBudget - totalCalculatedExpense;

  // Add activity to a day
  const handleAddActivity = (dayNumber: number) => {
    setDays(prev =>
      prev.map(d => {
        if (d.dayNumber === dayNumber) {
          const newId = `act-${Date.now()}`;
          return {
            ...d,
            activities: [
              ...d.activities,
              { id: newId, timeOfDay: 'Afternoon', text: 'New planned activity', costInr: 500 }
            ]
          };
        }
        return d;
      })
    );
  };

  // Remove an activity
  const handleRemoveActivity = (dayNumber: number, actId: string) => {
    setDays(prev =>
      prev.map(d => {
        if (d.dayNumber === dayNumber) {
          return {
            ...d,
            activities: d.activities.filter(a => a.id !== actId)
          };
        }
        return d;
      })
    );
  };

  // Update activity text or cost
  const handleUpdateActivity = (dayNumber: number, actId: string, updates: Partial<{ text: string; costInr: number; timeOfDay: any }>) => {
    setDays(prev =>
      prev.map(d => {
        if (d.dayNumber === dayNumber) {
          return {
            ...d,
            activities: d.activities.map(a => (a.id === actId ? { ...a, ...updates } : a))
          };
        }
        return d;
      })
    );
  };

  // Call Server Gemini API to generate custom day-by-day plan
  const handleGenerateAiItinerary = async () => {
    setIsGeneratingAi(true);
    setAiAdvice(null);
    try {
      const response = await fetch('/api/ai/itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destinationId: currentDestination.id,
          durationDays: days.length,
          budgetInr: targetBudget,
          travelersCount,
          travelStyle,
          interests: currentDestination.interests
        })
      });
      const data = await response.json();
      if (data.success && data.days) {
        setDays(data.days);
        if (data.insiderAdvice) {
          setAiAdvice(data.insiderAdvice);
        }
      }
    } catch (err) {
      console.error('AI itinerary generation failed', err);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // Save planned trip
  const handleSaveTrip = () => {
    const plannedTrip: PlannedTrip = {
      id: `trip-${Date.now()}`,
      destinationId: currentDestination.id,
      destinationName: currentDestination.name,
      destinationCountry: currentDestination.country,
      destinationImage: currentDestination.imageUrl,
      startDate,
      endDate,
      travelersCount,
      targetBudgetInr: targetBudget,
      actualEstimatedBudgetInr: totalCalculatedExpense,
      travelStyle,
      notes,
      days,
      expensesBreakdown: {
        accommodation: accommodationCost,
        transport: transportCost,
        food: foodCost,
        activities: activityCostTotal
      },
      createdAt: new Date().toISOString()
    };

    savePlannedTrip(plannedTrip);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
    if (onTripSaved) {
      onTripSaved(plannedTrip);
    }
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Planner Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
              <span>Trip Organizer & Budget Engine</span>
              <span aria-hidden="true">·</span>
              <span>Day-Wise Schedule</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#167D9A] font-bold">Dynamic Calculations</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] tracking-tight">
              Interactive Trip Planner & Expense Estimator
            </h1>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleGenerateAiItinerary}
              disabled={isGeneratingAi}
              className="px-4 py-2 text-xs font-bold text-[#167D9A] bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-xl transition-colors flex items-center gap-2"
            >
              {isGeneratingAi ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#167D9A]" />
                  <span>Synthesizing Itinerary...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#167D9A]" />
                  <span>AI Itinerary Generator</span>
                </>
              )}
            </button>

            <button
              onClick={handleSaveTrip}
              className="px-4 py-2 text-xs font-bold text-white bg-[#102A43] hover:bg-[#0B1D2E] rounded-xl transition-colors flex items-center gap-2 shadow-xs"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Saved to Profile!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-[#F4B860]" />
                  <span>Save Planned Trip</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Trip Configuration Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-6 text-xs">
          
          {/* Destination Selector */}
          <div>
            <label className="font-bold text-slate-700 block uppercase tracking-wider text-[10px] mb-1">
              Destination
            </label>
            <select
              value={destinationId}
              onChange={(e) => setDestinationId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-900 focus:outline-none"
            >
              {DESTINATIONS_DATA.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.stateOrRegion})
                </option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="font-bold text-slate-700 block uppercase tracking-wider text-[10px] mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-900 focus:outline-none font-mono"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="font-bold text-slate-700 block uppercase tracking-wider text-[10px] mb-1">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-900 focus:outline-none font-mono"
            />
          </div>

          {/* Travelers Count */}
          <div>
            <label className="font-bold text-slate-700 block uppercase tracking-wider text-[10px] mb-1">
              Travelers
            </label>
            <select
              value={travelersCount}
              onChange={(e) => setTravelersCount(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-900 focus:outline-none tabular-nums"
            >
              <option value="1">1 Traveler (Solo)</option>
              <option value="2">2 Travelers (Duo / Couple)</option>
              <option value="3">3 Travelers (Small Group)</option>
              <option value="4">4 Travelers (Family)</option>
            </select>
          </div>

          {/* Target Budget Input */}
          <div>
            <label className="font-bold text-slate-700 block uppercase tracking-wider text-[10px] mb-1">
              Budget Target (₹)
            </label>
            <input
              type="number"
              value={targetBudget}
              onChange={(e) => setTargetBudget(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-900 focus:outline-none tabular-nums"
            />
          </div>

        </div>

        {/* AI Tip Callout if present */}
        {aiAdvice && (
          <div className="mt-4 p-3.5 bg-sky-50 border border-sky-100 rounded-xl text-xs text-sky-950 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#167D9A] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#102A43]">Gemini Travel Tip:</span> {aiAdvice}
            </div>
          </div>
        )}
      </div>

      {/* Main Split: Itinerary Builder (Left) & Budget Estimator (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Day-wise Itinerary */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h2 className="text-xl font-bold text-[#102A43] tracking-tight">
              Day-by-Day Activity Schedule ({days.length} Days)
            </h2>
            <button
              onClick={() => {
                const nextDay = days.length + 1;
                setDays([
                  ...days,
                  {
                    dayNumber: nextDay,
                    title: `Day ${nextDay} Exploration`,
                    activities: [
                      { id: `m-${nextDay}`, timeOfDay: 'Morning', text: 'Morning sightseeing', costInr: 500 },
                      { id: `a-${nextDay}`, timeOfDay: 'Afternoon', text: 'Local leisure and dining', costInr: 800 }
                    ]
                  }
                ]);
              }}
              className="text-xs font-semibold text-[#167D9A] hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Day</span>
            </button>
          </div>

          <div className="space-y-6">
            {days.map((day) => (
              <div
                key={day.dayNumber}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4"
              >
                {/* Day Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[#102A43] text-white font-mono text-xs font-bold flex items-center justify-center">
                      {day.dayNumber}
                    </span>
                    <input
                      type="text"
                      value={day.title}
                      onChange={(e) => {
                        const newTitle = e.target.value;
                        setDays(days.map(d => d.dayNumber === day.dayNumber ? { ...d, title: newTitle } : d));
                      }}
                      className="font-bold text-slate-800 text-sm bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#167D9A] focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={() => handleAddActivity(day.dayNumber)}
                    className="py-1 px-2.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Item</span>
                  </button>
                </div>

                {/* Day Activities List */}
                <div className="space-y-2">
                  {day.activities.map((act) => (
                    <div
                      key={act.id}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs"
                    >
                      <select
                        value={act.timeOfDay}
                        onChange={(e) => handleUpdateActivity(day.dayNumber, act.id, { timeOfDay: e.target.value as any })}
                        className="py-1 px-1.5 rounded-md border border-slate-200 bg-white font-semibold text-slate-700 text-[11px] shrink-0"
                      >
                        <option value="Morning">Morning</option>
                        <option value="Afternoon">Afternoon</option>
                        <option value="Evening">Evening</option>
                      </select>

                      <input
                        type="text"
                        value={act.text}
                        onChange={(e) => handleUpdateActivity(day.dayNumber, act.id, { text: e.target.value })}
                        className="flex-1 bg-transparent px-2 font-medium text-slate-800 focus:outline-none truncate"
                        placeholder="Activity name or description..."
                      />

                      <div className="flex items-center gap-1 shrink-0">
                        <span className="text-slate-400 font-mono text-[11px]">₹</span>
                        <input
                          type="number"
                          value={act.costInr}
                          onChange={(e) => handleUpdateActivity(day.dayNumber, act.id, { costInr: Number(e.target.value) })}
                          className="w-16 px-1.5 py-1 rounded-md border border-slate-200 bg-white font-mono font-bold text-slate-800 text-right tabular-nums focus:outline-none text-[11px]"
                        />
                      </div>

                      <button
                        onClick={() => handleRemoveActivity(day.dayNumber, act.id)}
                        className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                        title="Remove activity"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Notes Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
            <label className="font-bold text-slate-700 block uppercase tracking-wider text-[10px]">
              Trip Notes & Packing Checklist
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter special gear, reservations, flight codes, or packing notes..."
              className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#167D9A]"
            />
          </div>
        </div>

        {/* Right Column: Live Expense Estimator */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6 sticky top-24">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-[#102A43]">
                Budget & Expense Estimator
              </h2>
              <Wallet className="w-4 h-4 text-[#167D9A]" />
            </div>

            {/* Total vs Target Comparison */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex justify-between items-baseline text-xs">
                <span className="text-slate-500 font-medium">Estimated Total Cost:</span>
                <span className="text-xl font-extrabold text-[#102A43] font-mono tabular-nums">
                  ₹{totalCalculatedExpense.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-baseline text-xs">
                <span className="text-slate-500 font-medium">Target Budget:</span>
                <span className="font-mono font-bold text-slate-700 tabular-nums">
                  ₹{targetBudget.toLocaleString()}
                </span>
              </div>

              {/* Budget Progress Meter */}
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    budgetDelta >= 0 ? 'bg-emerald-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(100, Math.round((totalCalculatedExpense / targetBudget) * 100))}%` }}
                />
              </div>

              {/* Status Message */}
              <div className="text-xs pt-1">
                {budgetDelta >= 0 ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    ₹{budgetDelta.toLocaleString()} surplus within budget
                  </span>
                ) : (
                  <span className="text-red-700 font-bold flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    ₹{Math.abs(budgetDelta).toLocaleString()} over target budget
                  </span>
                )}
              </div>
            </div>

            {/* Expense Breakdown Categories */}
            <div className="space-y-3 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                Cost Breakdown Categories
              </span>

              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Accommodation ({daysCount} nights)</span>
                <span className="font-mono font-bold text-slate-900 tabular-nums">
                  ₹{accommodationCost.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Transport & Fuel</span>
                <span className="font-mono font-bold text-slate-900 tabular-nums">
                  ₹{transportCost.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Food & Dining ({travelersCount} pax)</span>
                <span className="font-mono font-bold text-slate-900 tabular-nums">
                  ₹{foodCost.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Activities & Experiences</span>
                <span className="font-mono font-bold text-slate-900 tabular-nums">
                  ₹{activityCostTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Google Map Location Preview */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                Google Map Location ({currentDestination.name})
              </span>
              <DestinationMiniMap destination={currentDestination} height="190px" zoom={10} />
            </div>

            {/* Save Trip Button */}
            <button
              onClick={handleSaveTrip}
              className="w-full py-3 px-4 bg-[#102A43] hover:bg-[#0B1D2E] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4 text-[#F4B860]" />
              <span>{saveSuccess ? 'Saved!' : 'Save Trip to My Profile'}</span>
            </button>

          </div>
        </div>

      </div>

    </div>
  );
};
