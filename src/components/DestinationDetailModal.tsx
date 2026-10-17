import React from 'react';
import { X, Calendar, Wallet, MapPin, Clock, Compass, ShieldCheck, Check, Bookmark, ArrowRight, Map as MapIcon } from 'lucide-react';
import { Destination } from '../types/travel';
import { DestinationMiniMap } from './DestinationMiniMap';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onPlanTrip: (destination: Destination) => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  onClose,
  isSaved,
  onToggleSave,
  onPlanTrip
}) => {
  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-200 relative my-8 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Hero Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-800">
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 mb-1">
              <span>{destination.stateOrRegion}</span>
              <span aria-hidden="true">·</span>
              <span>{destination.country}</span>
              <span aria-hidden="true">·</span>
              <span className="capitalize">{destination.category}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {destination.name}
            </h2>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[calc(85vh-18rem)] overflow-y-auto">
          
          {/* Key Facts Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 px-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-800">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                Est. Baseline Budget
              </span>
              <span className="text-base font-bold text-[#102A43] tabular-nums">
                ₹{destination.estimatedCostInr.toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-400 block tabular-nums">
                (~${destination.estimatedCostUsd} USD)
              </span>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                Ideal Duration
              </span>
              <span className="text-base font-bold text-[#102A43] tabular-nums">
                {destination.idealDurationDays} Days
              </span>
              <span className="text-[11px] text-slate-400 block">
                Standard pace
              </span>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                Best Climate
              </span>
              <span className="text-base font-bold text-[#102A43] capitalize">
                {destination.climate.replace('-', ' ')}
              </span>
              <span className="text-[11px] text-slate-400 block">
                {destination.bestSeason}
              </span>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                Safety & Quality
              </span>
              <span className="text-base font-bold text-emerald-700 tabular-nums flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 inline" />
                {destination.safetyRating} / 5.0
              </span>
              <span className="text-[11px] text-slate-400 block tabular-nums">
                {destination.savesCount} saves
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono">
              Overview & Character
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {destination.description}
            </p>
          </div>

          {/* Transit from Origin */}
          {destination.transitOptionsFromVijayawada && (
            <div className="p-3.5 bg-sky-50/70 border border-sky-100 rounded-xl text-xs text-sky-950 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#167D9A] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#102A43]">
                  Transit Corridor from Vijayawada ({destination.distanceFromVijayawadaKm} km):
                </span>
                <span className="ml-1 text-slate-700">
                  {destination.transitOptionsFromVijayawada}
                </span>
              </div>
            </div>
          )}

          {/* Interactive Google Map Location */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
                <MapIcon className="w-3.5 h-3.5 text-[#167D9A]" />
                <span>Geographic Position & Google Maps</span>
              </h4>
              <span className="text-[11px] font-mono text-slate-500">
                {destination.coordinates.lat.toFixed(3)}°N, {destination.coordinates.lng.toFixed(3)}°E
              </span>
            </div>
            <DestinationMiniMap destination={destination} height="220px" zoom={10} />
          </div>

          {/* Highlights */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono">
              Signature Experiences
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {destination.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-700">
                  <Check className="w-3.5 h-3.5 text-[#167D9A] shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Estimated Expense Breakdown */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono">
              Estimated Expense Distribution (Per Person, Baseline Trip)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block">Accommodation</span>
                <span className="font-bold text-slate-900 tabular-nums text-sm">
                  ₹{destination.expensesBreakdown.accommodation.toLocaleString()}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block">Transport / Fuel</span>
                <span className="font-bold text-slate-900 tabular-nums text-sm">
                  ₹{destination.expensesBreakdown.transport.toLocaleString()}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block">Food & Dining</span>
                <span className="font-bold text-slate-900 tabular-nums text-sm">
                  ₹{destination.expensesBreakdown.food.toLocaleString()}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block">Activities & Entry</span>
                <span className="font-bold text-slate-900 tabular-nums text-sm">
                  ₹{destination.expensesBreakdown.activities.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Sample Day-wise Itinerary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 font-mono">
              Sample {destination.idealDurationDays}-Day Curated Itinerary
            </h4>
            <div className="space-y-3">
              {destination.sampleItinerary.map((day) => (
                <div key={day.day} className="p-3.5 rounded-xl border border-slate-200 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#102A43]">
                      Day {day.day}: {day.title}
                    </span>
                    <span className="text-xs font-mono text-slate-500 tabular-nums">
                      ~₹{day.estCostInr.toLocaleString()}
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div>
                      <span className="font-semibold text-slate-800">Morning:</span> {day.morning}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800">Afternoon:</span> {day.afternoon}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800">Evening:</span> {day.evening}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onToggleSave(destination.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              isSaved
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-600 text-amber-600' : 'text-slate-500'}`} />
            <span>{isSaved ? 'Saved in Wishlist' : 'Save to Wishlist'}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onPlanTrip(destination);
                onClose();
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#102A43] hover:bg-[#0B1D2E] shadow-sm hover:shadow transition-all"
            >
              <span>Build Custom Itinerary</span>
              <ArrowRight className="w-4 h-4 text-[#F4B860]" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
