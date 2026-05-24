# Handoff: Food Saver Landing Page

## Overview

Landing page redesign for **Food Saver** — an Indonesian marketplace that connects students and workers with food shops selling surplus stock at a discount before closing time.

The redesign moves the brand away from a corporate/medical-fintech feel toward a **warm, playful, appetite-driven** personality (more "GoFood/Grab Food" than "banking app"). Food is the visual hero; copy is conversational Bahasa Indonesia for young urban users.

## About the Design Files

The files in `reference/` are **design references created in static HTML/CSS** — prototypes showing the intended look, layout, and motion. They are **not** production code to copy directly into the Next.js app.

Your task: **recreate these designs in Next.js + Tailwind CSS** using the project's existing patterns. Match colors, typography, spacing, and component behavior pixel-perfectly. Treat the HTML as a visual + interaction spec, not as a source to port line-by-line.

This document is self-sufficient — you should be able to build the page from this README alone, using `reference/Food Saver Landing.html` only as a visual cross-check.

## Fidelity

**High-fidelity (hifi).** All colors, typography, spacing, borders, and shadows are final. Reproduce pixel-perfectly.

## Tech Target

- **Framework**: Next.js 14+ (App Router, RSC where possible)
- **Styling**: Tailwind CSS v3.4+ with custom token extensions (config provided in `tailwind.config.ts`)
- **Fonts**: Google Fonts via `next/font` — Bricolage Grotesque, Plus Jakarta Sans, Caveat
- **Interactivity**: The only client-side JS needed is the How-It-Works tab toggle; FAQ uses native `<details>`. Everything else is static.

---

## Page Structure (Top → Bottom)

| # | Section            | Component name (suggested)   | Background        |
|---|--------------------|------------------------------|-------------------|
| 1 | Sticky nav (pill)  | `<SiteNav />`                | cream             |
| 2 | Hero               | `<Hero />`                   | cream             |
| 3 | How It Works       | `<HowItWorks />`             | cream-deep        |
| 4 | Stats strip        | `<StatsStrip />`             | **saffron**       |
| 5 | Testimonials       | `<Testimonials />`           | **matcha-deep**   |
| 6 | FAQ                | `<Faq />`                    | cream             |
| 7 | Download CTA       | `<DownloadCta />`            | cream (green card)|
| 8 | Footer             | `<SiteFooter />`             | ink (near-black)  |

Section borders (`1.5px solid ink`) are **shared** between adjacent dark/colored sections — never doubled. See "Section transitions" below.

---

## Design Tokens

### Colors

| Token            | Hex      | Usage                                                    |
|------------------|----------|----------------------------------------------------------|
| `cream`          | `#F7F0E1`| Body background (warm off-white, never pure white)       |
| `cream-deep`     | `#EFE6D1`| How-It-Works section bg, hover states                    |
| `cream-card`     | `#FBF6EA`| Slightly lighter card bg                                 |
| `paper`          | `#FFFCF4`| Card bodies, nav pill, sticker badges                    |
| `ink`            | `#1F2A1B`| Primary text, all borders (1.5px), footer bg             |
| `ink-soft`       | `#3D4A35`| Secondary text, paragraph body                           |
| `ink-mute`       | `#6E7861`| Tertiary text, meta labels                               |
| `matcha`         | `#5C7D3E`| **Primary** brand color, primary CTAs                    |
| `matcha-deep`    | `#3F5A28`| Headline accents, testimonials bg                        |
| `matcha-soft`    | `#A9C078`| Edamame fill, decorative                                 |
| `matcha-tint`    | `#D9E5BE`| Eyebrow pills, hover bg, FAQ open state                  |
| `saffron`        | `#E88A3C`| **Secondary** accent, "Daftar Toko" CTA, stats strip     |
| `saffron-deep`   | `#C76D1F`| Caveat handwriting accents, hot badges                   |
| `saffron-soft`   | `#F4B97A`| Decorative fills                                         |
| `butter`         | `#F2C94C`| Yellow accents, tamago illustration, badges              |
| `tomato`         | `#D8553B`| Umeboshi illustration, "-XX%" tags                       |
| `plum`           | `#6E3F58`| Reserved (not currently used; kept for variant headroom) |

