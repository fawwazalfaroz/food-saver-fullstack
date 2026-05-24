'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
          <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
          Pesanan Berhasil!
        </h1>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          Pesanan Anda telah dikonfirmasi. Silakan ambil pesanan di toko sesuai waktu pengambilan yang tertera.
        </p>

        {/* Order ID */}
        {orderId && (
          <div className="mb-8 ui-card p-4 text-left">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Order ID</p>
            <p className="text-lg font-bold font-mono">{orderId.slice(0, 8).toUpperCase()}</p>
            <p className="text-xs text-muted-foreground mt-1 break-all">{orderId}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/orders">
            <button className="btn-primary w-full sm:w-auto">
              Cek Status Pesanan
            </button>
          </Link>
          <Link href="/marketplace">
            <button className="btn-outline w-full sm:w-auto">
              Kembali ke Marketplace
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Memuat...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
