'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect, Suspense } from 'react';
import { fetchApi } from '@/lib/api';
import { useSearchParams } from 'next/navigation';

function LoginForm() {
  const searchParams = useSearchParams();
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

      // Set role cookie for middleware-based RBAC (1 day expiry)
      const maxAge = 60 * 60 * 24;
      document.cookie = `user_role=${response.role}; path=/; max-age=${maxAge}; SameSite=Lax`;

      // Smart redirect berdasarkan role dari response
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
      <div className="mb-8 flex items-center justify-center gap-2">
        <Image src="/FoodSaver_Green.png" alt="Logo" width={40} height={40} className="object-contain" />
        <span className="text-2xl font-bold tracking-tight">Food Saver</span>
      </div>

      <Card className="w-full max-w-md shadow-lg border-t-4 border-t-primary">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Masuk ke Akun Anda</CardTitle>
          <CardDescription className="text-center">
            Silakan masuk untuk melanjutkan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {successMsg && <div className="p-3 text-sm text-emerald-600 bg-emerald-50 rounded-md">{successMsg}</div>}
            {error && <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">{error}</div>}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="nama@email.com" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-xs text-primary hover:underline">
                  Lupa password?
                </Link>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full mt-4 h-11 text-base" disabled={isLoading}>
              {isLoading ? 'Memproses...' : 'Masuk'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-4 mt-2">
          <p className="text-sm text-muted-foreground">
            Belum punya akun?{' '}
            <Link href="/register" className="text-primary font-medium hover:underline">
              Daftar sekarang
            </Link>
          </p>
        </CardFooter>
      </Card>

      <div className="mt-8">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
          &larr; Kembali ke beranda
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
