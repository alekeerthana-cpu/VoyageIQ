import { Destination, TravelerPreferences, RecommendationResult, ScoreComponents } from '../types/travel';
import { DESTINATIONS_DATA } from '../data/destinationsData';

export function calculateDestinationScore(
  dest: Destination,
  pref: TravelerPreferences
): { score: ScoreComponents; estimatedExpense: number; whyMatch: string[] } {
  // 1. Calculate duration-adjusted estimated expense
  const durationFactor = Math.pow(pref.durationDays / dest.idealDurationDays, 0.85);
  const estimatedExpense = Math.round(dest.estimatedCostInr * durationFactor);

  // 2. Budget Score (B: 0 - 100)
  let budgetScore = 0;
  if (estimatedExpense <= pref.budgetInr) {
    const ratio = estimatedExpense / pref.budgetInr;
    if (ratio >= 0.6) {
      budgetScore = Math.min(100, Math.round(85 + (1 - Math.abs(0.85 - ratio)) * 15));
    } else {
      budgetScore = Math.min(100, Math.round(75 + ratio * 20));
    }
  } else {
    const overRatio = estimatedExpense / pref.budgetInr;
    if (overRatio <= 1.2) {
      budgetScore = Math.max(30, Math.round(100 - (overRatio - 1.0) * 250));
    } else if (overRatio <= 1.5) {
      budgetScore = Math.max(15, Math.round(50 - (overRatio - 1.2) * 100));
    } else {
      budgetScore = Math.max(5, Math.round(20 - (overRatio - 1.5) * 15));
    }
  }

  // 3. Interest Match Score (I: 0 - 100)
  let interestScore = 70;
  const matchedInterests: string[] = [];
  if (pref.interests.length > 0) {
    const destInterestsSet = new Set([...dest.interests, dest.category]);
    let matches = 0;
    pref.interests.forEach(interest => {
      if (destInterestsSet.has(interest.toLowerCase())) {
        matches++;
        matchedInterests.push(interest);
      }
    });

    const ratio = matches / pref.interests.length;
    interestScore = Math.min(100, Math.round(ratio * 95));
    if (destInterestsSet.has(pref.interests[0]?.toLowerCase())) {
      interestScore = Math.min(100, interestScore + 5);
    }
  }

  // 4. Duration Suitability Score (D: 0 - 100)
  const diffDays = Math.abs(pref.durationDays - dest.idealDurationDays);
  let durationScore = 100;
  if (diffDays === 0) {
    durationScore = 100;
  } else if (diffDays === 1) {
    durationScore = 88;
  } else if (diffDays === 2) {
    durationScore = 68;
  } else {
    durationScore = Math.max(20, Math.round(100 - diffDays * 22));
  }

  // 5. Travel Style Match Score (T: 0 - 100)
  let styleScore = 50;
  if (dest.travelStyleFit.includes(pref.travelStyle)) {
    styleScore = 100;
  } else if (
    (pref.travelStyle === 'budget-friendly' && dest.travelStyleFit.includes('backpacker')) ||
    (pref.travelStyle === 'moderate' && (dest.travelStyleFit.includes('budget-friendly') || dest.travelStyleFit.includes('luxury')))
  ) {
    styleScore = 78;
  } else {
    styleScore = 45;
  }

  // 6. Weighted Multi-Criteria Formulation
  // S = 0.35B + 0.30I + 0.20D + 0.15T
  const weightedBudget = Math.round(0.35 * budgetScore * 10) / 10;
  const weightedInterest = Math.round(0.30 * interestScore * 10) / 10;
  const weightedDuration = Math.round(0.20 * durationScore * 10) / 10;
  const weightedStyle = Math.round(0.15 * styleScore * 10) / 10;

  const totalScore = Math.min(
    100,
    Math.round((weightedBudget + weightedInterest + weightedDuration + weightedStyle) * 10) / 10
  );

  // 7. Human-friendly match rationales
  const whyMatch: string[] = [];
  const delta = pref.budgetInr - estimatedExpense;

  if (delta >= 0) {
    whyMatch.push(`Budget-friendly: Estimated expense of ₹${estimatedExpense.toLocaleString()} is ₹${delta.toLocaleString()} within your ₹${pref.budgetInr.toLocaleString()} target.`);
  } else {
    whyMatch.push(`Budget note: Estimated at ₹${estimatedExpense.toLocaleString()} (${Math.round((estimatedExpense / pref.budgetInr - 1) * 100)}% over target budget).`);
  }

  if (matchedInterests.length > 0) {
    whyMatch.push(`Strong interest overlap: Matches your preference for ${matchedInterests.map(i => i.charAt(0).toUpperCase() + i.slice(1)).join(', ')}.`);
  }

  if (diffDays === 0) {
    whyMatch.push(`Ideal pace: The recommended duration (${dest.idealDurationDays} days) aligns perfectly with your ${pref.durationDays}-day schedule.`);
  } else if (diffDays <= 1) {
    whyMatch.push(`Good schedule fit: ${dest.idealDurationDays} days recommended, adaptable for your ${pref.durationDays}-day trip.`);
  }

  if (dest.travelStyleFit.includes(pref.travelStyle)) {
    whyMatch.push(`Travel style verified for ${pref.travelStyle.replace('-', ' ')} travelers.`);
  }

  if (pref.startingLocation.toLowerCase().includes('vijayawada') && dest.distanceFromVijayawadaKm) {
    whyMatch.push(`Convenient transit: ~${dest.distanceFromVijayawadaKm} km from Vijayawada (${dest.transitOptionsFromVijayawada}).`);
  }

  const scoreComponents: ScoreComponents = {
    budgetScore,
    interestScore,
    durationScore,
    styleScore,
    weightedBudget,
    weightedInterest,
    weightedDuration,
    weightedStyle,
    totalScore
  };

  return {
    score: scoreComponents,
    estimatedExpense,
    whyMatch
  };
}

export function rankDestinations(
  preferences: TravelerPreferences,
  destinations: Destination[] = DESTINATIONS_DATA
): RecommendationResult[] {
  const results = destinations.map(dest => {
    const { score, estimatedExpense, whyMatch } = calculateDestinationScore(dest, preferences);
    return {
      destination: dest,
      score,
      matchPercentage: Math.round(score.totalScore),
      whyMatch,
      estimatedTotalExpense: estimatedExpense,
      budgetDelta: preferences.budgetInr - estimatedExpense
    };
  });

  return results.sort((a, b) => b.score.totalScore - a.score.totalScore);
}
