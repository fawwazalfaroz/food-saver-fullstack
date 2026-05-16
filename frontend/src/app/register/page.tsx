'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, Suspense } from 'react';
import { fetchApi } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Store, CheckCircle, MapPin } from 'lucide-react';

// ── Step 1: Account Registration ──────────────────────────────────────────────
function AccountStep({
  defaultRole,
  onConsumerSuccess,
  onMerchantSuccess,
}: {
  defaultRole: 'consumer' | 'merchant';
  onConsumerSuccess: () => void;
  onMerchantSuccess: (email: string, password: string) => void;
}) {
  const [role, setRole] = useState<'consumer' | 'merchant'>(defaultRole);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const data = {
      nama: formData.get('nama'),
      email,
      password,
      no_telepon: formData.get('no_telepon'),
      role: role === 'consumer' ? 'PEMBELI' : 'PENYEDIA',
    };

    try {
      await fetchApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (role === 'consumer') {
        onConsumerSuccess();
      } else {
        // For merchants: pass credentials so Step 2 can auto-login after store creation
        onMerchantSuccess(email, password);
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat mendaftar');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg border-t-4 border-t-primary">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Buat Akun</CardTitle>
        <CardDescription className="text-center">
          Bergabung dengan Food Saver dan mulai{' '}
          {role === 'consumer' ? 'hemat dengan belanja makanan' : 'jual sisa stok makananmu'}
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
            <Input id="email" name="email" type="email" placeholder="nama@email.com" required />
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
          Sudah punya akun?{' '}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Masuk
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

// ── Step 2: Store Details (Merchant only) ─────────────────────────────────────
function StoreStep({
  credentials,
  onSuccess,
}: {
  credentials: { email: string; password: string };
  onSuccess: () => void;
}) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [jamBuka, setJamBuka] = useState('');
  const [jamTutup, setJamTutup] = useState('');

  const handleAutoDetectLocation = () => {
    if (!('geolocation' in navigator)) {
      alert('Browser Anda tidak mendukung deteksi lokasi otomatis. Silakan isi manual.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toFixed(6));
        setLongitude(position.coords.longitude.toFixed(6));
        setIsLocating(false);
      },
      (err) => {
        setIsLocating(false);
        const msg =
          err.code === err.PERMISSION_DENIED
            ? 'Izin lokasi ditolak. Aktifkan izin lokasi di browser atau isi manual.'
            : 'Gagal mengambil lokasi. Pastikan izin lokasi aktif atau isi manual.';
        alert(msg);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  };

  const handleCreateStore = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      // 1. Login to get the access token
      const loginRes = await fetchApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      localStorage.setItem('access_token', loginRes.access_token);
      const maxAge = 60 * 60 * 24;
      document.cookie = `user_role=${loginRes.role}; path=/; max-age=${maxAge}; SameSite=Lax`;

      // 2. Create the store
      const tokoData = {
        nama_toko: formData.get('nama_toko'),
        alamat_toko: formData.get('alamat_toko'),
        deskripsi: formData.get('deskripsi') || '',
        kontak: formData.get('kontak') || '',
        jam_operasional: `${jamBuka} - ${jamTutup}`,
        latitude: parseFloat(formData.get('latitude') as string) || undefined,
        longitude: parseFloat(formData.get('longitude') as string) || undefined,
      };

      await fetchApi('/toko', {
        method: 'POST',
        body: JSON.stringify(tokoData),
      });

      // 3. Both steps succeeded — go to dashboard
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Gagal membuat toko. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg border-t-4 border-t-primary">
      <CardHeader className="space-y-1">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span className="line-through">Akun</span>
          </div>
          <div className="w-8 h-px bg-border"></div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
            <Store className="w-4 h-4" />
            <span>Detail Toko</span>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center">Lengkapi Data Toko</CardTitle>
        <CardDescription className="text-center">
          Satu langkah lagi! Isi detail toko untuk mulai berjualan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreateStore} className="space-y-4">
          {error && <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">{error}</div>}

          <div className="space-y-2">
            <Label htmlFor="nama_toko">Nama Toko</Label>
            <Input id="nama_toko" name="nama_toko" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="alamat_toko">Alamat Lengkap</Label>
            <Input id="alamat_toko" name="alamat_toko" required />
          </div>

          <div className="space-y-2">
            <Label>Jam Operasional</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="jam_buka" className="text-xs text-muted-foreground">Jam Buka</Label>
                <Input
                  id="jam_buka"
                  type="time"
                  value={jamBuka}
                  onChange={(e) => setJamBuka(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="jam_tutup" className="text-xs text-muted-foreground">Jam Tutup</Label>
                <Input
                  id="jam_tutup"
                  type="time"
                  value={jamTutup}
                  onChange={(e) => setJamTutup(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Lokasi Toko (Koordinat)</Label>
              <button
                type="button"
                onClick={handleAutoDetectLocation}
                disabled={isLocating}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLocating ? (
                  <>
                    <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    Mendeteksi...
                  </>
                ) : (
                  <>
                    <MapPin className="w-3.5 h-3.5" />
                    Ambil Lokasi Otomatis
                  </>
                )}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="latitude" className="text-xs text-muted-foreground">Latitude</Label>
                <Input
                  id="latitude"
                  name="latitude"
                  type="number"
                  step="any"
                  placeholder="-6.200000"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="longitude" className="text-xs text-muted-foreground">Longitude</Label>
                <Input
                  id="longitude"
                  name="longitude"
                  type="number"
                  step="any"
                  placeholder="106.816666"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  required
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Koordinat akan terisi otomatis. Anda tetap bisa menyesuaikannya secara manual.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deskripsi">Deskripsi Singkat <span className="text-muted-foreground">(Opsional)</span></Label>
            <Input id="deskripsi" name="deskripsi" placeholder="Menjual aneka roti lezat sisa hari ini" />
          </div>

          <Button type="submit" className="w-full mt-4 h-11 text-base" disabled={isLoading}>
            {isLoading ? 'Menyimpan...' : 'Selesai & Masuk ke Dashboard'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// ── Main Register Form ─────────────────────────────────────────────────────────
function RegisterForm() {
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get('role') === 'merchant' ? 'merchant' : 'consumer';
  const router = useRouter();

  // 'account' | 'store' — which step is active
  const [step, setStep] = useState<'account' | 'store'>('account');
  // Temporarily hold merchant credentials to auto-login before store creation
  const [merchantCredentials, setMerchantCredentials] = useState<{ email: string; password: string } | null>(null);

  const handleConsumerSuccess = () => {
    router.push('/login?registered=true');
  };

  const handleMerchantStep1Success = (email: string, password: string) => {
    setMerchantCredentials({ email, password });
    setStep('store');
  };

  const handleStoreSuccess = () => {
    window.location.href = '/dashboard';
  };

  if (step === 'store' && merchantCredentials) {
    return (
      <StoreStep
        credentials={merchantCredentials}
        onSuccess={handleStoreSuccess}
      />
    );
  }

  return (
    <AccountStep
      defaultRole={defaultRole as 'consumer' | 'merchant'}
      onConsumerSuccess={handleConsumerSuccess}
      onMerchantSuccess={handleMerchantStep1Success}
    />
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-muted/30 flex flex-col justify-center items-center p-4">
      <div className="mb-8 flex items-center justify-center gap-2">
        <Image src="/FoodSaver_Green.png" alt="Logo" width={40} height={40} className="object-contain" />
        <span className="text-2xl font-bold tracking-tight">Food Saver</span>
      </div>

      <Suspense fallback={<div className="animate-pulse w-full max-w-md h-96 bg-muted rounded-xl"></div>}>
        <RegisterForm />
      </Suspense>

      <div className="mt-8">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
          &larr; Kembali ke beranda
        </Link>
      </div>
    </div>
  );
}
