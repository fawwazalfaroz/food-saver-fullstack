# 🍽️ Food Saver

Platform marketplace untuk mengurangi pemborosan makanan (food waste). 
Menghubungkan penyedia (merchant) yang menjual sisa stok makanan dengan 
harga diskon dan pembeli yang mencari makanan berkualitas terjangkau.

## Tech Stack

**Frontend:** Next.js 16, TypeScript, Tailwind CSS 4, shadcn/ui
**Backend:** NestJS 11, TypeScript, Prisma 6, PostgreSQL
**Payment:** Midtrans (Snap + Core API)
**Deployment:** Railway (Backend), Netlify (Frontend)

## Architecture

Layered Architecture dengan 6 lapisan:

<img width="1024" height="559" alt="PHOTO-2026-06-29-22-48-45" src="https://github.com/user-attachments/assets/abbc2080-8088-4071-97d3-7ecb30490bc6" />

## Features

### Pembeli
- Browse marketplace dengan search real-time
- Checkout via Midtrans (transfer bank, e-wallet, kartu kredit)
- Resume pembayaran & konfirmasi pesanan

### Penyedia (Merchant)
- CRUD produk dengan format Rupiah otomatis
- Monitoring pesanan masuk
- Statistik penjualan

## Database Schema

[sisipkan ERD atau tabel schema di sini]

## API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | /api/auth/register | Daftar akun |
| POST | /api/auth/login | Login |
| GET | /api/produk | List semua produk aktif |
| POST | /api/pesanan | Buat pesanan + Snap token |
| ... | ... | ... |

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL

### Installation

1. Clone repository
   git clone https://github.com/username/food-saver.git

2. Backend setup
   cd backend
   npm install
   cp .env.example .env  # isi DATABASE_URL, JWT_SECRET, MIDTRANS keys
   npx prisma migrate dev
   npm run start:dev

3. Frontend setup
   cd frontend
   npm install
   cp .env.example .env.local  # isi NEXT_PUBLIC_API_URL
   npm run dev

