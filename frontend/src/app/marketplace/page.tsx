'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, MapPin, Store, UserCircle, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';

export default function MarketplacePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchApi('/produk');
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Format currency
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      setFilteredProducts(products.filter(p => 
        p.nama_makanan.toLowerCase().includes(lowerQuery) || 
        p.deskripsi.toLowerCase().includes(lowerQuery) ||
        (p.toko?.nama_toko && p.toko.nama_toko.toLowerCase().includes(lowerQuery))
      ));
    }
  }, [searchQuery, products]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-muted/20 pb-12" style={{ fontFamily: 'var(--font-sans, Montserrat, sans-serif)' }}>
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground font-bold text-lg leading-none">F</span>
            </div>
            <span className="text-lg font-bold tracking-tight group-hover:text-primary transition-colors">
              Food Saver
            </span>
          </Link>

          <nav className="flex items-center gap-4 flex-1 justify-end ml-4">
            <Link href="/profile" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors shrink-0">
              <UserCircle className="w-5 h-5" />
              <span className="hidden md:inline">Profil</span>
            </Link>
            <div className="w-px h-6 bg-border mx-1 shrink-0"></div>
            <Button variant="ghost" size="sm" className="font-medium shrink-0" onClick={handleLogout}>Logout</Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 pt-10">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
            Temukan Penawaran Terbaik
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Selamatkan makanan lezat di sekitarmu sebelum terbuang sia-sia, dengan harga yang sangat terjangkau.
          </p>
        </div>

        {/* Search bar utama */}
        <div className="mb-8 relative max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Cari nama makanan, toko, atau deskripsi..." 
            className="w-full h-12 bg-card pl-11 border-border/60 shadow-sm text-base focus-visible:ring-primary/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center py-20 text-muted-foreground">Memuat makanan...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex justify-center py-20 text-muted-foreground">
            {searchQuery ? 'Tidak ada makanan yang cocok dengan pencarian Anda.' : 'Belum ada makanan yang tersedia saat ini.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const toko = product.toko;
              
              return (
                <Card key={product.id} className="group overflow-hidden border-border/60 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300 flex flex-col">
                  {/* Image Section */}
                  <div className="relative w-full h-48 overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={product.foto} 
                      alt={product.nama_makanan}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Discount Badge */}
                    <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground font-bold px-2.5 py-1 rounded-md text-xs shadow-sm">
                      Hemat {Math.round((1 - product.harga_diskon / product.harga_asli) * 100)}%
                    </div>
                    {/* Quantity Badge */}
                    <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm text-foreground font-medium px-2.5 py-1 rounded-md text-xs shadow-sm">
                      Sisa {product.stok} porsi
                    </div>
                  </div>

                  <CardContent className="p-5 flex-1 flex flex-col">
                    {/* Merchant Info */}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                      <Store className="w-3.5 h-3.5 text-primary/80" />
                      <span className="font-medium truncate">{toko?.nama_toko || 'Toko Tidak Diketahui'}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-lg leading-tight mb-2 line-clamp-2">
                      {product.nama_makanan}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                      {product.deskripsi}
                    </p>

                    {/* Info Tags */}
                    <div className="flex flex-col gap-2 mb-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 p-2 rounded-md">
                        <Clock className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                        <span className="truncate">Ambil: <span className="font-medium text-foreground">{product.waktu_pickup}</span></span>
                      </div>
                      {toko && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 p-2 rounded-md">
                          <MapPin className="w-3.5 h-3.5 shrink-0 text-primary" />
                          <span className="truncate">{toko.alamat_toko}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="p-5 pt-0 flex items-center justify-between mt-auto border-t border-border/40 bg-muted/10">
                    <div className="flex flex-col mt-4">
                      <span className="text-xs text-muted-foreground line-through decoration-destructive/50">
                        {formatRupiah(product.harga_asli)}
                      </span>
                      <span className="text-lg font-bold text-primary leading-none">
                        {formatRupiah(product.harga_diskon)}
                      </span>
                    </div>
                    <Button className="font-bold px-6 shadow-sm hover:shadow-md transition-all mt-4">
                      Pesan
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
