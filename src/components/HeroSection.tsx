import React, { useState } from 'react';
import { 
  ArrowRight, 
  Search, 
  MapPin, 
  Wallet, 
  Calendar, 
  Sparkles, 
  Compass, 
  Map, 
  Clock, 
  Layers, 
  ShieldCheck, 
  ChevronRight, 
  SlidersHorizontal,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { Destination } from '../types/travel';
import { DESTINATIONS_DATA } from '../data/destinationsData';

interface HeroSectionProps {
  onStartPlanTrip: (initialDestination?: Destination | null, initialOrigin?: string) => void;
  onExploreDestinations: () => void;
  onSelectDestination: (dest: Destination) => void;
  onViewOnMap: (dest?: Destination) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartPlanTrip,
  onExploreDestinations,
  onSelectDestination,
  onViewOnMap
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<Destination[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (!val.trim()) {
      setFilteredSuggestions([]);
      return;
    }
    const q = val.toLowerCase();
    const matches = DESTINATIONS_DATA.filter(
      d => d.name.toLowerCase().includes(q) || 
           d.stateOrRegion.toLowerCase().includes(q) || 
           d.category.toLowerCase().includes(q) ||
           d.highlights.some(h => h.toLowerCase().includes(q))
    ).slice(0, 5);
    setFilteredSuggestions(matches);
  };

  const curatedCollections = [
    {
      title: 'Heritage, Forts & UNESCO Wonders',
      badge: 'Historical',
      tagline: 'Palaces, ancient rock-cut architecture, and royal citadels',
      destinations: DESTINATIONS_DATA.filter(d => 
        ['agra', 'ajanta-ellora-grishneshwar', 'jaisalmer', 'hampi'].includes(d.id)
      )
    },
    {
      title: 'Sacred Temples & Pilgrimage Circuits',
      badge: 'Spiritual',
      tagline: 'Millennia-old sanctums, holy river ghats, and divine Jyotirlingas',
      destinations: DESTINATIONS_DATA.filter(d => 
        ['meenakshi-temple-madurai', 'varanasi', 'amritsar-golden-temple', 'puri-konark-odisha'].includes(d.id)
      )
    },
    {
      title: 'Beaches, Islands & Coastal Havens',
      badge: 'Coastal & French Flair',
      tagline: 'Promenade boulevards, golden sands, and cliff-top seaside sunsets',
      destinations: DESTINATIONS_DATA.filter(d => 
        ['pondicherry', 'kovalam-varkala-kerala', 'dudhsagar-goa', 'andaman-radhanagar'].includes(d.id)
      )
    },
    {
      title: 'Misty Valleys, Waterfalls & Treks',
      badge: 'Nature & Adventure',
      tagline: 'Himalayan lakes, thunderous cascades, and high-altitude tea hills',
      destinations: DESTINATIONS_DATA.filter(d => 
        ['srinagar-gulmarg-kashmir', 'araku-valley', 'darjeeling-mirik', 'papikondalu'].includes(d.id)
      )
    },
    {
      title: 'Hidden Gems & Earth Formations',
      badge: 'Off the Beaten Path',
      tagline: 'India’s Grand Canyon, misty winter villages, and endless white salt deserts',
      destinations: DESTINATIONS_DATA.filter(d => 
        ['gandikota', 'lambasingi', 'rann-of-kutch-gujarat'].includes(d.id)
      )
    }
  ];

  return (
    <div className="flex flex-col bg-slate-50 text-slate-800">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative overflow-hidden bg-[#070D1E] text-white min-h-[640px] lg:min-h-[720px] flex items-center">
        {/* Background Imagery with Multi-Stop Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_travel_scenic_1792213543590.jpg"
            alt="Cinematic scenic India landscape"
            className="w-full h-full object-cover object-center filter brightness-[0.42] contrast-[1.12]"
            referrerPolicy="no-referrer"
          />
          {/* Gradients for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070D1E] via-[#070D1E]/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070D1E]/80 via-transparent to-[#070D1E]/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-3xl">
            
            {/* Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#F4B860]" />
              <span>Your next journey starts here</span>
            </div>

            {/* Main Cinematic Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              India is waiting.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#7DD3FC] to-[#F4B860]">
                Let's explore.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-200 font-normal leading-relaxed mb-10 max-w-2xl text-balance">
              Discover extraordinary places. Build a trip that feels like yours with map-powered intelligence, day-by-day visual timelines, and live transparent budget estimates.
            </p>

            {/* Interactive Search & Plan Launcher Console */}
            <div className="relative p-2.5 sm:p-3 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/60 max-w-2xl text-slate-900">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                
                {/* Search Input Box */}
                <div className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200/90 flex-1 relative">
                  <Search className="w-5 h-5 text-[#167D9A] shrink-0" />
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Where do you want to go?
                    </span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      placeholder="Search cities, attractions, or hidden gems..."
                      className="w-full text-xs sm:text-sm font-semibold text-slate-900 bg-transparent focus:outline-none placeholder:text-slate-400 placeholder:font-normal"
                    />
                  </div>
                </div>

                {/* Primary Guided Planner CTA Button */}
                <button
                  onClick={() => onStartPlanTrip(null, searchQuery || 'Vijayawada')}
                  className="px-6 py-3.5 bg-gradient-to-r from-[#102A43] via-[#0F3554] to-[#167D9A] hover:brightness-110 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer shrink-0"
                >
                  <Sparkles className="w-4 h-4 text-[#F4B860]" />
                  <span>✦ Get Started — Plan My Trip</span>
                </button>
              </div>

              {/* Autocomplete Dropdown List */}
              {isFocused && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-30">
                  <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                    <span>Matching Destinations</span>
                    <button 
                      onClick={() => setIsFocused(false)}
                      className="text-slate-400 hover:text-slate-600 text-xs"
                    >
                      Close
                    </button>
                  </div>
                  {filteredSuggestions.map((dest) => (
                    <div
                      key={dest.id}
                      onClick={() => {
                        onSelectDestination(dest);
                        setIsFocused(false);
                      }}
                      className="p-3 hover:bg-slate-50 flex items-center justify-between cursor-pointer border-b border-slate-100 last:border-b-0 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={dest.imageUrl} 
                          alt={dest.name} 
                          className="w-10 h-10 rounded-lg object-cover" 
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900">{dest.name}</div>
                          <div className="text-[11px] text-slate-500">{dest.stateOrRegion}, {dest.country} · {dest.category}</div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onStartPlanTrip(dest);
                          setIsFocused(false);
                        }}
                        className="px-2.5 py-1 text-[11px] font-semibold text-white bg-[#102A43] hover:bg-[#167D9A] rounded-lg transition-colors"
                      >
                        Plan Trip
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Value Badges */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 px-1 text-[11px] text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Personalized journeys</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Smart itineraries</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Budget-aware planning</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. WHAT MAKES VOYAGEIQ DIFFERENT? (5 Core Capabilities) */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#167D9A] font-mono">
              The Intelligent Travel Difference
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] tracking-tight mt-1 mb-3">
              What makes VoyageIQ different?
            </h2>
            <p className="text-sm text-slate-600">
              Not another cluttered booking portal. VoyageIQ is built around spatial exploration, transparent pricing algorithms, and fluid itinerary editing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Explore India your way */}
            <div 
              onClick={onExploreDestinations}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#167D9A]/50 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-100 text-[#167D9A] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Map className="w-6 h-6 text-[#167D9A]" />
                </div>
                <h3 className="text-base font-bold text-[#102A43] mb-2 flex items-center justify-between">
                  <span>Explore India your way</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#167D9A] group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  An interactive map with searchable destinations, hidden gems, temples, waterfalls, beaches, mountains, and local attractions across all 28 states and union territories.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold text-[#167D9A]">
                <span>Launch Map Explorer</span>
                <span>30+ Curated Places →</span>
              </div>
            </div>

            {/* Card 2: One-click smart trip planning */}
            <div 
              onClick={() => onStartPlanTrip()}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#167D9A]/50 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#D97706] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-6 h-6 text-[#D97706]" />
                </div>
                <h3 className="text-base font-bold text-[#102A43] mb-2 flex items-center justify-between">
                  <span>One-click smart trip planning</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#167D9A] group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Instead of long complex forms, answer a few intuitive questions about duration, budget, and favorite travel themes to generate an immediate, personalized itinerary.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold text-[#D97706]">
                <span>Open 2-Step Planner</span>
                <span>Guided Setup →</span>
              </div>
            </div>

            {/* Card 3: Visual trip timeline */}
            <div 
              onClick={() => onStartPlanTrip(DESTINATIONS_DATA[0])}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#167D9A]/50 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Clock className="w-6 h-6 text-emerald-700" />
                </div>
                <h3 className="text-base font-bold text-[#102A43] mb-2 flex items-center justify-between">
                  <span>Visual trip timeline</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#167D9A] group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Day 1, Day 2, and Day 3 arranged in chronological order with exact map locations, estimated travel time between stops, and suggested visiting durations.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold text-emerald-700">
                <span>View Timeline Format</span>
                <span>Orderly Sequencing →</span>
              </div>
            </div>

            {/* Card 4: Live trip budget breakdown */}
            <div 
              onClick={() => onStartPlanTrip()}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#167D9A]/50 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Wallet className="w-6 h-6 text-blue-700" />
                </div>
                <h3 className="text-base font-bold text-[#102A43] mb-2 flex items-center justify-between">
                  <span>Live trip budget breakdown</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#167D9A] group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Real-time itemization of transport, accommodation, food, and activities with remaining budget tracking. Clearly distinguishes preliminary estimates from confirmed bookings.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold text-blue-700">
                <span>See Real-Time Ledger</span>
                <span>Transparent Math →</span>
              </div>
            </div>

            {/* Card 5: Change plans without starting over */}
            <div 
              onClick={() => onStartPlanTrip(DESTINATIONS_DATA[1])}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#167D9A]/50 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between md:col-span-2 lg:col-span-2"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <SlidersHorizontal className="w-6 h-6 text-purple-700" />
                </div>
                <h3 className="text-base font-bold text-[#102A43] mb-2 flex items-center justify-between">
                  <span>Change plans without starting over</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#167D9A] group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Add or remove attractions, swap dates, reorder morning and afternoon stops, and recalibrate your budget slider at any time. Your custom additions and notes stay preserved.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold text-purple-700">
                <span>Flexible Itinerary Customization</span>
                <span>No Reset Hassle →</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. CURATED INDIA DESTINATION COLLECTIONS */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#167D9A] font-mono">
                Curated Travel Catalog
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] tracking-tight mt-1">
                Explore India by Travel Mood & Heritage
              </h2>
            </div>
            <button
              onClick={onExploreDestinations}
              className="text-xs font-bold text-[#167D9A] hover:text-[#102A43] flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <span>View all 30+ destinations on Map</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Collection Rows */}
          <div className="space-y-12">
            {curatedCollections.map((collection, idx) => (
              <div key={idx} className="space-y-4">
                
                {/* Collection Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg font-bold text-[#102A43]">
                      {collection.title}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800">
                      {collection.badge}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">
                    {collection.tagline}
                  </span>
                </div>

                {/* Destination Cards Carousel Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {collection.destinations.map((dest) => (
                    <div
                      key={dest.id}
                      className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between"
                    >
                      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                        <img
                          src={dest.imageUrl}
                          alt={dest.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                        
                        <div className="absolute bottom-2.5 left-3 right-3 text-white">
                          <span className="text-[10px] text-amber-300 font-semibold uppercase tracking-wider block">
                            {dest.stateOrRegion}
                          </span>
                          <h4 className="text-sm font-bold truncate">
                            {dest.name}
                          </h4>
                        </div>
                      </div>

                      <div className="p-3.5 flex flex-col justify-between flex-1 space-y-3">
                        <p className="text-[11px] text-slate-600 line-clamp-2">
                          {dest.description}
                        </p>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">
                              Est. Budget
                            </span>
                            <span className="font-extrabold text-[#102A43] tabular-nums">
                              ₹{dest.estimatedCostInr.toLocaleString()}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">
                              Duration
                            </span>
                            <span className="font-semibold text-slate-700">
                              {dest.idealDurationDays} Days
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <button
                            onClick={() => onSelectDestination(dest)}
                            className="py-1.5 px-2 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg text-center transition-colors"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => onStartPlanTrip(dest)}
                            className="py-1.5 px-2 text-[11px] font-semibold text-white bg-[#102A43] hover:bg-[#167D9A] rounded-lg text-center transition-colors flex items-center justify-center gap-1"
                          >
                            <span>Plan</span>
                            <ChevronRight className="w-3 h-3 text-[#F4B860]" />
                          </button>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
