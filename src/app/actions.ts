'use server';

import { generatePersonalizedRecommendations } from '@/ai/flows/generate-personalized-recommendations';
import { generateHumorousFallbackRecommendations } from '@/ai/flows/generate-humorous-fallback-recommendations';
import { weatherForecast, type Weather } from '@/lib/weather-data';
import { z } from 'zod';

export interface RecommendationResult {
  recommendation: string;
  image: string;
  weather: Weather[];
  isBadWeather: boolean;
}

export interface FormState {
  result: RecommendationResult | null;
  error: string | null;
}

const formSchema = z.object({
  gender: z.enum(['male', 'female', 'diverse']),
  personality: z.enum(['outdoor', 'indoor', 'foodie']),
});

export async function getRecommendation(prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    const parsed = formSchema.safeParse({
      gender: formData.get('gender'),
      personality: formData.get('personality'),
    });

    if (!parsed.success) {
      return { result: null, error: 'Invalid input. Please select both gender and personality.' };
    }

    const { gender, personality } = parsed.data;

    const isBadWeather = weatherForecast.some(
      (day) => day.condition === 'rainy' || day.condition === 'thunderstorm'
    );

    let recommendationResult;

    if (isBadWeather) {
      // Use the humorous fallback for bad weather
      recommendationResult = await generateHumorousFallbackRecommendations({
        gender,
        personality,
      });
    } else {
      // Use the standard recommendation for good weather
      // We'll use the first day's weather as the primary condition for the prompt
      const primaryWeather = weatherForecast[0]?.condition || 'sunny';
      recommendationResult = await generatePersonalizedRecommendations({
        gender,
        personality,
        weather: primaryWeather,
      });
    }

    if (!recommendationResult || !recommendationResult.recommendation) {
        return { result: null, error: 'Could not generate a recommendation. The AI may be taking a nap.' };
    }

    return {
      result: {
        recommendation: recommendationResult.recommendation,
        image: recommendationResult.image,
        weather: weatherForecast,
        isBadWeather,
      },
      error: null,
    };
  } catch (e) {
    console.error(e);
    return { result: null, error: 'An unexpected error occurred. Please try again.' };
  }
}
