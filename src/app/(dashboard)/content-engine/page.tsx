import { PageHeader } from '@/components/page-header';
import { ContentEngineTool } from '@/components/tools/content-engine-tool';
import { Separator } from '@/components/ui/separator';

export default function ContentEnginePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Newsletter &amp; Blog Engine"
        description="Automatically generate an SEO-optimized blog post and newsletter from a video script."
      />
      <Separator />
      <ContentEngineTool />
    </div>
  );
}
