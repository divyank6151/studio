'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { runDailyBriefing } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';

const formSchema = z.object({
  sources: z.string().min(1, 'Please enter at least one source.'),
});

type DailyBriefingOutput = {
  summary: string;
};

const defaultSources = "Bloomberg, Reuters, Financial Times, CNBC, Wall Street Journal";

export function DailyBriefingTool() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<DailyBriefingOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sources: defaultSources,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      setResult(null);
      const sourceArray = values.sources.split(',').map(s => s.trim());
      const response = await runDailyBriefing({ sources: sourceArray });

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
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuration</CardTitle>
                <CardDescription>
                  Enter news sources separated by commas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="sources"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>News Sources</FormLabel>
                      <FormControl>
                        <Input placeholder={defaultSources} {...field} />
                      </FormControl>
                      <FormDescription>
                        List of sources to be summarized.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Generate Briefing
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>

      <div className="lg:col-span-2">
        <Card className="min-h-[400px]">
          <CardHeader>
            <CardTitle>Your Daily Briefing</CardTitle>
            <CardDescription>
              {`Summary for ${format(new Date(), 'MMMM dd, yyyy')}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isPending ? (
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
              </div>
            ) : result ? (
              <div className="prose prose-sm dark:prose-invert max-w-none text-foreground">
                <p>{result.summary}</p>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Click "Generate Briefing" to get your daily summary.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
