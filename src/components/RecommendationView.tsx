import React, { useState, useEffect } from 'react';
import { Sparkles, Calculator, Sliders, CheckCircle2, AlertCircle, ArrowRight, Bookmark, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { Destination, TravelerPreferences, RecommendationResult, TravelStyle } from '../types/travel';
import { rankDestinations } from '../services/recommendationEngine';
import { storePreferences } from '../services/tripStorage';

interface RecommendationViewProps {
  destinations: Destination[];
  initialPreferences: TravelerPreferences;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onPlanTrip: (destination: Destination) => void;
}

const AVAILABLE_INTERESTS = [
  'nature',
  'adventure',
  'photography',
  'heritage',
  'relaxation',
  'cuisine',
  'wildlife',
  'trekking',
  'wellness'
];

export const RecommendationView: React.FC<RecommendationViewProps> = ({
  destinations,
  initialPreferences,
  savedIds,
  onToggleSave,
  onPlanTrip
}) => {
  const [preferences, setPreferences] = useState<TravelerPreferences>(initialPreferences);
  const [rankedResults, setRankedResults] = useState<RecommendationResult[]>([]);
  const [scopeFilter, setScopeFilter] = useState<string>('all');
  const [isAiLoading, setIsAiLoading] = useState<Record<string, boolean>>({});
  const [aiExplanations, setAiExplanations] = useState<Record<string, string>>({});
  const [expandedBreakdownId, setExpandedBreakdownId] = useState<string | null>(null);

  // Recalculate rankings whenever preferences change
  useEffect(() => {
    const results = rankDestinations(preferences, destinations);
    setRankedResults(results);
    storePreferences(preferences);
  }, [preferences, destinations]);

  const toggleInterest = (interest: string) => {
    setPreferences(prev => {
      const exists = prev.interests.includes(interest);
      const updated = exists
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: updated };
    });
  };

  const requestAiAnalysis = async (destinationId: string) => {
    setIsAiLoading(prev => ({ ...prev, [destinationId]: true }));
    try {
      const response = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destinationId,
          preferences
        })
      });
      const data = await response.json();
      if (data.success && data.explanation) {
        setAiExplanations(prev => ({ ...prev, [destinationId]: data.explanation }));
      }
    } catch (err) {
      console.error('Failed to fetch AI explanation', err);
    } finally {
      setIsAiLoading(prev => ({ ...prev, [destinationId]: false }));
    }
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Header and Algorithm Declaration */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#167D9A] mb-1">
              <Sparkles className="w-4 h-4 text-[#167D9A]" />
              <span>Multi-Criteria Recommendation Engine</span>
              <span aria-hidden="true">·</span>
              <span>Transparent Scoring Formulation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] tracking-tight">
              Personalized Destination Matcher
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              VoyageIQ computes personalized compatibility scores using an objective 4-factor formula that weights budget suitability, interest intersection, duration match, and travel style.
            </p>
          </div>

          {/* Mathematical Formula Callout */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1.5 shrink-0">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block font-mono">
              Scoring Function
            </span>
            <div className="font-mono font-bold text-sm text-[#102A43] tabular-nums">
              S = 0.35B + 0.30I + 0.20D + 0.15T
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-2">
              <span>B: Budget</span>
              <span>·</span>
              <span>I: Interests</span>
              <span>·</span>
              <span>D: Duration</span>
              <span>·</span>
              <span>T: Style</span>
            </div>
          </div>
        </div>

        {/* Interactive Preference Questionnaire Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 text-xs">
          
          {/* Starting Location */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block uppercase tracking-wider text-[11px]">
              1. Starting Location / City
            </label>
            <input
              type="text"
              value={preferences.startingLocation}
              onChange={(e) => setPreferences({ ...preferences, startingLocation: e.target.value })}
              placeholder="e.g. Vijayawada, Hyderabad, Delhi..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#167D9A]"
            />
            <div className="flex flex-wrap gap-1 pt-1">
              {['Vijayawada', 'Hyderabad', 'Bangalore', 'Delhi', 'Mumbai', 'Chennai'].map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setPreferences({ ...preferences, startingLocation: city })}
                  className={`text-[10px] px-1.5 py-0.5 rounded transition-colors ${
                    preferences.startingLocation.toLowerCase() === city.toLowerCase()
                      ? 'bg-[#102A43] text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Target Budget */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                2. Target Budget (₹)
              </label>
              <span className="font-mono font-bold text-[#102A43] tabular-nums text-xs">
                ₹{preferences.budgetInr.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="5000"
              max="120000"
              step="2500"
              value={preferences.budgetInr}
              onChange={(e) => setPreferences({ ...preferences, budgetInr: Number(e.target.value) })}
              className="w-full accent-[#167D9A] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 tabular-nums">
              <span>₹5k</span>
              <span>₹15k (Example)</span>
              <span>₹50k</span>
              <span>₹120k</span>
            </div>
          </div>

          {/* Trip Duration */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block uppercase tracking-wider text-[11px]">
              3. Trip Duration (Days)
            </label>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {[2, 3, 4, 5, 6].map((days) => (
                <button
                  key={days}
                  onClick={() => setPreferences({ ...preferences, durationDays: days })}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors tabular-nums ${
                    preferences.durationDays === days
                      ? 'bg-white text-[#102A43] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {days}d
                </button>
              ))}
            </div>
            <span className="text-[10px] text-slate-400 block">
              {preferences.durationDays === 3 ? '3 Days matches weekend getaways' : `${preferences.durationDays} days itinerary`}
            </span>
          </div>

          {/* Travel Style */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block uppercase tracking-wider text-[11px]">
              4. Travel Style
            </label>
            <select
              value={preferences.travelStyle}
              onChange={(e) => setPreferences({ ...preferences, travelStyle: e.target.value as TravelStyle })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#167D9A]"
            >
              <option value="budget-friendly">Budget-friendly</option>
              <option value="moderate">Moderate Comfort</option>
              <option value="luxury">Luxury Retreat</option>
              <option value="backpacker">Backpacker / Adventure</option>
              <option value="family">Family Oriented</option>
            </select>
            <span className="text-[10px] text-slate-400 block">
              Tailors accommodation & activity expectations.
            </span>
          </div>

        </div>

        {/* Interest Checkbox Tags */}
        <div className="pt-6 border-t border-slate-100 mt-6">
          <label className="font-bold text-slate-700 block uppercase tracking-wider text-[11px] mb-2.5">
            5. Select Primary Travel Interests ({preferences.interests.length} selected)
          </label>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_INTERESTS.map((interest) => {
              const selected = preferences.interests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all flex items-center gap-1.5 ${
                    selected
                      ? 'bg-[#102A43] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {selected && <CheckCircle2 className="w-3.5 h-3.5 text-[#F4B860]" />}
                  <span>{interest}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Ranked Recommendations List */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-extrabold text-[#102A43] tracking-tight">
              Ranked Destination Matches
            </h2>
            <span className="text-xs text-slate-500">
              Sorted by overall multi-criteria compatibility score (0 - 100)
            </span>
          </div>

          {/* Regional Scope Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs overflow-x-auto scrollbar-none">
            {[
              { id: 'all', label: 'All Places' },
              { id: 'india', label: 'All Across India' },
              { id: 'South India', label: 'South India' },
              { id: 'North India', label: 'North India' },
              { id: 'North-East India', label: 'North-East' },
              { id: 'Islands', label: 'Islands' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setScopeFilter(tab.id)}
                className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  scopeFilter === tab.id
                    ? 'bg-white text-[#102A43] font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {rankedResults
            .filter(r => {
              if (scopeFilter === 'india') return r.destination.country.toLowerCase() === 'india';
              if (scopeFilter !== 'all') return r.destination.regionZone === scopeFilter;
              return true;
            })
            .map((result, index) => {
            const dest = result.destination;
            const isSaved = savedIds.includes(dest.id);
            const isExpanded = expandedBreakdownId === dest.id;
            const aiText = aiExplanations[dest.id];
            const isLoadingThisAi = isAiLoading[dest.id];

            return (
              <div
                key={dest.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
                  
                  {/* Left Column: Image and Rank */}
                  <div className="lg:col-span-4 relative rounded-xl overflow-hidden bg-slate-100 min-h-[220px]">
                    <img
                      src={dest.imageUrl}
                      alt={dest.name}
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    
                    {/* Rank Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#102A43]/90 text-white font-mono text-xs font-bold tabular-nums">
                      Rank #{index + 1}
                    </div>

                    {/* Bookmark Button */}
                    <button
                      onClick={() => onToggleSave(dest.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center transition-colors shadow-sm"
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500 text-amber-500' : 'text-slate-600'}`} />
                    </button>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-[11px] font-semibold text-amber-300">
                        {dest.stateOrRegion}, {dest.country}
                      </div>
                      <h3 className="text-base font-bold text-white tracking-tight truncate">
                        {dest.name}
                      </h3>
                    </div>
                  </div>

                  {/* Middle Column: Details & Rationales */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Match Score Strip */}
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-extrabold text-[#102A43] font-mono tabular-nums">
                            {result.matchPercentage}%
                          </span>
                          <span className="text-xs font-semibold text-slate-500">
                            Match Score
                          </span>
                        </div>
                        <span className="text-slate-300">|</span>
                        <div className="text-xs text-slate-600">
                          <span className="font-semibold text-slate-800 tabular-nums">
                            ₹{result.estimatedTotalExpense.toLocaleString()}
                          </span>
                          <span className="text-slate-400"> / {preferences.durationDays}d est.</span>
                        </div>
                      </div>

                      {/* Clean Unboxed Metadata */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                        <span className="capitalize font-medium text-slate-700">{dest.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="capitalize">{dest.climate.replace('-', ' ')}</span>
                        <span aria-hidden="true">·</span>
                        <span>Ideal: {dest.idealDurationDays} days</span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {dest.description}
                      </p>

                      {/* Why Match Bullet Points */}
                      <div className="space-y-1.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                          Algorithmic Match Factors:
                        </span>
                        {result.whyMatch.map((reason, rIdx) => (
                          <div key={rIdx} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold">✓</span>
                            <span>{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Behavioral Explanation Slot */}
                    {aiText && (
                      <div className="p-3 bg-sky-50 border border-sky-100 rounded-xl text-xs text-sky-950 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-[#167D9A]">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Gemini Travel Behavior Analysis</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed">
                          {aiText}
                        </p>
                      </div>
                    )}

                    {/* Action Row */}
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <button
                        onClick={() => requestAiAnalysis(dest.id)}
                        disabled={isLoadingThisAi}
                        className="py-1.5 px-3 rounded-lg text-xs font-semibold text-[#167D9A] bg-sky-50 hover:bg-sky-100 transition-colors flex items-center gap-1.5"
                      >
                        {isLoadingThisAi ? (
                          <>
                            <RefreshCw className="w-3 h-3 animate-spin text-[#167D9A]" />
                            <span>Analyzing Behavior...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5 text-[#167D9A]" />
                            <span>{aiText ? 'Re-Analyze with AI' : 'AI Match Explanation'}</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setExpandedBreakdownId(isExpanded ? null : dest.id)}
                        className="py-1.5 px-3 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1"
                      >
                        <Calculator className="w-3.5 h-3.5 text-slate-500" />
                        <span>{isExpanded ? 'Hide Math Breakdown' : 'View Formula Math'}</span>
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    </div>

                  </div>

                  {/* Right Column: Score Component Gauges & Plan Button */}
                  <div className="lg:col-span-3 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6 space-y-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block font-mono mb-2">
                        Formula Component Scores
                      </span>

                      <div className="space-y-2 text-xs">
                        {/* Budget B */}
                        <div>
                          <div className="flex justify-between text-slate-600 mb-0.5">
                            <span>Budget Fit (B · 35%)</span>
                            <span className="font-mono font-bold tabular-nums">{result.score.budgetScore}/100</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 rounded-full"
                              style={{ width: `${result.score.budgetScore}%` }}
                            />
                          </div>
                        </div>

                        {/* Interests I */}
                        <div>
                          <div className="flex justify-between text-slate-600 mb-0.5">
                            <span>Interests Match (I · 30%)</span>
                            <span className="font-mono font-bold tabular-nums">{result.score.interestScore}/100</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${result.score.interestScore}%` }}
                            />
                          </div>
                        </div>

                        {/* Duration D */}
                        <div>
                          <div className="flex justify-between text-slate-600 mb-0.5">
                            <span>Duration Suitability (D · 20%)</span>
                            <span className="font-mono font-bold tabular-nums">{result.score.durationScore}/100</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-500 rounded-full"
                              style={{ width: `${result.score.durationScore}%` }}
                            />
                          </div>
                        </div>

                        {/* Travel Style T */}
                        <div>
                          <div className="flex justify-between text-slate-600 mb-0.5">
                            <span>Style Alignment (T · 15%)</span>
                            <span className="font-mono font-bold tabular-nums">{result.score.styleScore}/100</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-indigo-500 rounded-full"
                              style={{ width: `${result.score.styleScore}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Plan Itinerary CTA */}
                    <div className="pt-2">
                      <button
                        onClick={() => onPlanTrip(dest)}
                        className="w-full py-2.5 px-4 bg-[#102A43] hover:bg-[#0B1D2E] text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 group"
                      >
                        <span>Build Itinerary</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#F4B860]" />
                      </button>
                    </div>

                  </div>

                </div>

                {/* Expanded Mathematical Formula Breakdown Drawer */}
                {isExpanded && (
                  <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-700 animate-in fade-in duration-150">
                    <div className="font-mono text-[11px] mb-2 font-bold text-slate-800">
                      Step-by-step scoring evaluation for {dest.name}:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 font-mono text-[11px] bg-white p-3 rounded-lg border border-slate-200">
                      <div>
                        <span className="text-slate-400 block">0.35 × B (Budget):</span>
                        <span className="font-bold tabular-nums">0.35 × {result.score.budgetScore} = {result.score.weightedBudget}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">0.30 × I (Interest):</span>
                        <span className="font-bold tabular-nums">0.30 × {result.score.interestScore} = {result.score.weightedInterest}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">0.20 × D (Duration):</span>
                        <span className="font-bold tabular-nums">0.20 × {result.score.durationScore} = {result.score.weightedDuration}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">0.15 × T (Style):</span>
                        <span className="font-bold tabular-nums">0.15 × {result.score.styleScore} = {result.score.weightedStyle}</span>
                      </div>
                    </div>
                    <div className="mt-2 text-right font-mono font-bold text-slate-900 text-xs">
                      Total S = {result.score.weightedBudget} + {result.score.weightedInterest} + {result.score.weightedDuration} + {result.score.weightedStyle} = <span className="text-[#167D9A]">{result.score.totalScore}/100</span>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
