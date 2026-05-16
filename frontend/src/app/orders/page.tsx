'use client';

import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { useRouter } from 'next/navigation';

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

interface Order {
  id: string;
  jumlah: number;
  total_harga: number;
  status: string;
  snap_token: string | null;
  created_at: string;
  produk: {
    id: string;
    nama_makanan: string;
    foto: string;
    harga_diskon: number;
  };
  toko: {
    id: string;
    nama_toko: string;
    alamat_toko: string;
  };
  pembeli: {
    id: string;
    nama: string;
  };
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [payingId, setPayingId] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Pesanan | Food Saver';
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await fetchApi('/pesanan/my-purchases');
      setOrders(data || []);
    } catch (err: any) {
      if (err.message?.includes('401')) {
        router.push('/login');
      }
      console.error('Failed to load orders:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteOrder = async (orderId: string) => {
    if (!window.confirm('Konfirmasi bahwa Anda sudah menerima pesanan ini?')) return;
    setConfirmingId(orderId);
    try {
      await fetchApi(`/pesanan/${orderId}/complete`, { method: 'PATCH' });
      await loadOrders();
    } catch (err: any) {
      alert(err.message || 'Gagal mengkonfirmasi pesanan');
    } finally {
      setConfirmingId(null);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!window.confirm('Hapus riwayat pesanan ini? Tindakan ini tidak dapat dibatalkan.')) return;
    setDeletingId(orderId);
    try {
      await fetchApi(`/pesanan/${orderId}`, { method: 'DELETE' });
      setOrders(prev => prev.filter(o => o.id !== orderId));
    } catch (err: any) {
      alert(err.message || 'Gagal menghapus riwayat pesanan');
    } finally {
      setDeletingId(null);
    }
  };

  const handleResumePayment = (order: Order) => {
    if (!order.snap_token) {
      alert('Token pembayaran tidak tersedia. Silakan buat pesanan baru.');
      return;
    }
    setPayingId(order.id);
    window.snap.pay(order.snap_token, {
      onSuccess: () => {
        setPayingId(null);
        loadOrders();
      },
      onPending: () => {
        setPayingId(null);
      },
      onError: () => {
        setPayingId(null);
        alert('Pembayaran gagal. Silakan coba lagi.');
      },
      onClose: () => {
        setPayingId(null);
      },
    });
  };

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'MENUNGGU_PEMBAYARAN':
        return { label: 'Menunggu Pembayaran', className: 'badge-waiting' };
      case 'MENUNGGU_DIAMBIL':
        return { label: 'Menunggu Diambil', className: 'badge-pending' };
      case 'SELESAI':
        return { label: 'Selesai', className: 'badge-success' };
      case 'DIBATALKAN':
        return { label: 'Dibatalkan', className: 'badge-cancelled' };
      default:
        return { label: status, className: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border' };
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium">Memuat pesanan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-12" style={{ fontFamily: 'var(--font-sans, Montserrat, sans-serif)' }}>

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-4xl px-6 h-16 flex items-center justify-between">
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

      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Pesanan Saya</h1>
          <p className="text-sm text-muted-foreground mt-1">Riwayat dan status pesanan Anda.</p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto text-muted-foreground/40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p className="text-lg font-bold mb-2">Belum ada pesanan</p>
            <p className="text-muted-foreground mb-6">Mulai pesan makanan dari marketplace.</p>
            <Link href="/marketplace">
              <button className="btn-primary">
                Jelajahi Marketplace
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => {
              const badge = getStatusBadge(order.status);
              return (
                <div
                  key={order.id}
                  className="ui-card overflow-hidden"
                >
                  <div className="p-5 flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="w-full sm:w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-muted">
                      {order.produk.foto ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={order.produk.foto}
                          alt={order.produk.nama_makanan}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl">🍱</div>
                      )}
                    </div>

                    {/* Order Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-bold text-foreground text-base truncate">
                          {order.produk.nama_makanan}
                        </h3>
                        <span className={badge.className}>
                          {badge.label}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground mb-1">
                        <span className="font-mono font-medium text-foreground">ID: {order.id.slice(0, 8).toUpperCase()}</span>
                        <span>•</span>
                        <span>Atas nama: <span className="font-semibold text-foreground">{order.pembeli.nama}</span></span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {order.toko.nama_toko} • {order.toko.alamat_toko}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <span className="text-muted-foreground">
                          {order.jumlah}x {formatRupiah(order.produk.harga_diskon)}
                        </span>
                        <span className="font-bold text-foreground">
                          Total: {formatRupiah(order.total_harga)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(order.created_at)}
                      </p>
                    </div>

                    {/* Action */}
                    <div className="flex flex-col items-stretch sm:items-end gap-2 shrink-0">
                      {order.status === 'MENUNGGU_PEMBAYARAN' && (
                        <button
                          onClick={() => handleResumePayment(order)}
                          disabled={payingId === order.id}
                          className="btn-primary bg-amber-500 hover:bg-amber-600 text-white"
                        >
                          {payingId === order.id ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                          )}
                          Lanjut Bayar
                        </button>
                      )}
                      {order.status === 'MENUNGGU_DIAMBIL' && (
                        <button
                          onClick={() => handleCompleteOrder(order.id)}
                          disabled={confirmingId === order.id}
                          className="btn-primary"
                        >
                          {confirmingId === order.id ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                          Pesanan Diterima
                        </button>
                      )}
                      {(order.status === 'SELESAI' || order.status === 'DIBATALKAN') && (
                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          disabled={deletingId === order.id}
                          className="btn-danger"
                        >
                          {deletingId === order.id ? (
                            <div className="w-4 h-4 border-2 border-destructive border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          )}
                          Hapus Riwayat
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Midtrans Snap Script (for resume payment) */}
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
    </div>
  );
}
