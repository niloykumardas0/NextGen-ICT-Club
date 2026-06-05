
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Cpu, 
  BookOpen, 
  Languages, 
  ArrowRight, 
  Shield, 
  Target, 
  Trophy, 
  Globe, 
  Zap,
  Star,
  CheckCircle2,
  Code,
  Layers,
  Rocket
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-24 bg-gradient-to-br from-slate-50 to-blue-50/50 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-3/5 space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Star className="w-4 h-4 text-primary fill-primary" />
                <span className="text-xs font-bold text-primary uppercase tracking-widest">NextGen ICT Club National 2026</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-headline font-bold text-slate-900 leading-tight uppercase">
                Building the <span className="text-primary italic">Next</span> Tech Generation
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                NextGen ICT Club বাংলাদেশের শিক্ষার্থীদের জন্য আইসিটি, ইংরেজি এবং সাধারণ জ্ঞানের একটি প্রফেশনাল প্ল্যাটফর্ম। আমাদের লক্ষ্য কেবল অলিম্পিয়াড নয়, বরং প্রযুক্তিগত দক্ষতায় শিক্ষার্থীদের সেরা হিসেবে গড়ে তোলা।
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                <Link href="/register">
                  <Button size="lg" className="h-16 px-12 rounded-full text-xl font-bold bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 group">
                    Registration <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg" className="h-16 px-12 rounded-full text-xl font-bold border-slate-200 hover:bg-white bg-transparent">
                    Club Mission
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="lg:w-2/5 relative animate-in fade-in slide-in-from-right-8 duration-1000">
              <div className="relative z-10 rounded-[3.5rem] overflow-hidden shadow-[0_60px_120px_-20px_rgba(0,0,0,0.15)] border-[16px] border-white">
                <Image 
                  src="https://picsum.photos/seed/nxg-hero-v3/800/1000" 
                  alt="NextGen ICT Club" 
                  width={800} 
                  height={1000}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Olympiad Tracks */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <Badge variant="outline" className="border-primary text-primary px-4 py-1 uppercase tracking-widest font-bold">Active Competitions</Badge>
            <h2 className="section-heading">Current National Challenges</h2>
            <p className="text-slate-600 text-lg">আমাদের ৩টি প্রধান অলিম্পিয়াড ট্র্যাকে নিজেকে চ্যালেঞ্জ করুন।</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { 
                icon: Cpu, 
                title: "ICT Olympiad", 
                color: "bg-blue-600", 
                desc: "প্রোগ্রামিং, ডিজিটাল লজিক এবং আর্টিফিশিয়াল ইন্টেলিজেন্স এর ওপর ভিত্তি করে জাতীয় মেধা যাচাই।",
                points: ["Programming Logic", "AI & Cloud", "Hardware Systems"]
              },
              { 
                icon: BookOpen, 
                title: "GK Olympiad", 
                color: "bg-slate-900", 
                desc: "বাংলাদেশ ও আন্তর্জাতিক সাম্প্রতিক বিষয়ের ওপর ভিত্তি করে আপনার সাধারণ জ্ঞান যাচাই করুন।",
                points: ["History of BD", "Global Affairs", "Scientific Facts"]
              },
              { 
                icon: Languages, 
                title: "English Olympiad", 
                color: "bg-indigo-600", 
                desc: "ব্যাকরণ এবং সাবলীল যোগাযোগের দক্ষতাকে এক ধাপ এগিয়ে নিতে প্রফেশনাল যাচাই।",
                points: ["Advanced Grammar", "Creative Writing", "Vocabulary"]
              }
            ].map((cat, i) => (
              <Card key={i} className="group relative overflow-hidden border-none shadow-xl rounded-[2.5rem] hover:-translate-y-3 transition-all duration-500">
                <div className="p-10 bg-white h-full flex flex-col">
                  <div className={`w-16 h-16 rounded-2xl ${cat.color} text-white flex items-center justify-center mb-8 shadow-2xl`}>
                    <cat.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-headline font-bold mb-4">{cat.title}</h3>
                  <p className="text-slate-600 mb-8 flex-1">{cat.desc}</p>
                  <ul className="space-y-3 mb-8">
                    {cat.points.map((p, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm font-medium text-slate-500">
                        <CheckCircle2 className="w-4 h-4 text-green-500" /> {p}
                      </li>
                    ))}
                  </ul>
                  <Link href="/olympiad" className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
                    Syllabus Details <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Future Skills Roadmap */}
      <section className="py-32 bg-slate-50 border-y">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <Badge variant="outline" className="border-secondary text-secondary px-4 py-1 uppercase tracking-widest font-bold">Future Skills</Badge>
            <h2 className="section-heading">Skills We are Bringing to You</h2>
            <p className="text-slate-600 text-lg">অলিম্পিয়াডের পর আমরা শিক্ষার্থীদের জন্য নিচের আইসিটি স্কিলগুলো নিয়ে আসবো।</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Code, title: "Web Development", desc: "Next.js, React এবং আধুনিক ওয়েব টেকনোলজি দিয়ে ওয়েবসাইট তৈরি।", color: "text-blue-500" },
              { icon: Layers, title: "Artificial Intelligence", desc: "মেডল লার্নিং এবং এআই টুলস ব্যবহারের প্রফেশনাল গাইড।", color: "text-purple-500" },
              { icon: Shield, title: "Cybersecurity", desc: "ইন্টারনেট এবং ডিজিটাল সিস্টেমকে সুরক্ষিত রাখার উন্নত কৌশল।", color: "text-red-500" },
              { icon: Cpu, title: "Robotics & IoT", desc: "হার্ডওয়্যার এবং সফটওয়্যারের সমন্বয়ে স্মার্ট প্রজেক্ট নির্মাণ।", color: "text-green-500" }
            ].map((skill, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className={`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-6 ${skill.color}`}>
                  <skill.icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold mb-2">{skill.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{skill.desc}</p>
                <div className="mt-6">
                  <Badge variant="secondary" className="bg-slate-100 text-slate-500 text-[10px] uppercase font-bold tracking-widest">Coming Soon</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Phase Timeline */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-headline font-bold mb-6">NextGen <span className="text-primary">Roadmap</span></h2>
            <p className="text-slate-400 text-xl">আগামী কয়েক মাসে আমাদের লক্ষ্য এবং পরিকল্পনা।</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { phase: "Phase 01", title: "National Olympiad", desc: "২০২৬ সালের শুরুতে ৩টি ক্যাটাগরিতে জাতীয় অলিম্পিয়াড আয়োজন এবং ১৫ হাজার শিক্ষার্থী যুক্ত করা।", icon: Trophy, status: "Active" },
              { phase: "Phase 02", title: "ICT Skill Hub", desc: "ওয়েব ডেভেলপমেন্ট, এআই এবং সাইবার সিকিউরিটি নিয়ে প্রফেশনাল কোর্স ও মেন্টরশিপ শুরু।", icon: Code, status: "Upcoming" },
              { phase: "Phase 03", title: "Global Network", desc: "আন্তর্জাতিক ক্লাবগুলোর সাথে কোলাবোরেশন এবং গ্লোবাল আইসিটি এক্সচেঞ্জ প্রোগ্রাম শুরু।", icon: Globe, status: "Planned" }
            ].map((item, i) => (
              <div key={i} className="relative p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-md group hover:bg-white/10 transition-colors">
                <div className="text-primary font-bold text-xs uppercase tracking-widest mb-4 flex justify-between items-center">
                  <span>{item.phase}</span>
                  <Badge variant="outline" className="text-[10px] text-white border-white/20">{item.status}</Badge>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
                <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-slate-950 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-2 space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="48" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
                    <path d="M30 70 L30 30 L55 55 L55 30" fill="none" stroke="hsl(var(--primary))" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M75 45 L75 70 L45 70 L45 55 L60 55" fill="none" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-3xl font-headline font-bold uppercase">NextGen ICT Club</span>
              </div>
              <p className="text-slate-400 max-w-sm text-lg leading-relaxed">আগামীর প্রযুক্তিনির্ভর বাংলাদেশ গড়ার প্রত্যয়ে আমরা প্রতিশ্রুতিবদ্ধ। মেধা আর উদ্ভাবনে জয় হোক সবার।</p>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold uppercase tracking-widest text-primary text-sm">Navigation</h4>
              <ul className="space-y-4 text-slate-400 font-medium">
                <li><Link href="/olympiad" className="hover:text-white transition-colors">Olympiad Portal</Link></li>
                <li><Link href="/certificates" className="hover:text-white transition-colors">Verify Certificate</Link></li>
                <li><Link href="/leaderboard" className="hover:text-white transition-colors">National Rank</Link></li>
                <li><Link href="/admin" className="hover:text-white transition-colors">Admin Console</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold uppercase tracking-widest text-primary text-sm">Get in Touch</h4>
              <ul className="space-y-4 text-slate-400 font-medium">
                <li>Email: info@nextgenict.com</li>
                <li>Phone: +880 1XXX XXXXXX</li>
                <li>Office: Dhaka, Bangladesh</li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 text-center">
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">© 2026 NextGen ICT Club | National Olympiad Unit</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
