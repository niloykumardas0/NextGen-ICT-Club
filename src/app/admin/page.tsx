'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useDoc, useFirestore } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from '@/hooks/use-toast';
import { Shield, Save, RefreshCw, Sparkles, Wand2, FileQuestion, Send, CheckCircle2 } from 'lucide-react';
import { aiDraftAnnouncements } from '@/ai/flows/ai-draft-announcements';
import { aiGenerateQuizQuestions } from '@/ai/flows/ai-generate-quiz-questions';

export default function AdminPage() {
  const firestore = useFirestore();
  const { data: config, loading } = useDoc(firestore ? doc(firestore, 'settings', 'olympiad') : null);
  
  const [deadline, setDeadline] = useState('');
  const [isEnabled, setIsEnabled] = useState(true);
  const [saving, setSaving] = useState(false);

  // AI Announcement Drafting
  const [announcementPrompt, setAnnouncementPrompt] = useState('');
  const [drafting, setDrafting] = useState(false);
  const [aiDraft, setAiDraft] = useState<any>(null);

  // AI Quiz Generation
  const [quizTopic, setQuizTopic] = useState('');
  const [generatingQuiz, setGeneratingQuiz] = useState(false);

  useEffect(() => {
    if (config) {
      setDeadline(config.registrationDeadline || '');
      setIsEnabled(config.isRegistrationEnabled ?? true);
    }
  }, [config]);

  const handleSave = async () => {
    if (!firestore) {
      toast({ variant: "destructive", title: "Error", description: "Database connection not ready." });
      return;
    }
    
    if (!deadline) {
      toast({ variant: "destructive", title: "Validation Error", description: "Please select a deadline." });
      return;
    }

    setSaving(true);
    try {
      const settingsRef = doc(firestore, 'settings', 'olympiad');
      await setDoc(settingsRef, {
        registrationDeadline: deadline,
        isRegistrationEnabled: isEnabled,
        updatedAt: serverTimestamp()
      }, { merge: true });
      
      toast({ 
        title: "Configuration Updated", 
        description: "Olympiad parameters have been successfully synchronized to the database." 
      });
    } catch (e: any) {
      toast({ variant: "destructive", title: "Sync Error", description: e.message });
    } finally {
      setSaving(false);
    }
  };

  const handleAiDraft = async () => {
    if (!announcementPrompt) return;
    setDrafting(true);
    try {
      const result = await aiDraftAnnouncements({ briefPrompt: announcementPrompt });
      setAiDraft(result);
      toast({ title: "AI Draft Ready", description: "Professional announcement has been generated." });
    } catch (e: any) {
      toast({ variant: "destructive", title: "AI Error", description: e.message });
    } finally {
      setDrafting(false);
    }
  };

  const handleGenerateQuiz = async () => {
    if (!quizTopic) return;
    setGeneratingQuiz(true);
    try {
      const result = await aiGenerateQuizQuestions({
        topic: quizTopic,
        difficulty: 'Medium',
        numberOfQuestions: 5,
        questionType: 'Multiple Choice'
      });
      console.log('Generated Quiz:', result);
      toast({ title: "Quiz Generated", description: `5 questions generated for topic: ${quizTopic}` });
    } catch (e: any) {
      toast({ variant: "destructive", title: "AI Error", description: e.message });
    } finally {
      setGeneratingQuiz(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-headline font-bold text-primary animate-pulse">
        Initializing Command Console...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      <main className="flex-1 pt-32 pb-20 container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Controls */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-2xl border-none rounded-[2rem] overflow-hidden">
              <CardHeader className="bg-slate-900 text-white p-8">
                <Shield className="w-10 h-10 text-primary mb-4" />
                <CardTitle className="text-xl font-headline font-bold">Core Controls</CardTitle>
                <CardDescription className="text-slate-400">System critical parameters.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-8 bg-white">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-bold">Registration Portal</Label>
                    <p className="text-[10px] text-muted-foreground uppercase">Global Access Toggle</p>
                  </div>
                  <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="deadline" className="font-bold text-sm">National Deadline</Label>
                  <Input 
                    id="deadline" 
                    type="datetime-local" 
                    value={deadline} 
                    onChange={(e) => setDeadline(e.target.value)}
                    className="h-12 rounded-xl"
                  />
                  <p className="text-[10px] text-slate-400">ডেটলাইন সিলেক্ট করে Synchronize বাটনে ক্লিক করুন।</p>
                </div>
                <Button 
                  onClick={handleSave} 
                  className="w-full h-14 text-lg font-bold gap-2 rounded-xl shadow-xl shadow-primary/20" 
                  disabled={saving}
                >
                  {saving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  Synchronize
                </Button>
                
                {config?.registrationDeadline && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-xl border border-green-100 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" /> Current Deadline: {new Date(config.registrationDeadline).toLocaleString()}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* AI Tools */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-2xl border-none rounded-[2.5rem] overflow-hidden">
              <CardHeader className="bg-primary text-white p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="font-headline font-bold text-xl">AI Notice Drafter</CardTitle>
                      <CardDescription className="text-primary-foreground/70">Draft professional announcements in seconds.</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-6 bg-white">
                <div className="space-y-3">
                  <Label className="font-bold">Brief Prompt</Label>
                  <div className="flex gap-3">
                    <Input 
                      placeholder="E.g., Extend deadline for 2 more days due to server load." 
                      className="h-14 rounded-xl flex-1"
                      value={announcementPrompt}
                      onChange={(e) => setAnnouncementPrompt(e.target.value)}
                    />
                    <Button onClick={handleAiDraft} disabled={drafting} className="h-14 px-8 rounded-xl font-bold gap-2 bg-slate-900">
                      {drafting ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
                      Draft
                    </Button>
                  </div>
                </div>

                {aiDraft && (
                  <div className="p-6 bg-slate-50 border border-slate-100 rounded-[1.5rem] space-y-4 animate-in fade-in zoom-in duration-300">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-primary">AI Result</h4>
                      <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase gap-1" onClick={() => setAiDraft(null)}>Clear</Button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Title</p>
                        <p className="font-bold text-lg">{aiDraft.title}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Content</p>
                        <p className="text-sm leading-relaxed text-slate-600">{aiDraft.content}</p>
                      </div>
                      <div className="flex gap-2">
                        {aiDraft.audience.map((a: string, i: number) => (
                          <Badge key={i} variant="secondary" className="bg-white border text-primary font-bold">{a}</Badge>
                        ))}
                      </div>
                      <Button className="w-full h-12 rounded-xl gap-2 font-bold">
                        <Send className="w-4 h-4" /> Publish Announcement
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-2xl border-none rounded-[2.5rem] overflow-hidden">
              <CardHeader className="bg-secondary text-white p-8">
                 <div className="flex items-center gap-4">
                    <FileQuestion className="w-6 h-6" />
                    <CardTitle className="font-headline font-bold text-xl">AI Quiz Generator</CardTitle>
                 </div>
              </CardHeader>
              <CardContent className="p-8 bg-white">
                <div className="flex gap-3">
                  <Input 
                    placeholder="Topic: Data Structures / Web Dev / GK..." 
                    className="h-14 rounded-xl flex-1"
                    value={quizTopic}
                    onChange={(e) => setQuizTopic(e.target.value)}
                  />
                  <Button onClick={handleGenerateQuiz} disabled={generatingQuiz} variant="secondary" className="h-14 px-8 rounded-xl font-bold gap-2">
                    {generatingQuiz ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                    Generate Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
