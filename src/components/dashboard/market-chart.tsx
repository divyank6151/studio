'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts';

type MarketChartProps = {
  data: { date: string; value: number }[];
  isPositive: boolean;
};

export function MarketChart({ data, isPositive }: MarketChartProps) {
  const strokeColor = isPositive ? 'hsl(142.1 76.2% 42.2%)' : 'hsl(0 84.2% 60.2%)';
  const areaColor = isPositive ? 'hsl(142.1 76.2% 42.2% / 0.1)' : 'hsl(0 84.2% 60.2% / 0.1)';

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
      >
        <defs>
          <linearGradient id={isPositive ? "colorUv" : "colorPv"} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={strokeColor} stopOpacity={0.2}/>
            <stop offset="95%" stopColor={strokeColor} stopOpacity={0}/>
          </linearGradient>
        </defs>
        <Tooltip
          contentStyle={{
            background: 'hsl(var(--background))',
            borderColor: 'hsl(var(--border))',
            borderRadius: 'var(--radius)',
            fontSize: '12px',
          }}
          labelStyle={{
            color: 'hsl(var(--foreground))',
            fontWeight: 'bold',
          }}
          formatter={(value: number) => [value.toFixed(2), 'Value']}
        />
        <YAxis domain={['dataMin', 'dataMax']} hide />
        <Line
          type="monotone"
          dataKey="value"
          stroke={strokeColor}
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
