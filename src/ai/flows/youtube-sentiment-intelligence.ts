'use server';

/**
 * @fileOverview YouTube comment sentiment analysis AI agent.
 *
 * - analyzeYoutubeSentiment - A function that handles the YouTube comment sentiment analysis process.
 * - AnalyzeYoutubeSentimentInput - The input type for the analyzeYoutubeSentiment function.
 * - AnalyzeYoutubeSentimentOutput - The return type for the analyzeYoutubeSentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeYoutubeSentimentInputSchema = z.object({
  youtubeVideoUrl: z
    .string()
    .describe('The URL of the YouTube video to analyze.'),
});
export type AnalyzeYoutubeSentimentInput = z.infer<
  typeof AnalyzeYoutubeSentimentInputSchema
>;

const AnalyzeYoutubeSentimentOutputSchema = z.object({
  contentIdeas: z
    .string()
    .describe('Hidden content ideas derived from comment analysis.'),
  audiencePainPoints: z
    .string()
    .describe('Repeated audience pain points identified in the comments.'),
  emotionHeatmap: z
    .string()
    .describe('An overview of the emotions expressed in the comments (fear, confusion, optimism).'),
  suggestedVideoTitles: z
    .string()
    .describe('Suggested video titles based on comment analysis.'),
});
export type AnalyzeYoutubeSentimentOutput = z.infer<
  typeof AnalyzeYoutubeSentimentOutputSchema
>;

export async function analyzeYoutubeSentiment(
  input: AnalyzeYoutubeSentimentInput
): Promise<AnalyzeYoutubeSentimentOutput> {
  return analyzeYoutubeSentimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeYoutubeSentimentPrompt',
  input: {schema: AnalyzeYoutubeSentimentInputSchema},
  output: {schema: AnalyzeYoutubeSentimentOutputSchema},
  prompt: `You are an AI expert in analyzing YouTube comments to extract valuable insights for content creators.

  Analyze the YouTube comments from the following video URL to identify hidden content ideas, audience pain points, and the overall emotional sentiment.
  YouTube Video URL: {{{youtubeVideoUrl}}}

  Focus on identifying patterns, recurring themes, and emotional undertones within the comments.
  Consider the context of the video and the overall sentiment expressed by the audience.

  Provide a summary of the key insights in the following format:

  Content Ideas: [List of hidden content ideas]
  Audience Pain Points: [List of audience pain points]
  Emotion Heatmap: [Summary of emotions expressed in the comments]
  Suggested Video Titles: [List of suggested video titles based on the analysis]
  `,
});

const analyzeYoutubeSentimentFlow = ai.defineFlow(
  {
    name: 'analyzeYoutubeSentimentFlow',
    inputSchema: AnalyzeYoutubeSentimentInputSchema,
    outputSchema: AnalyzeYoutubeSentimentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
