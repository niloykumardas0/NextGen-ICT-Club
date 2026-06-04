import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const events = [
  {
    id: 1,
    title: "National ICT Olympiad 2026",
    date: "March 15, 2026",
    location: "National Convention Hall",
    participants: "15,000+",
    image: "https://picsum.photos/seed/nxg-event1/600/400",
    category: "Olympiad",
    status: "Upcoming"
  },
  {
    id: 2,
    title: "AI Innovation Summit",
    date: "April 22, 2026",
    location: "Virtual & In-Person",
    participants: "2,500+",
    image: "https://picsum.photos/seed/nxg-event2/600/400",
    category: "Summit",
    status: "Open"
  },
  {
    id: 3,
    title: "Cybersecurity Bootcamp",
    date: "May 10-15, 2026",
    location: "Tech Hub Center",
    participants: "500+",
    image: "https://picsum.photos/seed/nxg-event3/600/400",
    category: "Workshop",
    status: "Enroll Now"
  }
];

export default function EventsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 uppercase">Upcoming Events</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join our flagship competitions, summits, and workshops designed to sharpen your tech skills.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {events.map((event) => (
              <Card key={event.id} className="glass-panel border-none overflow-hidden group">
                <div className="relative aspect-video">
                  <Image 
                    src={event.image} 
                    alt={event.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    data-ai-hint="tech event"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary text-white border-none">{event.category}</Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Calendar className="w-3 h-3" /> {event.date}
                  </div>
                  <CardTitle className="font-headline font-bold text-xl">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" /> {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4 text-secondary" /> {event.participants} Expected
                    </div>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 rounded-full font-bold group">
                    {event.status} <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
