"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        // Decode JWT payload (base64)
        const payload = JSON.parse(atob(token.split('.')[1]));
        setIsLoggedIn(true);
        setUserRole(payload.role || null);
      } catch {
        setIsLoggedIn(false);
        setUserRole(null);
      }
    }
  }, []);

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 font-sans transition-colors duration-200 relative">
        
        {/* ── DARK MODE TOGGLE ── */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="absolute top-4 right-6 z-50 p-2.5 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-gray-200 dark:border-slate-700 shadow-sm hover:scale-105 transition-transform"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          )}
        </button>
      {/* ── NAVBAR ── */}
      <header className="border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors duration-200">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/FoodSaver_Green.png" alt="Logo" width={32} height={32} className="object-contain" />
            <span className="text-slate-900 dark:text-white font-bold text-xl tracking-tight">Food Saver</span>
          </Link>
          <div className="flex gap-4">
            {!isLoggedIn ? (
              <>
                <Link href="/login">
                  <button className="px-4 py-2 text-sm font-semibold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Masuk</button>
                </Link>
                <Link href="/register">
                  <button className="px-4 py-2 text-sm font-semibold bg-emerald-600 text-white rounded-md shadow-sm hover:bg-emerald-700 transition-colors">Daftar</button>
                </Link>
              </>
            ) : userRole === 'PENYEDIA' ? (
              <Link href="/dashboard">
                <button className="px-4 py-2 text-sm font-semibold bg-emerald-600 text-white rounded-md shadow-sm hover:bg-emerald-700 transition-colors">Ke Dashboard Toko</button>
              </Link>
            ) : (
              <Link href="/marketplace">
                <button className="px-4 py-2 text-sm font-semibold bg-emerald-600 text-white rounded-md shadow-sm hover:bg-emerald-700 transition-colors">Buka Marketplace</button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6">
        
        {/* ── TIGHT HERO SECTION ── */}
        <section className="py-16 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center border-b border-gray-200 dark:border-slate-800">
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              Selamatkan Makanan, Hemat Pengeluaran.
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-snug max-w-lg">
              Platform manajemen sisa makanan #1. Temukan makanan berkualitas dengan harga miring, kurangi jejak karbon, dan bantu merchant lokal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link href="/marketplace">
                <button className="w-full sm:w-auto px-6 py-3 bg-emerald-600 text-white font-bold rounded-md shadow-sm hover:bg-emerald-700 transition-colors">
                  Mulai Belanja
                </button>
              </Link>
              <Link href="/register">
                <button className="w-full sm:w-auto px-6 py-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold rounded-md border border-gray-300 dark:border-slate-700 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                  Daftar Merchant
                </button>
              </Link>
            </div>
          </div>
          
          {/* Browser Window Mockup */}
          <div className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col h-full min-h-[400px]">
            {/* Top Bar */}
            <div className="h-10 bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-800 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400 dark:bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400 dark:bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-400 dark:bg-emerald-500"></div>
              <div className="ml-4 flex-1 bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-md h-6 flex items-center px-2">
                <span className="text-[10px] text-gray-400 dark:text-slate-500 font-mono">foodsaver.app/dashboard</span>
              </div>
            </div>
            {/* Faux Dashboard Data */}
            <div className="flex-1 p-6 grid grid-cols-2 gap-4 bg-slate-50/50 dark:bg-slate-950/50">
              {/* Stat Cards */}
              <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-4 shadow-sm flex flex-col justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Total Terselamatkan</span>
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">1,402 kg</span>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-4 shadow-sm flex flex-col justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Total Penghematan</span>
                <span className="text-2xl font-bold text-slate-900 dark:text-white mt-2">Rp 4.2M</span>
              </div>
              {/* Chart Mockup */}
              <div className="col-span-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-4 shadow-sm h-32 flex items-end gap-2">
                 <div className="w-full bg-emerald-100 dark:bg-emerald-900/50 rounded-t-sm h-[40%] relative"><div className="absolute inset-x-0 bottom-full mb-1 text-[10px] text-center font-mono text-emerald-600 dark:text-emerald-400">40%</div></div>
                 <div className="w-full bg-emerald-200 dark:bg-emerald-800/60 rounded-t-sm h-[60%] relative"><div className="absolute inset-x-0 bottom-full mb-1 text-[10px] text-center font-mono text-emerald-700 dark:text-emerald-300">60%</div></div>
                 <div className="w-full bg-emerald-400 dark:bg-emerald-600/80 rounded-t-sm h-[30%] relative"><div className="absolute inset-x-0 bottom-full mb-1 text-[10px] text-center font-mono text-emerald-800 dark:text-emerald-200">30%</div></div>
                 <div className="w-full bg-emerald-500 dark:bg-emerald-500 rounded-t-sm h-[80%] relative"><div className="absolute inset-x-0 bottom-full mb-1 text-[10px] text-center font-mono text-emerald-900 dark:text-emerald-100">80%</div></div>
                 <div className="w-full bg-emerald-600 dark:bg-emerald-400 rounded-t-sm h-[100%] relative"><div className="absolute inset-x-0 bottom-full mb-1 text-[10px] text-center font-mono text-emerald-600 dark:text-emerald-400">100%</div></div>
              </div>
              {/* List Mockup */}
              <div className="col-span-2 flex flex-col gap-2">
                <div className="h-10 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg shadow-sm flex items-center px-3 justify-between">
                   <div className="flex items-center gap-2">
                     <div className="w-6 h-6 rounded bg-emerald-100/50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800"></div>
                     <div className="w-20 h-2 rounded bg-slate-200 dark:bg-slate-800"></div>
                   </div>
                   <div className="w-12 h-4 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"></div>
                </div>
                <div className="h-10 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg shadow-sm flex items-center px-3 justify-between">
                   <div className="flex items-center gap-2">
                     <div className="w-6 h-6 rounded bg-amber-100/50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800"></div>
                     <div className="w-24 h-2 rounded bg-slate-200 dark:bg-slate-800"></div>
                   </div>
                   <div className="w-12 h-4 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BENTO GRID SECTION ── */}
        <section className="py-16 md:py-20">
          <div className="mb-10">
             <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">Platform Impact & Workflow</h2>
             <p className="text-slate-600 dark:text-slate-400">Semua yang Anda butuhkan untuk mengelola dan menemukan makanan berlebih dengan efisien.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6">
            
            {/* Tall Rectangle (Spans 2 rows) */}
            <div className="md:col-span-2 md:row-span-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 lg:p-8 flex flex-col relative overflow-hidden group hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Cara Pesan Instan</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 max-w-sm">Temukan makanan di sekitarmu, klik pesan, dan ambil di toko. Sesederhana itu.</p>
              
              {/* Faux Receipt / Order Process */}
              <div className="flex-1 w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl p-5 flex flex-col gap-4 relative">
                <div className="flex justify-between items-start border-b border-gray-200 dark:border-slate-800 pb-3">
                  <div>
                     <p className="text-xs font-bold text-slate-900 dark:text-white uppercase">Order #FS-992</p>
                     <p className="text-[10px] text-slate-500 dark:text-slate-400">2 Nov, 14:30</p>
                  </div>
                  <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold rounded-md border border-emerald-200 dark:border-emerald-800">CONFIRMED</span>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                      <div className="w-8 h-8 rounded bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-xs">🥐</div>
                      <div className="flex flex-col"><span className="text-xs font-bold text-slate-900 dark:text-white">Artisan Pastry</span><span className="text-[10px] text-slate-500 dark:text-slate-400">The Daily Loaf</span></div>
                    </div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Rp 12.000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                      <div className="w-8 h-8 rounded bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-xs">🥗</div>
                      <div className="flex flex-col"><span className="text-xs font-bold text-slate-900 dark:text-white">Veggie Bowl</span><span className="text-[10px] text-slate-500 dark:text-slate-400">Salad Stop</span></div>
                    </div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Rp 25.000</span>
                  </div>
                </div>
                <div className="mt-auto pt-3 border-t border-gray-200 dark:border-slate-800 flex justify-between items-center">
                   <span className="text-xs font-bold text-slate-500 dark:text-slate-400">TOTAL</span>
                   <span className="text-lg font-black text-slate-900 dark:text-white">Rp 37.000</span>
                </div>
              </div>
            </div>

            {/* Small Square 1 */}
            <div className="md:col-span-1 md:row-span-1 bg-emerald-600 border border-emerald-700 rounded-2xl shadow-sm p-6 flex flex-col justify-between group hover:bg-emerald-700 transition-colors text-white">
              <h3 className="text-3xl font-black mb-1">1.000+</h3>
              <p className="text-sm text-emerald-100 font-medium">Merchant aktif bergabung dalam misi ini.</p>
            </div>

            {/* Small Square 2 */}
            <div className="md:col-span-1 md:row-span-1 bg-slate-900 dark:bg-slate-800 border border-slate-800 dark:border-slate-700 rounded-2xl shadow-sm p-6 flex flex-col justify-between group hover:bg-black dark:hover:bg-slate-700 transition-colors text-white">
               <h3 className="text-3xl font-black mb-1">50 Ton</h3>
               <p className="text-sm text-slate-300 font-medium">CO₂ berhasil dicegah bulan ini.</p>
            </div>

            {/* Wide Rectangle */}
            <div className="md:col-span-2 md:row-span-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 flex flex-col justify-between group hover:border-emerald-500 transition-colors relative overflow-hidden">
               <div className="relative z-10">
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Lacak Lokasi Real-time</h3>
                 <p className="text-slate-600 dark:text-slate-400 text-sm max-w-[200px]">Temukan merchant terdekat dengan map interaktif yang sangat responsif.</p>
               </div>
               {/* Faux Mini-map background */}
               <div className="absolute right-0 top-0 bottom-0 w-[55%] bg-slate-50 dark:bg-slate-950 border-l border-gray-200 dark:border-slate-800 overflow-hidden">
                 <div className="absolute inset-0 opacity-40 dark:opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBoNDBWMEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDEwaDQwTTEwIDB2NDAiIHN0cm9rZT0iI2U1ZTdlYiIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZykiLz48L3N2Zz4=')]"></div>
                 {/* Map Pins */}
                 <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-emerald-500 rounded-full border border-white dark:border-slate-900 shadow-sm"></div>
                 <div className="absolute top-1/2 left-2/3 w-4 h-4 bg-emerald-600 rounded-full border-2 border-white dark:border-slate-900 shadow-sm flex items-center justify-center"><div className="w-1 h-1 bg-white dark:bg-slate-900 rounded-full"></div></div>
                 <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-emerald-400 rounded-full border border-white dark:border-slate-900 shadow-sm"></div>
               </div>
            </div>

          </div>
        </section>

        {/* ── TESTIMONIAL GRID ── */}
        <section className="bg-gray-50/50 dark:bg-slate-950/50 border-t border-gray-200 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight text-center mb-10">Dipercaya oleh Ratusan Pengguna</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: "FoodSaver benar-benar mengubah cara kami mengelola sisa bahan baku. Penghematan biaya sangat terasa di bulan pertama.",
                  name: "Budi Santoso",
                  role: "Owner, The Daily Loaf",
                  avatar: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400"
                },
                {
                  quote: "Sangat mudah digunakan. Saya bisa mendapatkan makanan berkualitas tinggi dengan setengah harga, sekaligus kurangi limbah.",
                  name: "Siti Aminah",
                  role: "Mahasiswi",
                  avatar: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400"
                },
                {
                  quote: "Platform transparan. Laporan jejak karbon bulanan membantu restoran kami mencapai target keberlanjutan tahun ini dengan cepat.",
                  name: "Andi Wijaya",
                  role: "Manager, Salad Stop",
                  avatar: "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-400"
                }
              ].map((testimonial, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-6 shadow-sm flex flex-col gap-4">
                  <div className="flex gap-1 text-emerald-500">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-1">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-slate-800">
                    <div className={`w-8 h-8 rounded-full ${testimonial.avatar} flex items-center justify-center font-bold text-xs uppercase`}>
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">{testimonial.name}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-500 mt-1">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ACCORDION ── */}
        <section className="bg-white dark:bg-slate-950 transition-colors">
          <div className="mx-auto max-w-3xl px-6 py-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight text-center mb-10">Pertanyaan Populer</h2>
            <div className="flex flex-col border-t border-gray-200 dark:border-slate-800">
              {[
                { q: "Bagaimana cara kerja FoodSaver?", a: "Merchant mengunggah makanan berlebih dengan diskon besar. Anda memesan melalui aplikasi, lalu mengambilnya di toko pada waktu yang ditentukan." },
                { q: "Apakah makanan yang dijual masih layak konsumsi?", a: "Tentu. Semua merchant kami terikat kontrak untuk hanya menjual makanan yang masih segar, belum tersentuh, dan 100% aman untuk dikonsumsi hari itu." },
                { q: "Metode pembayaran apa saja yang diterima?", a: "Kami menerima berbagai dompet digital (GoPay, OVO, Dana), transfer bank virtual account, dan kartu kredit." },
                { q: "Bagaimana jika merchant membatalkan pesanan?", a: "Jika stok habis secara tiba-tiba, pesanan akan dibatalkan secara otomatis dan dana Anda akan dikembalikan 100% ke saldo FoodSaver Anda dalam hitungan detik." }
              ].map((faq, i) => (
                <div key={i} className="border-b border-gray-200 dark:border-slate-800 py-4 group cursor-pointer hover:bg-gray-50/50 dark:hover:bg-slate-900 transition-colors">
                  <div className="flex justify-between items-center px-2">
                    <h3 className="font-bold text-slate-900 dark:text-slate-200 text-sm">{faq.q}</h3>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ── MEGA FOOTER ── */}
      <footer className="bg-gray-50/50 dark:bg-slate-900/50 border-t border-gray-200 dark:border-slate-800 transition-colors">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-12">
            {/* Left Column */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Image src="/FoodSaver_Green.png" alt="Logo" width={32} height={32} className="object-contain" />
                <span className="text-slate-900 dark:text-white font-extrabold text-lg tracking-tight">Food Saver</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
                Misi kami adalah mengakhiri limbah makanan di Indonesia. Bergabunglah dengan kami untuk menyelamatkan makanan enak setiap harinya.
              </p>
              <div className="mt-2">
                <p className="text-xs font-bold text-slate-900 dark:text-slate-300 mb-2 uppercase tracking-wider">Berlangganan Newsletter</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input type="email" placeholder="Alamat email Anda" className="px-3 py-2 text-sm bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-md shadow-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 w-full max-w-[240px]" />
                  <button className="px-4 py-2 bg-emerald-600 text-white text-sm font-bold rounded-md shadow-sm hover:bg-emerald-700 transition-colors">Subscribe</button>
                </div>
              </div>
            </div>
            
            {/* Middle/Right Columns */}
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-300 uppercase tracking-wider mb-1">Produk</h4>
                <Link href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Beli Makanan</Link>
                <Link href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Untuk Merchant</Link>
                <Link href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Aplikasi Mobile</Link>
                <Link href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Harga & Biaya</Link>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-300 uppercase tracking-wider mb-1">Perusahaan</h4>
                <Link href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Tentang Kami</Link>
                <Link href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Karir</Link>
                <Link href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Blog & Berita</Link>
                <Link href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Dampak Lingkungan</Link>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-300 uppercase tracking-wider mb-1">Bantuan</h4>
                <Link href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Pusat Bantuan</Link>
                <Link href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Panduan Pengguna</Link>
                <Link href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Syarat & Ketentuan</Link>
                <Link href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Kebijakan Privasi</Link>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">© 2026 FoodSaver Inc. Hak Cipta Dilindungi.</p>
            <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500">
              <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      </div>
    </div>
  );
}
