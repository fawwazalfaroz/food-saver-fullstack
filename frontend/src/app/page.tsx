import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

// ─── Feature Card Data ────────────────────────────────────────────────────────
const features = [
  {
    id: 'feature-harga-murah',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/40',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    title: 'Harga Murah',
    description:
      'Dapatkan makanan berkualitas dari restoran dan toko favoritmu dengan diskon hingga 70% dari harga normal.',
  },
  {
    id: 'feature-ramah-lingkungan',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    iconBg: 'bg-teal-100 dark:bg-teal-900/40',
    iconColor: 'text-teal-600 dark:text-teal-400',
    title: 'Ramah Lingkungan',
    description:
      'Setiap makanan yang kamu selamatkan berarti kurang sampah di tempat pembuangan. Bersama kita jaga bumi.',
  },
  {
    id: 'feature-bantu-merchant',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    iconBg: 'bg-lime-100 dark:bg-lime-900/40',
    iconColor: 'text-lime-600 dark:text-lime-500',
    title: 'Bantu Merchant',
    description:
      'Merchant dapat memulihkan biaya produksi dari sisa stok yang tidak terjual dan menjangkau lebih banyak pelanggan.',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col" style={{ fontFamily: 'var(--font-sans, Montserrat, sans-serif)' }}>

      {/* ── Navbar ───────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" id="navbar-logo">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
              <svg className="w-4.5 h-4.5 text-primary-foreground" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight group-hover:text-primary transition-colors duration-200">
              Food Saver
            </span>
          </Link>

          {/* Login Button */}
          <Link href="/login" id="navbar-login-btn">
            <Button variant="outline" className="font-semibold rounded-full px-5 border-primary/40 hover:border-primary hover:bg-primary/5 transition-all duration-200">
              Login
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col">

        {/* ── Hero Section ─────────────────────────────────────────────────── */}
        <section className="relative w-full overflow-hidden py-28 md:py-36 px-6 flex flex-col items-center text-center">

          {/* Background: layered green blur orbs */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            {/* Main orb */}
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-primary/15 blur-[120px]" />
            {/* Secondary orbs */}
            <div className="absolute top-[30%] left-[10%] w-[300px] h-[300px] rounded-full bg-emerald-400/10 blur-[80px]" />
            <div className="absolute top-[20%] right-[8%] w-[250px] h-[250px] rounded-full bg-teal-400/10 blur-[80px]" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">

            {/* Animated badge */}
            <div id="hero-badge" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold mb-8 shadow-sm">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              🌿 Platform Anti-Food Waste #1 di Indonesia
            </div>

            {/* Main headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6">
              Selamatkan Makanan,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-500 to-teal-500">
                Hemat Pengeluaran
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              Temukan makanan sisa layak konsumsi dari merchant terpercaya dengan harga diskon.
              Nikmati makanan lezat, kurangi pemborosan, dan dukung bisnis lokal sekitarmu.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12">
              <Link href="/marketplace" id="cta-mulai-belanja" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-13 px-8 text-base font-bold rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Mulai Belanja
                </Button>
              </Link>
              <Link href="/register?role=merchant" id="cta-daftar-merchant" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-13 px-8 text-base font-bold rounded-full border-2 border-primary/40 hover:border-primary hover:bg-primary/5 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Daftar sebagai Merchant
                </Button>
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>1.000+ merchant bergabung</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>50.000+ makanan terselamatkan</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Gratis untuk konsumen</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Features Section ─────────────────────────────────────────────── */}
        <section id="fitur" className="w-full py-24 px-6">
          <div className="max-w-6xl mx-auto">

            {/* Section header */}
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Mengapa Food Saver?</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                Keuntungan untuk Semua
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
                Platform kami dirancang untuk memberikan manfaat nyata—baik bagi pembeli, penjual, maupun lingkungan.
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature) => (
                <Card
                  key={feature.id}
                  id={feature.id}
                  className="group relative border border-border/60 bg-card hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden"
                >
                  {/* Subtle top gradient accent */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <CardHeader className="pb-3 pt-8 px-7">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl ${feature.iconBg} ${feature.iconColor} flex items-center justify-center mb-5 shadow-sm`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold tracking-tight">{feature.title}</h3>
                  </CardHeader>

                  <CardContent className="px-7 pb-8">
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ───────────────────────────────────────────────────── */}
        <section className="w-full py-20 px-6">
          <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-primary/90 to-emerald-600/90 dark:from-primary/80 dark:to-emerald-700/80 p-12 md:p-16 text-center shadow-2xl shadow-primary/20 relative overflow-hidden">
            {/* Background orb inside banner */}
            <div aria-hidden="true" className="absolute inset-0 -z-10 pointer-events-none">
              <div className="absolute -top-10 -right-10 w-60 h-60 rounded-full bg-white/10 blur-[60px]" />
              <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-white/10 blur-[60px]" />
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Siap untuk Mulai?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
              Bergabunglah dengan ribuan pengguna yang sudah hemat lebih banyak dan buang lebih sedikit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register?role=consumer" id="banner-cta-consumer">
                <Button size="lg" className="w-full sm:w-auto rounded-full h-12 px-8 font-bold bg-white text-primary hover:bg-white/90 shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                  Daftar Gratis Sekarang
                </Button>
              </Link>
              <Link href="/login" id="banner-cta-login">
                <Button size="lg" variant="ghost" className="w-full sm:w-auto rounded-full h-12 px-8 font-bold text-white hover:bg-white/15 border border-white/30 transition-all duration-200">
                  Sudah punya akun? Login
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-border/60 py-8 px-6 text-center text-sm text-muted-foreground">
        <p>© 2026 <span className="font-semibold text-foreground">Food Saver</span>. Dibuat dengan ❤️ untuk lingkungan yang lebih baik.</p>
      </footer>
    </div>
  );
}
