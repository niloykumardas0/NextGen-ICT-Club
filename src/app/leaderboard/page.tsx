import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const leaders = [
  { rank: 1, name: "Tanvir Ahmed", institution: "RUET", score: 98.5, points: "4,500", avatar: "https://picsum.photos/seed/l1/200/200" },
  { rank: 2, name: "Sarah Khan", institution: "BUET", score: 97.2, points: "4,250", avatar: "https://picsum.photos/seed/l2/200/200" },
  { rank: 3, name: "Rayhan Kabir", institution: "SUST", score: 96.8, points: "4,100", avatar: "https://picsum.photos/seed/l3/200/200" },
  { rank: 4, name: "Mehedi Hasan", institution: "NSU", score: 95.0, points: "3,950", avatar: "https://picsum.photos/seed/l4/200/200" },
  { rank: 5, name: "Nabila Tabassum", institution: "DU", score: 94.5, points: "3,800", avatar: "https://picsum.photos/seed/l5/200/200" },
];

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-slate-900 uppercase">National Rankings</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Celebrating the brightest minds and top achievers in our ICT community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {leaders.slice(0, 3).map((leader, i) => (
              <Card key={i} className={cn("glass-card p-8 text-center relative border-slate-100", 
                i === 0 ? "scale-105 border-primary bg-primary/5 shadow-primary/10" : "")}>
                <div className="w-20 h-20 mx-auto mb-6 relative">
                  <Avatar className="w-20 h-20 border-4 border-white shadow-sm">
                    <AvatarImage src={leader.avatar} />
                    <AvatarFallback>{leader.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {i + 1}
                  </div>
                </div>
                <h3 className="text-2xl font-headline font-bold mb-1">{leader.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 uppercase tracking-widest">{leader.institution}</p>
                <div className="text-3xl font-bold text-primary">{leader.score}%</div>
                <p className="text-xs text-muted-foreground uppercase font-semibold mt-1">Olympiad Performance</p>
              </Card>
            ))}
          </div>

          <Card className="glass-card border-slate-100 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-[100px] font-bold">Rank</TableHead>
                  <TableHead className="font-bold">Candidate</TableHead>
                  <TableHead className="font-bold">Institution</TableHead>
                  <TableHead className="text-right font-bold">Total Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaders.map((leader) => (
                  <TableRow key={leader.rank} className="hover:bg-slate-50 transition-colors">
                    <TableCell className="font-bold">#{leader.rank}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={leader.avatar} />
                          <AvatarFallback>{leader.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{leader.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{leader.institution}</TableCell>
                    <TableCell className="text-right font-bold text-primary">{leader.points} XP</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}