**Hard rules:**
- No blue, no mint, no cool-green of any kind.
- Body background **must not be pure white** — always `cream`.
- All borders are `1.5px solid ink`. No grey/neutral borders.

### Typography

| Family                  | Role                                          | Weights         |
|-------------------------|-----------------------------------------------|-----------------|
| **Bricolage Grotesque** | Display: h1, h2, h3, prices, numbers, brand   | 400, 600, 700, 800 |
| **Plus Jakarta Sans**   | Body: paragraphs, buttons, nav, labels        | 400, 500, 600, 700, 800 |
| **Caveat**              | Handwritten accent (in scribbles only)        | 700            |

- Bricolage uses `font-variation-settings: "opsz" 56` (or 80 for hero h1) for the optical-size axis.
- Headings: `letter-spacing: -0.02em`, `line-height: 1.02–1.05`.
- Body base: 17px / line-height 1.55 / `Plus Jakarta Sans`.

### Type Scale

| Use case        | Size                 | Family             | Weight |
|-----------------|----------------------|--------------------|--------|
| Hero h1         | `clamp(48px, 6.2vw, 88px)` | Bricolage    | 700    |
| Section h2      | `clamp(36px, 4.4vw, 56px)` | Bricolage    | 700    |
| FAQ aside h2    | `clamp(36px, 4vw, 52px)`   | Bricolage    | 700    |
| Card h3         | 24px                       | Bricolage    | 700    |
| FAQ question    | 19px                       | Bricolage    | 700    |
| Body paragraph  | 17px (hero sub: 19px)      | Plus Jakarta | 400    |
| Button          | 15–16px                    | Plus Jakarta | 700    |
| Eyebrow pill    | 13px                       | Plus Jakarta | 700    |
| Meta / micro    | 11–13px                    | Plus Jakarta | 600    |
| Stat number     | `clamp(40px, 4.2vw, 56px)` | Bricolage    | 800    |

### Spacing

Use Tailwind's default scale plus these section paddings:

| Section       | Vertical padding (desktop) |
|---------------|----------------------------|
| Hero          | 56px top / 120px bottom    |
| How It Works  | 96px top + bottom          |
| Stats strip   | 36px per cell              |
| Testimonials  | 96px top + bottom          |
| FAQ           | 110px top / 80px bottom    |
| Download CTA  | 40px top / 120px bottom    |
| Footer        | 72px top / 28px bottom     |

Container: `max-w-[1280px]` (FAQ section uses `max-w-[1180px]`), horizontal padding `32px` desktop / `18px` mobile.

### Border radius

| Token   | Value  | Use                                  |
|---------|--------|--------------------------------------|
| sm      | 12px   | Small chips                          |
| md      | 18px   | Stickers, partner cards              |
| lg      | 28px   | Section cards, step cards, FAQ items |
| xl      | 36px   | Download CTA card                    |
| pill    | 999px  | Buttons, nav, eyebrow pills          |

### Shadows ("offset block" style — flat, never blurry)

```css
--shadow-card:     0 1px 0 rgba(0,0,0,.04), 0 18px 32px -20px rgba(31,42,27,.18);
--shadow-sticker:  0 2px 0 rgba(63,90,40,.08), 0 22px 40px -18px rgba(31,42,27,.28);

/* Button "stacked" shadow — characteristic to this design */
.btn-primary  { box-shadow: 0 3px 0 #1F2A1B; }
.btn-primary:hover  { box-shadow: 0 4px 0 #1F2A1B; transform: translateY(-1px); }
.btn-primary:active { box-shadow: 0 1px 0 #1F2A1B; transform: translateY(2px); }
```

Every interactive primary surface (buttons, store cards, nav pill, sticker badges, FAQ items) sits on a **hard 3–4px ink offset shadow** — no soft blurs on these. Only the food illustration and large cards use blurred drop shadows.

### Decorative texture

Body has a fixed paper-grain background made from two layered radial-gradient dot patterns:

