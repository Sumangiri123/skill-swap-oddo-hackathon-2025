'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Swords, Settings, Search, PanelLeft } from 'lucide-react';
import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { UserProvider } from '@/context/UserContext';

const navItems = [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/dashboard/browse', icon: Search, label: 'Browse Skills' },
    { href: '/dashboard/swaps', icon: Swords, label: 'Swaps' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <UserProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              href="/dashboard"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Logo />
              <span className="sr-only">SkillHub</span>
            </Link>
            <TooltipProvider>
                {navItems.map((item) => (
                    <Tooltip key={item.href}>
                        <TooltipTrigger asChild>
                        <Link
                            href={item.href}
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                        >
                            <item.icon className="h-5 w-5" />
                            <span className="sr-only">{item.label}</span>
                        </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">{item.label}</TooltipContent>
                    </Tooltip>
                ))}
            </TooltipProvider>
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/dashboard/settings"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <Settings className="h-5 w-5" />
                    <span className="sr-only">Settings</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Settings</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </aside>
        <div className="flex flex-col sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden">
                    <PanelLeft className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                    <SheetHeader className="sr-only">
                      <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                    <nav className="grid gap-6 text-lg font-medium">
                    <Link
                        href="/dashboard"
                        onClick={() => setIsSheetOpen(false)}
                        className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                    >
                        <Logo />
                        <span className="sr-only">SkillHub</span>
                    </Link>
                    {navItems.map(item => (
                        <Link key={item.href} href={item.href} onClick={() => setIsSheetOpen(false)} className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </Link>
                    ))}
                    </nav>
                </SheetContent>
            </Sheet>

            <div className="relative ml-auto flex-1 md:grow-0"></div>
            <UserNav />
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-4 md:gap-8">
            {children}
          </main>
        </div>
        <Toaster />
      </div>
    </UserProvider>
  );
}
