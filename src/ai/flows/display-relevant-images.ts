'use server';

/**
 * @fileOverview Fetches and returns relevant images for travel recommendations using the Google Custom Search API.
 *
 * - displayRelevantImages - A function that fetches images for display.
 * - DisplayRelevantImagesInput - The input type for the displayRelevantImages function.
 * - DisplayRelevantImagesOutput - The return type for the displayRelevantImages function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DisplayRelevantImagesInputSchema = z.object({
  query: z.string().describe('The search query to use when fetching images.'),
});
export type DisplayRelevantImagesInput = z.infer<typeof DisplayRelevantImagesInputSchema>;

const DisplayRelevantImagesOutputSchema = z.object({
  imageUrl: z.string().describe('URL of the relevant image.'),
});
export type DisplayRelevantImagesOutput = z.infer<typeof DisplayRelevantImagesOutputSchema>;

export async function displayRelevantImages(input: DisplayRelevantImagesInput): Promise<DisplayRelevantImagesOutput> {
  return displayRelevantImagesFlow(input);
}

const googleImageSearch = ai.defineTool({
  name: 'googleImageSearch',
  description: 'Search Google Images for a given query and return the URL of the first image.',
  inputSchema: z.object({
    query: z.string().describe('The search query to use when fetching images.'),
  }),
  outputSchema: z.string(),
},
async (input) => {
  // Replace with actual Google Custom Search API call here
  // For now, return a placeholder image URL
  console.log(`Searching Google Images for: ${input.query}`);
  return `https://source.unsplash.com/400x300/?${input.query}`;
});

const displayRelevantImagesPrompt = ai.definePrompt({
  name: 'displayRelevantImagesPrompt',
  tools: [googleImageSearch],
  input: {schema: DisplayRelevantImagesInputSchema},
  output: {schema: DisplayRelevantImagesOutputSchema},
  prompt: `Use the googleImageSearch tool to find an image for the following query: {{{query}}}. Return the URL of the image in the output.`, 
});

const displayRelevantImagesFlow = ai.defineFlow(
  {
    name: 'displayRelevantImagesFlow',
    inputSchema: DisplayRelevantImagesInputSchema,
    outputSchema: DisplayRelevantImagesOutputSchema,
  },
  async input => {
    const {output} = await displayRelevantImagesPrompt(input);
    return {
      imageUrl: output?.imageUrl ?? 'https://via.placeholder.com/400x300',
    };
  }
);
