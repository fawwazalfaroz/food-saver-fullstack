'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Store, Package, TrendingUp, X, Clock, ShoppingBag, Banknote, UserCircle, LogOut, ChevronDown, History, MapPin } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { fetchApi } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function DashboardPage() {
  const [store, setStore] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingStore, setIsCreatingStore] = useState(false);
  const [error, setError] = useState('');

  // CRUD State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states for custom formatting
  const [hargaAsliRaw, setHargaAsliRaw] = useState('');
  const [hargaDiskonRaw, setHargaDiskonRaw] = useState('');
  const [pickupStart, setPickupStart] = useState('');
  const [pickupEnd, setPickupEnd] = useState('');

  // Step 2 store creation form state (for forced fallback)
  const [storeLatitude, setStoreLatitude] = useState('');
  const [storeLongitude, setStoreLongitude] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [storeJamBuka, setStoreJamBuka] = useState('');
  const [storeJamTutup, setStoreJamTutup] = useState('');

  
  const handleAutoDetectLocation = () => {
    if (!('geolocation' in navigator)) {
      alert('Browser Anda tidak mendukung deteksi lokasi otomatis. Silakan isi manual.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setStoreLatitude(position.coords.latitude.toFixed(6));
        setStoreLongitude(position.coords.longitude.toFixed(6));
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

  // Toggle loading state per product
  const [togglingProducts, setTogglingProducts] = useState<Set<string>>(new Set());

  // Real Order Data from API
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState<{ totalTerjual: number; pendapatan: number }>({ totalTerjual: 0, pendapatan: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Helper untuk memformat angka ke string Rupiah (misal 15000 -> 15.000)
  const formatRupiahInput = (value: string) => {
    const number = value.replace(/\D/g, '');
    if (!number) return '';
    return new Intl.NumberFormat('id-ID').format(parseInt(number, 10));
  };

  const loadMyStore = async () => {
    setIsLoading(true);
    try {
      const data = await fetchApi('/toko/my-store');
      setStore(data);
      // Only load orders and stats if a store exists
      if (data) {
        await Promise.all([loadOrders(), loadStats()]);
      }
    } catch (error: any) {
      if (error.message.includes('404') || error.message.includes('tidak ditemukan')) {
        setStore(null); // Toko belum dibuat — show empty state
      } else {
        console.error('Failed to load store:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Dashboard | Food Saver';
    loadMyStore();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadOrders = async () => {
    try {
      const data = await fetchApi('/pesanan/my-orders');
      setOrders(data || []);
    } catch (err: any) {
      console.error('Failed to load orders:', err);
    }
  };

  const loadStats = async () => {
    try {
      const data = await fetchApi('/pesanan/stats');
      setStats(data || { totalTerjual: 0, pendapatan: 0 });
    } catch (err: any) {
      console.error('Failed to load stats:', err);
    }
  };

  const handleCreateStore = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreatingStore(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      nama_toko: formData.get('nama_toko'),
      alamat_toko: formData.get('alamat_toko'),
      deskripsi: formData.get('deskripsi') || '',
      kontak: formData.get('kontak') || '',
      jam_operasional: `${storeJamBuka} - ${storeJamTutup}`,
      latitude: parseFloat(formData.get('latitude') as string) || undefined,
      longitude: parseFloat(formData.get('longitude') as string) || undefined,
    };

    try {
      await fetchApi('/toko', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      await loadMyStore();
    } catch (err: any) {
      setError(err.message || 'Gagal membuat toko');
      setIsCreatingStore(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    // Clear the role cookie used by middleware
    document.cookie = 'user_role=; path=/; max-age=0; SameSite=Lax';
    window.location.href = '/login';
  };

  // CRUD Handlers
  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setHargaAsliRaw('');
    setHargaDiskonRaw('');
    setPickupStart('');
    setPickupEnd('');
    setIsModalOpen(true);
    setError('');
  };

  const handleOpenEditModal = (product: any) => {
    setEditingProduct(product);
    setHargaAsliRaw(product.harga_asli.toString());
    setHargaDiskonRaw(product.harga_diskon.toString());

    if (product.waktu_pickup && product.waktu_pickup.includes(' - ')) {
      const parts = product.waktu_pickup.split(' - ');
      setPickupStart(parts[0]);
      setPickupEnd(parts[1]);
    } else {
      setPickupStart('');
      setPickupEnd('');
    }

    setIsModalOpen(true);
    setError('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setError('');
  };

  const handleSubmitProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const rawFoto = formData.get('foto') as string;
    const finalFoto =
      rawFoto && rawFoto.trim() !== ''
        ? rawFoto
        : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop';

    const data = {
      nama_makanan: formData.get('nama_makanan'),
      deskripsi: formData.get('deskripsi'),
      harga_asli: parseInt(hargaAsliRaw, 10),
      harga_diskon: parseInt(hargaDiskonRaw, 10),
      stok: parseInt(formData.get('stok') as string),
      foto: finalFoto,
      waktu_pickup: `${pickupStart} - ${pickupEnd}`,
    };

    try {
      if (editingProduct) {
        await fetchApi(`/produk/${editingProduct.id}`, {
          method: 'PATCH',
          body: JSON.stringify(data),
        });
      } else {
        await fetchApi('/produk', {
          method: 'POST',
          body: JSON.stringify(data),
        });
      }
      handleCloseModal();
      await loadMyStore();
    } catch (err: any) {
      setError(err.message || 'Gagal menyimpan produk');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) return;
    try {
      await fetchApi(`/produk/${id}`, { method: 'DELETE' });
      await loadMyStore();
    } catch (err: any) {
      alert(err.message || 'Gagal menghapus produk');
    }
  };

  // Toggle ON/OFF handler — calls backend PATCH :id/toggle-status
  const handleToggleProduct = async (productId: string) => {
    setTogglingProducts(prev => new Set(prev).add(productId));
    try {
      const updated = await fetchApi(`/produk/${productId}/toggle-status`, {
        method: 'PATCH',
      });
      // Optimistically update local state without full reload
      setStore((prev: any) => ({
        ...prev,
        produk: prev.produk.map((p: any) =>
          p.id === productId ? { ...p, is_active: updated.is_active } : p
        ),
      }));
    } catch (err: any) {
      alert(err.message || 'Gagal mengubah status produk');
    } finally {
      setTogglingProducts(prev => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }
  };

  // Format currency
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Memuat dashboard...
      </div>
    );
  }

  // JIKA TOKO BELUM DIBUAT: Tampilkan Step 2 - Form Buat Toko (Forced)
  if (!store) {
    return (
      <div
        className="min-h-screen bg-muted/20 pb-12 flex flex-col justify-center items-center p-6"
        style={{ fontFamily: 'var(--font-sans, Montserrat, sans-serif)' }}
      >
        <div className="w-full max-w-xl">
          {/* Logo */}
          <div className="mb-8 flex items-center justify-center gap-2">
            <Image src="/FoodSaver_Green.png" alt="Logo" width={40} height={40} className="object-contain" />
            <span className="text-2xl font-bold tracking-tight">Food Saver</span>
          </div>

          <Card className="shadow-lg border-t-4 border-t-primary">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Lengkapi Data Toko</CardTitle>
              <p className="text-muted-foreground text-sm mt-2">
                Satu langkah lagi! Isi detail toko untuk mulai menerima pesanan.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateStore} className="space-y-4">
                {error && (
                  <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="nama_toko">Nama Toko</Label>
                  <Input
                    id="nama_toko"
                    name="nama_toko"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alamat_toko">Alamat Lengkap</Label>
                  <Input
                    id="alamat_toko"
                    name="alamat_toko"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Jam Operasional</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="jam_buka" className="text-xs text-muted-foreground">Jam Buka</Label>
                      <Input
                        id="jam_buka"
                        type="time"
                        value={storeJamBuka}
                        onChange={(e) => setStoreJamBuka(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="jam_tutup" className="text-xs text-muted-foreground">Jam Tutup</Label>
                      <Input
                        id="jam_tutup"
                        type="time"
                        value={storeJamTutup}
                        onChange={(e) => setStoreJamTutup(e.target.value)}
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
                        value={storeLatitude}
                        onChange={(e) => setStoreLatitude(e.target.value)}
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
                        value={storeLongitude}
                        onChange={(e) => setStoreLongitude(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Klik tombol di atas untuk mengisi otomatis. Anda tetap bisa menyesuaikannya secara manual.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deskripsi">
                    Deskripsi Singkat <span className="text-muted-foreground">(Opsional)</span>
                  </Label>
                  <Input
                    id="deskripsi"
                    name="deskripsi"
                    placeholder="Menjual aneka roti lezat sisa hari ini"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full mt-4 h-11"
                  disabled={isCreatingStore}
                >
                  {isCreatingStore ? 'Menyimpan...' : 'Simpan & Masuk Dashboard'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <button
              onClick={handleLogout}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  // JIKA TOKO SUDAH ADA: Tampilkan Dashboard
  const merchantProducts = store.produk || [];
  const activeProducts = merchantProducts.filter((p: any) => p.is_active !== false);
  const pendingOrders = orders.filter((o: any) => o.status === 'MENUNGGU_DIAMBIL');

  return (
    <div
      className="min-h-screen bg-muted/20 pb-12 relative"
      style={{ fontFamily: 'var(--font-sans, Montserrat, sans-serif)' }}
    >
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Image src="/FoodSaver_Green.png" alt="Logo" width={32} height={32} className="object-contain" />
            <span className="font-bold text-xl">Food Saver</span>
          </Link>

          <nav className="flex items-center gap-3">
            {/* Profile Dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(prev => !prev)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium bg-muted/40 border border-border/40 hover:bg-muted/80 transition-colors"
                aria-haspopup="true"
                aria-expanded={menuOpen}
              >
                <Store className="w-4 h-4 text-primary" />
                <span className="hidden sm:inline">{store.nama_toko}</span>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-background border border-border/60 rounded-xl shadow-lg z-50 overflow-hidden">
                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
                  >
                    <UserCircle className="w-4 h-4 text-muted-foreground" />
                    Profil Toko
                  </Link>
                  <Link
                    href="/dashboard/riwayat"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
                  >
                    <History className="w-4 h-4 text-muted-foreground" />
                    Riwayat Penjualan
                  </Link>
                  <div className="border-t border-border/60" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 pt-10">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1">
              Dashboard Toko
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Kelola stok makanan sisa dan pantau penjualanmu hari ini.
            </p>
          </div>
          <Button
            onClick={handleOpenCreateModal}
            className="font-bold shadow-md hover:shadow-lg transition-all gap-2 h-11 px-6 w-full sm:w-auto"
          >
            <Plus className="w-5 h-5" />
            Tambah Makanan
          </Button>
        </div>

        {/* ── Stats Row (3 cards) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
          {/* Card 1: Total Produk Aktif */}
          <Card className="border border-border/60 shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Produk Aktif</p>
                <p className="text-2xl font-bold">{activeProducts.length}</p>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Terjual */}
          <Card className="border border-border/60 shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Terjual</p>
                <p className="text-2xl font-bold">
                  {stats.totalTerjual}{' '}
                  <span className="text-sm font-normal text-muted-foreground">pesanan</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Pendapatan */}
          <Card className="border border-border/60 shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                <Banknote className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pendapatan</p>
                <p className="text-2xl font-bold">
                  {formatRupiah(stats.pendapatan)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Products List Section ── */}
        <Card className="border border-border/60 shadow-sm overflow-hidden mb-8">
          <CardHeader className="bg-muted/30 border-b border-border/40 px-6 py-4">
            <CardTitle className="text-lg">Daftar Makanan</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {merchantProducts.length > 0 ? (
              <div className="divide-y divide-border/40">
                {merchantProducts.map((product: any) => {
                  const isActive = product.is_active !== false;
                  const isToggling = togglingProducts.has(product.id);
                  return (
                    <div
                      key={product.id}
                      className={`p-4 sm:p-6 transition-colors flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center ${
                        isActive ? 'hover:bg-muted/10' : 'bg-muted/30 opacity-70'
                      }`}
                    >
                      {/* Product Image */}
                      <div className="w-full sm:w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-muted">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.foto}
                          alt={product.nama_makanan}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-bold text-base sm:text-lg truncate">
                            {product.nama_makanan}
                          </h3>
                          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 shrink-0">
                            Sisa {product.stok}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {product.deskripsi}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground line-through decoration-destructive/50 text-xs">
                              {formatRupiah(product.harga_asli)}
                            </span>
                            <span className="font-bold text-primary">
                              {formatRupiah(product.harga_diskon)}
                            </span>
                          </div>
                          <div className="w-1 h-1 rounded-full bg-border"></div>
                          <span className="text-muted-foreground text-xs">
                            Pickup: {product.waktu_pickup}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0">
                        {/* Toggle ON/OFF */}
                        <button
                          onClick={() => handleToggleProduct(product.id)}
                          disabled={isToggling}
                          title={isActive ? 'Nonaktifkan produk' : 'Aktifkan produk'}
                          className={`relative inline-flex h-7 w-12 items-center rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 ${
                            isActive
                              ? 'bg-emerald-500 border-emerald-600'
                              : 'bg-muted border-border'
                          }`}
                        >
                          <span
                            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
                              isActive ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                        <span className={`text-xs font-medium ${isActive ? 'text-emerald-600' : 'text-muted-foreground'}`}>
                          {isToggling ? '...' : isActive ? 'Aktif' : 'Nonaktif'}
                        </span>

                        <div className="flex gap-2 sm:mt-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenEditModal(product)}
                            className="flex-1 sm:flex-none justify-center gap-1.5 border border-border/60 hover:border-primary hover:text-primary"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span className="sm:hidden">Edit</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteProduct(product.id)}
                            className="flex-1 sm:flex-none justify-center gap-1.5 border border-border/60 text-destructive hover:border-destructive hover:bg-destructive/5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="sm:hidden">Hapus</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-12 text-center flex flex-col items-center justify-center">
                <Package className="w-12 h-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-1">Belum ada makanan</h3>
                <p className="text-muted-foreground mb-6">
                  Mulai tambahkan sisa stok makanan pertamamu hari ini.
                </p>
                <Button onClick={handleOpenCreateModal} className="font-bold shadow-md">
                  Tambah Makanan Sekarang
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* ── Pesanan Masuk Section ── */}
        <Card className="border border-border/60 shadow-sm overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border/40 px-6 py-4 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Pesanan Masuk</CardTitle>
            {pendingOrders.length > 0 && (
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold">
                {pendingOrders.length}
              </span>
            )}
          </CardHeader>
          <CardContent className="p-0">
            {pendingOrders.length > 0 ? (
              <div className="divide-y divide-border/40">
                {pendingOrders.map((order: any) => (
                  <div
                    key={order.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 hover:bg-muted/10 transition-colors"
                  >
                    {/* Status Icon */}
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-amber-500/10 text-amber-600">
                      <Clock className="w-5 h-5" />
                    </div>

                    {/* Order Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <span className="font-semibold text-sm font-mono">{order.id.slice(0, 8).toUpperCase()}</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border bg-amber-500/10 text-amber-700 border-amber-500/20">
                          Menunggu Diambil
                        </span>
                      </div>
                      <p className="text-sm text-foreground font-medium truncate">{order.produk?.nama_makanan}</p>
                      <p className="text-xs text-muted-foreground">
                        Pembeli: {order.pembeli?.nama} &bull; {formatRupiah(order.total_harga)}
                      </p>
                    </div>

                    {/* Status Badge */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-700 border border-amber-500/20 shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                      Menunggu diambil pembeli
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 text-center flex flex-col items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-muted-foreground/50 mb-3" />
                <p className="text-muted-foreground">Belum ada pesanan masuk.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <Card className="w-full max-w-lg shadow-xl relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
              onClick={handleCloseModal}
            >
              <X className="w-5 h-5" />
            </Button>
            <CardHeader>
              <CardTitle className="text-2xl">
                {editingProduct ? 'Edit Makanan' : 'Tambah Makanan'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitProduct} className="space-y-4">
                {error && (
                  <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="nama_makanan">Nama Makanan</Label>
                  <Input
                    id="nama_makanan"
                    name="nama_makanan"
                    defaultValue={editingProduct?.nama_makanan}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deskripsi">Deskripsi</Label>
                  <Input
                    id="deskripsi"
                    name="deskripsi"
                    defaultValue={editingProduct?.deskripsi}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="harga_asli_display">Harga Asli</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        Rp
                      </span>
                      <Input
                        id="harga_asli_display"
                        name="harga_asli_display"
                        className="pl-8"
                        value={hargaAsliRaw ? formatRupiahInput(hargaAsliRaw) : ''}
                        onChange={e => setHargaAsliRaw(e.target.value.replace(/\D/g, ''))}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="harga_diskon_display">Harga Diskon</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        Rp
                      </span>
                      <Input
                        id="harga_diskon_display"
                        name="harga_diskon_display"
                        className="pl-8"
                        value={hargaDiskonRaw ? formatRupiahInput(hargaDiskonRaw) : ''}
                        onChange={e => setHargaDiskonRaw(e.target.value.replace(/\D/g, ''))}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stok">Stok Porsi</Label>
                  <Input
                    id="stok"
                    name="stok"
                    type="number"
                    defaultValue={editingProduct?.stok}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Waktu Pickup</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="time"
                      name="pickup_start"
                      value={pickupStart}
                      onChange={e => setPickupStart(e.target.value)}
                      required
                    />
                    <span className="text-muted-foreground">-</span>
                    <Input
                      type="time"
                      name="pickup_end"
                      value={pickupEnd}
                      onChange={e => setPickupEnd(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="foto">URL Foto (Opsional)</Label>
                  <Input
                    id="foto"
                    name="foto"
                    placeholder="https://... (Kosongkan untuk gambar default)"
                    defaultValue={editingProduct?.foto}
                  />
                </div>
                <Button type="submit" className="w-full mt-4 h-11" disabled={isSubmitting}>
                  {isSubmitting ? 'Menyimpan...' : 'Simpan Produk'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
