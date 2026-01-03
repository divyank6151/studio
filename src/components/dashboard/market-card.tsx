import { ArrowDown, ArrowUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MarketChart } from '@/components/dashboard/market-chart';
import { cn } from '@/lib/utils';

type MarketData = {
  name: string;
  value: number;
  change: number;
  high: number;
  low: number;
  history: { date: string; value: number }[];
};

type MarketCardProps = {
  data: MarketData;
};

export function MarketCard({ data }: MarketCardProps) {
  const isPositive = data.change >= 0;
  const percentageChange = ((data.change / (data.value - data.change)) * 100).toFixed(2);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="font-headline text-xl">{data.name}</span>
          <div
            className={cn(
              'flex items-center gap-1 text-lg font-semibold',
              isPositive ? 'text-green-600' : 'text-red-600'
            )}
          >
            {isPositive ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
            <span>{percentageChange}%</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-4xl font-bold tracking-tighter">
          {data.value.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <div className="h-28">
          <MarketChart data={data.history} isPositive={isPositive} />
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <div>
            <span className="font-medium">High:</span> {data.high.toFixed(2)}
          </div>
          <div>
            <span className="font-medium">Low:</span> {data.low.toFixed(2)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
