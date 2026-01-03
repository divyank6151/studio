'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { runSentimentAnalysis } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';
import { Badge } from '../ui/badge';

const formSchema = z.object({
  videoUrl: z.string().url('Please enter a valid YouTube video URL.'),
  comments: z.string().min(10, 'Please enter some comments to analyze.'),
});

type SentimentAnalysisOutput = {
  relevantPainPoints: string[];
  suggestedContentIdeas: string[];
  overallSentiment: string;
};

export function SentimentAnalysisTool() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<SentimentAnalysisOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: '',
      comments: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      setResult(null);
      const commentsArray = values.comments.split('\n').map(c => ({ author: 'user', text: c }));
      const response = await runSentimentAnalysis({
        videoUrl: values.videoUrl,
        comments: commentsArray,
      });

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
    <div className="grid gap-6 lg:grid-cols-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analyze Comments</CardTitle>
              <CardDescription>
                Provide a video URL and a list of comments to analyze.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="videoUrl"
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
              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comments</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste comments here, one per line."
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter each comment on a new line.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Run Analysis
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      <Card>
        <CardHeader>
          <CardTitle>Analysis Results</CardTitle>
          <CardDescription>
            Insights from the provided comments will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isPending ? (
            <div className="space-y-4">
                <Skeleton className="h-6 w-1/3" />
                <div className="space-y-2 pt-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                </div>
                 <div className="space-y-2 pt-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                </div>
            </div>
          ) : result ? (
            <div className="space-y-6">
              <div>
                <h3 className="font-headline font-semibold">Overall Sentiment</h3>
                <Badge variant={
                    result.overallSentiment.toLowerCase() === 'positive' ? 'default' : 
                    result.overallSentiment.toLowerCase() === 'negative' ? 'destructive' : 'secondary'
                } className="mt-2 capitalize">{result.overallSentiment}</Badge>
              </div>
              <div>
                <h3 className="font-headline font-semibold">Relevant Pain Points</h3>
                <ul className="mt-2 list-disc list-inside space-y-1 text-muted-foreground">
                  {result.relevantPainPoints.map((point, i) => <li key={i}>{point}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="font-headline font-semibold">Suggested Content Ideas</h3>
                <ul className="mt-2 list-disc list-inside space-y-1 text-muted-foreground">
                  {result.suggestedContentIdeas.map((idea, i) => <li key={i}>{idea}</li>)}
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">
              Submit comments to see the sentiment analysis.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
