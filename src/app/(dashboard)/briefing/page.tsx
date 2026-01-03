import { PageHeader } from '@/components/page-header';
import { DailyBriefingTool } from '@/components/tools/daily-briefing-tool';
import { Separator } from '@/components/ui/separator';

export default function BriefingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Automated Daily Briefing"
        description="Get an AI-generated summary of top news from global financial sources."
      />
      <Separator />
      <DailyBriefingTool />
    </div>
  );
}
