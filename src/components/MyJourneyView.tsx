import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Wallet, 
  Plus, 
  Trash2, 
  Check, 
  Clock, 
  Navigation, 
  Sparkles, 
  RotateCcw, 
  Save, 
  Download, 
  Share2, 
  Map as MapIcon, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { PlannedTrip, TimelineDay, TimelineActivity } from '../types/travel';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { getPlannedTrips, savePlannedTrip, deletePlannedTrip } from '../services/tripStorage';
import { DestinationMiniMap } from './DestinationMiniMap';

interface MyJourneyViewProps {
  initialTrip?: PlannedTrip | null;
  onExploreDestinations: () => void;
  onOpenPlanner: () => void;
}

export const MyJourneyView: React.FC<MyJourneyViewProps> = ({
  initialTrip,
  onExploreDestinations,
  onOpenPlanner
}) => {
  const [trips, setTrips] = useState<PlannedTrip[]>([]);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(initialTrip?.id || null);
  const [activeDayNumber, setActiveDayNumber] = useState<number>(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newActivityText, setNewActivityText] = useState('');
  const [newActivityCost, setNewActivityCost] = useState(500);
  const [newActivityTime, setNewActivityTime] = useState<'Morning' | 'Afternoon' | 'Evening'>('Afternoon');
  const [newActivityDuration, setNewActivityDuration] = useState('2 hours');
  const [saveBanner, setSaveBanner] = useState(false);

  // Load all planned trips on mount
  useEffect(() => {
    const loaded = getPlannedTrips();
    setTrips(loaded);
    if (initialTrip) {
      setSelectedTripId(initialTrip.id);
    } else if (loaded.length > 0 && !selectedTripId) {
      setSelectedTripId(loaded[0].id);
    }
  }, [initialTrip]);

  const activeTrip = trips.find(t => t.id === selectedTripId) || trips[0];
  const activeDestination = activeTrip 
    ? DESTINATIONS_DATA.find(d => d.id === activeTrip.destinationId) || DESTINATIONS_DATA[0]
    : DESTINATIONS_DATA[0];

  // Helper to persist trip update
  const updateActiveTrip = (updated: PlannedTrip) => {
    savePlannedTrip(updated);
    setTrips(prev => prev.map(t => t.id === updated.id ? updated : t));
    setSaveBanner(true);
    setTimeout(() => setSaveBanner(false), 2500);
  };

  // 1. Toggle Confirmed Booking status on activity
  const toggleActivityConfirmed = (dayNum: number, actId: string) => {
    if (!activeTrip) return;
    const newDays = activeTrip.days.map(day => {
      if (day.dayNumber !== dayNum) return day;
      return {
        ...day,
        activities: day.activities.map(a => a.id === actId ? { ...a, isConfirmed: !a.isConfirmed } : a)
      };
    });
    updateActiveTrip({ ...activeTrip, days: newDays });
  };

  // 2. Remove Activity
  const removeActivity = (dayNum: number, actId: string) => {
    if (!activeTrip) return;
    const newDays = activeTrip.days.map(day => {
      if (day.dayNumber !== dayNum) return day;
      return {
        ...day,
        activities: day.activities.filter(a => a.id !== actId)
      };
    });
    updateActiveTrip({ ...activeTrip, days: newDays });
  };

  // 3. Add Activity
  const handleAddActivity = () => {
    if (!activeTrip || !newActivityText.trim()) return;
    const newAct: TimelineActivity = {
      id: `custom-act-${Date.now()}`,
      timeOfDay: newActivityTime,
      text: newActivityText.trim(),
      costInr: Number(newActivityCost) || 0,
      visitingDuration: newActivityDuration,
      travelTimeFromPrev: '15 min transit',
      locationName: newActivityText.trim().split(' ')[0] || 'Attraction',
      isConfirmed: false
    };

    const newDays = activeTrip.days.map(day => {
      if (day.dayNumber !== activeDayNumber) return day;
      return {
        ...day,
        activities: [...day.activities, newAct]
      };
    });

    updateActiveTrip({ ...activeTrip, days: newDays });
    setNewActivityText('');
    setShowAddModal(false);
  };

  // 4. Change budget without starting over
  const handleBudgetChange = (newBudget: number) => {
    if (!activeTrip) return;
    updateActiveTrip({ ...activeTrip, targetBudgetInr: newBudget });
  };

  // 5. Change dates without starting over
  const handleDatesChange = (startDate: string, endDate: string) => {
    if (!activeTrip) return;
    updateActiveTrip({ ...activeTrip, startDate, endDate });
  };

  // 6. Regenerate Itinerary without starting over (freshen activities while preserving custom notes)
  const handleRegenerateItinerary = () => {
    if (!activeTrip || !activeDestination) return;
    const sample = activeDestination.sampleItinerary;
    const refreshedDays: TimelineDay[] = activeTrip.days.map(day => {
      const sampleItem = sample[(day.dayNumber - 1) % sample.length];
      if (!sampleItem) return day;
      return {
        ...day,
        title: sampleItem.title,
        activities: [
          {
            id: `reg-${day.dayNumber}-1`,
            timeOfDay: 'Morning',
            text: sampleItem.morning,
            costInr: Math.round(sampleItem.estCostInr * 0.35),
            visitingDuration: '2.5 hours',
            travelTimeFromPrev: '20 min transit',
            locationName: activeDestination.highlights[0] || activeDestination.name,
            isConfirmed: false
          },
          {
            id: `reg-${day.dayNumber}-2`,
            timeOfDay: 'Afternoon',
            text: sampleItem.afternoon,
            costInr: Math.round(sampleItem.estCostInr * 0.40),
            visitingDuration: '3 hours',
            travelTimeFromPrev: '15 min walk / cab',
            locationName: activeDestination.highlights[1] || `${activeDestination.name} Centre`,
            isConfirmed: false
          },
          {
            id: `reg-${day.dayNumber}-3`,
            timeOfDay: 'Evening',
            text: sampleItem.evening,
            costInr: Math.round(sampleItem.estCostInr * 0.25),
            visitingDuration: '2 hours',
            travelTimeFromPrev: '10 min walk',
            locationName: activeDestination.highlights[2] || `${activeDestination.name} Viewpoint`,
            isConfirmed: false
          }
        ]
      };
    });
    updateActiveTrip({ ...activeTrip, days: refreshedDays });
  };

  // 7. Delete trip
  const handleDeleteTrip = (tripId: string) => {
    const updated = deletePlannedTrip(tripId);
    setTrips(updated);
    if (selectedTripId === tripId) {
      setSelectedTripId(updated.length > 0 ? updated[0].id : null);
    }
  };

  // Empty state if no trips
  if (!activeTrip || trips.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-cyan-100 text-[#167D9A] flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-[#167D9A]" />
        </div>
        <h2 className="text-2xl font-extrabold text-[#102A43] mb-2">
          No Planned Journeys Yet
        </h2>
        <p className="text-sm text-slate-600 max-w-md mx-auto mb-8">
          You haven't generated or saved any trip itineraries. Use our 2-step Smart Trip Planner to create a personalized, day-by-day plan with live budget tracking!
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onOpenPlanner}
            className="px-6 py-3 rounded-xl bg-[#102A43] hover:bg-[#167D9A] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#F4B860]" />
            <span>Launch Smart Trip Planner</span>
          </button>
          <button
            onClick={onExploreDestinations}
            className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
          >
            Browse All India Destinations
          </button>
        </div>
      </div>
    );
  }

  // Calculate live totals
  const allActivities = activeTrip.days.flatMap(d => d.activities);
  const totalActivityCost = allActivities.reduce((acc, a) => acc + (a.costInr || 0), 0);
  const confirmedActivityCost = allActivities.filter(a => a.isConfirmed).reduce((acc, a) => acc + (a.costInr || 0), 0);
  const estimatedActivityCost = totalActivityCost - confirmedActivityCost;

  const totalCalculatedExpense = 
    (activeTrip.expensesBreakdown.transport || 0) +
    (activeTrip.expensesBreakdown.accommodation || 0) +
    (activeTrip.expensesBreakdown.food || 0) +
    totalActivityCost;

  const remainingBudget = activeTrip.targetBudgetInr - totalCalculatedExpense;
  const currentDay = activeTrip.days.find(d => d.dayNumber === activeDayNumber) || activeTrip.days[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Toast Save Notification */}
      {saveBanner && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#102A43] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-bold border border-cyan-500/30 animate-in slide-in-from-bottom">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Itinerary changes auto-saved to My Journey!</span>
        </div>
      )}

      {/* Header and Trip Selector Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#167D9A] font-mono uppercase tracking-wider mb-1">
            <span>My Journey Workspace</span>
            <span aria-hidden="true">·</span>
            <span>{trips.length} Saved Expeditions</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] tracking-tight">
            {activeTrip.destinationName} Itinerary & Visual Timeline
          </h1>
        </div>

        {/* Saved Trips Selector */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full">
          {trips.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setSelectedTripId(t.id);
                setActiveDayNumber(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                t.id === activeTrip.id
                  ? 'bg-[#102A43] text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {t.destinationName}
            </button>
          ))}
          <button
            onClick={onOpenPlanner}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-[#167D9A] bg-cyan-50 border border-cyan-200 hover:bg-cyan-100 transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Trip</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Visual Trip Timeline & Day Schedule */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Day Navigation Tabs */}
          <div className="bg-white rounded-2xl border border-slate-200 p-2 flex items-center gap-2 overflow-x-auto shadow-xs">
            {activeTrip.days.map((d) => (
              <button
                key={d.dayNumber}
                onClick={() => setActiveDayNumber(d.dayNumber)}
                className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                  activeDayNumber === d.dayNumber
                    ? 'bg-[#102A43] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="text-[10px] uppercase font-mono tracking-wider opacity-80">
                  Day {d.dayNumber}
                </div>
                <div className="truncate font-semibold mt-0.5">
                  {d.title.split(':')[1] || d.title}
                </div>
              </button>
            ))}
          </div>

          {/* Current Day Visual Timeline Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-[#167D9A] font-mono uppercase tracking-wider">
                  Day {currentDay.dayNumber} Schedule
                </span>
                <h3 className="text-lg font-bold text-[#102A43]">
                  {currentDay.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#167D9A]" />
                  <span>Add Place / Activity</span>
                </button>
              </div>
            </div>

            {/* Attractions arranged in order with visiting durations & travel times */}
            <div className="space-y-4 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200">
              {currentDay.activities.map((activity, index) => {
                const gmapsDirectionUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${activity.locationName || activity.text}, ${activeTrip.destinationName}`
                )}`;

                return (
                  <div 
                    key={activity.id} 
                    className="relative pl-10 group"
                  >
                    {/* Number / Node marker */}
                    <div className="absolute left-2 top-3 -translate-x-1/2 w-5 h-5 rounded-full bg-[#102A43] text-white text-[10px] font-bold flex items-center justify-center font-mono border-2 border-white shadow-xs">
                      {index + 1}
                    </div>

                    <div className="bg-slate-50 hover:bg-white rounded-xl border border-slate-200 p-4 transition-all hover:shadow-md space-y-3">
                      
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-cyan-100 text-[#167D9A]">
                              {activity.timeOfDay}
                            </span>
                            <span className="font-bold text-slate-900 text-sm">
                              {activity.locationName || `Stop ${index + 1}`}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {activity.text}
                          </p>
                        </div>

                        {/* Price & Status Flag */}
                        <div className="sm:text-right shrink-0">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                            {activity.isConfirmed ? 'Confirmed Price' : 'Estimated Price'}
                          </span>
                          <span className="text-sm font-extrabold text-[#102A43] tabular-nums">
                            ₹{activity.costInr.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Travel Time & Visiting Duration Metrics (Unboxed inline format) */}
                      <div className="pt-2 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 font-medium text-slate-700">
                            <Clock className="w-3.5 h-3.5 text-[#167D9A]" />
                            <span>{activity.visitingDuration || '2 hours suggested'}</span>
                          </span>
                          <span aria-hidden="true" className="text-slate-300">·</span>
                          <span className="flex items-center gap-1 text-slate-600">
                            <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{activity.travelTimeFromPrev || '15 min transit'}</span>
                          </span>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleActivityConfirmed(currentDay.dayNumber, activity.id)}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                              activity.isConfirmed
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-200/80 hover:bg-slate-300 text-slate-700'
                            }`}
                            title="Distinguish confirmed booking vs estimate"
                          >
                            <Check className="w-3 h-3" />
                            <span>{activity.isConfirmed ? 'Confirmed' : 'Mark Confirmed'}</span>
                          </button>

                          <a
                            href={gmapsDirectionUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded-md bg-white border border-slate-200 hover:border-slate-300 text-[#167D9A] text-[11px] font-semibold flex items-center gap-1 transition-colors"
                          >
                            <MapIcon className="w-3 h-3" />
                            <span>Directions</span>
                          </a>

                          <button
                            onClick={() => removeActivity(currentDay.dayNumber, activity.id)}
                            className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Remove stop"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Change plans without starting over ribbon */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D97706] shrink-0" />
                <span className="text-slate-600 font-medium">
                  Want fresh recommendations for this day without restarting?
                </span>
              </div>
              <button
                onClick={handleRegenerateItinerary}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 font-bold text-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#167D9A]" />
                <span>Regenerate Activities</span>
              </button>
            </div>

          </div>

          {/* Interactive Google Map Preview for Destination */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapIcon className="w-4 h-4 text-[#167D9A]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                  Transit & Attraction Coordinates: {activeTrip.destinationName}
                </h4>
              </div>
              <span className="text-xs text-[#167D9A] font-semibold">
                {activeDestination.stateOrRegion}, {activeDestination.country}
              </span>
            </div>

            <DestinationMiniMap destination={activeDestination} height="260px" zoom={11} />
          </div>

        </div>

        {/* Right 1 Col: Live Trip Budget Breakdown & Editable Settings */}
        <div className="space-y-6">
          
          {/* Live Trip Budget Breakdown Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            
            <div className="border-b border-slate-100 pb-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#102A43]">
                  Live Trip Budget Breakdown
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  {activeTrip.travelersCount} Travelers
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time tracking of transport, stays, meals, and excursions
              </p>
            </div>

            {/* Target vs Calculated Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 font-medium">Estimated Total Spent</span>
                <span className="font-extrabold text-[#102A43] tabular-nums">
                  ₹{totalCalculatedExpense.toLocaleString()} / ₹{activeTrip.targetBudgetInr.toLocaleString()}
                </span>
              </div>

              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                <div 
                  className={`h-full transition-all duration-500 ${
                    totalCalculatedExpense > activeTrip.targetBudgetInr
                      ? 'bg-rose-500'
                      : totalCalculatedExpense > activeTrip.targetBudgetInr * 0.8
                      ? 'bg-amber-500'
                      : 'bg-[#167D9A]'
                  }`}
                  style={{ width: `${Math.min(100, (totalCalculatedExpense / activeTrip.targetBudgetInr) * 100)}%` }}
                />
              </div>

              {/* Remaining balance callout */}
              <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold ${
                remainingBudget >= 0
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}>
                <span>{remainingBudget >= 0 ? 'Remaining Surplus:' : 'Budget Exceeded by:'}</span>
                <span className="text-sm font-mono tabular-nums">
                  ₹{Math.abs(remainingBudget).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Itemized Categories */}
            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-600 font-medium">Transport / Corridor</span>
                <span className="font-bold text-slate-800 tabular-nums">
                  ₹{(activeTrip.expensesBreakdown.transport || 0).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-600 font-medium">Accommodation ({activeTrip.days.length} Nights)</span>
                <span className="font-bold text-slate-800 tabular-nums">
                  ₹{(activeTrip.expensesBreakdown.accommodation || 0).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-600 font-medium">Food & Dining</span>
                <span className="font-bold text-slate-800 tabular-nums">
                  ₹{(activeTrip.expensesBreakdown.food || 0).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex flex-col">
                  <span className="text-slate-600 font-medium">Activities & Admissions</span>
                  <span className="text-[10px] text-slate-400">
                    Confirmed: ₹{confirmedActivityCost.toLocaleString()} · Est: ₹{estimatedActivityCost.toLocaleString()}
                  </span>
                </div>
                <span className="font-bold text-slate-800 tabular-nums">
                  ₹{totalActivityCost.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Adjust Budget Slider without starting over */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Adjust Target Budget</span>
                <span className="font-extrabold text-[#102A43] tabular-nums font-mono">
                  ₹{activeTrip.targetBudgetInr.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="100000"
                step="1000"
                value={activeTrip.targetBudgetInr}
                onChange={(e) => handleBudgetChange(Number(e.target.value))}
                className="w-full accent-[#167D9A] cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block">
                Slide to test affordability thresholds live
              </span>
            </div>

          </div>

          {/* Change Dates & Travelers Settings */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs">
            <h4 className="font-bold text-[#102A43] text-sm">
              Trip Dates & Logistics
            </h4>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={activeTrip.startDate}
                  onChange={(e) => handleDatesChange(e.target.value, activeTrip.endDate)}
                  className="w-full p-2 border border-slate-300 rounded-lg text-slate-800 font-semibold"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={activeTrip.endDate}
                  onChange={(e) => handleDatesChange(activeTrip.startDate, e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg text-slate-800 font-semibold"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Travelers Count
              </label>
              <div className="flex gap-2">
                {[1, 2, 4, 6].map(num => (
                  <button
                    key={num}
                    onClick={() => updateActiveTrip({ ...activeTrip, travelersCount: num })}
                    className={`flex-1 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                      activeTrip.travelersCount === num
                        ? 'bg-[#102A43] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {num === 1 ? 'Solo' : num === 2 ? '2' : num === 4 ? '3-5' : '6+'}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => window.print()}
                className="py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Print Itinerary</span>
              </button>

              <button
                onClick={() => handleDeleteTrip(activeTrip.id)}
                className="py-2 px-3 rounded-lg text-rose-600 hover:bg-rose-50 font-semibold transition-colors cursor-pointer"
              >
                Delete Trip
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Add Custom Place Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-[#102A43]">
              Add Stop to Day {activeDayNumber}
            </h3>
            
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-600 block mb-1">Attraction or Activity</label>
                <input
                  type="text"
                  placeholder="e.g. Scuba diving, Museum visit, Scenic sunset walk..."
                  value={newActivityText}
                  onChange={(e) => setNewActivityText(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-semibold text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-600 block mb-1">Time of Day</label>
                  <select
                    value={newActivityTime}
                    onChange={(e) => setNewActivityTime(e.target.value as any)}
                    className="w-full p-2 rounded-lg border border-slate-300 font-semibold text-slate-800"
                  >
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-600 block mb-1">Visiting Duration</label>
                  <input
                    type="text"
                    value={newActivityDuration}
                    onChange={(e) => setNewActivityDuration(e.target.value)}
                    placeholder="2 hours"
                    className="w-full p-2 rounded-lg border border-slate-300 font-semibold text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-600 block mb-1">Est. Expense (₹)</label>
                <input
                  type="number"
                  value={newActivityCost}
                  onChange={(e) => setNewActivityCost(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-semibold text-slate-800"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAddActivity}
                className="px-4 py-2 bg-[#102A43] hover:bg-[#167D9A] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Add to Itinerary
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
