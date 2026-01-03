'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Lightbulb, MessageSquareWarning, Thermometer, Video } from 'lucide-react';
import { runYoutubeSentiment } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';

const formSchema = z.object({
  youtubeVideoUrl: z.string().url('Please enter a valid YouTube video URL.'),
});

type YoutubeSentimentOutput = {
  contentIdeas: string;
  audiencePainPoints: string;
  emotionHeatmap: string;
  suggestedVideoTitles: string;
};

export function YoutubeIntelligenceTool() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<YoutubeSentimentOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      youtubeVideoUrl: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      setResult(null);
      const response = await runYoutubeSentiment(values);

      if (response.success) {
        setResult(response.data);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: response.error,
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Analyze Video</CardTitle>
              <CardDescription>
                Enter a YouTube video URL to analyze its comment section.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="youtubeVideoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>YouTube Video URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://www.youtube.com/watch?v=..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Analyze Comments
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      {isPending && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
            <CardContent><div className="space-y-2"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-4/5" /></div></CardContent>
          </Card>
          <Card>
            <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
            <CardContent><div className="space-y-2"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-4/5" /></div></CardContent>
          </Card>
        </div>
      )}

      {result && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Lightbulb className="h-8 w-8 text-accent" />
              <CardTitle className="font-headline">Content Ideas</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none text-foreground">{result.contentIdeas}</CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <MessageSquareWarning className="h-8 w-8 text-accent" />
              <CardTitle className="font-headline">Audience Pain Points</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none text-foreground">{result.audiencePainPoints}</CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Thermometer className="h-8 w-8 text-accent" />
              <CardTitle className="font-headline">Emotion Heatmap</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none text-foreground">{result.emotionHeatmap}</CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Video className="h-8 w-8 text-accent" />
              <CardTitle className="font-headline">Suggested Video Titles</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none text-foreground">{result.suggestedVideoTitles}</CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
