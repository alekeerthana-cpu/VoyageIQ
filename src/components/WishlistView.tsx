import React from 'react';
import { Bookmark, Compass, MapPin, Wallet, ArrowUpRight, Trash2, Eye, Map as MapIcon, Sparkles } from 'lucide-react';
import { Destination } from '../types/travel';
import { DESTINATIONS_DATA } from '../data/destinationsData';

interface WishlistViewProps {
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectDestination: (dest: Destination) => void;
  onPlanTrip: (dest: Destination) => void;
  onExploreDestinations: () => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({
  savedIds,
  onToggleSave,
  onSelectDestination,
  onPlanTrip,
  onExploreDestinations
}) => {
  const savedDestinations = DESTINATIONS_DATA.filter(d => savedIds.includes(d.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#167D9A] font-mono uppercase tracking-wider mb-1">
            <span>Personal Collection</span>
            <span aria-hidden="true">·</span>
            <span>{savedDestinations.length} Saved Destinations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] tracking-tight">
            My Travel Wishlist & Collections
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Curate your bucket list across India and launch smart custom itineraries with one click.
          </p>
        </div>

        <button
          onClick={onExploreDestinations}
          className="px-4 py-2.5 rounded-xl bg-[#102A43] hover:bg-[#167D9A] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Compass className="w-4 h-4 text-[#F4B860]" />
          <span>Explore More Places</span>
        </button>
      </div>

      {/* Content */}
      {savedDestinations.length === 0 ? (
        <div className="p-16 text-center bg-white rounded-2xl border border-slate-200 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <Bookmark className="w-8 h-8 text-amber-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Your Wishlist is Empty
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Discover breathtaking places across India on our interactive map or destination catalog, and click the bookmark icon to save them here.
          </p>
          <button
            onClick={onExploreDestinations}
            className="px-6 py-3 text-xs font-bold text-white bg-[#102A43] hover:bg-[#167D9A] rounded-xl shadow-md transition-all cursor-pointer"
          >
            Start Exploring India
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedDestinations.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <button
                  onClick={() => onToggleSave(dest.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-rose-600 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] text-amber-300 font-semibold uppercase tracking-wider block">
                    {dest.stateOrRegion}, {dest.country}
                  </span>
                  <h3 className="text-base font-bold truncate">
                    {dest.name}
                  </h3>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="capitalize font-semibold text-slate-700">{dest.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{dest.idealDurationDays} Days</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-extrabold text-[#102A43] tabular-nums">
                    ₹{dest.estimatedCostInr.toLocaleString()}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {dest.description}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => onSelectDestination(dest)}
                    className="py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg text-center transition-colors cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onPlanTrip(dest)}
                    className="py-2 px-3 text-xs font-semibold text-white bg-[#102A43] hover:bg-[#167D9A] rounded-lg text-center transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#F4B860]" />
                    <span>Plan Trip</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
