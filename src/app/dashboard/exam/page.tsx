
"use client"

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Monitor, CheckCircle2, Clock, AlertTriangle, ChevronLeft, ChevronRight, XCircle, Award, RotateCcw, BookOpen, Languages, Cpu, Shield, Zap, Eye, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function ExamPortal() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [examStarted, setExamStarted] = useState(false);
  const [disqualified, setDisqualified] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 mins
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isMonitoring, setIsMonitoring] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const categoryData = {
    ICT: [
      { q: "Which protocol is responsible for securing data transmission over the web?", options: ['HTTP', 'FTP', 'HTTPS', 'SMTP'], correct: 2 },
      { q: "What is the primary role of an Operating System?", options: ['Game development', 'Resource management', 'Web browsing', 'Email storage'], correct: 1 },
      { q: "Example of a decentralized database technology?", options: ['SQL Server', 'Oracle', 'Blockchain', 'MySQL'], correct: 2 },
      { q: "What does AI stand for in computer science?", options: ['Actual Intelligence', 'Artificial Intelligence', 'Automated Interface', 'Advanced Integration'], correct: 1 }
    ],
    GK: [
      { q: "When was the first industrial revolution roughly?", options: ['1760', '1860', '1960', '1660'], correct: 0 },
      { q: "The 'Father of Modern Computing' is considered to be?", options: ['Bill Gates', 'Steve Jobs', 'Alan Turing', 'Ada Lovelace'], correct: 2 },
      { q: "Which country is known as the 'Land of the Rising Sun'?", options: ['China', 'Japan', 'South Korea', 'Thailand'], correct: 1 }
    ],
    English: [
      { q: "Select the correct form: 'She ______ to the store yesterday.'", options: ['go', 'goes', 'went', 'gone'], correct: 2 },
      { q: "Synonym for 'Resilient'?", options: ['Weak', 'Tough', 'Shy', 'Angry'], correct: 1 },
      { q: "Correct spelling?", options: ['Acommodation', 'Accommodation', 'Accomodation', 'Acomodation'], correct: 1 }
    ]
  };

  const activeQuestions = selectedCategory ? (categoryData as any)[selectedCategory] : [];

  const calculateResults = () => {
    let correctCount = 0;
    activeQuestions.forEach((q: any, index: number) => {
      if (selectedAnswers[index] === q.correct) {
        correctCount++;
      }
    });
    return {
      total: activeQuestions.length,
      correct: correctCount,
      incorrect: activeQuestions.length - correctCount,
      percentage: Math.round((correctCount / activeQuestions.length) * 100)
    };
  };

  const handleDisqualification = (reason: string) => {
    if (showResults) return;
    setDisqualified(true);
    setExamStarted(false);
    toast({ variant: "destructive", title: "Protocol Violation", description: reason });
  };

  useEffect(() => {
    if (examStarted && !showResults) {
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
          handleDisqualification("Security Protocol Breached: Focus Lost.");
        }
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      const monitorInterval = setInterval(() => {
        setIsMonitoring(prev => !prev);
      }, 3000);

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        clearInterval(monitorInterval);
      };
    }
  }, [examStarted, showResults]);

  const startExam = (category: string) => {
    setSelectedCategory(category);
    setExamStarted(true);
    setShowResults(false);
    setSelectedAnswers({});
    setCurrentQuestion(0);
    setTimeLeft(1800);
    toast({ title: "Smart Proctoring Active", description: "AI is now monitoring your session. Good luck!" });
  };

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [currentQuestion]: optionIndex }));
  };

  const finishExam = () => {
    setShowResults(true);
    setExamStarted(false);
  };

  useEffect(() => {
    if (examStarted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (examStarted && timeLeft === 0) {
      finishExam();
    }
  }, [examStarted, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (disqualified) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] px-4 bg-[#020205]">
        <Card className="max-w-md w-full p-8 md:p-12 text-center bg-red-950/20 border-red-500/30 space-y-8 rounded-[2rem] md:rounded-[3rem] shadow-[0_0_50px_rgba(239,68,68,0.1)]">
          <div className="relative mx-auto w-16 h-16 md:w-24 md:h-24">
            <XCircle className="w-full h-full text-red-500 animate-pulse" />
            <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full"></div>
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-headline font-bold text-red-500 uppercase tracking-tighter">Disqualified</h1>
            <p className="text-slate-400 text-sm md:text-lg">Your access has been revoked due to a security violation.</p>
          </div>
          <Button onClick={() => router.push('/dashboard')} className="w-full h-12 md:h-14 bg-red-600 hover:bg-red-700 text-white rounded-xl md:rounded-2xl font-bold text-lg"> Return to Terminal </Button>
        </Card>
      </div>
    );
  }

  if (showResults) {
    const res = calculateResults();
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 animate-in fade-in duration-1000">
        <Card className="bg-[#050510] border-white/5 p-8 md:p-16 text-center relative overflow-hidden rounded-[2rem] md:rounded-[4rem] shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <Award className="w-20 h-20 md:w-28 md:h-28 text-primary mx-auto mb-8 drop-shadow-[0_0_30px_rgba(37,99,235,0.6)]" />
          <h1 className="text-3xl md:text-5xl font-headline font-bold text-white mb-4 uppercase">{selectedCategory} Evaluation</h1>
          <p className="text-slate-500 mb-8 md:mb-12 font-bold uppercase tracking-[0.2em] md:tracking-[0.5em] text-[10px] md:text-xs">Credential Authenticated | Session 2026</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
            {[
              { label: 'Questions', val: res.total, color: 'bg-white/5 text-white' },
              { label: 'Correct', val: res.correct, color: 'bg-green-500/10 text-green-500' },
              { label: 'Incorrect', val: res.incorrect, color: 'bg-red-500/10 text-red-500' },
              { label: 'Accuracy', val: `${res.percentage}%`, color: 'bg-primary/10 text-primary' }
            ].map((item, i) => (
              <div key={i} className={cn(item.color, "p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/5 flex flex-col items-center justify-center")}>
                <p className="text-[8px] md:text-[10px] uppercase font-bold tracking-[0.1em] md:tracking-[0.2em] mb-1 md:mb-2 opacity-50">{item.label}</p>
                <p className="text-xl md:text-4xl font-bold">{item.val}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
             <Button onClick={() => setShowResults(false)} size="lg" className="w-full sm:w-auto h-14 md:h-16 px-10 md:px-12 rounded-xl md:rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg md:text-xl gap-3 shadow-xl shadow-primary/20">
               <RotateCcw className="w-5 h-5 md:w-6 md:h-6" /> Retry Mission
             </Button>
             <Button variant="outline" size="lg" onClick={() => router.push('/dashboard')} className="w-full sm:w-auto h-14 md:h-16 px-10 md:px-12 rounded-xl md:rounded-2xl border-white/10 hover:bg-white/5 text-white font-bold text-lg md:text-xl">
               Back to Command
             </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!examStarted) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-8 md:space-y-16">
        <div className="text-center space-y-4 md:space-y-6">
          <Badge className="bg-primary/20 text-primary border-none uppercase tracking-[0.2em] md:tracking-[0.3em] px-4 md:px-6 py-2 font-bold text-[10px] md:text-xs">Vanguard MCQ Terminal</Badge>
          <h1 className="text-4xl md:text-7xl font-headline font-bold text-white uppercase tracking-tighter leading-none">Select Your <span className="text-primary italic">Mission</span></h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-xl leading-relaxed">Choose your expertise track. Once started, our AI Proctor will monitor the session for focus and integrity.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {[
            { id: 'ICT', icon: Cpu, desc: 'Information Tech', color: 'text-primary' },
            { id: 'GK', icon: Zap, desc: 'Global Facts', color: 'text-secondary' },
            { id: 'English', icon: Languages, desc: 'Linguistics', color: 'text-blue-400' }
          ].map((cat) => (
            <Card key={cat.id} className="bg-[#080812] border-white/5 p-8 md:p-12 text-center hover:border-primary/40 transition-all group cursor-pointer rounded-[2rem] md:rounded-[3.5rem] relative overflow-hidden" onClick={() => startExam(cat.id)}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-6 md:mb-10 bg-white/5 rounded-[1.5rem] md:rounded-[2.5rem] flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/10 transition-all relative z-10">
                <cat.icon className={cn("w-8 h-8 md:w-12 md:h-12", cat.color)} />
              </div>
              <h3 className="text-2xl md:text-3xl font-headline font-bold text-white mb-2 md:mb-3 relative z-10">{cat.id} Track</h3>
              <p className="text-[10px] md:text-[11px] text-slate-500 uppercase font-bold tracking-[0.2em] md:tracking-[0.3em] mb-8 md:mb-10 relative z-10">{cat.desc}</p>
              <Button className="w-full h-12 md:h-14 rounded-xl md:rounded-2xl bg-white/5 hover:bg-primary hover:text-white transition-all font-bold text-base md:text-lg relative z-10">Initialize Terminal</Button>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const activeQuestion = activeQuestions[currentQuestion];

  return (
    <div className="max-w-6xl mx-auto space-y-6 md:space-y-10 px-4 pb-32 min-h-screen text-white animate-in fade-in duration-500">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-6">
        <div className="flex flex-col md:flex-row items-center justify-between bg-[#080812] backdrop-blur-3xl p-4 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/5 shadow-2xl gap-4 md:gap-0">
          <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
             <div className="relative">
                <div className={cn("w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-500", isMonitoring ? "bg-primary animate-pulse shadow-[0_0_15px_rgba(37,99,235,1)]" : "bg-slate-700")}></div>
             </div>
             <div>
                <p className="text-[8px] md:text-[9px] uppercase font-bold tracking-widest text-slate-500">Protocol Status</p>
                <p className="text-xs md:text-sm font-bold text-white">AI Proctor Monitoring</p>
             </div>
          </div>
          
          <div className="hidden md:block h-12 w-px bg-white/10" />

          <div className="text-center">
             <p className="text-[8px] md:text-[9px] uppercase font-bold tracking-widest text-slate-500">Task Progress</p>
             <p className="text-xs md:text-sm font-bold text-white">Unit {currentQuestion + 1} / {activeQuestions.length}</p>
          </div>

          <div className="hidden md:block h-12 w-px bg-white/10" />

          <div className="text-center md:text-right w-full md:w-auto">
            <p className="text-[8px] md:text-[9px] text-slate-500 uppercase font-bold tracking-widest">Time Remaining</p>
            <div className="flex items-center justify-center md:justify-end gap-2 md:gap-3 text-xl md:text-2xl font-bold font-code text-primary">
              <Clock className="w-4 h-4 md:w-5 md:h-5" /> {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </div>

      <Progress value={((currentQuestion + 1) / activeQuestions.length) * 100} className="h-1.5 md:h-2 bg-white/5 rounded-full" />

      {/* Main MCQ Area */}
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        {/* Question Panel */}
        <div className="lg:col-span-12 space-y-6 md:space-y-8">
          <Card className="bg-[#080812] border-white/5 p-6 md:p-12 lg:p-20 shadow-2xl rounded-[2rem] md:rounded-[4rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 md:p-12 opacity-[0.02] pointer-events-none">
               <Cpu className="w-32 h-32 md:w-64 md:h-64" />
            </div>
            
            <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
              <div className="space-y-4 md:space-y-6">
                 <Badge className="bg-primary/10 text-primary border-primary/20 rounded-lg px-3 py-0.5 md:px-4 md:py-1 font-bold text-[10px] md:text-xs">Module {currentQuestion + 1}</Badge>
                 <h3 className="text-xl md:text-3xl lg:text-4xl font-headline font-bold leading-tight tracking-tight text-white">{activeQuestion.q}</h3>
              </div>

              <div className="grid grid-cols-1 gap-3 md:gap-5">
                {activeQuestion.options.map((option: string, i: number) => (
                  <button 
                    key={i} 
                    onClick={() => handleAnswerSelect(i)} 
                    className={cn(
                      "group w-full flex items-center h-auto min-h-[4rem] md:min-h-[6rem] px-4 md:px-10 py-4 md:py-6 text-left rounded-[1.2rem] md:rounded-[2rem] border transition-all duration-300 relative overflow-hidden",
                      selectedAnswers[currentQuestion] === i 
                        ? "bg-primary/10 border-primary text-primary shadow-[0_0_40px_rgba(37,99,235,0.15)]" 
                        : "bg-white/[0.02] border-white/5 text-slate-400 hover:border-white/20 hover:bg-white/[0.05]"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-2xl flex items-center justify-center mr-4 md:mr-8 text-sm md:text-lg font-bold transition-colors",
                      selectedAnswers[currentQuestion] === i ? "bg-primary text-white" : "bg-white/5 text-slate-500 group-hover:bg-white/10"
                    )}>
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span className="flex-1 text-sm md:text-xl font-medium">{option}</span>
                    {selectedAnswers[currentQuestion] === i && (
                      <div className="w-5 h-5 md:w-8 md:h-8 rounded-full bg-primary flex items-center justify-center animate-in zoom-in">
                        <Check className="w-3 h-3 md:w-5 md:h-5 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-8 md:pt-12 border-t border-white/5">
                <Button variant="ghost" disabled={currentQuestion === 0} onClick={() => setCurrentQuestion(prev => prev - 1)} className="h-10 md:h-14 px-4 md:px-8 rounded-xl md:rounded-2xl text-slate-400 hover:bg-white/5 hover:text-white text-sm md:text-lg font-bold gap-2">
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" /> <span className="hidden sm:inline">Previous</span>
                </Button>
                <div className="flex gap-2 md:gap-4">
                  {currentQuestion < activeQuestions.length - 1 ? (
                    <Button onClick={() => setCurrentQuestion(prev => prev + 1)} className="h-12 md:h-16 px-6 md:px-12 rounded-xl md:rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm md:text-lg gap-2">
                      <span className="hidden sm:inline">Next Question</span> <span className="sm:hidden">Next</span> <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                    </Button>
                  ) : (
                    <Button onClick={finishExam} className="h-12 md:h-16 px-6 md:px-12 rounded-xl md:rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm md:text-lg shadow-xl shadow-green-600/20">
                      Submit
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="text-center pt-10">
         <p className="text-[8px] md:text-[10px] text-slate-700 uppercase font-bold tracking-[0.2em] md:tracking-[0.5em]">NextGen ICT Secure Exam Environment v2.5 | Vanguard Encryption Active</p>
      </div>
    </div>
  );
}
