import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      width="130"
      height="40"
      {...props}
    >
      <text
        x="10"
        y="35"
        fontFamily="'Space Grotesk', sans-serif"
        fontSize="30"
        fontWeight="bold"
        fill="hsl(var(--sidebar-foreground))"
        className="fill-primary-foreground dark:fill-primary"
      >
        MarketPulse
        <tspan fill="hsl(var(--accent))" className="fill-accent"> Pro</tspan>
      </text>
    </svg>
  );
}
