
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Clock, AlertCircle, Calendar, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useDoc, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export function RegistrationHeader() {
  const firestore = useFirestore();
  const { data: config, loading } = useDoc(firestore ? doc(firestore, 'settings', 'olympiad') : null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [hasTimedOut, setHasTimedOut] = useState(false);

  // Safety timeout to prevent perpetual loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) setHasTimedOut(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    if (!config || !config.registrationDeadline || config.isRegistrationEnabled === false) {
      setTimeLeft(null);
      return;
    }

    const calculateTimeLeft = () => {
      const targetDate = new Date(config.registrationDeadline).getTime();
      const now = new Date().getTime();
      
      if (isNaN(targetDate)) return null;

      const distance = targetDate - now;

      if (distance < 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
      } else {
        return {
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
          isExpired: false,
        };
      }
    };

    const initialTime = calculateTimeLeft();
    setTimeLeft(initialTime);

    const timer = setInterval(() => {
      const updatedTime = calculateTimeLeft();
      setTimeLeft(updatedTime);
      if (updatedTime?.isExpired) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [config]);

  const isRegistrationClosed = config?.isRegistrationEnabled === false || (timeLeft && timeLeft.isExpired);
  const showTimer = !!config?.registrationDeadline && timeLeft && !timeLeft.isExpired;
  const isActuallyLoading = loading && !hasTimedOut;

  return (
    <div className="text-center space-y-6 md:space-y-10 animate-in fade-in slide-in-from-top-4 duration-1000 px-4">
      <div className="space-y-4">
        <Badge className="bg-primary/10 text-primary border-primary/20 uppercase tracking-[0.2em] md:tracking-[0.3em] px-4 md:px-6 py-2 font-bold text-[8px] md:text-[10px]">
          Official Registration Portal 2026
        </Badge>
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-headline font-bold uppercase leading-tight text-slate-900">
          National <span className="text-primary italic">ICT</span> Olympiad
        </h1>
        <p className="text-sm md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          আপনার প্রযুক্তিগত মেধা যাচাই করুন এবং জাতীয় পর্যায়ে নিজের স্থান নিশ্চিত করুন। আজই নাম নিবন্ধন করুন।
        </p>
      </div>

      <div className="min-h-[120px] md:min-h-[150px] flex items-center justify-center">
        {isActuallyLoading ? (
          <div className="flex flex-col items-center gap-4">
            <RefreshCw className="w-6 h-6 md:w-8 md:h-8 text-primary animate-spin opacity-40" />
            <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Synchronizing Pulse...</p>
          </div>
        ) : showTimer ? (
          <div className="max-w-2xl mx-auto space-y-4 md:space-y-6 w-full animate-in zoom-in duration-500">
            <div className="grid grid-cols-4 gap-2 md:gap-8">
              {[
                { label: 'Days', val: timeLeft.days },
                { label: 'Hours', val: timeLeft.hours },
                { label: 'Mins', val: timeLeft.minutes },
                { label: 'Secs', val: timeLeft.seconds }
              ].map((unit, i) => (
                <div key={i} className="relative group">
                  <div className="bg-white border border-slate-100 p-3 md:p-8 rounded-xl md:rounded-[2rem] shadow-xl group-hover:border-primary/30 transition-all group-hover:shadow-primary/10">
                    <span className="text-xl md:text-5xl font-headline font-bold text-slate-900 block mb-1">
                      {unit.val < 10 ? `0${unit.val}` : unit.val}
                    </span>
                    <span className="text-[8px] md:text-xs uppercase text-slate-400 font-bold tracking-widest">{unit.label}</span>
                  </div>
                  {i < 3 && <span className="absolute -right-1 md:-right-4 top-1/2 -translate-y-1/2 text-slate-200 text-lg md:text-3xl font-bold hidden md:block">:</span>}
                </div>
              ))}
            </div>
            <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 bg-red-50 text-red-600 rounded-full border border-red-100 animate-pulse">
              <Clock className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-[8px] md:text-xs font-bold uppercase tracking-widest">Registration Closing Soon!</span>
            </div>
          </div>
        ) : (
          <div className="p-6 md:p-8 bg-slate-50/50 rounded-2xl md:rounded-[2.5rem] border border-dashed border-slate-200 max-w-lg mx-auto w-full animate-in fade-in">
             <Calendar className="w-6 h-6 md:w-8 md:h-8 text-slate-300 mx-auto mb-3" />
             <p className="text-slate-500 text-xs md:text-sm font-medium">নিবন্ধনের সময়সীমা শীঘ্রই ঘোষণা করা হবে।</p>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 pt-6">
        <Link href="/dashboard/exam" className="w-full sm:w-auto">
          <Button size="lg" className="w-full sm:w-auto rounded-full px-8 md:px-12 h-14 md:h-16 text-lg md:text-xl font-bold bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/20 gap-3 group">
            <PlayCircle className="w-6 h-6 md:w-7 md:h-7" /> Mock Test Start
          </Button>
        </Link>
        
        {!isActuallyLoading && isRegistrationClosed ? (
          <div className="flex items-center gap-3 px-8 py-4 bg-slate-100 rounded-full border border-slate-200 text-slate-500 font-bold w-full sm:w-auto justify-center">
            <AlertCircle className="w-5 h-5 md:w-6 md:h-6" /> Registration Closed
          </div>
        ) : (
          <Link href="/register" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-8 md:px-12 h-14 md:h-16 text-lg md:text-xl font-bold border-2 border-slate-200 hover:border-primary hover:text-primary transition-all">
              Registration Now
            </Button>
          </Link>
        )}
      </div>

      <div className="flex items-center justify-center gap-4 md:gap-8 pt-8 opacity-50">
        <div className="flex items-center gap-2">
           <Badge variant="secondary" className="bg-slate-200 text-[8px] md:text-[10px]">Verified</Badge>
           <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest hidden sm:inline">National Unit</span>
        </div>
        <div className="flex items-center gap-2">
           <Badge variant="secondary" className="bg-slate-200 text-[8px] md:text-[10px]">Secure</Badge>
           <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest hidden sm:inline">SSL Encrypted</span>
        </div>
      </div>
    </div>
  );
}
