"use client"

import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Award, ShieldCheck, Search, Download, FileCheck } from 'lucide-react';
import { useState } from 'react';

export default function CertificatesPage() {
  const [certId, setCertId] = useState('');
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState<null | 'not_found' | 'found'>(null);

  const handleVerify = () => {
    setSearching(true);
    // Simulation
    setTimeout(() => {
      setSearching(false);
      if (certId.toUpperCase() === 'NXG-DEMO-2026') {
        setResult('found');
      } else {
        setResult('not_found');
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      <main className="flex-1 pt-32 pb-20 container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <Badge variant="outline" className="text-primary border-primary uppercase font-bold tracking-widest">Verification Portal</Badge>
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-slate-900 uppercase">Olympiad Certificates</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              আপনার সার্টিফিকেট আইডি ব্যবহার করে অর্জন যাচাই করুন এবং ডিজিটাল কপি সংগ্রহ করুন।
            </p>
          </div>

          <Card className="shadow-2xl border-none overflow-hidden rounded-3xl">
            <CardHeader className="bg-primary text-white p-8 md:p-12 text-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full opacity-10">
                 < Award className="w-64 h-64 -translate-x-1/2 -translate-y-1/2" />
               </div>
               <CardTitle className="text-2xl md:text-3xl font-headline font-bold relative z-10">Verify Your Achievement</CardTitle>
               <CardDescription className="text-primary-foreground/80 relative z-10">Enter your Certificate ID to validate authenticity.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 md:p-12 space-y-8 bg-white">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Input 
                    placeholder="E.g., NXG-2026-XXXX" 
                    className="h-14 pl-12 text-lg font-bold uppercase rounded-2xl" 
                    value={certId}
                    onChange={(e) => setCertId(e.target.value)}
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                </div>
                <Button 
                  onClick={handleVerify} 
                  disabled={searching || !certId}
                  className="h-14 px-8 rounded-2xl font-bold text-lg gap-2"
                >
                  {searching ? 'Searching...' : 'Verify Now'}
                </Button>
              </div>

              {result === 'found' && (
                <div className="p-8 bg-green-50 border border-green-100 rounded-3xl animate-in zoom-in duration-300">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-headline font-bold text-green-800">Certificate Verified!</h3>
                      <p className="text-green-700/80 mb-4">This certificate was officially issued by NextGen ICT Club on Jan 2026.</p>
                      <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        <Button className="bg-green-600 hover:bg-green-700 rounded-xl gap-2 h-12">
                          <Download className="w-4 h-4" /> Download PDF
                        </Button>
                        <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-100 rounded-xl gap-2 h-12">
                          <FileCheck className="w-4 h-4" /> View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {result === 'not_found' && (
                <div className="p-8 bg-slate-50 border border-slate-200 rounded-3xl text-center space-y-2 animate-in slide-in-from-bottom-4">
                  <p className="text-lg font-bold text-slate-800">No record found.</p>
                  <p className="text-sm text-slate-500">অনুগ্রহ করে আইডিটি পুনরায় চেক করুন। ডেমো আইডি হিসেবে `NXG-DEMO-2026` ব্যবহার করে দেখতে পারেন।</p>
                </div>
              )}

              {!result && !searching && (
                <div className="text-center p-8 border-2 border-dashed border-slate-100 rounded-3xl">
                  <Award className="w-12 h-12 text-slate-100 mx-auto mb-4" />
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Waiting for input...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
