'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { ArrowLeft, Banknote } from 'lucide-react';

interface Order {
  id: string;
  jumlah: number;
  total_harga: number;
  status: string;
  created_at: string;
  produk: {
    id: string;
    nama_makanan: string;
    foto: string;
  };
  pembeli: {
    id: string;
    nama: string;
  };
}

export default function RiwayatPenjualanPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
  document.title = 'Riwayat | Food Saver';
}, []);
  useEffect(() => {
    async function loadHistory() {
      try {
        const data = await fetchApi('/pesanan/my-orders');
        // Filter only SELESAI and DIBATALKAN
        const history = (data || []).filter(
          (o: Order) => o.status === 'SELESAI' || o.status === 'DIBATALKAN'
        );
        setOrders(history);
      } catch (err: any) {
        console.error('Failed to load history:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadHistory();
  }, []);

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
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

  const totalPendapatan = orders
    .filter((o) => o.status === 'SELESAI')
    .reduce((sum, o) => sum + o.total_harga, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Memuat riwayat penjualan...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-muted/20 pb-12"
      style={{ fontFamily: 'var(--font-sans, Montserrat, sans-serif)' }}
    >
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-5xl px-6 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="font-medium text-muted-foreground group-hover:text-primary transition-colors">
              Kembali ke Dashboard
            </span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 pt-10">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1">
            Riwayat Penjualan
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Daftar pesanan yang sudah selesai atau dibatalkan.
          </p>
        </div>

        {/* Income Summary Card */}
        <div className="mb-8 bg-card border border-border/60 rounded-xl shadow-sm p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
            <Banknote className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Pendapatan</p>
            <p className="text-2xl sm:text-3xl font-bold">{formatRupiah(totalPendapatan)}</p>
          </div>
        </div>

        {/* Orders Table */}
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg font-bold mb-2">Belum ada riwayat</p>
            <p className="text-muted-foreground">
              Pesanan yang sudah selesai atau dibatalkan akan muncul di sini.
            </p>
          </div>
        ) : (
          <div className="bg-card border border-border/60 rounded-xl shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 bg-muted/30 border-b border-border/40 text-xs font-bold text-muted-foreground uppercase tracking-wider">
              <div className="col-span-2">Order ID</div>
              <div className="col-span-3">Produk</div>
              <div className="col-span-2">Pembeli</div>
              <div className="col-span-2">Tanggal</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-2 text-right">Harga</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-border/40">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-6 py-4 items-center hover:bg-muted/10 transition-colors"
                >
                  {/* Order ID */}
                  <div className="col-span-2">
                    <span className="font-mono text-sm font-medium">
                      {order.id.slice(0, 8).toUpperCase()}
                    </span>
                  </div>

                  {/* Product */}
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md overflow-hidden bg-muted shrink-0 hidden sm:block">
                      {order.produk.foto ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={order.produk.foto}
                          alt={order.produk.nama_makanan}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs">🍱</div>
                      )}
                    </div>
                    <span className="text-sm font-medium truncate">
                      {order.produk.nama_makanan}
                    </span>
                  </div>

                  {/* Buyer */}
                  <div className="col-span-2 text-sm text-muted-foreground truncate">
                    {order.pembeli.nama}
                  </div>

                  {/* Date */}
                  <div className="col-span-2 text-xs text-muted-foreground">
                    {formatDate(order.created_at)}
                  </div>

                  {/* Status */}
                  <div className="col-span-1">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                        order.status === 'SELESAI'
                          ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20'
                          : 'bg-red-500/10 text-red-700 border-red-500/20'
                      }`}
                    >
                      {order.status === 'SELESAI' ? 'Selesai' : 'Batal'}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 text-right">
                    <span className="text-sm font-bold">
                      {formatRupiah(order.total_harga)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
