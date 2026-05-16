import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePesananDto } from './dto/create-pesanan.dto';
import { PaymentService } from './payment.service';

@Injectable()
export class PesananService {
  constructor(
    private prisma: PrismaService,
    private paymentService: PaymentService,
  ) { }

  // Pembeli membuat pesanan + generate Snap token
  async create(pembeliId: string, dto: CreatePesananDto) {
    const produk = await this.prisma.produk.findUnique({
      where: { id: dto.produk_id },
      include: { toko: true },
    });

    if (!produk) {
      throw new NotFoundException('Produk tidak ditemukan.');
    }

    if (!produk.is_active) {
      throw new BadRequestException('Produk ini sedang tidak aktif.');
    }

    if (produk.stok < dto.jumlah) {
      throw new BadRequestException('Stok tidak mencukupi.');
    }

    const totalHarga = produk.harga_diskon * dto.jumlah;

    // Kurangi stok
    await this.prisma.produk.update({
      where: { id: dto.produk_id },
      data: { stok: { decrement: dto.jumlah } },
    });

    // Ambil data pembeli
    const pembeli = await this.prisma.user.findUnique({
      where: { id: pembeliId },
    });

    if (!pembeli) {
      throw new NotFoundException('User tidak ditemukan.');
    }

    // Buat pesanan dengan status MENUNGGU_PEMBAYARAN
    const pesanan = await this.prisma.pesanan.create({
      data: {
        pembeli_id: pembeliId,
        produk_id: dto.produk_id,
        toko_id: produk.toko_id,
        jumlah: dto.jumlah,
        total_harga: totalHarga,
        status: 'MENUNGGU_PEMBAYARAN',
      },
      include: {
        produk: true,
        pembeli: { select: { id: true, nama: true, email: true } },
      },
    });

    // Generate Midtrans Snap token
    const snapToken = await this.paymentService.createSnapToken({
      orderId: pesanan.id,
      grossAmount: totalHarga,
      customerName: pembeli.nama,
      customerEmail: pembeli.email,
      itemName: produk.nama_makanan,
      itemQty: dto.jumlah,
      itemPrice: produk.harga_diskon,
    });

    // Simpan snap_token ke database
    await this.prisma.pesanan.update({
      where: { id: pesanan.id },
      data: { snap_token: snapToken },
    });

    return {
      ...pesanan,
      snap_token: snapToken,
    };
  }

