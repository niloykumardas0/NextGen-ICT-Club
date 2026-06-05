
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Sparkles, Zap, Users, QrCode, Download, Share2, Cpu, Globe, Rocket, TrendingUp } from 'lucide-react';
import Image from 'next/image';

export default function ClubHub() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-headline font-bold mb-2 text-white">Vanguard Residency</h1>
          <p className="text-slate-400 text-sm md:text-base">Manage your NextGen ICT Club residency and digital credentials.</p>
        </div>
        <Badge className="bg-primary/20 text-primary border-primary/30 px-4 md:px-6 py-2 font-bold uppercase tracking-widest text-[8px] md:text-xs w-fit">
          Level 04 Vanguard
        </Badge>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 md:gap-10 items-start">
        {/* Digital Membership Card - Cyber Aesthetic */}
        <div className="space-y-6">
          <h2 className="text-[8px] md:text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Official Digital Identity</h2>
          <div className="relative group">
            <div className="aspect-[1.586/1] w-full rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 relative overflow-hidden bg-[#050510] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 hover:shadow-primary/20">
              {/* Animated Background Elements */}
              <div className="absolute top-0 right-0 w-40 md:w-80 h-40 md:h-80 bg-primary/20 rounded-full blur-[60px] md:blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
              <div className="absolute -bottom-10 md:-bottom-20 -left-10 md:-left-20 w-32 md:w-64 h-32 md:h-64 bg-secondary/10 rounded-full blur-[40px] md:blur-[80px] -z-10 animate-glow-pulse"></div>
              
              <div className="flex justify-between items-start mb-8 md:mb-16 relative">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-primary rounded-lg md:rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                    <Shield className="w-5 h-5 md:w-7 md:h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-lg font-headline font-bold tracking-tight text-white">NEXTGEN ICT</h3>
                    <p className="text-[7px] md:text-[9px] uppercase tracking-[0.2em] text-primary font-bold">Vanguard Elite Unit</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-white/10 text-white text-[7px] md:text-[9px] border-white/20 px-2 md:px-3 py-0.5 md:py-1 font-bold">EST. 2026</Badge>
                </div>
              </div>

              <div className="flex items-end justify-between relative">
                <div className="space-y-1 md:space-y-2">
                  <p className="text-[7px] md:text-[10px] text-slate-500 uppercase font-bold tracking-widest">Residency Holder</p>
                  <h4 className="text-lg md:text-2xl font-headline font-bold text-white mb-1 md:mb-2">ALEX RIVERA</h4>
                  <div className="flex gap-3 md:gap-4">
                     <div>
                       <p className="text-[6px] md:text-[8px] text-slate-600 uppercase font-bold">ID Number</p>
                       <p className="text-[9px] md:text-xs font-code text-primary font-bold">NXG-2026-AR-812</p>
                     </div>
                     <div>
                       <p className="text-[6px] md:text-[8px] text-slate-600 uppercase font-bold">Access Level</p>
                       <p className="text-[9px] md:text-xs font-code text-white font-bold">VANGUARD-4</p>
                     </div>
                  </div>
                </div>
                <div className="p-2 md:p-3 bg-white rounded-lg md:rounded-2xl shadow-inner scale-75 md:scale-100 transition-transform">
                  <QrCode className="w-10 h-10 md:w-16 md:h-16 text-black" />
                </div>
              </div>

              {/* Holographic lines */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
              <div className="absolute bottom-12 left-0 w-full h-px bg-white/5"></div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="flex-1 h-12 md:h-14 rounded-xl md:rounded-2xl gap-3 border-white/10 hover:bg-white/5 text-white font-bold text-sm md:text-base">
              <Download className="w-4 h-4 md:w-5 md:h-5" /> Save to Wallet
            </Button>
            <Button variant="outline" className="flex-1 h-12 md:h-14 rounded-xl md:rounded-2xl gap-3 border-white/10 hover:bg-white/5 text-white font-bold text-sm md:text-base">
              <Share2 className="w-4 h-4 md:w-5 md:h-5" /> Share ID
            </Button>
          </div>
        </div>

        {/* Residency Perks & Stats */}
        <div className="space-y-6 md:space-y-8">
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {[
              { label: 'Olympiads', val: '04', icon: Rocket },
              { label: 'Points', val: '1.2k', icon: Zap },
              { label: 'Rank', val: '#42', icon: TrendingUp }
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/5 rounded-[1.2rem] md:rounded-[2rem] p-4 md:p-6 text-center group hover:border-primary/30 transition-all">
                <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-slate-500 mx-auto mb-2 md:mb-3 group-hover:text-primary transition-colors" />
                <p className="text-lg md:text-2xl font-bold text-white mb-0.5 md:mb-1">{stat.val}</p>
                <p className="text-[7px] md:text-[9px] text-slate-500 uppercase font-bold tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>

          <Card className="glass-panel border-none rounded-[1.5rem] md:rounded-[2.5rem]">
            <CardHeader className="p-6 md:p-8">
              <CardTitle className="font-headline text-lg md:text-xl text-white">Elite Residency Perks</CardTitle>
              <CardDescription className="text-slate-400 text-xs md:text-sm">আপনার বর্তমান টায়ারের জন্য সক্রিয় সুবিধাসমূহ।</CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8 pt-0 md:pt-0 space-y-6">
              {[
                { icon: Cpu, title: "Cloud Sandbox Access", desc: "Build & host your projects on our Vanguard Cloud for free." },
                { icon: Globe, title: "Global Network", desc: "Connect with tech leaders and students in 12+ countries." },
                { icon: Sparkles, title: "Proctor Exemption", desc: "Fast-track verification for minor local competitions." },
              ].map((perk, i) => (
                <div key={i} className="flex gap-4 md:gap-5 items-start group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                    <perk.icon className="w-4 h-4 md:w-5 md:h-5 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-xs md:text-sm font-bold text-white">{perk.title}</h5>
                    <p className="text-[10px] md:text-xs text-slate-400 leading-relaxed">{perk.desc}</p>
                  </div>
                </div>
              ))}
              <Button className="w-full h-10 md:h-12 rounded-xl mt-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs md:text-sm">
                View All Tier Benefits
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
