export type DestinationCategory = 
  | 'nature' 
  | 'adventure' 
  | 'cultural' 
  | 'relaxation' 
  | 'wildlife' 
  | 'photography' 
  | 'coastal';

export type ClimateType = 
  | 'tropical' 
  | 'alpine' 
  | 'mediterranean' 
  | 'temperate' 
  | 'cool-misty';

export type TravelStyle = 
  | 'budget-friendly' 
  | 'moderate' 
  | 'luxury' 
  | 'backpacker' 
  | 'family'
  | 'adventure'
  | 'cultural'
  | 'relaxation'
  | 'wildlife';

export interface DayItineraryItem {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  estCostInr: number;
}

export interface ExpenseBreakdown {
  accommodation: number;
  transport: number;
  food: number;
  activities: number;
}

export type RegionZone = 
  | 'South India' 
  | 'North India' 
  | 'North-East India' 
  | 'West India' 
  | 'Central & East India' 
  | 'Islands' 
  | 'International';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  stateOrRegion: string;
  regionZone: RegionZone;
  coordinates: Coordinates;
  category: DestinationCategory;
  climate: ClimateType;
  estimatedCostInr: number; // for standard 3-day baseline
  estimatedCostUsd: number;
  idealDurationDays: number;
  travelStyleFit: TravelStyle[];
  interests: string[];
  imageUrl: string;
  description: string;
  highlights: string[];
  bestSeason: string;
  popularityScore: number; // 0-100
  savesCount: number;
  viewsCount: number;
  distanceFromVijayawadaKm?: number;
  transitOptionsFromVijayawada?: string;
  sampleItinerary: DayItineraryItem[];
  expensesBreakdown: ExpenseBreakdown;
  safetyRating: number; // 4.5 - 5.0
}

export interface TravelerPreferences {
  startingLocation: string;
  budgetInr: number;
  durationDays: number;
  interests: string[];
  travelStyle: TravelStyle;
  pace: 'relaxed' | 'balanced' | 'action-packed';
  preferredClimate?: ClimateType | 'all';
}

export interface ScoreComponents {
  budgetScore: number;       // B (0 - 100)
  interestScore: number;     // I (0 - 100)
  durationScore: number;     // D (0 - 100)
  styleScore: number;        // T (0 - 100)
  weightedBudget: number;    // 0.35 * B
  weightedInterest: number;  // 0.30 * I
  weightedDuration: number;  // 0.20 * D
  weightedStyle: number;     // 0.15 * T
  totalScore: number;        // S (0 - 100)
}

export interface RecommendationResult {
  destination: Destination;
  score: ScoreComponents;
  matchPercentage: number;
  whyMatch: string[];
  aiAnalysis?: string;
  estimatedTotalExpense: number;
  budgetDelta: number; // positive = under budget, negative = over budget
}

export interface TimelineActivity {
  id: string;
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening';
  text: string;
  costInr: number;
  visitingDuration?: string;
  travelTimeFromPrev?: string;
  locationName?: string;
  isConfirmed?: boolean;
}

export interface TimelineDay {
  dayNumber: number;
  title: string;
  activities: TimelineActivity[];
}

export interface PlannedTrip {
  id: string;
  destinationId: string;
  destinationName: string;
  destinationCountry: string;
  destinationImage: string;
  startDate: string;
  endDate: string;
  travelersCount: number;
  targetBudgetInr: number;
  actualEstimatedBudgetInr: number;
  travelStyle: TravelStyle;
  notes: string;
  days: TimelineDay[];
  expensesBreakdown: ExpenseBreakdown;
  createdAt: string;
  startingLocation?: string;
}

export interface SmartPlannerInput {
  startingLocation: string;
  destinationMode: 'surprise' | 'specific' | 'near_origin';
  specificDestinationId?: string;
  durationDays: number;
  budgetPerPersonInr: number;
  interests: string[];
  travelersCount: number; // 1 (solo), 2, 4 (3-5), 6 (6+)
}

export interface AnalyticsData {
  totalDestinations: number;
  totalSavedTrips: number;
  avgEstimatedBudgetInr: number;
  topRecommendedDestination: string;
  topCategory: string;
  popularDestinations: { name: string; saves: number; views: number; visits: number }[];
  categoryDistribution: { category: string; count: number; percentage: number }[];
  seasonalTrends: { month: string; searches: number; bookingsIndex: number }[];
  budgetTierDistribution: { tier: string; percentage: number; count: number }[];
}
