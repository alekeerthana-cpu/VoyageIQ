import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Wallet, 
  Compass, 
  Check, 
  Users, 
  ArrowRight, 
  RotateCcw, 
  Map as MapIcon, 
  Clock, 
  DollarSign, 
  ChevronRight, 
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { Destination, PlannedTrip, TimelineDay } from '../types/travel';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { savePlannedTrip } from '../services/tripStorage';
import { DestinationMiniMap } from './DestinationMiniMap';

interface SmartTripPlannerProps {
  initialDestination?: Destination | null;
  initialStartingLocation?: string;
  onTripGeneratedAndSaved: (savedTrip: PlannedTrip) => void;
  onExploreOnMap: (destination: Destination) => void;
}

export const SmartTripPlanner: React.FC<SmartTripPlannerProps> = ({
  initialDestination,
  initialStartingLocation = 'Vijayawada',
  onTripGeneratedAndSaved,
  onExploreOnMap,
}) => {
  // Step State
  const [currentStep, setCurrentStep] = useState<1 | 2>(initialDestination ? 2 : 1);

  // Step 1: Form Inputs
  const [startingLocation, setStartingLocation] = useState(initialStartingLocation);
  const [destinationMode, setDestinationMode] = useState<'surprise' | 'specific' | 'near_origin'>(
    initialDestination ? 'specific' : 'surprise'
  );
  const [selectedDestinationId, setSelectedDestinationId] = useState<string>(
    initialDestination?.id || DESTINATIONS_DATA[0].id
  );
  const [tripDurationDays, setTripDurationDays] = useState<number>(3);
  const [budgetPerPerson, setBudgetPerPerson] = useState<number>(5000);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'nature',
    'temples',
    'history',
    'photography'
  ]);
  const [travelersOption, setTravelersOption] = useState<'solo' | '2' | '3-5' | '6+'>('2');

  // Step 2: Generated Result State
  const [generatedDestination, setGeneratedDestination] = useState<Destination>(
    initialDestination || DESTINATIONS_DATA[0]
  );
  const [generatedDays, setGeneratedDays] = useState<TimelineDay[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  // Quick Starting Cities
  const popularStartingCities = [
    'Vijayawada',
    'Hyderabad',
    'Bengaluru',
    'Delhi',
    'Mumbai',
    'Chennai',
    'Kolkata'
  ];

  // Interest options
  const interestOptions = [
    { id: 'nature', label: 'Nature', icon: '🌿' },
    { id: 'temples', label: 'Temples & Spiritual', icon: '🛕' },
    { id: 'beaches', label: 'Beaches & Coastal', icon: '🏖️' },
    { id: 'adventure', label: 'Adventure', icon: '🧗' },
    { id: 'history', label: 'History & Forts', icon: '🏰' },
    { id: 'food', label: 'Food & Culture', icon: '🍛' },
    { id: 'photography', label: 'Photography', icon: '📸' },
    { id: 'hidden_gems', label: 'Hidden Gems', icon: '✨' },
  ];

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter(i => i !== id));
      }
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const getTravelersCount = (): number => {
    switch (travelersOption) {
      case 'solo': return 1;
      case '2': return 2;
      case '3-5': return 4;
      case '6+': return 6;
      default: return 2;
    }
  };

  // Generate Suggested Itinerary
  const handleGeneratePlan = () => {
    let chosen: Destination;

    if (destinationMode === 'specific') {
      chosen = DESTINATIONS_DATA.find(d => d.id === selectedDestinationId) || DESTINATIONS_DATA[0];
    } else if (destinationMode === 'near_origin') {
      // Find destinations close to starting location
      const near = DESTINATIONS_DATA.filter(
        d => (d.distanceFromVijayawadaKm && d.distanceFromVijayawadaKm < 600) ||
             d.regionZone === 'South India'
      );
      chosen = near.length > 0 ? near[Math.floor(Math.random() * near.length)] : DESTINATIONS_DATA[0];
    } else {
      // Surprise me: Match based on selected interests and budget tier
      const candidates = DESTINATIONS_DATA.filter(d => {
        const matchesCategory = selectedInterests.some(interest => {
          if (interest === 'nature' && d.category === 'nature') return true;
          if (interest === 'temples' && d.category === 'cultural') return true;
          if (interest === 'beaches' && d.category === 'coastal') return true;
          if (interest === 'adventure' && d.category === 'adventure') return true;
          if (interest === 'history' && d.category === 'cultural') return true;
          return d.interests.includes(interest);
        });
        return matchesCategory;
      });

      chosen = candidates.length > 0 
        ? candidates[Math.floor(Math.random() * candidates.length)] 
        : DESTINATIONS_DATA[0];
    }

    setGeneratedDestination(chosen);

    // Build day items matching tripDurationDays
    const days: TimelineDay[] = [];
    for (let dayNum = 1; dayNum <= tripDurationDays; dayNum++) {
      const sample = chosen.sampleItinerary[(dayNum - 1) % chosen.sampleItinerary.length];
      days.push({
        dayNumber: dayNum,
        title: sample ? sample.title : `Day ${dayNum}: Exploration of ${chosen.name}`,
        activities: [
          {
            id: `act-${dayNum}-1`,
            timeOfDay: 'Morning',
            text: sample ? sample.morning : `Morning exploration and orientation at ${chosen.name}`,
            costInr: Math.round(budgetPerPerson * 0.12),
            visitingDuration: '2.5 hours',
            travelTimeFromPrev: '20 min transit',
            locationName: chosen.highlights[0] || chosen.name,
            isConfirmed: false
          },
          {
            id: `act-${dayNum}-2`,
            timeOfDay: 'Afternoon',
            text: sample ? sample.afternoon : `Afternoon highlights, cultural attractions, and local dining`,
            costInr: Math.round(budgetPerPerson * 0.15),
            visitingDuration: '3 hours',
            travelTimeFromPrev: '15 min walk / taxi',
            locationName: chosen.highlights[1] || `${chosen.name} Centre`,
            isConfirmed: false
          },
          {
            id: `act-${dayNum}-3`,
            timeOfDay: 'Evening',
            text: sample ? sample.evening : `Sunset vistas, heritage markets, and local dining specialties`,
            costInr: Math.round(budgetPerPerson * 0.10),
            visitingDuration: '2 hours',
            travelTimeFromPrev: '10 min walk',
            locationName: chosen.highlights[2] || `${chosen.name} Viewpoint`,
            isConfirmed: false
          }
        ]
      });
    }

    setGeneratedDays(days);
    setCurrentStep(2);
    setIsSaved(false);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Calculate live costs
  const travelers = getTravelersCount();
  const totalBudgetPool = budgetPerPerson * travelers;

  const estimatedTransport = Math.round(
    (generatedDestination.expensesBreakdown.transport || 3000) * (travelers > 1 ? 1.3 : 1)
  );
  const estimatedStay = Math.round(
    ((generatedDestination.expensesBreakdown.accommodation || 4000) / 3) * tripDurationDays * (travelers > 1 ? 1.4 : 1)
  );
  const estimatedFood = Math.round(
    ((generatedDestination.expensesBreakdown.food || 2500) / 3) * tripDurationDays * travelers
  );
  const estimatedActivities = generatedDays.reduce(
    (acc, d) => acc + d.activities.reduce((dAcc, a) => dAcc + a.costInr, 0),
    0
  );

  const totalEstimatedExpense = estimatedTransport + estimatedStay + estimatedFood + estimatedActivities;
  const remainingBudget = totalBudgetPool - totalEstimatedExpense;

  // Save to planned trips storage and emit
  const handleSaveToMyJourney = () => {
    const plannedTrip: PlannedTrip = {
      id: `trip-${Date.now()}`,
      destinationId: generatedDestination.id,
      destinationName: generatedDestination.name,
      destinationCountry: generatedDestination.country,
      destinationImage: generatedDestination.imageUrl,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + tripDurationDays * 86400000).toISOString().split('T')[0],
      travelersCount: travelers,
      targetBudgetInr: totalBudgetPool,
      actualEstimatedBudgetInr: totalEstimatedExpense,
      travelStyle: 'budget-friendly',
      notes: `Planned via VoyageIQ Smart Guided Planner from ${startingLocation}. Priority themes: ${selectedInterests.join(', ')}.`,
      days: generatedDays,
      expensesBreakdown: {
        transport: estimatedTransport,
        accommodation: estimatedStay,
        food: estimatedFood,
        activities: estimatedActivities
      },
      createdAt: new Date().toISOString(),
      startingLocation
    };

    savePlannedTrip(plannedTrip);
    setIsSaved(true);
    onTripGeneratedAndSaved(plannedTrip);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Step Indicator Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#167D9A] font-mono">
              VoyageIQ Guided Trip Builder
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-bold text-slate-500">
              Step {currentStep} of 2
            </span>
          </div>

          {currentStep === 2 && (
            <button
              onClick={() => setCurrentStep(1)}
              className="text-xs font-bold text-[#167D9A] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Change Preferences</span>
            </button>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] tracking-tight">
          {currentStep === 1 ? 'Plan your next trip' : `Suggested Itinerary: ${generatedDestination.name}`}
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          {currentStep === 1 
            ? 'Choose a few preferences. VoyageIQ can use them to build a suggested itinerary.'
            : 'Personalized travel plan with visual timeline, transit coordinates, and real-time ledger.'}
        </p>
      </div>

      {/* ================= STEP 1: GUIDED PREFERENCE FORM ================= */}
      {currentStep === 1 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">
          
          {/* Question 1: Starting Location */}
          <div className="space-y-3">
            <label className="text-xs uppercase font-extrabold tracking-wider text-[#102A43] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#167D9A]" />
              <span>Starting location</span>
            </label>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={startingLocation}
                onChange={(e) => setStartingLocation(e.target.value)}
                placeholder="Enter city (e.g., Vijayawada, Delhi, Bengaluru)..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#167D9A]"
              />
            </div>

            {/* Quick city suggestions */}
            <div className="flex items-center gap-1.5 flex-wrap text-xs text-slate-500 pt-1">
              <span className="font-medium text-slate-400">Popular:</span>
              {popularStartingCities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setStartingLocation(city)}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-colors cursor-pointer ${
                    startingLocation.toLowerCase() === city.toLowerCase()
                      ? 'bg-[#102A43] text-white font-bold'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Destination Mode */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <label className="text-xs uppercase font-extrabold tracking-wider text-[#102A43] flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#167D9A]" />
              <span>Destination choice</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'surprise', label: 'Surprise me', desc: 'VoyageIQ recommends places' },
                { id: 'specific', label: 'I have a destination in mind', desc: 'Select from 30+ destinations' },
                { id: 'near_origin', label: 'Near my starting city', desc: 'Road trips & scenic getaways' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setDestinationMode(opt.id as any)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    destinationMode === opt.id
                      ? 'bg-cyan-50/60 border-[#167D9A] shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold ${destinationMode === opt.id ? 'text-[#167D9A]' : 'text-slate-800'}`}>
                      {opt.label}
                    </span>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      destinationMode === opt.id ? 'border-[#167D9A] bg-[#167D9A]' : 'border-slate-300'
                    }`}>
                      {destinationMode === opt.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-500 block leading-tight">
                    {opt.desc}
                  </span>
                </button>
              ))}
            </div>

            {/* If Specific Destination Chosen, show destination dropdown */}
            {destinationMode === 'specific' && (
              <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Select Destination from Catalog
                </label>
                <select
                  value={selectedDestinationId}
                  onChange={(e) => setSelectedDestinationId(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#167D9A]"
                >
                  {DESTINATIONS_DATA.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.stateOrRegion}, {d.country}) — ₹{d.estimatedCostInr.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Question 3: Trip Duration */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <label className="text-xs uppercase font-extrabold tracking-wider text-[#102A43] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#167D9A]" />
              <span>Trip duration</span>
            </label>

            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {[1, 2, 3, 5, 7].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setTripDurationDays(num)}
                  className={`py-3 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                    tripDurationDays === num
                      ? 'bg-[#102A43] text-white border-[#102A43] shadow-md font-bold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 font-semibold'
                  }`}
                >
                  <div className="text-sm sm:text-base leading-none mb-1">{num}</div>
                  <div className="text-[10px] uppercase tracking-wider opacity-80">
                    {num === 1 ? 'Day' : 'Days'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Question 4: Budget Per Person */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase font-extrabold tracking-wider text-[#102A43] flex items-center gap-2">
                <Wallet className="w-4 h-4 text-[#167D9A]" />
                <span>Budget per person</span>
              </label>

              <div className="text-right">
                <span className="text-2xl font-extrabold text-[#102A43] tabular-nums font-sans">
                  ₹{budgetPerPerson.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-400 block">estimated per traveler</span>
              </div>
            </div>

            {/* Slider */}
            <input
              type="range"
              min="1000"
              max="50000"
              step="500"
              value={budgetPerPerson}
              onChange={(e) => setBudgetPerPerson(Number(e.target.value))}
              className="w-full accent-[#167D9A] cursor-pointer"
            />

            <div className="flex justify-between text-[11px] text-slate-400 font-mono font-medium">
              <span>₹1k</span>
              <span>₹10k</span>
              <span>₹25k</span>
              <span>₹50k+</span>
            </div>
          </div>

          {/* Question 5: What do you love? */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <label className="text-xs uppercase font-extrabold tracking-wider text-[#102A43] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#167D9A]" />
              <span>What do you love? (Select themes)</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {interestOptions.map((item) => {
                const isSelected = selectedInterests.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleInterest(item.id)}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#102A43] text-white border-[#102A43] shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-base">{item.icon}</span>
                      <span className="text-xs font-bold truncate">{item.label}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#F4B860] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 6: Number of travelers */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <label className="text-xs uppercase font-extrabold tracking-wider text-[#102A43] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#167D9A]" />
              <span>Number of travelers</span>
            </label>

            <div className="grid grid-cols-4 gap-2.5">
              {[
                { id: 'solo', label: 'Solo', count: '1 person' },
                { id: '2', label: '2 people', count: 'Duo / Couple' },
                { id: '3-5', label: '3–5', count: 'Small Group' },
                { id: '6+', label: '6+', count: 'Large Group' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setTravelersOption(opt.id as any)}
                  className={`py-3 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                    travelersOption === opt.id
                      ? 'bg-cyan-50 border-[#167D9A] text-[#167D9A] font-bold shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold'
                  }`}
                >
                  <div className="text-xs font-bold">{opt.label}</div>
                  <div className="text-[10px] text-slate-400 font-normal">{opt.count}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-6 border-t border-slate-200">
            <button
              onClick={handleGeneratePlan}
              className="w-full py-4 bg-gradient-to-r from-[#102A43] via-[#0F3554] to-[#167D9A] hover:brightness-110 text-white rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-[#F4B860]" />
              <span>✦ Generate My Trip Plan</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      )}

      {/* ================= STEP 2: GENERATED ITINERARY & TIMELINE ================= */}
      {currentStep === 2 && (
        <div className="space-y-8">
          
          {/* Destination Header Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <img
                src={generatedDestination.imageUrl}
                alt={generatedDestination.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
              
              <div className="absolute bottom-5 left-5 right-5 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                    <span>{generatedDestination.stateOrRegion}, {generatedDestination.country}</span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize">{generatedDestination.category}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {generatedDestination.name}
                  </h2>
                  <p className="text-xs text-slate-200 max-w-xl line-clamp-2 mt-1">
                    {generatedDestination.description}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <button
                    onClick={() => onExploreOnMap(generatedDestination)}
                    className="px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MapIcon className="w-4 h-4 text-[#F4B860]" />
                    <span>View on Map</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Trip Specs Ribbon */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Origin City
                </span>
                <span className="text-sm font-bold text-slate-800">{startingLocation}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Duration
                </span>
                <span className="text-sm font-bold text-slate-800">{tripDurationDays} Days</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Travelers
                </span>
                <span className="text-sm font-bold text-slate-800">{travelers} {travelers === 1 ? 'Person' : 'People'}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Target Budget
                </span>
                <span className="text-sm font-extrabold text-[#102A43] tabular-nums">
                  ₹{totalBudgetPool.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Live Trip Budget Breakdown Ledger */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-[#102A43]">
                  Live Trip Budget Breakdown
                </h3>
                <span className="text-xs text-slate-500">
                  Itemized estimates based on duration, traveler count, and transit corridor
                </span>
              </div>

              {/* Remaining Budget Status */}
              <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-2 ${
                remainingBudget >= 0
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}>
                <span>{remainingBudget >= 0 ? 'Remaining Balance:' : 'Over Budget:'}</span>
                <span className="font-mono tabular-nums">
                  ₹{Math.abs(remainingBudget).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Transit / Fuel
                </span>
                <span className="text-base font-extrabold text-slate-800 tabular-nums">
                  ₹{estimatedTransport.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Est. return transit</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Accommodation
                </span>
                <span className="text-base font-extrabold text-slate-800 tabular-nums">
                  ₹{estimatedStay.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">{tripDurationDays} nights stay</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Food & Dining
                </span>
                <span className="text-base font-extrabold text-slate-800 tabular-nums">
                  ₹{estimatedFood.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Local specialties</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Sightseeing & Activities
                </span>
                <span className="text-base font-extrabold text-slate-800 tabular-nums">
                  ₹{estimatedActivities.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Tickets & excursions</span>
              </div>
            </div>
          </div>

          {/* Visual Trip Timeline: Day 1, Day 2, Day 3 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#102A43]">
                  Visual Trip Timeline
                </h3>
                <p className="text-xs text-slate-500">
                  Chronological day-by-day sequence with estimated visiting durations and travel times
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {generatedDays.map((day) => (
                <div key={day.dayNumber} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-[#102A43] text-white text-xs font-bold flex items-center justify-center font-mono">
                        D{day.dayNumber}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">
                        {day.title}
                      </h4>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">
                      {day.activities.length} Attractions Plotted
                    </span>
                  </div>

                  {/* Day Activities List */}
                  <div className="space-y-3">
                    {day.activities.map((act, actIdx) => (
                      <div 
                        key={act.id} 
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-start gap-3">
                          <span className="px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px] bg-cyan-100 text-[#167D9A] shrink-0 mt-0.5">
                            {act.timeOfDay}
                          </span>
                          <div>
                            <div className="font-bold text-slate-900 text-xs sm:text-sm">
                              {act.locationName}
                            </div>
                            <p className="text-slate-600 text-xs mt-0.5">
                              {act.text}
                            </p>
                            
                            {/* Duration & Transit time pills (unboxed text) */}
                            <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium mt-1">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-[#167D9A]" />
                                {act.visitingDuration || '2 hours'}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="flex items-center gap-1">
                                <Navigation className="w-3 h-3 text-emerald-600" />
                                {act.travelTimeFromPrev || '15 min transit'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right sm:border-l sm:border-slate-200 sm:pl-4 shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                          <span className="text-[10px] uppercase text-slate-400 font-bold">Est. Cost</span>
                          <span className="text-xs sm:text-sm font-extrabold text-[#102A43] tabular-nums">
                            ₹{act.costInr.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Google Maps Preview Embed for Destination */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapIcon className="w-4 h-4 text-[#167D9A]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 font-mono">
                  Location Map & Transit Route
                </h4>
              </div>
              <span className="text-xs text-[#167D9A] font-semibold">
                {generatedDestination.stateOrRegion}, {generatedDestination.country}
              </span>
            </div>

            <DestinationMiniMap destination={generatedDestination} height="260px" zoom={11} />
          </div>

          {/* Action Bar: Save to My Journey or Modify */}
          <div className="p-6 bg-slate-900 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div>
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Ready to embark?
              </div>
              <h4 className="text-lg font-bold">
                Save this itinerary to My Journey
              </h4>
              <p className="text-xs text-slate-300">
                You can add or remove places, adjust budgets, and tweak dates at any time without starting over.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setCurrentStep(1)}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold transition-colors cursor-pointer w-1/2 sm:w-auto text-center"
              >
                Tweak Preferences
              </button>

              <button
                onClick={handleSaveToMyJourney}
                disabled={isSaved}
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#F4B860] to-[#E0A045] hover:brightness-105 text-[#0B132B] text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer w-1/2 sm:w-auto"
              >
                {isSaved ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                    <span>Saved to My Journey!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#0B132B]" />
                    <span>✦ Save & Open in My Journey</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
