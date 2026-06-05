import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Monitor, 
  BookOpen, 
  Languages, 
  ShieldCheck, 
  Clock, 
  Award,
  ChevronRight,
  Target
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { RegistrationHeader } from '@/components/olympiad/RegistrationHeader';

export default function OlympiadPage() {
  const tracks = [
    {
      icon: Monitor,
      title: "ICT Track",
      items: ["Basic Programming & Logic", "Web Technologies", "Cybersecurity Basics", "Cloud Computing"],
      color: "bg-blue-600",
      description: "প্রযুক্তিগত জ্ঞানের গভীরতা যাচাই করার জন্য বিশেষ ট্র্যাক।"
    },
    {
      icon: BookOpen,
      title: "GK Track",
      items: ["Bangladesh Affairs", "International Timeline", "Modern Science", "Sports & Arts"],
      color: "bg-slate-900",
      description: "সামগ্রিক বিশ্ব এবং দেশীয় জ্ঞানের ওপর ভিত্তি করে যাচাই।"
    },
    {
      icon: Languages,
      title: "English Track",
      items: ["Advanced Grammar", "Vocabulary Range", "Reading Comprehension", "Composition"],
      color: "bg-indigo-600",
      description: "যোগাযোগ এবং ভাষা দক্ষতার ওপর ভিত্তি করে যাচাই।"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      <main className="flex-1 pt-40 pb-32">
        <div className="container mx-auto px-4">
          
          <div className="mb-24">
            <RegistrationHeader />
          </div>

          <div className="space-y-12 mb-32">
            <div className="text-center space-y-4">
              <Badge variant="outline" className="text-primary border-primary px-4 py-1 font-bold uppercase">Syllabus Guide</Badge>
              <h2 className="text-4xl md:text-5xl font-headline font-bold uppercase">Exam Syllabus & <span className="text-primary">Tracks</span></h2>
              <p className="text-slate-500 max-w-xl mx-auto">২০২৬ মৌসুমের অলিম্পিয়াডের জন্য নির্ধারিত সিলেবাস ও বিষয়সমূহ নিচে দেওয়া হলো।</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10">
              {tracks.map((track, i) => (
                <div key={i} className="bg-white rounded-[3rem] p-10 shadow-xl border border-slate-100 hover:-translate-y-2 transition-transform duration-500">
                  <div className={`w-16 h-16 rounded-2xl ${track.color} text-white flex items-center justify-center mb-8`}>
                    <track.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-headline font-bold mb-4">{track.title}</h3>
                  <p className="text-sm text-slate-500 mb-8">{track.description}</p>
                  <ul className="space-y-4 mb-8">
                    {track.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                        <ChevronRight className="w-4 h-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <section className="bg-slate-900 rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 blur-[120px] rounded-full"></div>
            <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
              <div className="space-y-8">
                <Badge className="bg-primary/20 text-primary border-primary/20 uppercase font-bold tracking-widest px-4 py-1">Online Portal</Badge>
                <h2 className="text-4xl md:text-6xl font-headline font-bold uppercase leading-tight">Advanced <span className="text-primary">MCQ Terminal</span></h2>
                <p className="text-slate-400 text-lg leading-relaxed">আমাদের বিশেষ প্রক্টোর্ড এক্সাম টার্মিনালে ঘরে বসেই অংশগ্রহণ করুন। রিয়েল-টাইম রেজাল্ট এবং নির্ভুল যাচাইয়ের জন্য এটি একটি বিশ্বমানের প্ল্যাটফর্ম।</p>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4 p-4 rounded-3xl bg-white/5 border border-white/10">
                    <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                    <div>
                      <h4 className="font-bold mb-1">Secure Monitoring</h4>
                      <p className="text-xs text-slate-500">অটোমেটিক ফোকাস এবং সিকিউরিটি মনিটরিং সিস্টেম।</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-3xl bg-white/5 border border-white/10">
                    <Clock className="w-6 h-6 text-primary shrink-0" />
                    <div>
                      <h4 className="font-bold mb-1">Instant Results</h4>
                      <p className="text-xs text-slate-500">পরীক্ষা শেষের সাথে সাথে নির্ভুল ফলাফল বিশ্লেষণ।</p>
                    </div>
                  </div>
                </div>
                <div className="pt-8">
                  <Link href="/dashboard/exam">
                    <Button className="h-16 px-10 rounded-full font-bold text-lg bg-primary hover:bg-primary/90">Launch Exam Portal</Button>
                  </Link>
                </div>
              </div>
              <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/5">
                <Image 
                  src="https://picsum.photos/seed/nxg-exam/800/600" 
                  alt="Exam Interface" 
                  width={800} 
                  height={600}
                  className="object-cover h-full"
                  data-ai-hint="online exam"
                />
              </div>
            </div>
          </section>

          <div className="mt-32 text-center max-w-3xl mx-auto space-y-6">
            <Target className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-3xl font-headline font-bold uppercase">Ready to test your skills?</h3>
            <p className="text-slate-500">আপনার ক্যাটাগরি অনুযায়ী সিলেবাস শেষ করে আজই মক টেস্টে অংশগ্রহণ করুন। মেধা যাচাইয়ের এই শ্রেষ্ঠ সুযোগ মিস করবেন না।</p>
            <div className="pt-6">
              <Link href="/register">
                <Button size="lg" className="h-16 px-16 rounded-full text-xl font-bold">Enroll Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}