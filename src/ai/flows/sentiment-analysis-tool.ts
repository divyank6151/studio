'use server';

/**
 * @fileOverview This file defines a Genkit flow for sentiment analysis of YouTube comments.
 *
 * The flow analyzes comments to identify pain points and content ideas for Dr. Shah.
 * It exports the analyzeYouTubeComments function, along with its input and output types.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const YoutubeCommentSchema = z.object({
  author: z.string(),
  text: z.string(),
});

const AnalyzeYouTubeCommentsInputSchema = z.object({
  videoUrl: z.string().describe('The URL of the YouTube video to analyze.'),
  comments: z.array(YoutubeCommentSchema).describe('Array of user comments from the YouTube video.'),
});
export type AnalyzeYouTubeCommentsInput = z.infer<
  typeof AnalyzeYouTubeCommentsInputSchema
>;

const SentimentAnalysisOutputSchema = z.object({
  relevantPainPoints: z
    .array(z.string())
    .describe('A list of identified pain points from the comments.'),
  suggestedContentIdeas: z
    .array(z.string())
    .describe('Suggested content ideas based on comment analysis.'),
  overallSentiment: z
    .string()
    .describe('The overall sentiment of the comments (positive, negative, neutral).'),
});
export type SentimentAnalysisOutput = z.infer<typeof SentimentAnalysisOutputSchema>;

export async function analyzeYouTubeComments(
  input: AnalyzeYouTubeCommentsInput
): Promise<SentimentAnalysisOutput> {
  return analyzeYouTubeCommentsFlow(input);
}

const sentimentAnalysisPrompt = ai.definePrompt({
  name: 'sentimentAnalysisPrompt',
  input: {schema: AnalyzeYouTubeCommentsInputSchema},
  output: {schema: SentimentAnalysisOutputSchema},
  prompt: `You are an AI assistant helping Dr. Shah analyze YouTube comments to improve content and address audience concerns.

  Analyze the following comments from the YouTube video: {{videoUrl}}
  Comments:
  {{#each comments}}
  - Author: {{this.author}}, Comment: {{this.text}}
  {{/each}}

  Identify relevant pain points, suggest content ideas, and determine the overall sentiment of the comments.
  Return the data in the format described in the output schema.
  `,
});

const analyzeYouTubeCommentsFlow = ai.defineFlow(
  {
    name: 'analyzeYouTubeCommentsFlow',
    inputSchema: AnalyzeYouTubeCommentsInputSchema,
    outputSchema: SentimentAnalysisOutputSchema,
  },
  async input => {
    const {output} = await sentimentAnalysisPrompt(input);
    return output!;
  }
);