```css
body::before {
  content: "";
  position: fixed; inset: 0;
  background-image:
    radial-gradient(rgba(92,125,62,.05) 1px, transparent 1.2px),
    radial-gradient(rgba(232,138,60,.04) 1px, transparent 1.2px);
  background-size: 18px 18px, 24px 24px;
  background-position: 0 0, 9px 9px;
  pointer-events: none;
  z-index: 0;
  opacity: .9;
}
```

`<main>` and `<header>` need `position: relative; z-index: 1` to sit above it.

---

## Section transitions (very important)

The 1.5px ink borders are placed surgically to avoid doubled lines where two bordered sections meet.

| Boundary               | Whose border                                   |
|------------------------|------------------------------------------------|
| Hero → How             | How's `border-top`                             |
| How → Stats            | How's `border-bottom` (Stats has no top)       |
| Stats → Testimonials   | Stats' `border-bottom` (Testi has no top)      |
| Testimonials → FAQ     | Testi's `border-bottom`                        |
| FAQ → Download         | none (both `cream`; rely on Download card visually) |
| Download → Footer      | Footer is dark, naturally separated            |

**Don't** add a border to both sides of a join. Always one side only.

---

## Components

### 1. `<SiteNav />`

Floating pill nav with `1.5px ink` border and `0 4px 0 ink` shadow.

- Container: `mt-[22px]` top, then a flex pill `paper` bg, `rounded-full`, `border-[1.5px] border-ink`, `shadow-[0_4px_0_#1F2A1B]`, padding `10px 14px 10px 22px`.
- Left: brand (avocado emoji in 36×36 matcha square rotated `-6deg` + brand name in Bricolage 22px/800).
- Middle: `nav-links` (hidden below 980px). Items: Cara Kerja, Cerita, FAQ, Download. Hover: `bg-matcha-tint`, `rounded-full`, transition 150ms.
- Right: `btn-ghost` "Masuk" + `btn-primary` "Download App".

**Brand mark CSS:**
```css
.brand-mark {
  width: 36px; height: 36px;
  background: #5C7D3E;
  color: #F7F0E1;
  border-radius: 12px;
  display: grid; place-items: center;
  font-size: 20px;
  transform: rotate(-6deg);
  border: 1.5px solid #1F2A1B;
  box-shadow: 2px 2px 0 #1F2A1B;
}
```

### 2. `<Hero />`

Two-column grid: text left (`1.05fr`), visual right (`1fr`). Stacks at `≤980px`.

**Left column:**
- Eyebrow pill: `bg-matcha-tint`, `border-[1.5px] border-matcha-deep`, animated pulsing dot. Text: "Diskon hingga 70% sebelum closing".
- H1 in Bricolage, three lines via `<br/>`:
  - Line 1: "Makan enak,"
  - Line 2: "dompet aman," wrapped in `.swoosh` — gets a saffron underline made with a `::after` skewed pill (z-index: -1, opacity .85).
  - Line 3: "bumi happy 🌱" wrapped in `.scribble` — Caveat font, color `saffron-deep`, `transform: rotate(-3deg)`, `padding-bottom: 16px`, `font-size: .85em`.
- Sub-copy: 19px ink-soft, max-width 540px.
- Two CTA buttons (see Buttons below):
  - Primary: "📱 Download Aplikasi" → `#download`
  - Saffron: "🍳 Daftar Toko Kamu" → `#download`
- Trust row: 4 emoji avatars overlapping (-8px), `12.400+ anak muda` strong text + "udah hemat bareng kami".

**Right column (`<HeroVisual />`):**
- `aspect-ratio: 1/1.05`, `min-height: 560px`, relative.
- **Background disc**: absolutely-positioned 86%-wide saffron circle with `1.5px ink` border + inner `1.5px dashed` ring at 4% inset.
- **Jumbo bento SVG** (see `reference/Food Saver Landing.html` lines ~1080–1190 for the source). 96% width, `transform: rotate(-4deg)`, `drop-shadow(0 28px 28px rgba(31,42,27,.32))`. Components inside:
  - Dark-wood outer box (`#3A2A1E` with `1F140C` shadow strip)
  - Rice compartment (left big): cream fill + repeating rice-grain pattern + nori strip + salmon fillet + shiso leaf + umeboshi + scattered sesame
  - Tamago compartment (top-right): 3 stacked yellow slices with darker swirl lines
  - Edamame compartment (bottom-right): 3 green pods with darker pea spots
  - Chopsticks (top-right, rotated 28°): two wooden rounded rects with darker tips
  - Steam curls (top)
