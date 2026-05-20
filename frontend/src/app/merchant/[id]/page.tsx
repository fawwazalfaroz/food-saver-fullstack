'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { useParams } from 'next/navigation';
import { MapPin, Clock } from 'lucide-react';

interface Produk {
  id: string;
  nama_makanan: string;
  deskripsi: string;
  harga_asli: number;
  harga_diskon: number;
  stok: number;
  foto: string;
  waktu_pickup: string;
}

interface Toko {
  id: string;
  nama_toko: string;
  alamat_toko: string;
  deskripsi: string | null;
  jam_operasional: string;
  produk: Produk[];
}

export default function MerchantDetailPage() {
  const params = useParams();
  const tokoId = params?.id as string;

  const [toko, setToko] = useState<Toko | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Toko | Food Saver';
    if (!tokoId) return;
    async function loadStore() {
      try {
        const data = await fetchApi(`/toko/${tokoId}`);
        setToko(data);
        if (data?.nama_toko) {
          document.title = `${data.nama_toko} | Food Saver`;
        }
      } catch (err: any) {
        setError(err.message || 'Toko tidak ditemukan.');
      } finally {
        setIsLoading(false);
      }
    }
    loadStore();
  }, [tokoId]);

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium">Memuat toko...</p>
        </div>
      </div>
    );
  }

  if (error || !toko) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold mb-2">Toko Tidak Ditemukan</p>
          <p className="text-muted-foreground mb-6">{error || 'Terjadi kesalahan.'}</p>
          <Link href="/marketplace">
            <button className="btn-primary">Kembali ke Marketplace</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-12" style={{ fontFamily: 'var(--font-sans, Montserrat, sans-serif)' }}>
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Image src="/FoodSaver_Green.png" alt="Logo" width={32} height={32} className="object-contain" />
            <span className="font-bold text-xl">Food Saver</span>
          </Link>
          <Link href="/marketplace" className="btn-ghost text-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Marketplace
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pt-10">
        {/* Store Profile Header */}
        <div className="ui-card p-6 mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">{toko.nama_toko}</h1>
          {toko.deskripsi && (
            <p className="text-muted-foreground mb-4">{toko.deskripsi}</p>
          )}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span>{toko.alamat_toko}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{toko.jam_operasional}</span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <h2 className="text-xl font-bold mb-4">Menu</h2>
        {toko.produk.length === 0 ? (
          <p className="text-muted-foreground">Belum ada produk aktif dari toko ini.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {toko.produk.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="ui-card overflow-hidden group hover:shadow-md hover:border-primary/30 transition-all flex flex-col"
              >
                {/* Image */}
                <div className="relative w-full h-48 overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.foto}
                    alt={product.nama_makanan}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground font-bold px-2.5 py-1 rounded-md text-xs shadow-sm">
                    Hemat {Math.round((1 - product.harga_diskon / product.harga_asli) * 100)}%
                  </div>
                  <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm text-foreground font-medium px-2.5 py-1 rounded-md text-xs shadow-sm">
                    Sisa {product.stok} porsi
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg leading-tight mb-1 line-clamp-2">{product.nama_makanan}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">{product.deskripsi}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 bg-muted/50 p-2 rounded-md">
                    <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Ambil: <span className="font-medium text-foreground">{product.waktu_pickup}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground line-through">{formatRupiah(product.harga_asli)}</span>
                    <span className="text-lg font-bold text-primary">{formatRupiah(product.harga_diskon)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
