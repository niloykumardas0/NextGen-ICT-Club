
import { Navbar } from '@/components/layout/Navbar';
import { Shield, Rocket, Target, Users, Award, Zap, Globe, Cpu, Code, ShieldAlert } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4">
          
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-24 space-y-4">
            <Badge variant="outline" className="text-primary border-primary font-bold px-4 py-1 uppercase tracking-widest">About NextGen ICT Club</Badge>
            <h1 className="text-5xl md:text-7xl font-headline font-bold mb-6 uppercase leading-tight">Empowering the Future Leaders</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              আমাদের যাত্রা শুরু হয়েছে মেধাবী শিক্ষার্থীদের প্রযুক্তিনির্ভর আগামীর জন্য প্রস্তুত করতে। আমরা কেবল একটি অলিম্পিয়াড প্ল্যাটফর্ম নই, এটি একটি পূর্ণাঙ্গ আইসিটি লার্নিং ইকোসিস্টেম।
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            <div className="relative">
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white transform -rotate-2">
                <Image 
                  src="https://picsum.photos/seed/nxg-mission/800/1000" 
                  alt="NextGen ICT Club Mission" 
                  width={800} 
                  height={1000}
                  className="w-full object-cover"
                  data-ai-hint="tech team"
                />
              </div>
            </div>
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-headline font-bold uppercase">Our <span className="text-primary">Core Mission</span></h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  আমাদের মূল লক্ষ্য হলো মাধ্যমিক এবং উচ্চ মাধ্যমিক পর্যায়ের শিক্ষার্থীদের মধ্যে তথ্য ও যোগাযোগ প্রযুক্তির আগ্রহ বাড়ানো এবং তাদের মেধা যাচাইয়ের পাশাপাশি আধুনিক প্রযুক্তি শেখার সুযোগ তৈরি করে দেওয়া।
                </p>
              </div>

              <div className="grid gap-8">
                <div className="flex gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Code className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-headline font-bold mb-2">Coding Proficiency</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      শিক্ষার্থীদের জন্য প্রোগ্রামিং এবং ওয়েব ডেভেলপমেন্টের ওপর বিশেষ মেন্টরশিপ প্রোগ্রাম পরিচালনা করা।
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-8 h-8 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-headline font-bold mb-2">Digital Security</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      সাইবার সিকিউরিটি সম্পর্কে সচেতনতা তৈরি এবং এই সেক্টরে দক্ষ জনবল গড়ে তোলা।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-24 text-white relative overflow-hidden mb-32">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 blur-[120px] rounded-full"></div>
            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-headline font-bold uppercase leading-tight">Our Future <span className="text-primary">Vision</span></h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  আমরা কেবল জাতীয় অলিম্পিয়াডেই সীমাবদ্ধ থাকবো না। আমাদের পরবর্তী ধাপগুলো হলো শিক্ষার্থীদের হাতে-কলমে প্রযুক্তি শেখানো:
                </p>
                <div className="grid gap-6">
                  {[
                    { icon: Zap, title: "Web & Software Hub", text: "প্রফেশনাল ওয়েব ডেভেলপমেন্ট এবং সফটওয়্যার ইঞ্জিনিয়ারিং ট্রেনিং।" },
                    { icon: Globe, title: "Global Opportunities", text: "আন্তর্জাতিক হ্যাকাথন এবং আইসিটি কম্পিটিশনে অংশগ্রহণের সুযোগ।" },
                    { icon: Cpu, title: "Innovation Lab", text: "নতুন নতুন প্রজেক্ট এবং স্টার্টআপ আইডিয়া বাস্তবায়নে ফান্ডিং ও সাপোর্ট।" }
                  ].map((vision, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                      <vision.icon className="w-6 h-6 text-primary shrink-0" />
                      <div>
                        <h4 className="font-bold text-lg mb-1">{vision.title}</h4>
                        <p className="text-sm text-slate-400">{vision.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative aspect-square">
                <Image 
                  src="https://picsum.photos/seed/future-vision/800/800" 
                  alt="NextGen Future Vision" 
                  width={800} 
                  height={800} 
                  className="rounded-3xl object-cover h-full"
                />
              </div>
            </div>
          </div>

          {/* Message Section */}
          <div className="max-w-3xl mx-auto text-center space-y-8">
             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <Rocket className="w-10 h-10 text-primary" />
             </div>
             <blockquote className="text-3xl font-headline font-bold text-slate-900 italic leading-relaxed">
               "আমাদের লক্ষ্য কেবল বিজয়ীদের খুঁজে বের করা নয়, বরং প্রতিটি শিক্ষার্থীর মাঝে প্রযুক্তির বীজ বপন করা যা তাদের ভবিষ্যৎ ক্যারিয়ার গড়ে দেবে।"
             </blockquote>
             <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">— NextGen ICT Club Core Unit</p>
          </div>

        </div>
      </main>
    </div>
  );
}