  // Penyedia: Ambil semua pesanan untuk toko miliknya
  async findByToko(userId: string) {
    const toko = await this.prisma.toko.findUnique({
      where: { penyedia_id: userId },
    });

    if (!toko) {
      throw new NotFoundException('Toko tidak ditemukan.');
    }

    return await this.prisma.pesanan.findMany({
      where: { toko_id: toko.id },
      include: {
        produk: { select: { id: true, nama_makanan: true, foto: true } },
        pembeli: { select: { id: true, nama: true } },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  // Penyedia: Konfirmasi pesanan (ubah status ke SELESAI) — DEPRECATED, kept for backward compat
  async confirmOrder(userId: string, pesananId: string) {
    const toko = await this.prisma.toko.findUnique({
      where: { penyedia_id: userId },
    });

    if (!toko) {
      throw new NotFoundException('Toko tidak ditemukan.');
    }

    const pesanan = await this.prisma.pesanan.findFirst({
      where: { id: pesananId, toko_id: toko.id },
    });

    if (!pesanan) {
      throw new NotFoundException('Pesanan tidak ditemukan atau bukan milik toko Anda.');
    }

    if (pesanan.status === 'SELESAI') {
      throw new BadRequestException('Pesanan ini sudah selesai.');
    }

    return await this.prisma.pesanan.update({
      where: { id: pesananId },
      data: { status: 'SELESAI' },
      include: {
        produk: { select: { id: true, nama_makanan: true, foto: true } },
        pembeli: { select: { id: true, nama: true } },
      },
    });
  }

  // Pembeli: Konfirmasi pesanan diterima (ubah status ke SELESAI)
  async completeOrderByBuyer(pembeliId: string, pesananId: string) {
    const pesanan = await this.prisma.pesanan.findFirst({
      where: { id: pesananId, pembeli_id: pembeliId },
    });

    if (!pesanan) {
      throw new NotFoundException('Pesanan tidak ditemukan.');
    }

    if (pesanan.status !== 'MENUNGGU_DIAMBIL') {
      throw new BadRequestException('Pesanan ini tidak dalam status menunggu diambil.');
    }

    return await this.prisma.pesanan.update({
      where: { id: pesananId },
      data: { status: 'SELESAI' },
      include: {
        produk: { select: { id: true, nama_makanan: true, foto: true, harga_diskon: true } },
        toko: { select: { id: true, nama_toko: true, alamat_toko: true } },
      },
    });
  }

  // Pembeli: Lihat semua pesanan miliknya
  async findByBuyer(pembeliId: string) {
    return await this.prisma.pesanan.findMany({
      where: { pembeli_id: pembeliId },
      include: {
        produk: { select: { id: true, nama_makanan: true, foto: true, harga_diskon: true } },
        toko: { select: { id: true, nama_toko: true, alamat_toko: true } },
        pembeli: { select: { id: true, nama: true } },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  // Webhook: Handle Midtrans notification
  async handleWebhook(payload: any) {
    const { order_id, transaction_status, fraud_status, signature_key, status_code, gross_amount } = payload;

    // Verify signature
    const isValid = this.paymentService.verifySignature({
      order_id,
      status_code,
      gross_amount,
      signature_key,
    });

    if (!isValid) {
      throw new BadRequestException('Invalid signature.');
    }

    // Find the order
    const pesanan = await this.prisma.pesanan.findUnique({
      where: { id: order_id },
    });

    if (!pesanan) {
      throw new NotFoundException('Pesanan tidak ditemukan.');
    }

    // Determine new status based on Midtrans transaction_status
    if (transaction_status === 'capture' || transaction_status === 'settlement') {
      // For capture, also check fraud_status
      if (transaction_status === 'capture' && fraud_status === 'challenge') {
        // Don't update yet, wait for settlement
        return { message: 'Payment under review' };
      }

      await this.prisma.pesanan.update({
        where: { id: order_id },
        data: {
          status: 'MENUNGGU_DIAMBIL',
          midtrans_id: payload.transaction_id || null,
        },
      });

      return { message: 'Payment successful, order status updated to MENUNGGU_DIAMBIL' };
    }

    if (
      transaction_status === 'cancel' ||
      transaction_status === 'deny' ||
      transaction_status === 'expire'
    ) {
      // Restore stock
      await this.prisma.produk.update({
        where: { id: pesanan.produk_id },
        data: { stok: { increment: pesanan.jumlah } },
      });

      await this.prisma.pesanan.update({
        where: { id: order_id },
        data: {
          status: 'DIBATALKAN',
          midtrans_id: payload.transaction_id || null,
        },
      });

      return { message: 'Payment cancelled, stock restored' };
    }

    if (transaction_status === 'pending') {
      return { message: 'Payment pending' };
    }

    return { message: `Unhandled status: ${transaction_status}` };
  }

  // Penyedia: Statistik ringkasan (total terjual & pendapatan)
  async getStats(userId: string) {
    const toko = await this.prisma.toko.findUnique({
      where: { penyedia_id: userId },
    });

    if (!toko) {
      throw new NotFoundException('Toko tidak ditemukan.');
    }

    const completedOrders = await this.prisma.pesanan.findMany({
      where: {
        toko_id: toko.id,
        status: { in: ['MENUNGGU_DIAMBIL', 'SELESAI'] },
      },
    });

    const totalTerjual = completedOrders.length;
    const pendapatan = completedOrders.reduce((sum: number, o) => sum + o.total_harga, 0);

    return { totalTerjual, pendapatan };
  }

  // Pembeli: Hapus riwayat pesanan (hanya SELESAI atau DIBATALKAN)
  async deleteOrder(pembeliId: string, pesananId: string) {
    const pesanan = await this.prisma.pesanan.findFirst({
      where: { id: pesananId, pembeli_id: pembeliId },
    });

    if (!pesanan) {
      throw new NotFoundException('Pesanan tidak ditemukan.');
    }

    if (pesanan.status !== 'SELESAI' && pesanan.status !== 'DIBATALKAN') {
      throw new BadRequestException('Hanya pesanan yang sudah selesai atau dibatalkan yang dapat dihapus.');
    }

    await this.prisma.pesanan.delete({ where: { id: pesananId } });
    return { message: 'Riwayat pesanan berhasil dihapus.' };
  }
}
