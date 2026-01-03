
'use server';

import { generateDailyBriefing, type DailyBriefingInput } from '@/ai/flows/automated-daily-global-briefing';
import { generateBlogAndNewsletter, type GenerateBlogAndNewsletterInput } from '@/ai/flows/newsletter-blog-engine';
import { analyzeYoutubeSentiment, type AnalyzeYoutubeSentimentInput } from '@/ai/flows/youtube-sentiment-intelligence';
import { analyzeYouTubeComments, type AnalyzeYouTubeCommentsInput } from '@/ai/flows/sentiment-analysis-tool';

export async function runDailyBriefing(input: DailyBriefingInput) {
  try {
    const result = await generateDailyBriefing(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to generate daily briefing.' };
  }
}

export async function runBlogAndNewsletter(input: GenerateBlogAndNewsletterInput) {
  try {
    const result = await generateBlogAndNewsletter(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to generate content.' };
  }
}

export async function runYoutubeSentiment(input: AnalyzeYoutubeSentimentInput) {
  try {
    const result = await analyzeYoutubeSentiment(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to analyze YouTube sentiment.' };
  }
}

export async function runSentimentAnalysis(input: AnalyzeYouTubeCommentsInput) {
  try {
    const result = await analyzeYouTubeComments(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to run sentiment analysis.' };
  }
}
