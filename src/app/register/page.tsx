'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Rocket, RefreshCw } from 'lucide-react';

export default function RegisterPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    institution: '',
    category: '',
    tshirtSize: ''
  });

  const handleRegister = async () => {
    if (!firestore) return;
    if (!formData.firstName || !formData.email || !formData.category) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields."
      });
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(firestore, 'registrations'), {
        ...formData,
        registeredAt: serverTimestamp()
      });

      toast({
        title: "Registration Successful",
        description: "Welcome to NextGen ICT Club! Redirecting to dashboard..."
      });
      
      router.push('/dashboard');
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: e.message || "Something went wrong."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-32">
        <Card className="w-full max-w-2xl shadow-xl border-none p-10 animate-in fade-in slide-in-from-bottom-8 duration-500 bg-white">
          <CardHeader className="text-center pb-10">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Rocket className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-4xl font-headline font-bold">Registration</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">Secure your spot in the NextGen ICT Club 2026 Season.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  placeholder="Alex" 
                  className="h-12" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  placeholder="Rivera" 
                  className="h-12" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="alex@nextgen.tech" 
                className="h-12" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="institution">Institution Name</Label>
              <Input 
                id="institution" 
                placeholder="University of Technology" 
                className="h-12" 
                value={formData.institution}
                onChange={(e) => setFormData({...formData, institution: e.target.value})}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={(val) => setFormData({...formData, category: val})}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="junior">Junior (Grade 6-10)</SelectItem>
                    <SelectItem value="senior">Senior (Grade 11-12)</SelectItem>
                    <SelectItem value="university">University</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tshirt">T-Shirt Size</Label>
                <Select onValueChange={(val) => setFormData({...formData, tshirtSize: val})}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="s">Small</SelectItem>
                    <SelectItem value="m">Medium</SelectItem>
                    <SelectItem value="l">Large</SelectItem>
                    <SelectItem value="xl">XL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="pt-4">
              <Button 
                onClick={handleRegister}
                disabled={loading}
                className="w-full h-14 text-xl font-bold rounded-2xl shadow-lg hover:translate-y-[-2px] transition-transform"
              >
                {loading ? <RefreshCw className="animate-spin mr-2" /> : null}
                Complete Registration
              </Button>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              Already registered? <Link href="/login" className="text-primary font-bold hover:underline">Login here</Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
