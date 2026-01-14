'use server';
/**
 * @fileOverview Generates humorous fallback recommendations for indoor activities when the weather is bad.
 *
 * - generateHumorousFallbackRecommendations - A function that generates indoor activity recommendations with humorous commentary.
 * - HumorousFallbackRecommendationsInput - The input type for the generateHumorousFallbackRecommendations function.
 * - HumorousFallbackRecommendationsOutput - The return type for the generateHumorousFallbackRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HumorousFallbackRecommendationsInputSchema = z.object({
  gender: z
    .string()
    .describe('The gender of the user (e.g., male, female, diverse).'),
  personality: z
    .string()
    .describe(
      'The personality of the user (e.g., sunny and active, artistic and introverted, foodie and lazy).' 
    ),
});
export type HumorousFallbackRecommendationsInput = z.infer<typeof HumorousFallbackRecommendationsInputSchema>;

const HumorousFallbackRecommendationsOutputSchema = z.object({
  recommendation: z
    .string()
    .describe('A humorous and practical recommendation for an indoor activity.'),
  image: z
    .string()
    .describe('A URL for an image representing the recommended activity.'),
});
export type HumorousFallbackRecommendationsOutput = z.infer<typeof HumorousFallbackRecommendationsOutputSchema>;

export async function generateHumorousFallbackRecommendations(
  input: HumorousFallbackRecommendationsInput
): Promise<HumorousFallbackRecommendationsOutput> {
  return humorousFallbackRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'humorousFallbackRecommendationsPrompt',
  input: {schema: HumorousFallbackRecommendationsInputSchema},
  output: {schema: HumorousFallbackRecommendationsOutputSchema},
  prompt: `You are a witty and sarcastic AI assistant designed to provide humorous indoor activity recommendations when the weather is bad.

  Based on the user's gender and personality, suggest an indoor activity and provide a short, humorous comment about it.

  Gender: {{gender}}
  Personality: {{personality}}

  Here are some example personalities and what activities to recommend:
  - Sunny and active: Recommend something active indoors, like a climbing gym or trampoline park, with a joke about burning energy.
  - Artistic and introverted: Recommend a museum visit or art class, with a comment about avoiding crowds.
  - Foodie and lazy: Recommend a cooking class or indoor food market, with a quip about not having to walk far.

  Ensure your tone is lighthearted and amusing. Avoid giving dangerous or harmful advice.
  The recommendation should be a location that exists and is a place to go.

  Format:
  Recommendation: [Name of place] - [Short description of place]
  Image: [url of the place from google images]`, 
});

const humorousFallbackRecommendationsFlow = ai.defineFlow(
  {
    name: 'humorousFallbackRecommendationsFlow',
    inputSchema: HumorousFallbackRecommendationsInputSchema,
    outputSchema: HumorousFallbackRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
