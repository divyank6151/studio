import { PageHeader } from '@/components/page-header';
import { YoutubeIntelligenceTool } from '@/components/tools/youtube-intelligence-tool';
import { Separator } from '@/components/ui/separator';

export default function YoutubeIntelligencePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="YouTube Sentiment Intelligence"
        description="Analyze YouTube video comments to uncover hidden content ideas and audience pain points."
      />
      <Separator />
      <YoutubeIntelligenceTool />
    </div>
  );
}
