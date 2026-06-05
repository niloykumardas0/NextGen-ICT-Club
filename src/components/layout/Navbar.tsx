
"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, LogIn, UserPlus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Olympiad Guide', href: '/olympiad', highlighted: true },
    { name: 'Certificates', href: '/certificates' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'Events', href: '/events' },
    { name: 'Ambassadors', href: '/ambassador' },
    { name: 'About', href: '/about' },
  ];

  const Logo = () => (
    <div className="flex items-center gap-2 group">
      <div className="relative w-12 h-12 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary/20" />
          <path d="M30 70 L30 30 L55 55 L55 30" fill="none" stroke="hsl(var(--primary))" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M75 45 L75 70 L45 70 L45 55 L60 55" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="65" y="25" width="5" height="5" fill="hsl(var(--primary))" />
          <rect x="72" y="30" width="5" height="5" fill="hsl(var(--primary))" />
          <rect x="65" y="35" width="5" height="5" fill="currentColor" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="font-headline text-lg font-bold tracking-tight text-foreground leading-none">
          NEXTGEN <span className="text-primary">ICT</span>
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">CLUB</span>
      </div>
    </div>
  );

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      scrolled ? "bg-white/95 backdrop-blur-md border-b py-3 shadow-sm" : "bg-transparent py-5"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={cn(
                  "text-sm font-bold transition-colors flex items-center gap-1",
                  link.highlighted ? "text-primary hover:text-primary/80" : "text-muted-foreground hover:text-primary"
                )}
              >
                {link.name}
                {link.highlighted && <div className="w-1 h-1 rounded-full bg-primary" />}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="font-bold text-muted-foreground hover:text-primary">Login</Button>
            </Link>
            <Link href="/register">
              <Button className="rounded-full px-6 font-bold shadow-md shadow-primary/20">
                Registration
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden p-2 text-foreground focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-8 h-8 text-primary" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b absolute top-full left-0 w-full p-6 space-y-8 animate-in fade-in slide-in-from-top-2 shadow-2xl z-50">
          <div className="space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block text-xl font-bold py-3 border-b border-slate-50",
                  link.highlighted ? "text-primary" : "text-slate-900"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="flex flex-col gap-4 pt-4">
            <Link href="/login" onClick={() => setIsOpen(false)} className="w-full">
              <Button variant="outline" className="w-full h-14 text-xl font-bold rounded-2xl gap-3 border-slate-200">
                <LogIn className="w-6 h-6 text-primary" /> Login
              </Button>
            </Link>
            <Link href="/register" onClick={() => setIsOpen(false)} className="w-full">
              <Button className="w-full h-14 text-xl font-bold rounded-2xl gap-3 shadow-lg shadow-primary/20">
                <UserPlus className="w-6 h-6" /> Registration
              </Button>
            </Link>
          </div>
          
          <div className="text-center pt-4">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">© 2026 NextGen ICT Club</p>
          </div>
        </div>
      )}
    </nav>
  );
}
