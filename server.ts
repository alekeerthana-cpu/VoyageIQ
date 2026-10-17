import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { DESTINATIONS_DATA } from './src/data/destinationsData';
import { rankDestinations } from './src/services/recommendationEngine';
import { INITIAL_ANALYTICS, BEHAVIORAL_INSIGHTS } from './src/services/analyticsData';
import { TravelerPreferences } from './src/types/travel';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// API: Destinations Catalog
app.get('/api/destinations', (_req: Request, res: Response) => {
  res.json({ success: true, data: DESTINATIONS_DATA });
});

// API: Recommendation Engine using transparent formulation S = 0.35B + 0.30I + 0.20D + 0.15T
app.post('/api/recommendations', (req: Request, res: Response) => {
  try {
    const preferences: TravelerPreferences = req.body;
    const ranked = rankDestinations(preferences, DESTINATIONS_DATA);
    res.json({
      success: true,
      preferences,
      algorithmFormula: 'S = 0.35 * B (Budget) + 0.30 * I (Interests) + 0.20 * D (Duration) + 0.15 * T (Travel Style)',
      data: ranked
    });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

// API: Analytics & Behavioral Insights
app.get('/api/analytics', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: INITIAL_ANALYTICS,
    insights: BEHAVIORAL_INSIGHTS
  });
});

// API: AI Travel Behavior Match Deep Dive
app.post('/api/ai/explain', async (req: Request, res: Response) => {
  const { destinationId, preferences } = req.body;
  const destination = DESTINATIONS_DATA.find(d => d.id === destinationId);

  if (!destination) {
    return res.status(404).json({ success: false, error: 'Destination not found' });
  }

  if (!ai) {
    // Graceful fallback if no API key is present
    return res.json({
      success: true,
      source: 'rule-engine',
      explanation: `${destination.name} in ${destination.stateOrRegion}, ${destination.country} is ranked for you because it comfortably fits your budget of ₹${preferences.budgetInr?.toLocaleString()} with an estimated expense of ₹${destination.estimatedCostInr.toLocaleString()}. It satisfies your interests in ${destination.interests.slice(0, 3).join(', ')} over a ${preferences.durationDays || 3}-day trip.`
    });
  }

  try {
    const prompt = `You are the lead travel behavior analyst for VoyageIQ.
Analyze why ${destination.name} (${destination.stateOrRegion}, ${destination.country}) is a great fit for a traveler with these parameters:
- Origin: ${preferences.startingLocation || 'Vijayawada'}
- Total Budget: ₹${preferences.budgetInr || 15000}
- Trip Duration: ${preferences.durationDays || 3} days
- Target Interests: ${(preferences.interests || ['nature', 'adventure', 'photography']).join(', ')}
- Travel Style: ${preferences.travelStyle || 'budget-friendly'}
- Pace: ${preferences.pace || 'balanced'}

Provide a 3-sentence, sharp behavioral analysis explaining:
1. Exact budget and transit feasibility from ${preferences.startingLocation || 'Vijayawada'}.
2. Why the destination's unique activities match their specific interests.
3. One insider tip to maximize value during their ${preferences.durationDays || 3}-day stay.
Keep the tone professional, insightful, and data-backed. No conversational fluff or emojis.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    res.json({
      success: true,
      source: 'gemini-3.8-flash',
      explanation: response.text?.trim()
    });
  } catch (error) {
    console.error('Gemini explanation error:', error);
    res.json({
      success: true,
      source: 'rule-engine-fallback',
      explanation: `${destination.name} matches your target schedule of ${preferences.durationDays || 3} days and aligns with your ${preferences.travelStyle || 'budget-friendly'} style while maintaining high ratings for ${destination.interests.slice(0, 3).join(', ')}.`
    });
  }
});

// API: AI-Powered Custom Day-by-Day Itinerary Generation
app.post('/api/ai/itinerary', async (req: Request, res: Response) => {
  const { destinationId, durationDays, budgetInr, travelersCount, travelStyle, interests } = req.body;
  const destination = DESTINATIONS_DATA.find(d => d.id === destinationId);

  if (!destination) {
    return res.status(404).json({ success: false, error: 'Destination not found' });
  }

  if (!ai) {
    // Return sample itinerary from catalog
    return res.json({
      success: true,
      source: 'catalog-preset',
      days: destination.sampleItinerary.map(item => ({
        dayNumber: item.day,
        title: item.title,
        activities: [
          { id: `m-${item.day}`, timeOfDay: 'Morning', text: item.morning, costInr: Math.round(item.estCostInr * 0.35) },
          { id: `a-${item.day}`, timeOfDay: 'Afternoon', text: item.afternoon, costInr: Math.round(item.estCostInr * 0.40) },
          { id: `e-${item.day}`, timeOfDay: 'Evening', text: item.evening, costInr: Math.round(item.estCostInr * 0.25) }
        ]
      }))
    });
  }

  try {
    const prompt = `Create a realistic, customized ${durationDays || 3}-day travel itinerary for ${destination.name} (${destination.stateOrRegion}, ${destination.country}).
Traveler Profile:
- Total Budget: ₹${budgetInr || destination.estimatedCostInr} for ${travelersCount || 1} traveler(s)
- Travel Style: ${travelStyle || 'budget-friendly'}
- Core Interests: ${(interests || destination.interests).join(', ')}

Return ONLY valid JSON (no markdown ticks or code fences if possible, or clean JSON object):
{
  "days": [
    {
      "dayNumber": 1,
      "title": "Title of Day 1",
      "activities": [
        { "timeOfDay": "Morning", "text": "Activity details", "costInr": 800 },
        { "timeOfDay": "Afternoon", "text": "Activity details", "costInr": 1200 },
        { "timeOfDay": "Evening", "text": "Activity details", "costInr": 600 }
      ]
    }
  ],
  "insiderAdvice": "Short tactical tip"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    if (parsed.days && Array.isArray(parsed.days)) {
      const formattedDays = parsed.days.map((day: any, dIdx: number) => ({
        dayNumber: day.dayNumber || dIdx + 1,
        title: day.title || `Day ${dIdx + 1}`,
        activities: (day.activities || []).map((act: any, aIdx: number) => ({
          id: `ai-${dIdx + 1}-${aIdx}`,
          timeOfDay: act.timeOfDay || 'Morning',
          text: act.text,
          costInr: Number(act.costInr) || 500
        }))
      }));

      return res.json({
        success: true,
        source: 'gemini-3.8-flash',
        days: formattedDays,
        insiderAdvice: parsed.insiderAdvice
      });
    }

    throw new Error('Unexpected JSON shape from Gemini');
  } catch (error) {
    console.error('Gemini itinerary error:', error);
    // Fallback gracefully to catalog itinerary
    res.json({
      success: true,
      source: 'catalog-fallback',
      days: destination.sampleItinerary.map(item => ({
        dayNumber: item.day,
        title: item.title,
        activities: [
          { id: `m-${item.day}`, timeOfDay: 'Morning', text: item.morning, costInr: Math.round(item.estCostInr * 0.35) },
          { id: `a-${item.day}`, timeOfDay: 'Afternoon', text: item.afternoon, costInr: Math.round(item.estCostInr * 0.40) },
          { id: `e-${item.day}`, timeOfDay: 'Evening', text: item.evening, costInr: Math.round(item.estCostInr * 0.25) }
        ]
      }))
    });
  }
});

// Vite Middleware for Full-Stack React in Dev
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve dist folder
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`VoyageIQ server is live at http://0.0.0.0:${PORT}`);
  });
}

startServer();
