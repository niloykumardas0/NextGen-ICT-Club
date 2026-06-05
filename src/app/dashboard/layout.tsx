
"use client"

import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset, SidebarFooter } from '@/components/ui/sidebar';
import { LayoutDashboard, Award, Users, Trophy, BookOpen, Shield, LogOut, Settings, MessageSquare, Terminal, FileCheck } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const menuItems = [
  { icon: LayoutDashboard, label: 'Command Center', href: '/dashboard' },
  { icon: Terminal, label: 'Vanguard Terminal', href: '/dashboard/exam' },
  { icon: FileCheck, label: 'My Certificates', href: '/dashboard/certificates' },
  { icon: Trophy, label: 'Leaderboard', href: '/dashboard/leaderboard' },
  { icon: Users, label: 'Club Hub', href: '/dashboard/membership' },
  { icon: Shield, label: 'Ambassador Portal', href: '/dashboard/ambassador' },
  { icon: BookOpen, label: 'Learning Center', href: '/dashboard/resources' },
];

const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 flex items-center justify-center shrink-0">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary/40" />
        <path d="M30 70 L30 30 L55 55 L55 30" fill="none" stroke="hsl(var(--primary))" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M75 45 L75 70 L45 70 L45 55 L60 55" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    <span className="font-headline font-bold text-xl group-data-[collapsible=icon]:hidden">
      NEXTGEN <span className="text-primary">ICT</span>
    </span>
  </div>
);

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-[#020205] overflow-hidden text-white">
        <Sidebar className="border-r border-white/5 bg-[#05050a]/80 backdrop-blur-xl" collapsible="icon">
          <SidebarHeader className="p-6">
            <Link href="/">
              <Logo />
            </Link>
          </SidebarHeader>
          <SidebarContent className="p-4">
            <SidebarMenu className="gap-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href}
                    tooltip={item.label}
                    className={`h-12 px-4 rounded-xl transition-all duration-300 ${pathname === item.href ? 'bg-primary text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]' : 'hover:bg-white/5'}`}
                  >
                    <Link href={item.href}>
                      <item.icon className={`w-5 h-5 ${pathname === item.href ? 'text-white' : 'text-muted-foreground'}`} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-6 border-t border-white/5">
             <div className="flex items-center gap-4 group-data-[collapsible=icon]:justify-center">
                <Avatar className="h-10 w-10 ring-2 ring-primary/20 shadow-lg">
                  <AvatarImage src="https://picsum.photos/seed/user/200/200" />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                  <span className="text-sm font-bold">Candidate</span>
                  <span className="text-[10px] text-primary uppercase tracking-[0.2em] font-bold">Member Unit</span>
                </div>
             </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="flex flex-col relative overflow-y-auto bg-[#020205]">
          <header className="h-20 border-b border-white/5 bg-[#020205]/60 backdrop-blur-xl sticky top-0 z-40 px-8 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <SidebarTrigger className="hover:text-primary transition-colors" />
              <div className="h-6 w-px bg-white/10" />
              <h2 className="text-sm font-headline font-bold text-muted-foreground uppercase tracking-widest">
                {pathname.split('/').pop() || 'Command Center'}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-white/5 h-10 w-10">
                <MessageSquare className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-white/5 h-10 w-10">
                <Settings className="w-5 h-5" />
              </Button>
              <div className="w-px h-6 bg-white/10 mx-2" />
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-white/5 h-10 w-10" asChild>
                <Link href="/">
                  <LogOut className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </header>
          <main className="flex-1 p-8 md:p-12 lg:p-16">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