- **Floating accents (animated)**:
  - ☕ coffee: top: 4%, right: 2%, `rotate(-10deg)`, 90px
  - 🥐 croissant: bottom: 6%, left: -2%, `rotate(14deg)`, 84px
  - Both: `animation: float 4s ease-in-out infinite` (Y-axis ±8px). Croissant hidden below 560px.
- **Sticker badges (corner pinned):**
  - Sticker 1 (top-left): matcha bg, cream text, rotate -8°. Content: 🏷️ + "BENTO SET" tiny label + "Rp 18rb" big price.
  - Sticker 2 (bottom-right): paper bg, ink text, rotate 6°. Content: ⏰ + "CLOSING IN" + "1j 24m" saffron-deep.
- **Squiggles**: 3 inline SVGs — small matcha squiggle top-left, ink squiggle bottom-right, butter dot circle right edge.

### 3. `<HowItWorks />`

Background `cream-deep`, both ink borders, dot-pattern overlay.

- Section head (centered): eyebrow "Gampang banget" → h2 "Cuma 3 langkah, perut **kenyang**." (last word: Caveat font, saffron-deep) → sub.
- **Tabs (pill segmented control)** inside paper container, `0 3px 0 ink` shadow:
  - `🍽️ Buat Pembeli` (default active)
  - `🏪 Buat Toko`
  - Active state: `bg-matcha`, `text-cream`. Switching re-renders the 3 step cards.
- **3 step cards** in a row:
  - Each: paper bg, ink border, rounded-lg, hover lifts -4px.
  - Middle card is offset `+16px` Y for playful stagger; hover keeps the offset but lifts.
  - Top-left: 64×64 icon box, `rotate -4deg`, `box-shadow: 2px 2px 0 ink`. Bg colors per card: matcha-tint → saffron-soft → butter.
  - Top-right: huge Bricolage 48px/800 step number (`01`, `02`, `03`) in `cream-deep` color (acts as a watermark behind h3).
  - Body: h3 (24px Bricolage) + paragraph + tag pill at bottom (matcha-tint bg, matcha-deep text).

**Tab content data** (state for the toggle):

```ts
const STEPS = {
  buyer: [
    { icon: "📍", title: "Buka app, cek sekitar", body: "Lihat toko mana aja yang lagi diskon makanan sisa di radius jalan kaki. Update real-time, tiap menit.", tag: "⏱ < 1 menit" },
    { icon: "🛒", title: "Pilih, pesan, bayar",   body: "Ketuk makanan yang menggoda. Bayar lewat e-wallet favoritmu. Gak ribet, gak antri.",               tag: "💸 Hemat 50–70%" },
    { icon: "🛵", title: "Ambil sebelum tutup",   body: "Mampir ke tokonya pakai kode pickup. Atau pilih antar, tinggal terima di depan rumah. Done!",     tag: "🎉 Yumm." },
  ],
  store: [
    { icon: "📝", title: "Daftar toko (gratis)",  body: "Isi data toko & menu yang sering bersisa. Approved dalam 1×24 jam, langsung bisa jualan.",         tag: "🆓 Tanpa biaya bulanan" },
    { icon: "📦", title: "Upload sisa stok",      body: "Tinggal foto + harga diskon. Bisa lewat aplikasi mitra dari HP, gak butuh laptop atau staff khusus.", tag: "⚡ 2 menit jadi" },
    { icon: "💰", title: "Terima pesanan & cuan", body: "Pelanggan datang ambil sebelum closing. Dana masuk H+1 ke rekening kamu. Tanpa biaya tersembunyi.",    tag: "📈 Naikkan revenue 18%" },
  ],
};
```

