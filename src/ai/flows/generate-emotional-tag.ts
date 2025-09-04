'use server';

/**
 * @fileOverview Generates emotional tags for a story based on its audio and text content.
 *
 * - generateEmotionalTag - A function that generates emotional tags for a given story.
 * - GenerateEmotionalTagInput - The input type for the generateEmotionalTag function.
 * - GenerateEmotionalTagOutput - The return type for the generateEmotionalTag function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEmotionalTagInputSchema = z.object({
  audioUrl: z.string().describe('URL of the audio recording of the story.'),
  textTranscript: z.string().describe('Text transcript of the story.'),
});
export type GenerateEmotionalTagInput = z.infer<typeof GenerateEmotionalTagInputSchema>;

const GenerateEmotionalTagOutputSchema = z.object({
  emotionalTags: z
    .array(z.string())
    .describe('An array of emotional tags suggested for the story.'),
});
export type GenerateEmotionalTagOutput = z.infer<typeof GenerateEmotionalTagOutputSchema>;

export async function generateEmotionalTag(
  input: GenerateEmotionalTagInput
): Promise<GenerateEmotionalTagOutput> {
  return generateEmotionalTagFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEmotionalTagPrompt',
  input: {schema: GenerateEmotionalTagInputSchema},
  output: {schema: GenerateEmotionalTagOutputSchema},
  prompt: `You are an AI assistant specialized in identifying emotions in stories.
  Given the audio and text transcript of a story, suggest a list of emotional tags that best describe the overall feeling of the story. Return the tags as an array of strings.

  Audio URL: {{{audioUrl}}}
  Text Transcript: {{{textTranscript}}}

  Consider emotions like joy, sadness, anger, fear, surprise, love, excitement, nostalgia, etc.
  Return ONLY a JSON array of strings representing the identified emotions.
  Example: ["joy", "nostalgia", "love"]
  Do not return any other text or explanation.`,
});

const generateEmotionalTagFlow = ai.defineFlow(
  {
    name: 'generateEmotionalTagFlow',
    inputSchema: GenerateEmotionalTagInputSchema,
    outputSchema: GenerateEmotionalTagOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
