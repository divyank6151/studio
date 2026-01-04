'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutGrid,
  Newspaper,
  MessageCircle,
  PenSquare,
  Smile,
  Users,
  SlidersHorizontal,
  AreaChart,
} from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

export const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutGrid },
  { href: '/market-snapshot', label: 'Market Snapshot', icon: AreaChart },
  { href: '/briefing', label: 'Daily Briefing', icon: Newspaper },
  { href: '/comment-intelligence', label: 'Comment Intelligence', icon: MessageCircle },
  { href: '/content-engine', label: 'Content Engine', icon: PenSquare },
  { href: '/sentiment-tool', label: 'Sentiment Tool', icon: Smile },
  { href: '/community', label: 'Inner Circle', icon: Users },
  { href: '/automations', label: 'Automations', icon: SlidersHorizontal },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} prefetch={false}>
            <SidebarMenuButton
              isActive={pathname === item.href}
              tooltip={item.label}
            >
              <item.icon />
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