### 4. `<StatsStrip />`

Single-row horizontal strip, full-width, `bg-saffron`, `border-b-[1.5px] border-ink`.

4 cells separated by `1.5px dashed rgba(31,42,27,.25)` dividers (last cell no divider). Each cell: 36px vertical padding, centered.

- Stat: 12.400+ — "Pengguna aktif tiap minggu"
- Stat: 320 — "Toko & resto mitra"
- Stat: 28 ton — "Makanan diselamatkan"
- Stat: Rp 1,2M — "Total hemat pengguna"

Number: Bricolage `clamp(40px, 4.2vw, 56px)`, `font-weight: 800`. Label: 14px/600.

### 5. `<Testimonials />`

Dark matcha-deep section, `bg: #3F5A28`, `text: cream`, `border-b-[1.5px] border-ink`. Dot pattern overlay (cream tint, very low opacity).

- Section head: eyebrow "Suara mereka" (translucent bg, cream text, saffron dot), h2 "Anak kos & pekerja kantoran udah pada coba", sub in matcha-tint.
- **3 quote cards** in a row, middle card translated +14px Y (same stagger pattern as how-cards):
  - Card 1: paper bg, `0 4px 4px matcha` offset shadow.
  - Card 2: `cream-card` bg, `saffron` offset shadow.
  - Card 3: paper bg, `butter` offset shadow.
  - Content: large `"` mark in matcha, blockquote (with one `<em>` highlight per quote — Caveat font, saffron-deep, 1.15em, not italic), then author row separated by dashed border-top.
  - Author row: 44×44 emoji avatar circle (`bg-matcha-tint` for #1, `bg-saffron-soft` for #2, `bg-butter` for #3) + name (15px/700) + role (13px ink-mute).

**Quote data:**

```ts
const QUOTES = [
  {
    body: 'Tiap akhir bulan saldo nipis, tapi laper tetep wajib disolve. Sejak pake Food Saver, gue bisa makan <em>enak banget</em> cuma 18rb. Game changer sih.',
    avatar: "🧑‍🎓",
    name: "Rafi Hidayat",
    role: "Mahasiswa, Depok",
  },
  {
    body: 'Jam 7 malem pulang kerja, mampir 5 menit, dapet bento lengkap setengah harga. <em>Lumayan banget</em> buat sebulan lebih hemat 500ribuan.',
    avatar: "👩‍💻",
    name: "Nadya Putri",
    role: "Software Engineer, Jakarta",
  },
  {
    body: 'Dulu sisa roti tiap malem bingung mau diapain. Sekarang abis terus, malah jadi pelanggan tetap. <em>Win-win lah pokoknya.</em>',
    avatar: "🧑‍🍳",
    name: "Bu Mira",
    role: "Owner, Roti Bu Mira",
  },
];
```

### 6. `<Faq />`

`cream` bg. Two-column grid: aside `0.85fr` (sticky), list `1.15fr`. Gap 72px. Stacks below 980px.

**Aside (sticky `top: 32px`):**
- Eyebrow "Sering ditanya"
- h2 "Masih bingung? Santai, kami jawab di sini."
- Paragraph (17px ink-soft, max-width 380px).
- "Help card": paper bg, ink border, `0 4px 0 ink` shadow, contains a 48×48 butter `💬` icon (rotated -6°) + "Gak nemu jawabannya?" label + "Chat tim Food Saver →" dotted-underline matcha-deep link.

**List (accordion):**
- Use native `<details>` for each item. No JS required.
- Item base: paper bg, ink border, rounded-lg, `0 3px 0 ink` shadow, hover lifts -1px.
- **Open state**: bg → `matcha-tint`, shadow → `0 4px 0 ink`.
- Summary row: 38×38 numbered circle (cream bg / saffron-deep text → swaps to saffron bg / paper text when open) + question text (Bricolage 19px/700) + 32×32 `+` icon circle on right (cream bg, ink plus). Open state: bg → matcha, plus rotates 180° and vertical bar `scaleY(0)` so it becomes a `−`.
- Answer body: `padding: 0 24px 24px 80px`, 16px/1.6 ink-soft text.

**FAQ content:**

```ts
const FAQS = [
  { q: "Makanannya masih layak dimakan, kan?",
    a: "Pasti dong! Semua makanan masih segar dan layak konsumsi — toko cuma jual sisa stok yang gak akan kejual sebelum tutup. Kualitas sama persis, harga aja yang miring." },
  { q: "Diskonnya gede gak sih?",
    a: "Rata-rata diskon 40–70% dari harga normal. Beberapa toko kasih “mystery box” — isi random, harga miring banget, surprise tiap hari." },
  { q: "Cara ambil pesanannya gimana?",
    a: "Pesan dari app, dapet kode pickup, mampir ke toko sebelum jam closing. Kalau males keluar rumah, bisa pakai opsi antar lewat kurir mitra (ongkir hemat karena jaraknya deket)." },
  { q: "Udah ada di kota saya belum?",
    a: "Saat ini Food Saver aktif di Jabodetabek, Bandung, Surabaya, dan Yogyakarta. Kota lain bakal nyusul — kalau mau request kota kamu, kasih tau lewat aplikasi." },
  { q: "Saya punya toko, gimana cara gabung?",
    a: "Daftar di halaman mitra (gratis), tim kami review dalam 1×24 jam, langsung bisa upload sisa stok. Gak butuh kasir tambahan — cukup HP & 5 menit per hari." },
  { q: "Apakah aplikasinya berbayar?",
    a: "Gratis selamanya buat pembeli. Buat toko mitra juga gratis daftar — kami cuma ambil komisi kecil dari tiap transaksi yang berhasil, jadi gak ada biaya bulanan." },
];
```

First item should default to open (`<details open>` / state in React).

### 7. `<DownloadCta />`

Outer section `cream`. Inside: full-width matcha card with `1.5px ink` border, `rounded-[36px]`, `box-shadow: 6px 6px 0 ink`, padding `64px 64px` desktop / `40px 28px` mobile, `overflow: hidden`.

Two abstract decorative circles inside the card:
- `::before`: 280×280 `matcha-deep` circle, top -120, right -100, opacity .7
- `::after`: 180×180 `saffron` circle with ink border, bottom -90, left 30%, opacity .8

Two-column grid `1.1fr 1fr`, gap 48px (stacks below 980px).

**Left column:**
- Eyebrow "Gratis selamanya" — but recolored: `bg-saffron`, `text-ink`, ink border, ink dot.
- H2 "Yuk install. Perut & dompet bakal sayang banget." (cream)
- Paragraph (matcha-tint)
- Two store buttons (App Store / Google Play): paper bg, ink border, `0 4px 0 ink` shadow, two lines of text (tiny "Unduh di" uppercase + Bricolage "App Store").

**Right column (`<PhoneMockup />`):**
- 280×540 paper "phone" rotated -6°, `8px 8px 0 ink` shadow, rounded `38px`, ink notch at top.
- Inner screen `cream` bg, padded, contains: greeting "Sore, Rafi 👋", h "Diskon di sekitar kamu", search pill, 3 item cards (icon square + name + meta + Bricolage price aligned right).
- 3 floating bubble badges around the phone:
  - "🎉 Hemat Rp 31rb!" (saffron, top-right of phone, rotated 6°)
  - "📍 12 toko di dekat kamu" (butter, bottom-right of phone, rotated -4°)
  - "⭐ 4.9 di App Store" (paper, mid-left of phone, rotated -8°)

### 8. `<SiteFooter />`

`bg-ink`, `text-cream`, 72px top / 28px bottom padding.

- 4-column grid `1.4fr 1fr 1fr 1fr`. Mobile: 1 column.
- Col 1: brand + tagline "Setiap suapan makanan yang gak terbuang itu kemenangan kecil — buat dompet kamu, buat toko, buat bumi."
- Cols 2–4: column heading in Bricolage 15px saffron, then bulleted `<a>` list (cream, opacity .85, hover → saffron).
  - **Pembeli**: Cara pakai, Daftar toko, Promo minggu ini, Aplikasi mobile
  - **Mitra Toko**: Daftar jadi mitra, Dashboard toko, Tarif & biaya, Panduan mitra
  - **Lainnya**: Tentang kami, Karir di FS, Kontak & bantuan, Privasi & syarat
- Bottom: dashed top border (`rgba(247,240,225,.2)`), 24px padding-top, copyright "© 2026 Food Saver. Dibikin dengan ❤ di Jakarta." + 3 social pill buttons (Instagram 📷 / TikTok 🎵 / Twitter 🐦) — 36×36 circle, `bg-matcha-deep`, hover → saffron.

---

## Button System (used across all sections)

All buttons share base styles:

```css
.btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 20px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 15px;
  border: 1.5px solid #1F2A1B;
  transition: transform .12s, box-shadow .12s;
  white-space: nowrap;
}
```

Variants:

| Variant     | Bg          | Text     | Shadow            | Hover                                      |
|-------------|-------------|----------|-------------------|--------------------------------------------|
| `primary`   | matcha      | cream    | `0 3px 0 ink`     | translateY(-1px), shadow → `0 4px 0 ink`   |
| `saffron`   | saffron     | paper    | `0 3px 0 ink`     | same as primary                            |
| `ghost`     | transparent | ink      | none              | bg → cream-deep                            |
| `light`     | paper       | ink      | `0 3px 0 ink`     | same as primary                            |

Active state for primary/saffron/light: `translateY(2px)`, shadow → `0 1px 0 ink`.

Hero CTAs use `padding: 16px 26px; font-size: 16px;`.

---

## Eyebrow pill (reusable)

```jsx
<span className="eyebrow">
  <span className="dot" /> Diskon hingga 70% sebelum closing
</span>
```

```css
.eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  background: #D9E5BE;     /* matcha-tint */
  color: #3F5A28;          /* matcha-deep */
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: .02em;
  border: 1.5px solid #3F5A28;
}
.eyebrow .dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #3F5A28;
  animation: pulse 1.6s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%      { opacity: .5; transform: scale(.7); }
}
```

In `<Testimonials />` and `<DownloadCta />` the eyebrow recolors (translucent cream or solid saffron). Just override `background`, `color`, `border-color`, and dot color via a prop.

---

## Interactions & Behavior

| Behavior                          | Where                        | Implementation                                   |
|-----------------------------------|------------------------------|--------------------------------------------------|
| Buyer/Store tab toggle            | How It Works                 | `useState<'buyer' \| 'store'>('buyer')` + map    |
| Accordion open/close              | FAQ                          | Native `<details>` (no JS), or controlled state if you need exclusive (currently non-exclusive) |
| Hover lift on cards & buttons     | Globally                     | `transition: transform .12s, box-shadow .12s`    |
| Pulse dot                         | All eyebrow pills            | CSS `@keyframes pulse` (1.6s infinite)           |
| Float bob on hero accent food     | Hero coffee + croissant      | CSS `@keyframes float` (4s, ±8px Y)              |
| Anchor scroll                     | Nav links → `#how`, `#testi`, `#faq`, `#download` | Native anchor + `scroll-behavior: smooth` on html |

No data fetching. No form state. No auth. No responsive menu drawer needed below 980px — `nav-links` simply hide (`display: none`) on mobile; the two right-side buttons remain.

---

## Responsive Behavior

Breakpoints used in the reference:

| Width         | Effect                                                                 |
|---------------|------------------------------------------------------------------------|
| `≤ 980px`     | Hero grid → 1 column; How steps → 1 column; FAQ → 1 column (aside non-sticky); Testimonials → 1 column; Stats → 2 columns; Download card → 1 column; Footer → 2 columns; Nav middle links hide. |
| `≤ 560px`     | Hero padding tightens; H1 → 44px; "Masuk" ghost button hides; Download card padding reduces; Footer → 1 column; Hero `.accent.bread` hides. |

For Tailwind, map to: `md` (768px), `lg` (1024px) is closest — recommend using `lg` for the 980 breakpoint and `sm` (640px) for the 560 breakpoint. If you need exact match, define custom screens in `tailwind.config.ts` (`'md2': '980px'`, `'sm2': '560px'`).

---

## Assets

This design uses **emoji as illustration placeholders** for the food (bento ☕🥐 etc.) **except** the hero bento, which is a hand-drawn SVG.

| Asset                          | Where                                                  | Status                                  |
|--------------------------------|--------------------------------------------------------|-----------------------------------------|
| Hero bento SVG (inline)        | `<HeroVisual />`                                       | Ship as-is (extract to `<BentoSvg />`)  |
| Squiggle accents (inline SVG)  | Hero corners                                           | Ship as-is                              |
| Avocado logo 🥑                | Nav, footer brand                                      | **Placeholder** — replace with brand logomark before production |
| Food emoji ☕🥐🍳🍔🍱🍰🧁🥗🍜    | Various accents                                        | Placeholder — replace with custom illustrations / photography if budget allows |
| Person emoji 🧑‍🎓👩‍💻🧑‍🍳     | Trust avatars, testimonial avatars                     | Placeholder — swap for real photos once available |
| Fonts                          | Bricolage Grotesque, Plus Jakarta Sans, Caveat         | Load via `next/font/google`             |

**No raster images or icons are required for v1.** A production logo SVG and (ideally) hand-drawn food illustrations should be commissioned to replace the emoji.

---

## Implementation Notes for Next.js

1. **Set up fonts** (in `app/layout.tsx`):

   ```tsx
   import { Bricolage_Grotesque, Plus_Jakarta_Sans, Caveat } from "next/font/google";

   const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
   const jakarta   = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });
   const caveat    = Caveat({ subsets: ["latin"], weight: ["700"], variable: "--font-scribble", display: "swap" });

   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="id" className={`${bricolage.variable} ${jakarta.variable} ${caveat.variable}`}>
         <body className="font-body bg-cream text-ink antialiased">{children}</body>
       </html>
     );
   }
   ```

2. **Tailwind config**: copy `tailwind.config.ts` from this folder.

3. **Global styles**: copy `globals.css` snippets (paper-grain, scroll-behavior, focus rings, etc.).

4. **Structure pages**:
   ```
   app/
     layout.tsx
     page.tsx                    # composes all sections
     globals.css
   components/
     site-nav.tsx
     hero/
       hero.tsx
       hero-visual.tsx
       bento-svg.tsx              # the big inline SVG
     how-it-works.tsx
     stats-strip.tsx
     testimonials.tsx
     faq.tsx
     download-cta.tsx
     phone-mockup.tsx
     site-footer.tsx
     ui/
       button.tsx
       eyebrow.tsx
       sticker.tsx
   ```

5. **Accessibility checks**:
   - Replace emoji used as **information** with proper `aria-label`s (e.g., social buttons). Decorative emoji should be inside an `aria-hidden` wrapper or paired with a visually-hidden label.
   - All interactive elements have visible focus rings — add a global `:focus-visible { outline: 2px solid #C76D1F; outline-offset: 2px; }` since the design currently relies on browser defaults.
   - `<details>` is keyboard-accessible by default.
   - Color contrast: ink on cream / matcha-deep on cream / cream on matcha-deep / ink on saffron all pass WCAG AA. Saffron-deep on cream passes AA for large text only — keep it for headings/handwriting accents, never for body copy.

6. **Performance**:
   - Inline SVGs (bento, squiggles) — don't extract to `<img>`. Keep them as React components.
   - Fonts via `next/font` with `display: "swap"`.
   - Body grain pattern is pure CSS — no images to optimize.

---

## Files in this bundle

```
design_handoff_food_saver/
├── README.md                          ← this file
├── tailwind.config.ts                 ← drop-in Tailwind config with all tokens
├── globals.css                        ← base styles + paper grain + font wiring
└── reference/
    ├── Food Saver Landing.html        ← the design prototype (open in browser to inspect)
    └── image-slot.js                  ← unused starter, included for completeness
```

Open `reference/Food Saver Landing.html` in a browser to cross-check anything ambiguous in this doc.
