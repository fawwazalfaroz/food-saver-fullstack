'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { fetchApi } from '@/lib/api';
import { ArrowLeft, UserCircle } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await fetchApi('/auth/profile');
        setProfile(data);
      } catch (error: any) {
        console.error('Failed to load profile', error);
        // Jika token tidak valid / belum login, lempar ke login
        if (error.message.includes('Unauthorized') || error.message.includes('401')) {
          router.push('/login');
        } else {
          setMessage({ text: 'Gagal memuat profil', type: 'error' });
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadProfile();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const data: any = {
      nama: formData.get('nama'),
      no_telepon: formData.get('no_telepon'),
    };

    // Jika PENYEDIA, tambahkan field toko
    if (profile?.role === 'PENYEDIA') {
      const alamat = formData.get('alamat_toko');
      const lat = formData.get('latitude');
      const lng = formData.get('longitude');
      
      if (alamat) data.alamat_toko = alamat;
      if (lat) data.latitude = parseFloat(lat as string);
      if (lng) data.longitude = parseFloat(lng as string);
    }

    try {
      const updatedData = await fetchApi('/auth/profile', {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
      setProfile(updatedData);
      setMessage({ text: 'Profil berhasil diperbarui!', type: 'success' });
    } catch (error: any) {
      setMessage({ text: error.message || 'Gagal menyimpan profil', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    router.push('/login');
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Memuat profil...</div>;
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-12" style={{ fontFamily: 'var(--font-sans, Montserrat, sans-serif)' }}>
      {/* Navbar Minimalis */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link href={profile?.role === 'PENYEDIA' ? '/dashboard' : '/marketplace'} className="flex items-center gap-2 group">
            <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="font-medium text-muted-foreground group-hover:text-primary transition-colors">Kembali</span>
          </Link>

          <nav className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="font-medium text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleLogout}>
              Logout
            </Button>
          </nav>
        </div>
      </header>

      {/* Konten Form Profil */}
      <main className="mx-auto max-w-2xl px-6 pt-10">
        <div className="flex items-center gap-4 mb-8">
          <UserCircle className="w-12 h-12 text-primary" />
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Profil Saya</h1>
            <p className="text-muted-foreground">Kelola informasi akun Anda di sini.</p>
          </div>
        </div>

        <Card className="border-border/60 shadow-sm">
          <CardHeader className="bg-muted/30 border-b border-border/40">
            <CardTitle className="text-lg">Informasi Dasar</CardTitle>
            <CardDescription>Akun Anda terdaftar sebagai <strong className="text-primary">{profile?.role}</strong></CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {message && (
                <div className={`p-3 text-sm rounded-md ${message.type === 'success' ? 'text-emerald-600 bg-emerald-50' : 'text-destructive bg-destructive/10'}`}>
                  {message.text}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email (Tidak dapat diubah)</Label>
                <Input id="email" type="email" defaultValue={profile?.email} disabled className="bg-muted/50" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nama">Nama Lengkap</Label>
                <Input id="nama" name="nama" defaultValue={profile?.nama} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="no_telepon">Nomor Telepon</Label>
                <Input id="no_telepon" name="no_telepon" defaultValue={profile?.no_telepon} required />
              </div>

              {/* Form Khusus Penyedia */}
              {profile?.role === 'PENYEDIA' && (
                <div className="mt-8 pt-6 border-t border-border/60 space-y-6">
                  <h3 className="font-bold text-lg">Informasi Toko</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="alamat_toko">Alamat Toko</Label>
                    <Input id="alamat_toko" name="alamat_toko" defaultValue={profile?.toko?.alamat_toko} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="latitude">Latitude</Label>
                      <Input id="latitude" name="latitude" type="number" step="any" defaultValue={profile?.toko?.latitude} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input id="longitude" name="longitude" type="number" step="any" defaultValue={profile?.toko?.longitude} />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    *Alamat dan koordinat diperlukan agar pembeli tahu lokasi penjemputan makanan.
                  </p>
                </div>
              )}

              <div className="pt-4 flex justify-end">
                <Button type="submit" size="lg" className="font-bold shadow-md" disabled={isSaving}>
                  {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
