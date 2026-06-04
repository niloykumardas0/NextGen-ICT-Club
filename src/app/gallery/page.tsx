import { Navbar } from '@/components/layout/Navbar';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

const galleryItems = [
  { id: 1, title: 'Inauguration 2026', category: 'Events', image: 'https://picsum.photos/seed/nxg-g1/800/600' },
  { id: 2, title: 'AI Workshop', category: 'Training', image: 'https://picsum.photos/seed/nxg-g2/800/600' },
  { id: 3, title: 'Olympiad Final 2025', category: 'Olympiad', image: 'https://picsum.photos/seed/nxg-g3/800/600' },
  { id: 4, title: 'Hackathon Winners', category: 'Competitions', image: 'https://picsum.photos/seed/nxg-g4/800/600' },
];

export default function GalleryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-headline font-bold uppercase">Gallery</h1>
            <p className="text-lg text-muted-foreground">Moments of learning and competition.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {galleryItems.map((item) => (
              <div key={item.id} className="group">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 border">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint="tech event"
                  />
                  <Badge className="absolute top-4 left-4 border-none bg-white/90 text-primary">{item.category}</Badge>
                </div>
                <h4 className="font-headline font-bold text-lg">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}