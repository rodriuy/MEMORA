'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a story title based on the story content.
 *
 * - generateStoryTitle - A function that generates a story title.
 * - GenerateStoryTitleInput - The input type for the generateStoryTitle function.
 * - GenerateStoryTitleOutput - The return type for the generateStoryTitle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStoryTitleInputSchema = z.object({
  audioUrl: z.string().describe('URL of the uploaded audio file.'),
  textTranscript: z.string().describe('Text transcript of the audio.'),
});
export type GenerateStoryTitleInput = z.infer<typeof GenerateStoryTitleInputSchema>;

const GenerateStoryTitleOutputSchema = z.object({
  title: z.string().describe('The generated title for the story.'),
});
export type GenerateStoryTitleOutput = z.infer<typeof GenerateStoryTitleOutputSchema>;

export async function generateStoryTitle(input: GenerateStoryTitleInput): Promise<GenerateStoryTitleOutput> {
  return generateStoryTitleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStoryTitlePrompt',
  input: {schema: GenerateStoryTitleInputSchema},
  output: {schema: GenerateStoryTitleOutputSchema},
  prompt: `You are a creative title generator for family stories. Given the audio and text content of a story, generate a creative and evocative title for the story.

Audio URL: {{{audioUrl}}}
Text Transcript: {{{textTranscript}}}

Title:`,
});

const generateStoryTitleFlow = ai.defineFlow(
  {
    name: 'generateStoryTitleFlow',
    inputSchema: GenerateStoryTitleInputSchema,
    outputSchema: GenerateStoryTitleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
