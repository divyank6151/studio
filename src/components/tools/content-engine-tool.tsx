'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { runBlogAndNewsletter } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  videoScript: z.string().min(50, 'Please enter a script of at least 50 characters.'),
});

type ContentEngineOutput = {
  blogPost: string;
  newsletter: string;
  metaDescription: string;
  keywords: string;
};

export function ContentEngineTool() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ContentEngineOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoScript: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      setResult(null);
      const response = await runBlogAndNewsletter(values);

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
              <CardTitle>Video Script</CardTitle>
              <CardDescription>
                Paste your video script or transcript below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="videoScript"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Script/Transcript</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Start typing or paste your script here..."
                        className="min-h-[300px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Content
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      <Card>
        <CardHeader>
          <CardTitle>Generated Content</CardTitle>
          <CardDescription>
            Your AI-generated content will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isPending ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[80%]" />
            </div>
          ) : result ? (
            <Tabs defaultValue="blog">
              <TabsList>
                <TabsTrigger value="blog">Blog Post</TabsTrigger>
                <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
              </TabsList>
              <TabsContent value="blog" className="mt-4 prose prose-sm dark:prose-invert max-w-none text-foreground">
                <div dangerouslySetInnerHTML={{ __html: result.blogPost.replace(/\n/g, '<br>') }} />
              </TabsContent>
              <TabsContent value="newsletter" className="mt-4 prose prose-sm dark:prose-invert max-w-none text-foreground">
                <div dangerouslySetInnerHTML={{ __html: result.newsletter.replace(/\n/g, '<br>') }} />
              </TabsContent>
              <TabsContent value="seo" className="mt-4 space-y-4">
                <div>
                  <h3 className="font-semibold">Meta Description</h3>
                  <p className="text-muted-foreground">{result.metaDescription}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.keywords.split(',').map(k => <Badge key={k} variant="secondary">{k.trim()}</Badge>)}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <p className="text-muted-foreground">
              Submit a script to generate your blog and newsletter content.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
