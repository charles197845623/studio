'use server';
/**
 * @fileOverview Generates personalized travel recommendations based on user preferences and weather data.
 *
 * - generatePersonalizedRecommendations - A function that generates travel recommendations.
 * - PersonalizedRecommendationsInput - The input type for the generatePersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the generatePersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenderEnum = z.enum(['male', 'female', 'diverse']);
const PersonalityEnum = z.enum(['outdoor', 'indoor', 'foodie']);
const WeatherEnum = z.enum(['sunny', 'cloudy', 'rainy', 'thunderstorm']);

const PersonalizedRecommendationsInputSchema = z.object({
  gender: GenderEnum.describe('The gender of the user.'),
  personality: PersonalityEnum.describe('The personality of the user.'),
  weather: WeatherEnum.describe('The weather forecast for the travel dates.'),
});
export type PersonalizedRecommendationsInput = z.infer<
  typeof PersonalizedRecommendationsInputSchema
>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendation: z.string().describe('The personalized travel recommendation.'),
  image: z.string().describe('The URL of an image representing the recommendation.'),
});
export type PersonalizedRecommendationsOutput = z.infer<
  typeof PersonalizedRecommendationsOutputSchema
>;

export async function generatePersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return generatePersonalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are a travel expert. Based on the user's gender ({{{gender}}}), personality ({{{personality}}}), and the weather forecast ({{{weather}}}), provide a personalized travel recommendation.

If the weather is rainy or thunderstorm, recommend indoor activities and display a humorous message: "The weather outside is frightful, but indoor is so delightful!".

Be concise and engaging.

Output the recommendation and the URL of an image representing the recommendation.
`,
});

const generatePersonalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
