import { AnalyticsData } from '../types/travel';
import { DESTINATIONS_DATA } from '../data/destinationsData';

export const INITIAL_ANALYTICS: AnalyticsData = {
  totalDestinations: DESTINATIONS_DATA.length,
  totalSavedTrips: 1840,
  avgEstimatedBudgetInr: 21500,
  topRecommendedDestination: 'Araku Valley & Borra Caves',
  topCategory: 'Nature & Adventure',
  popularDestinations: [
    { name: 'Jaipur Pink City', saves: 4620, views: 49800, visits: 3100 },
    { name: 'Andaman Islands', saves: 4560, views: 48900, visits: 2280 },
    { name: 'Varanasi Ghats', saves: 3980, views: 44200, visits: 2950 },
    { name: 'Leh-Ladakh Passes', saves: 3950, views: 42800, visits: 1840 },
    { name: 'Hampi Heritage', saves: 3820, views: 41200, visits: 2600 },
    { name: 'Goa Coastal', saves: 3620, views: 38900, visits: 2450 },
    { name: 'Meghalaya Root Bridges', saves: 3650, views: 39800, visits: 1720 },
    { name: 'Munnar Highlands', saves: 2840, views: 31200, visits: 1910 },
    { name: 'Araku Valley & Borra', saves: 1420, views: 18450, visits: 980 }
  ],
  categoryDistribution: [
    { category: 'Nature & Hills', count: 485, percentage: 38 },
    { category: 'Adventure & Treks', count: 295, percentage: 23 },
    { category: 'Coastal & Beaches', count: 240, percentage: 19 },
    { category: 'Cultural & Heritage', count: 165, percentage: 13 },
    { category: 'Relaxation & Wellness', count: 90, percentage: 7 }
  ],
  seasonalTrends: [
    { month: 'Jan', searches: 2400, bookingsIndex: 78 },
    { month: 'Feb', searches: 2100, bookingsIndex: 72 },
    { month: 'Mar', searches: 1950, bookingsIndex: 65 },
    { month: 'Apr', searches: 2200, bookingsIndex: 70 },
    { month: 'May', searches: 2900, bookingsIndex: 88 },
    { month: 'Jun', searches: 2500, bookingsIndex: 80 },
    { month: 'Jul', searches: 1800, bookingsIndex: 58 },
    { month: 'Aug', searches: 2150, bookingsIndex: 69 },
    { month: 'Sep', searches: 2750, bookingsIndex: 84 },
    { month: 'Oct', searches: 3400, bookingsIndex: 94 },
    { month: 'Nov', searches: 3850, bookingsIndex: 98 },
    { month: 'Dec', searches: 4200, bookingsIndex: 100 }
  ],
  budgetTierDistribution: [
    { tier: '< ₹10,000 (Budget Day-Trips)', count: 340, percentage: 24 },
    { tier: '₹10k - ₹20k (Regional Escapes)', count: 590, percentage: 42 },
    { tier: '₹20k - ₹50k (Domestic Expeditions)', count: 320, percentage: 23 },
    { tier: '₹50,000+ (International Luxury)', count: 160, percentage: 11 }
  ]
};

export const BEHAVIORAL_INSIGHTS = [
  {
    title: 'Regional Travel Corridors',
    stat: '76% Weekend Travel',
    description: 'Travelers starting from Vijayawada and coastal AP prefer trips under 400 km with 2 to 3 days duration, with Araku Valley and Lambasingi being top choices.'
  },
  {
    title: 'Cross-Interest Affinity',
    stat: '84% Nature + Photography',
    description: '84% of travelers selecting "Photography" also choose "Nature" and "Adventure", preferring early sunrise and waterfall itineraries.'
  },
  {
    title: 'Budget Discipline',
    stat: '66% Plan Under ₹20k',
    description: 'Two-thirds of regional leisure travelers budget between ₹10,000 and ₹20,000 for a 3-day family or solo journey, with accommodation comprising ~40% of spend.'
  },
  {
    title: 'Peak Planning Season',
    stat: 'October - January Highs',
    description: 'Search volume peaks by 175% between October and January due to optimal post-monsoon climate in Eastern Ghats and southern hill sanctuaries.'
  }
];
