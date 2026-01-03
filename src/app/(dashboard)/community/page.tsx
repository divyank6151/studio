import Image from 'next/image';
import { PageHeader } from '@/components/page-header';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';

const posts = [
  {
    title: 'Exclusive Research: The Future of Commodity Supercycles',
    author: 'Dr. Shah',
    date: '3 days ago',
    content: 'In this exclusive note, we dive deep into the factors driving the next potential commodity supercycle. Analysis includes long-term charts on gold, oil, and agricultural products. The full PDF report is attached for download.',
    attachment: 'commodity-supercycles-report.pdf',
    comments: [
      { author: 'Community Member 1', avatarId: 'avatar1', text: 'Incredible analysis, Dr. Shah! The section on copper was particularly eye-opening.' },
    ],
  },
  {
    title: 'Weekly Market Recap &amp; Outlook',
    author: 'Dr. Shah',
    date: '1 week ago',
    content: 'A review of this week\'s key movements in the DXY and its impact on emerging market currencies. Plus, a look ahead at what to expect from the Fed next week.',
    comments: [
      { author: 'Community Member 2', avatarId: 'avatar2', text: 'Thanks for the summary! Really helps to cut through the noise.' },
      { author: 'Community Member 3', avatarId: 'avatar3', text: 'What are your thoughts on the Yen, considering the recent moves?' },
    ],
  },
];

export default function CommunityPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Inner Circle"
        description="Welcome to the exclusive members-only community portal."
      />
      <Separator />

      <div className="mx-auto max-w-4xl space-y-8">
        {posts.map((post, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="font-headline text-2xl">{post.title}</CardTitle>
                  <CardDescription>Posted by {post.author} • {post.date}</CardDescription>
                </div>
                 <Badge variant="outline">Exclusive Research</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{post.content}</p>
              {post.attachment && (
                 <Button variant="outline" className="mt-4">
                    <FileText className="mr-2 h-4 w-4" />
                    Download {post.attachment}
                </Button>
              )}
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
                <Separator/>
                <h3 className="text-sm font-semibold text-foreground">Discussion</h3>
                <div className="w-full space-y-4">
                    {post.comments.map((comment, cIndex) => {
                        const avatar = PlaceHolderImages.find(p => p.id === comment.avatarId);
                        return (
                             <div key={cIndex} className="flex items-start gap-3">
                                <Avatar>
                                    <AvatarImage src={avatar?.imageUrl} alt={comment.author} data-ai-hint={avatar?.imageHint}/>
                                    <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold text-sm">{comment.author}</p>
                                    <p className="text-sm text-muted-foreground">{comment.text}</p>
                                </div>
                            </div>
                        )
                    })}
                     <div className="flex w-full items-center gap-3 pt-4">
                        <Avatar>
                            <AvatarImage src="https://picsum.photos/seed/drshah/40/40" alt="Dr. Shah" data-ai-hint="person face" />
                            <AvatarFallback>DS</AvatarFallback>
                        </Avatar>
                        <Input placeholder="Write a comment..." />
                        <Button>Post</Button>
                    </div>
                </div>
            </CardFooter>
          </Card>
        ))}
         <Card className="bg-secondary/50 border-dashed text-center">
            <CardHeader>
                <CardTitle className="text-muted-foreground">This is a preview</CardTitle>
                <CardDescription>The community portal is a Phase 2 feature with paid login, full discussion capabilities, and more.</CardDescription>
            </CardHeader>
        </Card>
      </div>
    </div>
  );
}
