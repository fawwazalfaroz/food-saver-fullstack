'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';

interface Product {
  id: string;
  nama_makanan: string;
  deskripsi: string;
  harga_asli: number;
  harga_diskon: number;
  stok: number;
  waktu_pickup: string;
  foto: string;
  toko?: {
    nama_toko: string;
    alamat_toko: string;
  };
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
  document.title = 'Produk Detail | Food Saver';
}, []);

  useEffect(() => {
    if (!id) return;
    async function loadProduct() {
      try {
        const data = await fetchApi(`/produk/${id}`);
        setProduct(data);
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : 'Produk tidak ditemukan.';
        setError(errMsg);
      } finally {
        setIsLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // ── Loading State ──
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium">Memuat detail produk...</p>
        </div>
      </div>
    );
  }

  // ── Error State ──
  if (error || !product) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Produk Tidak Ditemukan</p>
          <p className="text-slate-500 dark:text-slate-400 mb-6">{error || 'Terjadi kesalahan.'}</p>
          <Link href="/marketplace">
            <button className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-md hover:bg-emerald-700 transition-colors">
              Kembali ke Marketplace
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const discountPercent = Math.round((1 - product.harga_diskon / product.harga_asli) * 100);

  return (
    <div className="min-h-screen bg-muted/20 dark:bg-slate-950 text-slate-600 dark:text-slate-400 font-sans transition-colors duration-200">

      {/* ── NAVBAR ── */}
      <header className="border-b border-gray-200 dark:border-slate-800 bg-muted/20 dark:bg-slate-950 sticky top-0 z-50 transition-colors duration-200 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/FoodSaver_Green.png" alt="Logo" width={32} height={32} className="object-contain" />
            <span className="text-slate-900 dark:text-white font-bold text-xl tracking-tight">Food Saver</span>
          </Link>
          <Link href="/marketplace">
            <button className="px-4 py-2 text-sm font-semibold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Kembali
            </button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:py-16">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8">
          <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Beranda</Link>
          <span>/</span>
          <Link href="/marketplace" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Marketplace</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-semibold truncate max-w-[200px]">{product.nama_makanan}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ── LEFT COLUMN: Image ── */}
          <div className="sticky top-24 w-full bg-muted border border-border/60 rounded-2xl overflow-hidden shadow-sm aspect-square relative flex items-center justify-center group">
            {product.foto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.foto}
                alt={product.nama_makanan}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <span className="text-6xl">🍱</span>
              </div>
            )}
            {/* Scarcity Badge */}
            <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
              Sisa {product.stok} Porsi
            </div>
            {/* Discount Badge */}
            <div className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10">
              Hemat {discountPercent}%
            </div>
          </div>

          {/* ── RIGHT COLUMN: Details ── */}
          <div className="flex flex-col gap-7">

            {/* Title & Merchant */}
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-3">
                {product.nama_makanan}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-slate-600 dark:text-slate-400">
                {product.toko && (
                  <>
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-md bg-amber-100 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-700 dark:text-amber-500 font-bold text-[10px]">
                        {product.toko.nama_toko.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">{product.toko.nama_toko}</span>
                    </div>
                    <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <span className="line-clamp-1">{product.toko.alamat_toko}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Pricing Block */}
            <div className="flex flex-col gap-1">
              <span className="text-lg text-slate-400 dark:text-slate-500 font-medium line-through">
                {formatRupiah(product.harga_asli)}
              </span>
              <div className="flex items-center gap-4">
                <span className="text-4xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
                  {formatRupiah(product.harga_diskon)}
                </span>
                <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-md border border-emerald-200 dark:border-emerald-800">
                  Hemat {discountPercent}%
                </span>
              </div>
            </div>

            {/* Scarcity & Time Alert */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/60 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-800/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-amber-900 dark:text-amber-400 uppercase tracking-wider mb-0.5">Waktu Pengambilan</h4>
                  <p className="text-amber-800 dark:text-amber-300 font-medium text-sm">{product.waktu_pickup}</p>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs text-amber-700 dark:text-amber-500 font-bold uppercase tracking-wider mb-0.5">Ketersediaan</p>
                <p className="text-amber-900 dark:text-amber-400 font-black text-lg">Sisa {product.stok} Porsi</p>
              </div>
            </div>

            {/* Action Area */}
            <div>
              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm font-bold text-slate-900 dark:text-white">Jumlah:</span>
                <div className="flex items-center border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQty(prev => Math.max(1, prev - 1))}
                    className="w-10 h-10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-bold text-lg"
                  >
                    −
                  </button>
                  <span className="w-12 h-10 flex items-center justify-center text-slate-900 dark:text-white font-bold border-x border-gray-200 dark:border-slate-700">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty(prev => Math.min(product.stok, prev + 1))}
                    className="w-10 h-10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-bold text-lg"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">Maks. {product.stok}</span>
              </div>

              <button
                onClick={() => router.push(`/checkout/${id}?qty=${qty}`)}
                className="w-full py-4 bg-emerald-600 text-white font-black text-lg rounded-xl shadow-sm hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 group"
              >
                <svg className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                Pesan Sekarang
              </button>
              <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-3 font-medium">
                Pembayaran dilakukan di aplikasi. Ambil langsung di toko.
              </p>
            </div>

            {/* Description */}
            <div className="ui-card overflow-hidden">
              <div className="p-5 border-b border-border/60">
                <h3 className="font-bold text-foreground mb-3">Deskripsi Produk</h3>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {product.deskripsi}
                </p>
              </div>
              {/* Info Row */}
              <div className="p-4 flex items-center justify-between bg-muted/40">
                <span className="text-xs text-muted-foreground font-medium">⚠️ Harap segera dikonsumsi setelah pengambilan</span>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-slate-800 py-8 mt-10">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-slate-500 dark:text-slate-400">
          © 2026 FoodSaver Inc.
        </div>
      </footer>
    </div>
  );
}
