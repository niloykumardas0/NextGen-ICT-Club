
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Award, FileText, Download, Play, CheckCircle2, Shield, Zap, TrendingUp, Users, Code, Cpu, ShieldAlert } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero Status Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-primary/5 p-8 rounded-[2rem] border border-primary/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="space-y-2">
          <Badge className="bg-primary text-white border-none px-4 py-1 font-bold uppercase tracking-widest text-[10px]">Candidate Status: Active</Badge>
          <h1 className="text-4xl font-headline font-bold mb-2">Vanguard Command Center</h1>
          <p className="text-slate-400 max-w-md">Welcome back, Agent. Your ICT training modules are being prepared. Get ready for the next phase.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-center min-w-[100px]">
            <p className="text-[10px] uppercase text-slate-500 font-bold tracking-widest mb-1">XP Points</p>
            <p className="text-xl font-bold text-secondary">1,250</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="glass-panel border-none group hover:bg-white/5 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" /> Olympiad Preparation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">82%</div>
            <Progress value={82} className="h-1.5 bg-white/5" />
          </CardContent>
        </Card>

        <Card className="glass-panel border-none group hover:bg-white/5 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" /> Club Residency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">Vanguard</div>
            <p className="text-[10px] text-slate-500 font-bold uppercase">Membership Unit: Elite</p>
          </CardContent>
        </Card>
      </div>

      {/* Future Skills Preview */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-headline font-bold text-white uppercase tracking-widest flex items-center gap-3">
            <Zap className="w-5 h-5 text-secondary" /> Upcoming Tech Modules
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Code, title: "Web Dev 101", status: "Coming Soon", color: "bg-blue-500" },
            { icon: Cpu, title: "AI & ML Basics", status: "Locked", color: "bg-purple-500" },
            { icon: ShieldAlert, title: "Security Protocols", status: "Coming Soon", color: "bg-red-500" },
            { icon: TrendingUp, title: "Tech Career Guide", status: "Planned", color: "bg-green-500" }
          ].map((skill, i) => (
            <Card key={i} className="bg-[#050510] border-white/5 p-6 rounded-3xl relative overflow-hidden group">
              <div className={`w-10 h-10 rounded-xl ${skill.color}/20 flex items-center justify-center mb-4`}>
                <skill.icon className={`w-5 h-5 ${skill.color.replace('bg-', 'text-')}`} />
              </div>
              <h4 className="font-bold text-white mb-1">{skill.title}</h4>
              <Badge variant="outline" className="text-[9px] uppercase border-white/10 text-slate-500">{skill.status}</Badge>
              <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 glass-panel border-none">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Quick Access</CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-4">
            <Button className="w-full justify-start gap-4 h-14 rounded-2xl bg-primary hover:bg-primary/90">
              <Play className="w-5 h-5" /> Start MCQ Mock Test
            </Button>
            <Button variant="outline" className="w-full justify-start gap-4 h-14 rounded-2xl border-white/10 text-white">
              <Download className="w-5 h-5" /> Download Syllabus
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-panel border-none">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Vanguard News</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "National Exam v2.4", time: "2h ago", icon: Shield },
              { title: "Learning Hub Update", time: "5h ago", icon: Zap }
            ].map((news, i) => (
              <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                 <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <news.icon className="w-5 h-5 text-primary" />
                 </div>
                 <div>
                    <h4 className="font-bold text-sm">{news.title}</h4>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">{news.time}</span>
                 </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
