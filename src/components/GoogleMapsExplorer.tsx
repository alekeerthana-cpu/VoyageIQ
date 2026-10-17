import React, { useState, useEffect } from 'react';
import { Map, AdvancedMarker, Pin, InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { Destination, DestinationCategory } from '../types/travel';
import { Eye, ArrowUpRight, Bookmark, Compass, MapPin } from 'lucide-react';

interface GoogleMapsExplorerProps {
  destinations: Destination[];
  selectedDestination: Destination | null;
  onSelectDestination: (dest: Destination) => void;
  onPlanTrip: (dest: Destination) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

// Category palette for modern Pin elements
const CATEGORY_COLORS: Record<string, string> = {
  nature: '#059669', // Emerald
  cultural: '#4F46E5', // Indigo
  adventure: '#D97706', // Amber
  coastal: '#0284C7', // Sky Blue
  relaxation: '#0D9488', // Teal
  wildlife: '#16A34A', // Green
  photography: '#7C3AED', // Violet
};

function getCategoryColor(category: DestinationCategory | string): string {
  return CATEGORY_COLORS[category] || '#167D9A';
}

// Region camera focus coordinates
const REGION_CENTERS: Record<string, { lat: number; lng: number; zoom: number }> = {
  all: { lat: 21.7679, lng: 78.8718, zoom: 5 },
  south: { lat: 13.0827, lng: 78.5000, zoom: 6 },
  north: { lat: 29.8000, lng: 76.8000, zoom: 6 },
  west: { lat: 18.5204, lng: 74.0000, zoom: 6 },
  east: { lat: 24.5000, lng: 88.0000, zoom: 6 },
  islands: { lat: 11.9840, lng: 92.9510, zoom: 8 },
  global: { lat: 25.0000, lng: 40.0000, zoom: 3 },
};

// Internal map controller hook to animate camera
function MapCameraSynchronizer({
  activeDestination,
  targetRegion,
}: {
  activeDestination: Destination | null;
  targetRegion: string | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    if (activeDestination && activeDestination.coordinates) {
      map.panTo(activeDestination.coordinates);
      map.setZoom(8);
    } else if (targetRegion && REGION_CENTERS[targetRegion]) {
      const conf = REGION_CENTERS[targetRegion];
      map.panTo({ lat: conf.lat, lng: conf.lng });
      map.setZoom(conf.zoom);
    }
  }, [map, activeDestination, targetRegion]);

  return null;
}

export const GoogleMapsExplorer: React.FC<GoogleMapsExplorerProps> = ({
  destinations,
  selectedDestination,
  onSelectDestination,
  onPlanTrip,
  savedIds,
  onToggleSave,
}) => {
  const [activeMarker, setActiveMarker] = useState<Destination | null>(selectedDestination);
  const [activeRegion, setActiveRegion] = useState<string>('all');
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'hybrid' | 'terrain'>('roadmap');

  useEffect(() => {
    if (selectedDestination) {
      setActiveMarker(selectedDestination);
    }
  }, [selectedDestination]);

  const handleRegionClick = (regionKey: string) => {
    setActiveRegion(regionKey);
    setActiveMarker(null);
  };

  return (
    <div className="relative w-full h-[620px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 flex flex-col">
      {/* Top Map Action Bar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        
        {/* Region Quick Navigation Pills */}
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-xl p-1.5 shadow-md border border-slate-200/80 flex items-center gap-1 overflow-x-auto max-w-full scrollbar-none">
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 px-2 uppercase tracking-wider font-mono">
            <Compass className="w-3.5 h-3.5 text-[#167D9A]" />
            <span className="hidden sm:inline">Regions:</span>
          </div>

          {[
            { id: 'all', label: 'All India & World' },
            { id: 'south', label: 'South India' },
            { id: 'north', label: 'North & Himalayas' },
            { id: 'west', label: 'West & Goa' },
            { id: 'east', label: 'East & NE' },
            { id: 'islands', label: 'Islands' },
            { id: 'global', label: 'Global' },
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => handleRegionClick(r.id)}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeRegion === r.id
                  ? 'bg-[#102A43] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Map Type Switcher & Counter */}
        <div className="pointer-events-auto flex items-center gap-2">
          <div className="bg-white/95 backdrop-blur-md rounded-xl px-3 py-1.5 shadow-md border border-slate-200/80 text-xs font-bold text-[#102A43] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{destinations.length} Places Plotted</span>
          </div>

          <div className="bg-white/95 backdrop-blur-md rounded-xl p-1 shadow-md border border-slate-200/80 flex items-center gap-1 text-xs">
            <button
              onClick={() => setMapType('roadmap')}
              className={`px-2 py-1 rounded-lg font-medium ${
                mapType === 'roadmap' ? 'bg-[#167D9A] text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Map
            </button>
            <button
              onClick={() => setMapType('satellite')}
              className={`px-2 py-1 rounded-lg font-medium ${
                mapType === 'satellite' ? 'bg-[#167D9A] text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Satellite
            </button>
            <button
              onClick={() => setMapType('terrain')}
              className={`px-2 py-1 rounded-lg font-medium ${
                mapType === 'terrain' ? 'bg-[#167D9A] text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Terrain
            </button>
          </div>
        </div>

      </div>

      {/* Main Google Maps Component */}
      <div className="flex-1 w-full h-full">
        <Map
          mapId="DEMO_MAP_ID"
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          style={{ width: '100%', height: '100%' }}
          defaultCenter={{ lat: 21.7679, lng: 78.8718 }}
          defaultZoom={5}
          mapTypeId={mapType}
          gestureHandling="greedy"
          disableDefaultUI={false}
        >
          {/* Synchronizer for interactive zooming/panning */}
          <MapCameraSynchronizer
            activeDestination={selectedDestination}
            targetRegion={activeRegion}
          />

          {/* Interactive Advanced Markers */}
          {destinations.map((dest) => {
            const isSelected = activeMarker?.id === dest.id;
            const pinColor = getCategoryColor(dest.category);

            return (
              <AdvancedMarker
                key={dest.id}
                position={{ lat: dest.coordinates.lat, lng: dest.coordinates.lng }}
                title={dest.name}
                onClick={() => setActiveMarker(dest)}
              >
                <Pin
                  background={pinColor}
                  glyphColor="#FFFFFF"
                  borderColor="#0F172A"
                  scale={isSelected ? 1.25 : 1.0}
                />
              </AdvancedMarker>
            );
          })}

          {/* Detailed InfoWindow on Pin Click */}
          {activeMarker && (
            <InfoWindow
              position={{
                lat: activeMarker.coordinates.lat,
                lng: activeMarker.coordinates.lng,
              }}
              onCloseClick={() => setActiveMarker(null)}
              headerContent={
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#102A43] pr-4">
                  <MapPin className="w-3.5 h-3.5 text-[#167D9A]" />
                  <span className="truncate max-w-[200px]">{activeMarker.name}</span>
                </div>
              }
            >
              <div className="w-64 pt-1 space-y-2.5 text-slate-800">
                {/* Thumbnail Image */}
                <div className="relative h-28 w-full rounded-lg overflow-hidden bg-slate-100">
                  <img
                    src={activeMarker.imageUrl}
                    alt={activeMarker.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-1.5 left-2 right-2 text-white text-[11px] font-semibold drop-shadow-xs">
                    {activeMarker.stateOrRegion}, {activeMarker.country}
                  </div>
                </div>

                {/* Badges / Metrics */}
                <div className="flex items-center justify-between text-[11px] text-slate-600">
                  <span className="capitalize font-semibold text-[#167D9A]">
                    {activeMarker.category}
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    {activeMarker.idealDurationDays} Days
                  </span>
                  <span className="font-bold text-[#102A43] tabular-nums">
                    ₹{activeMarker.estimatedCostInr.toLocaleString()}
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                  {activeMarker.description}
                </p>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-slate-100">
                  <button
                    onClick={() => {
                      onSelectDestination(activeMarker);
                    }}
                    className="py-1.5 px-2 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3 h-3 text-slate-500" />
                    <span>Details</span>
                  </button>

                  <button
                    onClick={() => {
                      onPlanTrip(activeMarker);
                    }}
                    className="py-1.5 px-2 text-[11px] font-semibold text-white bg-[#102A43] hover:bg-[#0B1D2E] rounded-md transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Plan Trip</span>
                    <ArrowUpRight className="w-3 h-3 text-[#F4B860]" />
                  </button>
                </div>

                {/* Wishlist toggle */}
                <button
                  onClick={() => onToggleSave(activeMarker.id)}
                  className="w-full py-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Bookmark
                    className={`w-3 h-3 ${
                      savedIds.includes(activeMarker.id)
                        ? 'fill-amber-500 text-amber-500'
                        : 'text-slate-400'
                    }`}
                  />
                  <span>
                    {savedIds.includes(activeMarker.id)
                      ? 'Saved in Wishlist'
                      : 'Add to Wishlist'}
                  </span>
                </button>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>

      {/* Bottom Map Category Legend Strip */}
      <div className="bg-white/95 backdrop-blur-md px-4 py-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-none py-0.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono shrink-0">
            Legend:
          </span>
          {[
            { label: 'Nature', color: CATEGORY_COLORS.nature },
            { label: 'Cultural & Sacred', color: CATEGORY_COLORS.cultural },
            { label: 'Adventure', color: CATEGORY_COLORS.adventure },
            { label: 'Coastal', color: CATEGORY_COLORS.coastal },
            { label: 'Relaxation', color: CATEGORY_COLORS.relaxation },
            { label: 'Wildlife', color: CATEGORY_COLORS.wildlife },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5 shrink-0 text-slate-700 font-medium">
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[11px]">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="text-[11px] text-slate-500 font-medium shrink-0">
          Click any pin for route, budget, & day itinerary
        </div>
      </div>
    </div>
  );
};
