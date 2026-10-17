import React, { useState, useEffect } from 'react';
import { X, Bookmark, Trash2, Calendar, Wallet, MapPin, ArrowUpRight, Compass, Sparkles } from 'lucide-react';
import { Destination, PlannedTrip } from '../types/travel';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { getPlannedTrips, deletePlannedTrip } from '../services/tripStorage';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectDestination: (dest: Destination) => void;
  onPlanTripFromDestination: (dest: Destination) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  savedIds,
  onToggleSave,
  onSelectDestination,
  onPlanTripFromDestination
}) => {
  const [activeTab, setActiveTab] = useState<'wishlist' | 'trips'>('wishlist');
  const [plannedTrips, setPlannedTrips] = useState<PlannedTrip[]>([]);

  useEffect(() => {
    if (isOpen) {
      setPlannedTrips(getPlannedTrips());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const savedDestinations = DESTINATIONS_DATA.filter(d => savedIds.includes(d.id));

  const handleDeleteTrip = (tripId: string) => {
    const updated = deletePlannedTrip(tripId);
    setPlannedTrips(updated);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-200 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#167D9A] mb-1">
              <span>Personal Traveler Space</span>
              <span aria-hidden="true">·</span>
              <span>VoyageIQ Vault</span>
            </div>
            <h2 className="text-xl font-extrabold text-[#102A43] tracking-tight">
              My Saved Wishlist & Planned Expeditions
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 px-6 pt-3 bg-slate-50 gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`pb-3 transition-colors flex items-center gap-2 ${
              activeTab === 'wishlist'
                ? 'text-[#102A43] border-b-2 border-[#167D9A]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Bookmark className="w-4 h-4 text-[#167D9A]" />
            <span>Wishlist Destinations ({savedDestinations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('trips')}
            className={`pb-3 transition-colors flex items-center gap-2 ${
              activeTab === 'trips'
                ? 'text-[#102A43] border-b-2 border-[#167D9A]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#167D9A]" />
            <span>Planned Trips ({plannedTrips.length})</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          
          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div>
              {savedDestinations.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">
                  <Bookmark className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  Your wishlist is empty. Browse destinations or run recommendations to save trips!
                </div>
              ) : (
                <div className="space-y-3">
                  {savedDestinations.map((dest) => (
                    <div
                      key={dest.id}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={dest.imageUrl}
                          alt={dest.name}
                          className="w-14 h-14 rounded-lg object-cover shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <span className="text-[11px] font-semibold text-slate-400 block">
                            {dest.stateOrRegion}, {dest.country}
                          </span>
                          <h4 className="font-bold text-[#102A43] text-sm">
                            {dest.name}
                          </h4>
                          <span className="text-slate-500 font-mono tabular-nums">
                            ₹{dest.estimatedCostInr.toLocaleString()} · {dest.idealDurationDays} Days
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => {
                            onPlanTripFromDestination(dest);
                            onClose();
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#102A43] hover:bg-[#0B1D2E] text-white font-semibold transition-colors flex items-center gap-1"
                        >
                          <span>Plan Trip</span>
                          <ArrowUpRight className="w-3 h-3 text-[#F4B860]" />
                        </button>
                        <button
                          onClick={() => onToggleSave(dest.id)}
                          className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-400 hover:text-red-600 transition-colors"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Planned Trips Tab */}
          {activeTab === 'trips' && (
            <div>
              {plannedTrips.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">
                  <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  No planned trips yet. Use the Trip Planner to create and save itineraries.
                </div>
              ) : (
                <div className="space-y-4">
                  {plannedTrips.map((trip) => (
                    <div
                      key={trip.id}
                      className="p-4 rounded-xl border border-slate-200 bg-white space-y-3 text-xs"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#167D9A] block font-mono">
                            {trip.startDate} to {trip.endDate} ({trip.travelersCount} Travelers)
                          </span>
                          <h4 className="text-base font-bold text-[#102A43]">
                            {trip.destinationName}
                          </h4>
                        </div>

                        <button
                          onClick={() => handleDeleteTrip(trip.id)}
                          className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                          title="Delete trip"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Day list preview */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        {trip.days.map((d) => (
                          <div key={d.dayNumber} className="text-slate-600">
                            <span className="font-bold text-slate-800">Day {d.dayNumber}:</span> {d.title} ({d.activities.length} activities)
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-slate-100 font-mono">
                        <span className="text-slate-500">Est. Budget:</span>
                        <span className="font-bold text-[#102A43] tabular-nums text-sm">
                          ₹{trip.actualEstimatedBudgetInr.toLocaleString()} / ₹{trip.targetBudgetInr.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
