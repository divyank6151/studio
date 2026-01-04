'use client';

import * as React from 'react';
import Image from 'next/image';
import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  FileText,
  Lightbulb,
  MessageCircle,
  TrendingUp,
  Smile,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';

const recentVideos = [
  {
    id: 1,
    title: 'The Future of Commodity Supercycles',
    thumbnailUrl: 'https://picsum.photos/seed/video1/320/180',
    views: '1.2M',
    comments: 482,
    date: '3 days ago',
  },
  {
    id: 2,
    title: 'Weekly Market Recap & Outlook',
    thumbnailUrl: 'https://picsum.photos/seed/video2/320/180',
    views: '890K',
    comments: 312,
    date: '1 week ago',
  },
];

const insights = [
  {
    icon: Lightbulb,
    title: 'Top Content Idea',
    description:
      'Create a deep-dive video on the impact of Yen fluctuations on global trade.',
    badge: 'High Engagement',
  },
  {
    icon: MessageCircle,
    title: 'Key Audience Pain Point',
    description:
      'Viewers are confused about the real-world impact of DXY movements.',
    badge: 'Recurring Theme',
  },
];

const recentComments = [
  {
    author: 'Community Member 3',
    comment: 'What are your thoughts on the Yen, considering the recent moves?',
    sentiment: 'Positive',
  },
  {
    author: 'Community Member 1',
    comment:
      'Incredible analysis, Dr. Shah! The section on copper was particularly eye-opening.',
    sentiment: 'Positive',
  },
  {
    author: 'Community Member 2',
    comment: 'Thanks for the summary! Really helps to cut through the noise.',
    sentiment: 'Neutral',
  },
];

const overallSentiment = 78;

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Dashboard"
        description={`Here's a snapshot of your YouTube channel's performance and audience feedback.`}
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Videos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {recentVideos.map((video) => (
                <div
                  key={video.id}
                  className="flex flex-col gap-4 sm:flex-row"
                >
                  <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    width={160}
                    height={90}
                    className="rounded-lg object-cover"
                    data-ai-hint="youtube thumbnail"
                  />
                  <div className="flex-1">
                    <h3 className="font-headline font-semibold leading-snug">
                      {video.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{video.views} views</span>
                      <span>{video.comments} comments</span>
                      <span>{video.date}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Analytics
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smile className="h-5 w-5 text-accent" />
                <span>Overall Sentiment</span>
              </CardTitle>
              <CardDescription>
                Audience sentiment from your latest video comments.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tighter">
                  {overallSentiment}
                </span>
                <span className="text-sm text-muted-foreground">/ 100</span>
              </div>
              <Progress value={overallSentiment} className="h-2" />
              <p className="text-xs text-muted-foreground pt-1">
                A score of 70+ is considered positive.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Insights</CardTitle>
              <CardDescription>
                Derived from your latest comments.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {insights.map((insight, index) => (
                <div key={index} className="flex gap-4">
                  <insight.icon className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h4 className="font-semibold">{insight.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {insight.description}
                    </p>
                    <Badge variant="secondary" className="mt-2">
                      {insight.badge}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Comments</CardTitle>
          <CardDescription>
            A feed of the latest audience feedback.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Author</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead className="w-[120px] text-right">
                  Sentiment
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentComments.map((comment, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{comment.author}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {comment.comment}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={
                        comment.sentiment === 'Positive'
                          ? 'default'
                          : 'secondary'
                      }
                      className={
                        comment.sentiment === 'Positive'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                          : ''
                      }
                    >
                      {comment.sentiment}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
