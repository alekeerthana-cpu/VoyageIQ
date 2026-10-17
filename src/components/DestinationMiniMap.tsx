import React from 'react';
import { Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { Destination } from '../types/travel';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';

interface DestinationMiniMapProps {
  destination: Destination;
  height?: string;
  zoom?: number;
}

export const DestinationMiniMap: React.FC<DestinationMiniMapProps> = ({
  destination,
  height = '240px',
  zoom = 11,
}) => {
  const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${destination.name}, ${destination.stateOrRegion}, ${destination.country}`
  )}`;

  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex flex-col">
      <div className="relative w-full" style={{ height }}>
        <Map
          mapId="DEMO_MAP_ID"
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          style={{ width: '100%', height: '100%' }}
          defaultCenter={{ lat: destination.coordinates.lat, lng: destination.coordinates.lng }}
          defaultZoom={zoom}
          gestureHandling="cooperative"
          disableDefaultUI={false}
        >
          <AdvancedMarker
            position={{ lat: destination.coordinates.lat, lng: destination.coordinates.lng }}
            title={destination.name}
          >
            <Pin
              background="#167D9A"
              glyphColor="#FFFFFF"
              borderColor="#0B1D2E"
              scale={1.15}
            />
          </AdvancedMarker>
        </Map>

        {/* Floating Coordinates badge */}
        <div className="absolute bottom-2 left-2 z-10 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-mono text-slate-700 font-bold border border-slate-200 shadow-xs flex items-center gap-1.5">
          <MapPin className="w-3 h-3 text-[#167D9A]" />
          <span>
            {destination.coordinates.lat.toFixed(4)}° N, {destination.coordinates.lng.toFixed(4)}° E
          </span>
        </div>
      </div>

      {/* Footer bar with external navigation */}
      <div className="px-3 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
        <div className="text-[11px] text-slate-500 font-medium">
          {destination.stateOrRegion}, {destination.country}
        </div>

        <a
          href={gmapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-semibold text-[#167D9A] hover:underline flex items-center gap-1"
        >
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
