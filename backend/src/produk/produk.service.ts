import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProdukDto } from './dto/create-produk.dto';

@Injectable()
export class ProdukService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateProdukDto) {
    // 1. Cari dulu toko mana yang dimiliki oleh user ini
    const toko = await this.prisma.toko.findUnique({
      where: { penyedia_id: userId },
    });

    if (!toko) {
      throw new NotFoundException('Kamu harus membuat toko terlebih dahulu sebelum menambah produk.');
    }

    if (!toko.alamat_toko || toko.latitude === null || toko.longitude === null) {
      throw new NotFoundException('Merchant wajib melengkapi alamat & koordinat toko sebelum menambah produk.');
    }

    // 2. Simpan produk dan hubungkan ke ID Toko tersebut
    return await this.prisma.produk.create({
      data: {
        ...dto,
        toko_id: toko.id,
      },
    });
  }

  async findAll() {
    return await this.prisma.produk.findMany({
      include: { toko: true }, // Biar pembeli tahu ini makanan dari toko mana
    });
  }

  async findOne(id: string) {
    const produk = await this.prisma.produk.findUnique({
      where: { id },
      include: { toko: true },
    });

    if (!produk) {
      throw new NotFoundException('Produk tidak ditemukan.');
    }

    return produk;
  }

  async update(userId: string, id: string, dto: Partial<CreateProdukDto>) {
    // 1. Pastikan toko adalah milik user yang sedang request
    const toko = await this.prisma.toko.findUnique({
      where: { penyedia_id: userId },
    });

    if (!toko) {
      throw new NotFoundException('Toko tidak ditemukan.');
    }

    // 2. Pastikan produk ada dan milik toko tersebut
    const existingProduk = await this.prisma.produk.findFirst({
      where: { id: id, toko_id: toko.id },
    });

    if (!existingProduk) {
      throw new NotFoundException('Produk tidak ditemukan atau Anda tidak memiliki akses untuk mengubah produk ini.');
    }

    // 3. Update produk
    return await this.prisma.produk.update({
      where: { id },
      data: dto,
    });
  }

  async toggleStatus(userId: string, id: string) {
    // 1. Pastikan toko adalah milik user yang sedang request
    const toko = await this.prisma.toko.findUnique({
      where: { penyedia_id: userId },
    });

    if (!toko) {
      throw new NotFoundException('Toko tidak ditemukan.');
    }

    // 2. Pastikan produk ada dan milik toko tersebut
    const existingProduk = await this.prisma.produk.findFirst({
      where: { id: id, toko_id: toko.id },
    });

    if (!existingProduk) {
      throw new NotFoundException('Produk tidak ditemukan atau Anda tidak memiliki akses.');
    }

    // 3. Toggle nilai is_active
    return await this.prisma.produk.update({
      where: { id },
      data: { is_active: !existingProduk.is_active },
    });
  }

  async remove(userId: string, id: string) {
    const toko = await this.prisma.toko.findUnique({
      where: { penyedia_id: userId },
    });

    if (!toko) {
      throw new NotFoundException('Toko tidak ditemukan.');
    }

    const existingProduk = await this.prisma.produk.findFirst({
      where: { id: id, toko_id: toko.id },
    });

    if (!existingProduk) {
      throw new NotFoundException('Produk tidak ditemukan atau Anda tidak memiliki akses untuk menghapus produk ini.');
    }

    return await this.prisma.produk.delete({
      where: { id },
    });
  }
}