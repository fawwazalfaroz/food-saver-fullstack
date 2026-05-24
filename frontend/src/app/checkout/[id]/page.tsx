'use client';

import Link from 'next/link';
import Script from 'next/script';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

// Extend Window for Midtrans Snap
declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        callbacks: {
          onSuccess?: (result: any) => void;
          onPending?: (result: any) => void;
          onError?: (result: any) => void;
          onClose?: () => void;
        },
      ) => void;
    };
  }
}

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

type PaymentMethod = 'cash' | 'transfer';

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = params?.id as string;
  const qty = Math.max(1, parseInt(searchParams.get('qty') || '1', 10));

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

    useEffect(() => {
  document.title = 'Checkout | Food Saver';
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

  const handleSubmit = async () => {
    if (!product) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetchApi('/pesanan', {
        method: 'POST',
        body: JSON.stringify({
          produk_id: id,
          jumlah: qty,
        }),
      });

      const snapToken = response.snap_token;

      if (!snapToken) {
        throw new Error('Snap token tidak diterima dari server.');
      }

      // Trigger Midtrans Snap popup
      window.snap.pay(snapToken, {
        onSuccess: () => {
          router.push(`/checkout/success?order_id=${response.id}`);
        },
        onPending: () => {
          router.push('/orders');
        },
        onError: () => {
          setSubmitError('Pembayaran gagal. Silakan coba lagi.');
          setIsSubmitting(false);
        },
        onClose: () => {
          router.push('/orders');
        },
      });
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Gagal membuat pesanan.';
      setSubmitError(errMsg);
      setIsSubmitting(false);
    }
  };

  // ── Loading ──
  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/20 dark:bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-slate-500 dark:text-slate-400">
          <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium">Memuat checkout...</p>
        </div>
      </div>
    );
  }

  // ── Error ──
  if (error || !product) {
    return (
      <div className="min-h-screen bg-muted/20  dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Gagal Memuat</p>
          <p className="text-slate-500 dark:text-slate-400 mb-6">{error || 'Produk tidak ditemukan.'}</p>
          <Link href="/marketplace">
            <button className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-md hover:bg-emerald-700 transition-colors">Kembali ke Marketplace</button>
          </Link>
        </div>
      </div>
    );
  }

  const discountAmount = product.harga_asli - product.harga_diskon;
  const totalPrice = product.harga_diskon * qty;

  return (
    <div className="min-h-screen bg-muted/20 dark:bg-slate-950 text-slate-600 dark:text-slate-400 font-sans transition-colors duration-200">

      {/* ── NAVBAR ── */}
      <header className="border-b border-gray-200 dark:border-slate-800 bg-muted/20 dark:bg-slate-950 sticky top-0 z-50 transition-colors duration-200">
        <div className="mx-auto max-w-5xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/FoodSaver_Green.png" alt="Logo" width={32} height={32} className="object-contain" />
            <span className="text-slate-900 dark:text-white font-bold text-xl tracking-tight">Food Saver</span>
          </Link>
          <Link href={`/product/${id}`}>
            <button className="px-4 py-2 text-sm font-semibold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Kembali
            </button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Checkout</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Konfirmasi pesanan Anda sebelum melanjutkan.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* ── LEFT COLUMN: Order Summary (3/5) ── */}
          <div className="lg:col-span-3 flex flex-col gap-6">

            {/* Product Card */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-200 dark:border-slate-800">
                <h2 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">Ringkasan Pesanan</h2>
              </div>
              <div className="p-5 flex gap-5">
                {/* Thumbnail */}
                <div className="w-24 h-24 rounded-lg border border-gray-200 dark:border-slate-800 overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
                  {product.foto ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={product.foto} alt={product.nama_makanan} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">🍱</div>
                  )}
                </div>
                {/* Info */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight line-clamp-2">{product.nama_makanan}</h3>
                    {product.toko && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{product.toko.nama_toko}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-sm text-slate-400 dark:text-slate-500 line-through">{formatRupiah(product.harga_asli)}</span>
                    <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{formatRupiah(product.harga_diskon)}</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">× {qty}</span>
                  </div>
                </div>
              </div>
              {/* Pickup Info */}
              <div className="px-5 pb-5">
                <div className="flex items-center gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/60 rounded-lg p-3">
                  <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <div>
                    <p className="text-xs font-bold text-amber-900 dark:text-amber-400 uppercase tracking-wider">Ambil: {product.waktu_pickup}</p>
                    {product.toko && (
                      <p className="text-xs text-amber-700 dark:text-amber-500 mt-0.5">{product.toko.alamat_toko}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg p-4">
              <svg className="w-5 h-5 text-red-500 dark:text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
              <p className="text-xs text-red-800 dark:text-red-400 font-medium leading-relaxed">
                Harap ambil pesanan sebelum waktu tutup toko. Pesanan yang tidak diambil dalam waktu yang ditentukan akan otomatis dibatalkan.
              </p>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Payment & Action (2/5) ── */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Payment Method Card */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-200 dark:border-slate-800">
                <h2 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">Metode Pembayaran</h2>
              </div>
              <div className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-800/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm text-slate-900 dark:text-white">Midtrans Payment Gateway</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Transfer Bank, E-Wallet, Kartu Kredit, dan lainnya</p>
                </div>
              </div>
            </div>

            {/* Price Breakdown Card */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
              <div className="p-5 flex flex-col gap-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Harga Satuan</span>
                  <span className="text-slate-900 dark:text-white font-medium">{formatRupiah(product.harga_diskon)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Jumlah</span>
                  <span className="text-slate-900 dark:text-white font-medium">{qty}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Potongan Harga</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">- {formatRupiah(discountAmount * qty)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-slate-800 pt-3 flex justify-between items-center">
                  <span className="text-slate-900 dark:text-white font-bold">Total Bayar</span>
                  <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{formatRupiah(totalPrice)}</span>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {submitError && (
              <div className="p-3 text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/60 rounded-lg font-medium">
                {submitError}
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-4 bg-emerald-600 text-white font-black text-lg rounded-xl shadow-sm hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Memproses...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Konfirmasi Pesanan
                </>
              )}
            </button>
            <p className="text-center text-xs text-slate-500 dark:text-slate-400 font-medium -mt-3">
              Dengan mengkonfirmasi, Anda setuju dengan ketentuan layanan kami.
            </p>
          </div>

        </div>
      </main>

      {/* Midtrans Snap Script */}
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
    </div>
  );
}
