import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Bookmark, Eye, ArrowUpRight, Compass, Calendar, Wallet, MapPin, LayoutGrid, Map as MapIcon } from 'lucide-react';
import { Destination, DestinationCategory, ClimateType, RegionZone } from '../types/travel';
import { DestinationDetailModal } from './DestinationDetailModal';
import { GoogleMapsExplorer } from './GoogleMapsExplorer';

interface DestinationExplorerProps {
  destinations: Destination[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onPlanTrip: (destination: Destination) => void;
}

export const DestinationExplorer: React.FC<DestinationExplorerProps> = ({
  destinations,
  savedIds,
  onToggleSave,
  onPlanTrip
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedClimate, setSelectedClimate] = useState<string>('all');
  const [budgetTier, setBudgetTier] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'cost-low' | 'cost-high' | 'duration'>('popularity');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'map'>('cards');
  const [mapTargetDestination, setMapTargetDestination] = useState<Destination | null>(null);

  const filteredDestinations = useMemo(() => {
    return destinations
      .filter((dest) => {
        // Search query
        const matchesSearch =
          dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dest.stateOrRegion.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dest.regionZone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dest.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));

        // Region filter
        let matchesRegion = true;
        if (selectedRegion === 'india') {
          matchesRegion = dest.country.toLowerCase() === 'india';
        } else if (selectedRegion !== 'all') {
          matchesRegion = dest.regionZone === selectedRegion;
        }

        // Category filter
        const matchesCategory =
          selectedCategory === 'all' || dest.category === selectedCategory;

        // Climate filter
        const matchesClimate =
          selectedClimate === 'all' || dest.climate === selectedClimate;

        // Budget tier filter
        let matchesBudget = true;
        if (budgetTier === 'under-15k') matchesBudget = dest.estimatedCostInr <= 15000;
        else if (budgetTier === '15k-30k') matchesBudget = dest.estimatedCostInr > 15000 && dest.estimatedCostInr <= 30000;
        else if (budgetTier === '30k-70k') matchesBudget = dest.estimatedCostInr > 30000 && dest.estimatedCostInr <= 70000;
        else if (budgetTier === 'luxury') matchesBudget = dest.estimatedCostInr > 70000;

        return matchesSearch && matchesRegion && matchesCategory && matchesClimate && matchesBudget;
      })
      .sort((a, b) => {
        if (sortBy === 'cost-low') return a.estimatedCostInr - b.estimatedCostInr;
        if (sortBy === 'cost-high') return b.estimatedCostInr - a.estimatedCostInr;
        if (sortBy === 'duration') return a.idealDurationDays - b.idealDurationDays;
        return b.popularityScore - a.popularityScore;
      });
  }, [destinations, searchQuery, selectedRegion, selectedCategory, selectedClimate, budgetTier, sortBy]);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header and Pitch */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <span>Destination Explorer</span>
            <span aria-hidden="true">·</span>
            <span>All Over India & Beyond</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums font-bold text-[#167D9A]">{filteredDestinations.length} Places Found</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] tracking-tight">
            Curated Indian Destinations & Baseline Circuits
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Explore authentic hill stations, sacred heritage ghats, tea estates, high mountain passes, and tranquil coastal backwaters across India.
          </p>
        </div>

        {/* View Mode & Sort Dropdown */}
        <div className="flex flex-wrap items-center gap-3 text-xs shrink-0">
          {/* Segmented View Mode Switcher */}
          <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 flex items-center gap-1 shadow-inner">
            <button
              onClick={() => {
                setViewMode('cards');
                setMapTargetDestination(null);
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-white text-[#102A43] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-[#167D9A]" />
              <span>Cards Grid</span>
            </button>

            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'map'
                  ? 'bg-[#102A43] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5 text-[#F4B860]" />
              <span>Google Map</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#167D9A]"
            >
              <option value="popularity">Popularity Index</option>
              <option value="cost-low">Budget: Low to High</option>
              <option value="cost-high">Budget: High to Low</option>
              <option value="duration">Ideal Duration</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="space-y-4 mb-8">
        
        {/* Search input + Budget + Climate filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Indian destinations, states, or activities (e.g. Varanasi, Hampi, Munnar, Meghalaya, Jaipur, Ooty)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#167D9A]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Budget filter select */}
          <div className="w-full sm:w-56">
            <select
              value={budgetTier}
              onChange={(e) => setBudgetTier(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 focus:outline-none"
            >
              <option value="all">All Budget Ranges</option>
              <option value="under-15k">Budget (&le; ₹15,000)</option>
              <option value="15k-30k">Moderate (₹15k - ₹30k)</option>
              <option value="30k-70k">Expedition (₹30k - ₹70k)</option>
              <option value="luxury">Luxury (₹70k+)</option>
            </select>
          </div>

          {/* Climate filter select */}
          <div className="w-full sm:w-52">
            <select
              value={selectedClimate}
              onChange={(e) => setSelectedClimate(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 focus:outline-none"
            >
              <option value="all">All Climates</option>
              <option value="cool-misty">Cool & Misty (Hills)</option>
              <option value="tropical">Tropical & Sunny</option>
              <option value="alpine">Alpine & Snow Mountain</option>
              <option value="mediterranean">Mediterranean</option>
              <option value="temperate">Temperate</option>
            </select>
          </div>
        </div>

        {/* Region Filter Segmented Tabs */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
            Filter by Region
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {[
              { id: 'all', label: 'All Destinations' },
              { id: 'india', label: 'All Across India' },
              { id: 'South India', label: 'South India (AP, Karnataka, Kerala, TN)' },
              { id: 'North India', label: 'North India & Himalayas' },
              { id: 'North-East India', label: 'North-East India' },
              { id: 'Islands', label: 'Islands & Beaches' },
              { id: 'International', label: 'Global Benchmarks' }
            ].map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
                  selectedRegion === reg.id
                    ? 'bg-[#102A43] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Segmented Tabs */}
        <div className="space-y-1.5 pt-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
            Filter by Activity & Theme
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {[
              { id: 'all', label: 'All Themes' },
              { id: 'nature', label: 'Nature & Hills' },
              { id: 'cultural', label: 'Cultural & Sacred Heritage' },
              { id: 'adventure', label: 'Adventure & Treks' },
              { id: 'relaxation', label: 'Relaxation & Backwaters' },
              { id: 'coastal', label: 'Coastal & Coral Reefs' },
              { id: 'wildlife', label: 'Wildlife & Safari' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[#167D9A] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Destinations View: Google Maps or Cards Grid */}
      {viewMode === 'map' ? (
        <div className="space-y-4">
          <GoogleMapsExplorer
            destinations={filteredDestinations}
            selectedDestination={mapTargetDestination}
            onSelectDestination={(dest) => setSelectedDestination(dest)}
            onPlanTrip={onPlanTrip}
            savedIds={savedIds}
            onToggleSave={onToggleSave}
          />
        </div>
      ) : filteredDestinations.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <Compass className="w-8 h-8 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 mb-1">
            No destinations match your filters
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Try adjusting your search criteria, widening the budget tier, or resetting regional selections.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedRegion('all');
              setSelectedCategory('all');
              setSelectedClimate('all');
              setBudgetTier('all');
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#102A43] rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((dest) => {
            const isSaved = savedIds.includes(dest.id);

            return (
              <div
                key={dest.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col group"
              >
                {/* Destination Image Slot */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={dest.imageUrl}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />

                  {/* Map Pin Shortcut Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMapTargetDestination(dest);
                      setViewMode('map');
                      window.scrollTo({ top: 180, behavior: 'smooth' });
                    }}
                    className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-black/60 hover:bg-black/85 text-white text-[11px] font-semibold flex items-center gap-1 backdrop-blur-xs transition-colors shadow-xs cursor-pointer"
                    title="View on Google Map"
                  >
                    <MapIcon className="w-3 h-3 text-[#F4B860]" />
                    <span>Map Pin</span>
                  </button>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => onToggleSave(dest.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                    title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${isSaved ? 'fill-amber-500 text-amber-500' : 'text-slate-600'}`}
                    />
                  </button>

                  {/* Location & Region Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-[11px] font-semibold text-amber-300 drop-shadow-xs">
                      {dest.stateOrRegion}, {dest.country}
                    </div>
                    <h3 className="text-lg font-bold tracking-tight text-white drop-shadow-sm truncate">
                      {dest.name}
                    </h3>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                  
                  {/* Clean unboxed metadata with separators (Anti-Slop rule) */}
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="capitalize font-medium text-slate-700">{dest.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize">{dest.climate.replace('-', ' ')}</span>
                    <span aria-hidden="true">·</span>
                    <span>Best: {dest.bestSeason}</span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {dest.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-1 text-xs text-slate-600">
                    {dest.highlights.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 truncate">
                        <span className="text-[#167D9A] font-bold">›</span>
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Metric Strip (Tabular numbers) */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                        Est. Budget
                      </span>
                      <span className="text-sm font-extrabold text-[#102A43] tabular-nums">
                        ₹{dest.estimatedCostInr.toLocaleString()}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                        Ideal Duration
                      </span>
                      <span className="text-sm font-bold text-slate-700 tabular-nums">
                        {dest.idealDurationDays} Days
                      </span>
                    </div>
                  </div>

                  {/* Functional Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => setSelectedDestination(dest)}
                      className="py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>Details & Plan</span>
                    </button>

                    <button
                      onClick={() => onPlanTrip(dest)}
                      className="py-2 px-3 text-xs font-semibold text-white bg-[#102A43] hover:bg-[#0B1D2E] rounded-lg transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
                    >
                      <span>Plan Trip</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#F4B860]" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal for Details */}
      <DestinationDetailModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        isSaved={selectedDestination ? savedIds.includes(selectedDestination.id) : false}
        onToggleSave={onToggleSave}
        onPlanTrip={onPlanTrip}
      />

    </section>
  );
};
