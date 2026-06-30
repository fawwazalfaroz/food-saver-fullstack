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

## Live Demo

🌐 **Frontend:** [food-saver.netlify.app](https://food-saver.netlify.app)
🔗 **Backend API:** [food-saver-fullstack-production.up.railway.app/api](https://food-saver-fullstack-production.up.railway.app/api)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- Midtrans account (untuk payment gateway)

### Installation

1. **Clone repository**
```bash
   git clone https://github.com/username/food-saver.git
   cd food-saver
```

2. **Backend setup**
```bash
   cd backend
   npm install
```
   Buat file `.env` di folder `backend/`:
```env
   DATABASE_URL=postgresql://user:password@localhost:5432/foodsaver
   DIRECT_URL=postgresql://user:password@localhost:5432/foodsaver
   JWT_SECRET=your_jwt_secret
   MIDTRANS_SERVER_KEY=your_midtrans_server_key
   MIDTRANS_CLIENT_KEY=your_midtrans_client_key
   MIDTRANS_IS_PRODUCTION=false
```
   Jalankan migrasi database dan start server:
```bash
   npx prisma migrate dev
   npm run start:dev
```
   Backend berjalan di `http://localhost:3001`

3. **Frontend setup**
```bash
   cd frontend
   npm install
```
   Buat file `.env.local` di folder `frontend/`:
```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your_midtrans_client_key
```
   Jalankan development server:
```bash
   npm run dev
```
   Frontend berjalan di `http://localhost:3000`

