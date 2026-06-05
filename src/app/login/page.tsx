'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Shield, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleDemoLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-32">
        <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="text-center">
             <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Shield className="w-10 h-10 text-primary" />
             </div>
             <h1 className="text-4xl font-headline font-bold text-slate-900">Login</h1>
             <p className="text-slate-500 mt-2">NextGen ICT Club Member Portal</p>
          </div>

          <Card className="shadow-2xl border-none p-2 bg-white rounded-[2rem]">
            <CardContent className="p-8 space-y-6">
              <form onSubmit={handleDemoLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-bold text-slate-700">Email Address</Label>
                  <Input id="email" type="email" placeholder="alex@nextgen.tech" className="h-14 rounded-xl border-slate-100" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" title="password" className="font-bold text-slate-700">Access Key</Label>
                    <Link href="#" className="text-xs text-primary font-bold">Forgot Key?</Link>
                  </div>
                  <Input id="password" type="password" className="h-14 rounded-xl border-slate-100" placeholder="••••••••" />
                </div>
                <Button type="submit" className="w-full h-14 text-xl font-bold rounded-xl shadow-xl shadow-primary/20 gap-2">
                  Login to Dashboard <ArrowRight className="w-5 h-5" />
                </Button>
                
                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-slate-400 font-bold">New Member?</span></div>
                </div>

                <Link href="/register" className="block">
                  <Button variant="outline" type="button" className="w-full h-14 text-lg font-bold rounded-xl border-slate-200 hover:bg-slate-50">
                    Registration Now
                  </Button>
                </Link>
              </form>
            </CardContent>
          </Card>
          
          <p className="text-center text-slate-400 text-xs font-medium">
            Protected by NextGen Security Protocols.
          </p>
        </div>
      </main>
    </div>
  );
}
