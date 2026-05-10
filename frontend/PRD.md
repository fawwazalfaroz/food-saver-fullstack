# Product Requirement Document (PRD) - Food Saver MVP

## 1. Project Overview
Food Saver adalah platform marketplace berbasis web yang menghubungkan merchant (restoran/toko kue) dengan konsumen untuk menjual sisa makanan layak konsumsi dengan harga diskon. Fokus utama adalah membangun MVP yang fungsional secara visual dan alur kerja.

## 2. Tech Stack
* **Frontend:** Next.js (App Router), Tailwind CSS, Shadcn UI
* **Backend:** NestJS (TypeScript)
* **Database:** PostgreSQL (Hosted on Supabase)
* **Hosting:** Netlify (Frontend)

## 3. Core Features (MVP Scope)
1. **Authentication (Auth)**
   - Login & Register (Role: Merchant atau Consumer).
2. **Merchant Dashboard**
   - CRUD Produk (Tambah, Edit, Hapus, Lihat daftar makanan).
3. **Consumer Marketplace**
   - Melihat daftar makanan sisa dari berbagai merchant.
   - Checkout sederhana (mencatat pesanan di sistem).

## 4. User Flow
* **Consumer:** Landing Page -> Login -> Browse Produk -> Checkout.
* **Merchant:** Login -> Dashboard -> Manage Produk.

## 5. Development Guidelines (Frontend-First)
* **Prioritas Utama:** Mulai dengan membangun **Frontend (Next.js)** terlebih dahulu menggunakan **Dummy Data**.
* Fokus pada pembuatan UI yang rapi dengan Tailwind CSS dan Shadcn UI sebelum menyentuh logika backend.
* Pastikan alur navigasi antar halaman (Login ke Dashboard atau Marketplace) sudah berjalan dengan baik secara visual.
* **Backend Integration:** Integrasi NestJS dan Database hanya dilakukan setelah UI dan alur frontend sudah disetujui dan stabil.
* Kerjakan satu modul secara bertahap (misal: Selesaikan UI Login dulu, baru UI Dashboard).