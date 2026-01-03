import { PageHeader } from '@/components/page-header';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Bell, Book, MessageSquare } from 'lucide-react';

const automations = [
  {
    category: 'Research &amp; Sync',
    icon: Book,
    items: [
      { id: 'notion-sync', label: 'Sync new research to Notion', description: 'Automatically create a new page in your research database.' },
      { id: 'pdf-backup', label: 'Backup PDFs to Google Drive', description: 'Save all generated and uploaded PDFs to a secure folder.' },
    ],
  },
  {
    category: 'Alerts &amp; Summaries',
    icon: Bell,
    items: [
      { id: 'slack-alert', label: 'Market event Slack alert', description: 'Send an alert to a Slack channel for significant market moves.' },
      { id: 'email-briefing', label: 'Email daily briefing', description: 'Automatically send the daily briefing to your inbox.' },
    ],
  },
  {
    category: 'Content Pipeline',
    icon: MessageSquare,
    items: [
      { id: 'newsletter-draft', label: 'New video → Newsletter auto-draft', description: 'When a new video is processed, draft a newsletter in your email client.' },
    ],
  },
];

export default function AutomationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Workflow Automation"
        description="Connect your tools and automate your research and content workflows."
      />
      <Separator />

      <div className="mx-auto max-w-4xl space-y-8">
        {automations.map((automation, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center gap-4">
              <automation.icon className="h-6 w-6 text-accent" />
              <CardTitle className="font-headline text-2xl">{automation.category}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {automation.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <Label htmlFor={item.id} className="text-base">{item.label}</Label>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch id={item.id} />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
         <Card className="bg-secondary/50 border-dashed text-center">
            <CardHeader>
                <CardTitle className="text-muted-foreground">This is a preview</CardTitle>
                <CardDescription>Workflow automations are a planned Phase 2 feature. The final version will include secure connections to third-party services.</CardDescription>
            </CardHeader>
        </Card>
      </div>
    </div>
  );
}
