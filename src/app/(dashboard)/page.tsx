'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { MarketCard } from '@/components/dashboard/market-card';

type MarketData = {
  name: string;
  value: number;
  change: number;
  high: number;
  low: number;
  history: { date: string; value: number }[];
};

const initialData: Record<string, MarketData> = {
  DXY: {
    name: 'DXY',
    value: 105.28,
    change: 0.15,
    high: 105.4,
    low: 105.1,
    history: Array.from({ length: 30 }, (_, i) => ({
      date: `D-${30 - i}`,
      value: 104 + Math.random() * 2,
    })),
  },
  Gold: {
    name: 'Gold',
    value: 2350.5,
    change: -12.3,
    high: 2365.8,
    low: 2345.1,
    history: Array.from({ length: 30 }, (_, i) => ({
      date: `D-${30 - i}`,
      value: 2300 + Math.random() * 100,
    })),
  },
  'Crude Oil': {
    name: 'Crude Oil',
    value: 80.1,
    change: 1.2,
    high: 81.5,
    low: 79.5,
    history: Array.from({ length: 30 }, (_, i) => ({
      date: `D-${30 - i}`,
      value: 78 + Math.random() * 5,
    })),
  },
};

export default function DashboardPage() {
  const [marketData, setMarketData] = React.useState(initialData);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prevData) => {
        const newData = { ...prevData };
        for (const key in newData) {
          const asset = newData[key];
          const changeFactor = (Math.random() - 0.5) * 0.1;
          const newValue = parseFloat((asset.value * (1 + changeFactor / 100)).toFixed(2));
          const newChange = parseFloat((newValue - asset.value).toFixed(2));
          
          const newHistory = [...asset.history.slice(1), { date: 'Now', value: newValue }];

          newData[key] = {
            ...asset,
            value: newValue,
            change: newChange,
            high: Math.max(asset.high, newValue),
            low: Math.min(asset.low, newValue),
            history: newHistory,
          };
        }
        return newData;
      });
    }, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Market Snapshot"
        description={`Here is your real-time market overview for ${new Date().toLocaleDateString(
          'en-US',
          {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }
        )}.`}
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.values(marketData).map((data) => (
          <MarketCard key={data.name} data={data} />
        ))}
      </div>
    </div>
  );
}
