import { PlannedTrip, TravelerPreferences } from '../types/travel';

const SAVED_DESTINATIONS_KEY = 'voyageiq_saved_destinations';
const PLANNED_TRIPS_KEY = 'voyageiq_planned_trips';
const USER_PREFERENCES_KEY = 'voyageiq_user_preferences';

export const DEFAULT_PREFERENCES: TravelerPreferences = {
  startingLocation: 'Vijayawada',
  budgetInr: 15000,
  durationDays: 3,
  interests: ['nature', 'adventure', 'photography'],
  travelStyle: 'budget-friendly',
  pace: 'balanced',
  preferredClimate: 'all'
};

const DEFAULT_TRIP: PlannedTrip = {
  id: 'trip-araku-default',
  destinationId: 'araku-valley',
  destinationName: 'Araku Valley & Borra Caves',
  destinationCountry: 'India',
  destinationImage: '/src/assets/images/dest_bali_retreat_1792213545063.jpg',
  startDate: '2026-11-14',
  endDate: '2026-11-16',
  travelersCount: 2,
  targetBudgetInr: 15000,
  actualEstimatedBudgetInr: 12500,
  travelStyle: 'budget-friendly',
  notes: 'Camera gear, comfortable hiking boots for Borra caves and Katiki waterfall trail, coffee estate reservation.',
  days: [
    {
      dayNumber: 1,
      title: 'Arrival & Coffee Hill Terrains',
      activities: [
        { id: 'a1', timeOfDay: 'Morning', text: 'Vistadome train scenic transit through tunnels', costInr: 1400 },
        { id: 'a2', timeOfDay: 'Afternoon', text: 'Tribal museum & Padmapuram garden walk', costInr: 600 },
        { id: 'a3', timeOfDay: 'Evening', text: 'Organic coffee plantation estate walk & tasting', costInr: 800 }
      ]
    },
    {
      dayNumber: 2,
      title: 'Borra Caves & Katiki Waterfalls',
      activities: [
        { id: 'a4', timeOfDay: 'Morning', text: 'Limestone Borra Caves exploration with guide', costInr: 1200 },
        { id: 'a5', timeOfDay: 'Afternoon', text: '4x4 jeep safari & Katiki waterfall forest hike', costInr: 1500 },
        { id: 'a6', timeOfDay: 'Evening', text: 'Galikonda viewpoint sunset photography', costInr: 300 }
      ]
    },
    {
      dayNumber: 3,
      title: 'Chaparai Streams & Local Flavors',
      activities: [
        { id: 'a7', timeOfDay: 'Morning', text: 'Chaparai cascade stream walk & fresh air', costInr: 400 },
        { id: 'a8', timeOfDay: 'Afternoon', text: 'Traditional bamboo chicken lunch tasting', costInr: 1100 },
        { id: 'a9', timeOfDay: 'Evening', text: 'Local tribal handicraft shopping & return transit', costInr: 900 }
      ]
    }
  ],
  expensesBreakdown: {
    accommodation: 4500,
    transport: 3500,
    food: 2500,
    activities: 2000
  },
  createdAt: '2026-10-15T10:00:00.000Z'
};

export function getSavedDestinationIds(): string[] {
  try {
    const raw = localStorage.getItem(SAVED_DESTINATIONS_KEY);
    if (!raw) {
      return ['araku-valley', 'lambasingi'];
    }
    return JSON.parse(raw);
  } catch {
    return ['araku-valley', 'lambasingi'];
  }
}

export function toggleSaveDestination(id: string): string[] {
  const current = getSavedDestinationIds();
  let updated: string[];
  if (current.includes(id)) {
    updated = current.filter(item => item !== id);
  } else {
    updated = [...current, id];
  }
  localStorage.setItem(SAVED_DESTINATIONS_KEY, JSON.stringify(updated));
  return updated;
}

export function getPlannedTrips(): PlannedTrip[] {
  try {
    const raw = localStorage.getItem(PLANNED_TRIPS_KEY);
    if (!raw) {
      localStorage.setItem(PLANNED_TRIPS_KEY, JSON.stringify([DEFAULT_TRIP]));
      return [DEFAULT_TRIP];
    }
    return JSON.parse(raw);
  } catch {
    return [DEFAULT_TRIP];
  }
}

export function savePlannedTrip(trip: PlannedTrip): PlannedTrip[] {
  const trips = getPlannedTrips();
  const index = trips.findIndex(t => t.id === trip.id);
  let updated: PlannedTrip[];
  if (index >= 0) {
    updated = [...trips];
    updated[index] = trip;
  } else {
    updated = [trip, ...trips];
  }
  localStorage.setItem(PLANNED_TRIPS_KEY, JSON.stringify(updated));
  return updated;
}

export function deletePlannedTrip(id: string): PlannedTrip[] {
  const trips = getPlannedTrips().filter(t => t.id !== id);
  localStorage.setItem(PLANNED_TRIPS_KEY, JSON.stringify(trips));
  return trips;
}

export function getStoredPreferences(): TravelerPreferences {
  try {
    const raw = localStorage.getItem(USER_PREFERENCES_KEY);
    if (!raw) return DEFAULT_PREFERENCES;
    return { ...DEFAULT_PREFERENCES, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export function storePreferences(pref: TravelerPreferences): void {
  localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(pref));
}
