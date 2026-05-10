'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, Suspense } from 'react';
import { fetchApi } from '@/lib/api';
import { useRouter } from 'next/navigation';

function RegisterForm() {
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get('role') === 'merchant' ? 'merchant' : 'consumer';
  const [role, setRole] = useState<'consumer' | 'merchant'>(defaultRole as any);

  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      nama: formData.get('nama'),
      email: formData.get('email'),
      password: formData.get('password'),
      no_telepon: formData.get('no_telepon'),
      role: role === 'consumer' ? 'PEMBELI' : 'PENYEDIA',
    };

    try {
      await fetchApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      // Redirect ke login setelah sukses
      router.push('/login?registered=true');
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat mendaftar');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg border-t-4 border-t-primary">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
        <CardDescription className="text-center">
          Join Food Saver and start {role === 'consumer' ? 'saving money' : 'selling surplus food'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={defaultRole} className="w-full" onValueChange={(v) => setRole(v as any)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="consumer">Consumer</TabsTrigger>
            <TabsTrigger value="merchant">Merchant</TabsTrigger>
          </TabsList>
        </Tabs>
        <p className="text-sm text-center text-muted-foreground mt-2 mb-4">
          {role === 'consumer'
            ? 'Daftar untuk mulai hemat dengan belanja makanan'
            : 'Daftar untuk mulai menjual sisa stok makananmu'}
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          {error && <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">{error}</div>}
          <div className="space-y-2">
            <Label htmlFor="nama">Nama Lengkap</Label>
            <Input id="nama" name="nama" placeholder={role === 'consumer' ? 'Budi Santoso' : 'Budi (Pemilik Toko)'} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="no_telepon">Nomor Telepon</Label>
            <Input id="no_telepon" name="no_telepon" type="tel" placeholder="08123456789" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" minLength={6} required />
          </div>
          <Button type="submit" className="w-full mt-4 h-11 text-base" disabled={isLoading}>
            {isLoading ? 'Mendaftar...' : 'Buat Akun'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t p-4 mt-2">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-muted/30 flex flex-col justify-center items-center p-4">
      <div className="mb-8 flex items-center gap-2">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-xl">F</span>
        </div>
        <span className="text-2xl font-bold tracking-tight">Food Saver</span>
      </div>

      <Suspense fallback={<div className="animate-pulse w-full max-w-md h-96 bg-muted rounded-xl"></div>}>
        <RegisterForm />
      </Suspense>
      
      <div className="mt-8">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
          &larr; Back to home
        </Link>
      </div>
    </div>
  );
}
