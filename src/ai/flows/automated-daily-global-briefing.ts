'use server';
/**
 * @fileOverview Generates a daily global briefing from top financial sources.
 *
 * - generateDailyBriefing - A function that generates the daily briefing.
 * - DailyBriefingInput - The input type for the generateDailyBriefing function.
 * - DailyBriefingOutput - The return type for the generateDailyBriefing function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DailyBriefingInputSchema = z.object({
  sources: z
    .array(z.string())
    .describe('List of news sources to fetch and summarize.'),
});
export type DailyBriefingInput = z.infer<typeof DailyBriefingInputSchema>;

const DailyBriefingOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary of the top news from the specified sources.'),
});
export type DailyBriefingOutput = z.infer<typeof DailyBriefingOutputSchema>;

export async function generateDailyBriefing(input: DailyBriefingInput): Promise<DailyBriefingOutput> {
  return generateDailyBriefingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dailyBriefingPrompt',
  input: {schema: DailyBriefingInputSchema},
  output: {schema: DailyBriefingOutputSchema},
  prompt: `You are an AI assistant tasked with creating a daily global briefing for Dr. Shah.

  Summarize the top news from the following sources, focusing on macro economy, commodities, and currency movements. The briefing should be between 300-500 words and readable in under 5 minutes.

  News Sources: {{#each sources}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  `,
});

const generateDailyBriefingFlow = ai.defineFlow(
  {
    name: 'generateDailyBriefingFlow',
    inputSchema: DailyBriefingInputSchema,
    outputSchema: DailyBriefingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
