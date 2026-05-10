'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, useEffect, Suspense } from 'react';
import { fetchApi } from '@/lib/api';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [role, setRole] = useState<'consumer' | 'merchant'>('consumer');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccessMsg('Registrasi berhasil! Silakan login.');
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const response = await fetchApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      
      // Simpan token
      localStorage.setItem('access_token', response.access_token);
      
      // Arahkan sesuai role dari database
      if (response.role === 'PEMBELI') {
        window.location.href = '/marketplace';
      } else {
        window.location.href = '/dashboard';
      }
    } catch (err: any) {
      setError(err.message || 'Login gagal, periksa email dan password Anda');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col justify-center items-center p-4">
      <div className="mb-8 flex items-center gap-2">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-xl">F</span>
        </div>
        <span className="text-2xl font-bold tracking-tight">Food Saver</span>
      </div>

      <Card className="w-full max-w-md shadow-lg border-t-4 border-t-primary">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="consumer" className="w-full" onValueChange={(v) => setRole(v as any)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="consumer">Consumer</TabsTrigger>
              <TabsTrigger value="merchant">Merchant</TabsTrigger>
            </TabsList>
          </Tabs>
          <p className="text-sm text-center text-muted-foreground mt-2 mb-4">
            {role === 'consumer'
              ? 'Login untuk menemukan penawaran makanan terbaik'
              : 'Login untuk mengelola toko dan produkmu'}
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            {successMsg && <div className="p-3 text-sm text-emerald-600 bg-emerald-50 rounded-md">{successMsg}</div>}
            {error && <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">{error}</div>}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full mt-4 h-11 text-base" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Log in'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-4 mt-2">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href={`/register?role=${role}`} className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
      
      <div className="mt-8">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
          &larr; Back to home
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-muted/30 flex justify-center items-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
