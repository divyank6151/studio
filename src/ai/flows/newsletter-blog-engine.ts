'use server';

/**
 * @fileOverview An AI agent for generating SEO-optimized blog posts and newsletter versions from video scripts or transcripts.
 *
 * - generateBlogAndNewsletter - A function that handles the generation process.
 * - GenerateBlogAndNewsletterInput - The input type for the generateBlogAndNewsletter function.
 * - GenerateBlogAndNewsletterOutput - The return type for the generateBlogAndNewsletter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBlogAndNewsletterInputSchema = z.object({
  videoScript: z
    .string()
    .describe('The video script or transcript to generate content from.'),
});
export type GenerateBlogAndNewsletterInput = z.infer<
  typeof GenerateBlogAndNewsletterInputSchema
>;

const GenerateBlogAndNewsletterOutputSchema = z.object({
  blogPost: z.string().describe('The SEO-optimized blog post content.'),
  newsletter: z.string().describe('The newsletter version of the content.'),
  metaDescription: z.string().describe('The meta description for the blog post.'),
  keywords: z.string().describe('The keywords for the blog post.'),
});
export type GenerateBlogAndNewsletterOutput = z.infer<
  typeof GenerateBlogAndNewsletterOutputSchema
>;

export async function generateBlogAndNewsletter(
  input: GenerateBlogAndNewsletterInput
): Promise<GenerateBlogAndNewsletterOutput> {
  return generateBlogAndNewsletterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBlogAndNewsletterPrompt',
  input: {schema: GenerateBlogAndNewsletterInputSchema},
  output: {schema: GenerateBlogAndNewsletterOutputSchema},
  prompt: `You are an expert content creator specializing in repurposing video content for blogs and newsletters.

  Given the following video script or transcript, generate an SEO-optimized blog post and a newsletter version of the content.
  Also, generate a meta description and keywords for the blog post.

  Video Script/Transcript: {{{videoScript}}}

  Blog Post:
  Newsletter:
  Meta Description:
  Keywords:`,
});

const generateBlogAndNewsletterFlow = ai.defineFlow(
  {
    name: 'generateBlogAndNewsletterFlow',
    inputSchema: GenerateBlogAndNewsletterInputSchema,
    outputSchema: GenerateBlogAndNewsletterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
