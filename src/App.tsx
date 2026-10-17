/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DestinationExplorer } from './components/DestinationExplorer';
import { SmartTripPlanner } from './components/SmartTripPlanner';
import { MyJourneyView } from './components/MyJourneyView';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { WishlistView } from './components/WishlistView';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { AboutModal } from './components/AboutModal';
import { Footer } from './components/Footer';

import { Destination, PlannedTrip } from './types/travel';
import { DESTINATIONS_DATA } from './data/destinationsData';
import {
  getSavedDestinationIds,
  toggleSaveDestination,
  getPlannedTrips
} from './services/tripStorage';
import { APIProvider } from '@vis.gl/react-google-maps';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [destinations, setDestinations] = useState<Destination[]>(DESTINATIONS_DATA);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [tripsCount, setTripsCount] = useState<number>(0);
  
  // Active states for planner and journey
  const [plannerDestination, setPlannerDestination] = useState<Destination | null>(null);
  const [plannerStartingLocation, setPlannerStartingLocation] = useState<string>('Vijayawada');
  const [activeJourneyTrip, setActiveJourneyTrip] = useState<PlannedTrip | null>(null);

  // Selected destination for Detail Modal
  const [selectedModalDestination, setSelectedModalDestination] = useState<Destination | null>(null);

  // Quota & About Modal
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  useEffect(() => {
    const handleQuota = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  useEffect(() => {
    setSavedIds(getSavedDestinationIds());
    const existingTrips = getPlannedTrips();
    setTripsCount(existingTrips.length);
    if (existingTrips.length > 0 && !activeJourneyTrip) {
      setActiveJourneyTrip(existingTrips[0]);
    }

    // Attempt backend API sync if available
    fetch('/api/destinations')
      .then(res => res.json())
      .then(json => {
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setDestinations(json.data);
        }
      })
      .catch(err => {
        console.warn('Using client-side destinations catalog fallback:', err);
      });
  }, []);

  const handleToggleSave = (id: string) => {
    const updated = toggleSaveDestination(id);
    setSavedIds(updated);
  };

  const handleStartPlanTrip = (destination?: Destination | null, startingOrigin?: string) => {
    setPlannerDestination(destination || null);
    if (startingOrigin) {
      setPlannerStartingLocation(startingOrigin);
    }
    setActiveTab('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTripGeneratedAndSaved = (savedTrip: PlannedTrip) => {
    setActiveJourneyTrip(savedTrip);
    const existingTrips = getPlannedTrips();
    setTripsCount(existingTrips.length);
    setActiveTab('journey');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <APIProvider apiKey={mapsApiKey} libraries={['places', 'marker', 'routes']}>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
        
        {/* Tier 1 In-App Quota Defense Banner */}
        {quotaExceeded && (
          <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
            <span>
              Google Maps Platform quota reached. If you are the app owner, visit{' '}
              <a
                href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold text-amber-950 hover:text-amber-800"
              >
                maps developer site
              </a>{' '}
              for instructions to update your account.
            </span>
          </div>
        )}

        {/* Global Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          savedCount={savedIds.length}
          tripsCount={tripsCount}
          onOpenAbout={() => setIsAboutOpen(true)}
        />

        {/* Main View Router */}
        <main className="flex-1">
          {/* 1. HOME: Immersive travel discovery & cinematic hero */}
          {activeTab === 'home' && (
            <HeroSection
              onStartPlanTrip={handleStartPlanTrip}
              onExploreDestinations={() => {
                setActiveTab('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectDestination={(dest) => setSelectedModalDestination(dest)}
              onViewOnMap={(dest) => {
                setActiveTab('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {/* 2. EXPLORE INDIA: Interactive Google Map + searchable place cards */}
          {(activeTab === 'explore' || activeTab === 'destinations') && (
            <DestinationExplorer
              destinations={destinations}
              savedIds={savedIds}
              onToggleSave={handleToggleSave}
              onPlanTrip={(dest) => handleStartPlanTrip(dest)}
            />
          )}

          {/* 3. SMART TRIP PLANNER: Guided 2-step trip creation */}
          {(activeTab === 'planner' || activeTab === 'recommendations') && (
            <SmartTripPlanner
              initialDestination={plannerDestination}
              initialStartingLocation={plannerStartingLocation}
              onTripGeneratedAndSaved={handleTripGeneratedAndSaved}
              onExploreOnMap={(dest) => {
                setActiveTab('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {/* 4. MY JOURNEY: Saved itineraries & editable visual timeline */}
          {activeTab === 'journey' && (
            <MyJourneyView
              initialTrip={activeJourneyTrip}
              onExploreDestinations={() => {
                setActiveTab('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenPlanner={() => handleStartPlanTrip(null)}
            />
          )}

          {/* 5. TRAVEL INSIGHTS: Data analytics, trends & behavioral indices */}
          {(activeTab === 'insights' || activeTab === 'analytics') && (
            <AnalyticsDashboard />
          )}

          {/* 6. MY WISHLIST: Saved places & bucket lists */}
          {activeTab === 'wishlist' && (
            <WishlistView
              savedIds={savedIds}
              onToggleSave={handleToggleSave}
              onSelectDestination={(dest) => setSelectedModalDestination(dest)}
              onPlanTrip={(dest) => handleStartPlanTrip(dest)}
              onExploreDestinations={() => {
                setActiveTab('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}
        </main>

        {/* Global Destination Detail Modal (with Interactive Google MiniMap) */}
        <DestinationDetailModal
          destination={selectedModalDestination}
          onClose={() => setSelectedModalDestination(null)}
          isSaved={selectedModalDestination ? savedIds.includes(selectedModalDestination.id) : false}
          onToggleSave={handleToggleSave}
          onPlanTrip={(dest) => {
            setSelectedModalDestination(null);
            handleStartPlanTrip(dest);
          }}
        />

        {/* Architecture & Engineering Spec Modal */}
        <AboutModal
          isOpen={isAboutOpen}
          onClose={() => setIsAboutOpen(false)}
        />

        {/* Footer */}
        <Footer
          onSelectTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenAbout={() => setIsAboutOpen(true)}
        />

      </div>
    </APIProvider>
  );
}
