import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTokoDto } from './dto/create-toko.dto';

@Injectable()
export class TokoService {
  constructor(private prisma: PrismaService) { }

  async create(userId: string, dto: CreateTokoDto) {
    const existingToko = await this.prisma.toko.findUnique({
      where: { penyedia_id: userId },
    });

    if (existingToko) {
      throw new ConflictException('Satu akun penyedia hanya boleh memiliki satu toko.');
    }

    return await this.prisma.toko.create({
      data: {
        ...dto,
        penyedia_id: userId,
      },
    });
  }

  async getMyStore(userId: string) {
    return await this.prisma.toko.findUnique({
      where: { penyedia_id: userId },
      include: { produk: true },
    });
  }

  // Public: Get store with active products only
  async findOnePublic(id: string) {
    const toko = await this.prisma.toko.findUnique({
      where: { id },
      include: {
        produk: {
          where: { is_active: true },
          orderBy: { created_at: 'desc' },
        },
      },
    });

    if (!toko) {
      throw new NotFoundException('Toko tidak ditemukan.');
    }

    return toko;
  }
}