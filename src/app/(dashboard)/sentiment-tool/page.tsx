import { PageHeader } from '@/components/page-header';
import { SentimentAnalysisTool } from '@/components/tools/sentiment-analysis-tool';
import { Separator } from '@/components/ui/separator';

export default function SentimentToolPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Sentiment Analysis Tool"
        description="Perform a detailed sentiment analysis on a list of comments for a specific video."
      />
      <Separator />
      <SentimentAnalysisTool />
    </div>
  );
}
