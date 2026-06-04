"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Award, Download, ExternalLink, FileCheck, ShieldCheck } from 'lucide-react';

export default function DashboardCertificates() {
  const myCertificates = [
    {
      id: "NXG-2026-AR-812",
      title: "Olympiad Participation",
      event: "National ICT Olympiad 2026",
      date: "Jan 12, 2026",
      status: "Verified"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-headline font-bold mb-2">My Certificates</h1>
        <p className="text-muted-foreground">আপনার সব অর্জন এবং সার্টিফিকেট এখান থেকে ম্যানেজ করুন।</p>
      </div>

      <div className="grid gap-6">
        {myCertificates.map((cert, i) => (
          <Card key={i} className="glass-panel border-none overflow-hidden group">
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 border border-primary/20">
                <Award className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex-1 text-center md:text-left space-y-1">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <Badge className="bg-green-500/20 text-green-500 border-green-500/20 gap-1 flex items-center">
                    <ShieldCheck className="w-3 h-3" /> {cert.status}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground font-code">{cert.id}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{cert.title}</h3>
                <p className="text-sm text-slate-400">{cert.event} | {cert.date}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <Button variant="outline" className="h-11 border-white/10 hover:bg-white/5 text-white gap-2">
                  <Download className="w-4 h-4" /> Download
                </Button>
                <Button className="h-11 bg-primary hover:bg-primary/90 text-white font-bold gap-2">
                  <ExternalLink className="w-4 h-4" /> Share
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {myCertificates.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <FileCheck className="w-16 h-16 text-white/10 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white">No certificates found</h3>
            <p className="text-slate-500 text-sm">আপনি অলিম্পিয়াড সম্পন্ন করলে এখানে সার্টিফিকেট দেখতে পাবেন।</p>
          </div>
        )}
      </div>

      <Card className="bg-primary/5 border border-primary/20 p-6 rounded-2xl">
        <div className="flex items-center gap-4">
          <ShieldCheck className="w-6 h-6 text-primary" />
          <p className="text-xs text-slate-300">
            <strong>বিঃদ্রঃ:</strong> আমাদের সকল সার্টিফিকেট ডিজিটালভাবে ভেরিফাইড এবং কিউআর কোড (QR Code) যুক্ত। যেকোনো প্রতিষ্ঠান থেকে এটি অনলাইনে যাচাই করা সম্ভব।
          </p>
        </div>
      </Card>
    </div>
  );
}
