import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Sparkles, Users, Award, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function AmbassadorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
            <div className="lg:w-1/2 space-y-6">
              <Badge className="bg-primary/10 text-primary border-primary/20 uppercase tracking-widest px-4 py-1">
                Student Leadership
              </Badge>
              <h1 className="text-4xl md:text-6xl font-headline font-bold text-slate-900 leading-tight">
                Become an <span className="text-primary">Ambassador</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Join our elite network of student leaders. Represent NextGen ICT Club in your institution, organize events, and gain exclusive professional perks.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "Early access to internships and jobs",
                  "Direct mentorship from tech industry leads",
                  "Event funding for your school/college",
                  "Official certification and merchandise"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-slate-600 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/register">
                <Button size="lg" className="rounded-full px-10 h-14 text-lg font-bold">
                  Apply for Candidacy
                </Button>
              </Link>
            </div>
            <div className="lg:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-2xl border">
                <Image 
                  src="https://picsum.photos/seed/nxg-amb/800/800" 
                  alt="Student Ambassador" 
                  width={800} 
                  height={800}
                  className="w-full object-cover aspect-square"
                  data-ai-hint="student leader"
                />
              </div>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="section-heading uppercase">Why Join the Program?</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card p-10 text-center border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">Leadership</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">Develop project management and leadership skills through real-world event coordination.</p>
            </Card>
            <Card className="glass-card p-10 text-center border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-8">
                <Users className="w-7 h-7 text-slate-600" />
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">Networking</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">Connect with a global network of ambitious students and industry professionals.</p>
            </Card>
            <Card className="glass-card p-10 text-center border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
                <Award className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">Recognition</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">Earn national level recognition and certificates that set you apart from others.</p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}