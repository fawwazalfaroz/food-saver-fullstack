'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Store, Package, TrendingUp, X, UserCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
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
    } catch (error: any) {
      if (error.message.includes('404')) {
        setStore(null); // Toko belum dibuat
      } else {
        console.error('Failed to load store:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMyStore();
  }, []);

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
      jam_operasional: formData.get('jam_operasional'),
      latitude: parseFloat(formData.get('latitude') as string) || undefined,
      longitude: parseFloat(formData.get('longitude') as string) || undefined,
    };

    try {
      await fetchApi('/toko', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      // Berhasil bikin toko, load ulang
      await loadMyStore();
    } catch (err: any) {
      setError(err.message || 'Gagal membuat toko');
      setIsCreatingStore(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
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
    
    // Parsing "18:00 - 20:00" menjadi start dan end
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
    const finalFoto = rawFoto && rawFoto.trim() !== '' 
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
      await loadMyStore(); // Refresh produk
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
      await loadMyStore(); // Refresh data
    } catch (err: any) {
      alert(err.message || 'Gagal menghapus produk');
    }
  };

  // Format currency
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (isLoading) {
    return <div className="min-h-screen flex justify-center items-center">Memuat dashboard...</div>;
  }

  // JIKA TOKO BELUM DIBUAT: Tampilkan Form Buat Toko
  if (!store) {
    return (
      <div className="min-h-screen bg-muted/20 pb-12 flex flex-col justify-center items-center p-6" style={{ fontFamily: 'var(--font-sans, Montserrat, sans-serif)' }}>
        <div className="w-full max-w-xl">
          <div className="mb-8 flex items-center justify-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">F</span>
            </div>
            <span className="text-2xl font-bold tracking-tight">Food Saver <span className="font-normal text-primary">| Merchant</span></span>
          </div>

          <Card className="shadow-lg border-t-4 border-t-primary">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Lengkapi Profil Tokomu</CardTitle>
              <p className="text-muted-foreground text-sm mt-2">
                Merchant wajib melengkapi nama, alamat, dan koordinat toko sebelum bisa menjual produk.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateStore} className="space-y-4">
                {error && <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">{error}</div>}
                <div className="space-y-2">
                  <Label htmlFor="nama_toko">Nama Toko</Label>
                  <Input id="nama_toko" name="nama_toko" placeholder="Contoh: Toko Roti Manis" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alamat_toko">Alamat Lengkap</Label>
                  <Input id="alamat_toko" name="alamat_toko" placeholder="Jl. Merdeka No. 12" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input id="latitude" name="latitude" type="number" step="any" placeholder="-6.200000" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input id="longitude" name="longitude" type="number" step="any" placeholder="106.816666" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jam_operasional">Jam Operasional</Label>
                  <Input id="jam_operasional" name="jam_operasional" placeholder="08:00 - 20:00" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deskripsi">Deskripsi Singkat (Opsional)</Label>
                  <Input id="deskripsi" name="deskripsi" placeholder="Menjual aneka roti lezat" />
                </div>
                <Button type="submit" className="w-full mt-4 h-11" disabled={isCreatingStore}>
                  {isCreatingStore ? 'Menyimpan...' : 'Simpan Profil Toko'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // JIKA TOKO SUDAH ADA: Tampilkan Dashboard
  const merchantProducts = store.produk || [];

  return (
    <div className="min-h-screen bg-muted/20 pb-12 relative" style={{ fontFamily: 'var(--font-sans, Montserrat, sans-serif)' }}>
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground font-bold text-lg leading-none">F</span>
            </div>
            <span className="text-lg font-bold tracking-tight group-hover:text-primary transition-colors">
              Food Saver <span className="text-primary font-normal">| Merchant</span>
            </span>
          </Link>

          <nav className="flex items-center gap-4">
            <Link 
              href="/profile" 
              className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-all bg-muted/40 px-3 py-1.5 rounded-md border border-border/40 hover:bg-muted/80"
              title="Edit Profil Toko"
            >
              <Store className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              <span>{store.nama_toko}</span>
              <Edit className="w-3.5 h-3.5 text-muted-foreground opacity-70 group-hover:opacity-100 ml-1" />
            </Link>
            <div className="w-px h-6 bg-border mx-1 hidden sm:block"></div>
            <Button variant="ghost" size="sm" className="font-medium shrink-0" onClick={handleLogout}>Logout</Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 pt-10">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-1">
              Dashboard Toko
            </h1>
            <p className="text-muted-foreground">
              Kelola stok makanan sisa dan pantau penjualanmu hari ini.
            </p>
          </div>
          <Button onClick={handleOpenCreateModal} className="font-bold shadow-md hover:shadow-lg transition-all gap-2 h-11 px-6">
            <Plus className="w-5 h-5" />
            Tambah Makanan
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <Card className="border-border/60 shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Produk Aktif</p>
                <p className="text-2xl font-bold">{merchantProducts.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/60 shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Terjual Hari Ini</p>
                <p className="text-2xl font-bold">0 <span className="text-sm font-normal text-muted-foreground">porsi</span></p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products List Section */}
        <Card className="border-border/60 shadow-sm overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border/40 px-6 py-4">
            <CardTitle className="text-lg">Daftar Makanan</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {merchantProducts.length > 0 ? (
              <div className="divide-y divide-border/40">
                {merchantProducts.map((product: any) => (
                  <div key={product.id} className="p-6 hover:bg-muted/10 transition-colors flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    {/* Product Image */}
                    <div className="w-full sm:w-24 h-24 sm:h-24 rounded-lg overflow-hidden shrink-0 bg-muted">
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
                        <h3 className="font-bold text-lg truncate">{product.nama_makanan}</h3>
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 shrink-0">
                          Sisa {product.stok}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {product.deskripsi}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
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
                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0 mt-4 sm:mt-0">
                      <Button variant="outline" size="sm" onClick={() => handleOpenEditModal(product)} className="flex-1 sm:flex-none justify-center gap-2 border-border/60 hover:border-primary hover:text-primary">
                        <Edit className="w-4 h-4" />
                        <span className="sm:hidden">Edit</span>
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteProduct(product.id)} className="flex-1 sm:flex-none justify-center gap-2 border-border/60 text-destructive hover:border-destructive hover:bg-destructive/5">
                        <Trash2 className="w-4 h-4" />
                        <span className="sm:hidden">Hapus</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center flex flex-col items-center justify-center">
                <Package className="w-12 h-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-1">Belum ada makanan</h3>
                <p className="text-muted-foreground mb-6">Mulai tambahkan sisa stok makanan pertamamu hari ini.</p>
                <Button onClick={handleOpenCreateModal} className="font-bold shadow-md">Tambah Makanan Sekarang</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <Card className="w-full max-w-lg shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
            <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={handleCloseModal}>
              <X className="w-5 h-5" />
            </Button>
            <CardHeader>
              <CardTitle className="text-2xl">{editingProduct ? 'Edit Makanan' : 'Tambah Makanan'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitProduct} className="space-y-4">
                {error && <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">{error}</div>}
                <div className="space-y-2">
                  <Label htmlFor="nama_makanan">Nama Makanan</Label>
                  <Input id="nama_makanan" name="nama_makanan" defaultValue={editingProduct?.nama_makanan} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deskripsi">Deskripsi</Label>
                  <Input id="deskripsi" name="deskripsi" defaultValue={editingProduct?.deskripsi} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="harga_asli_display">Harga Asli</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">Rp</span>
                      <Input 
                        id="harga_asli_display" 
                        name="harga_asli_display" 
                        className="pl-8"
                        value={hargaAsliRaw ? formatRupiahInput(hargaAsliRaw) : ''}
                        onChange={(e) => setHargaAsliRaw(e.target.value.replace(/\D/g, ''))}
                        required 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="harga_diskon_display">Harga Diskon</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">Rp</span>
                      <Input 
                        id="harga_diskon_display" 
                        name="harga_diskon_display" 
                        className="pl-8"
                        value={hargaDiskonRaw ? formatRupiahInput(hargaDiskonRaw) : ''}
                        onChange={(e) => setHargaDiskonRaw(e.target.value.replace(/\D/g, ''))}
                        required 
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stok">Stok Porsi</Label>
                  <Input id="stok" name="stok" type="number" defaultValue={editingProduct?.stok} required />
                </div>
                <div className="space-y-2">
                  <Label>Waktu Pickup</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="time" 
                      name="pickup_start" 
                      value={pickupStart}
                      onChange={(e) => setPickupStart(e.target.value)}
                      required 
                    />
                    <span className="text-muted-foreground">-</span>
                    <Input 
                      type="time" 
                      name="pickup_end" 
                      value={pickupEnd}
                      onChange={(e) => setPickupEnd(e.target.value)}
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="foto">URL Foto (Opsional)</Label>
                  <Input id="foto" name="foto" placeholder="https://... (Kosongkan untuk gambar default)" defaultValue={editingProduct?.foto} />
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
