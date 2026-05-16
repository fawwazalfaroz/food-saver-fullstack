import { Controller, Post, Body, Get, Patch, Param, Delete, UseGuards, HttpCode } from '@nestjs/common';
import { PesananService } from './pesanan.service';
import { CreatePesananDto } from './dto/create-pesanan.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('pesanan')
export class PesananController {
  constructor(private readonly pesananService: PesananService) { }

  // Pembeli membuat pesanan baru (returns snap_token)
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@GetUser('sub') userId: string, @Body() dto: CreatePesananDto) {
    return await this.pesananService.create(userId, dto);
  }

  // Midtrans Webhook (no auth guard — called by Midtrans servers)
  @Post('webhook')
  @HttpCode(200)
  async webhook(@Body() payload: any) {
    return await this.pesananService.handleWebhook(payload);
  }

  // Pembeli: Lihat semua pesanan miliknya
  @Get('my-purchases')
  @UseGuards(JwtAuthGuard)
  async findMyPurchases(@GetUser('sub') userId: string) {
    return await this.pesananService.findByBuyer(userId);
  }

  // Pembeli: Konfirmasi pesanan diterima (status -> SELESAI)
  @Patch(':id/complete')
  @UseGuards(JwtAuthGuard)
  async complete(@GetUser('sub') userId: string, @Param('id') id: string) {
    return await this.pesananService.completeOrderByBuyer(userId, id);
  }

  // Penyedia: Lihat semua pesanan untuk toko miliknya
  @Get('my-orders')
  @UseGuards(JwtAuthGuard)
  async findMyOrders(@GetUser('sub') userId: string) {
    return await this.pesananService.findByToko(userId);
  }

  // Penyedia: Konfirmasi pesanan (status -> SELESAI) — legacy
  @Patch(':id/confirm')
  @UseGuards(JwtAuthGuard)
  async confirm(@GetUser('sub') userId: string, @Param('id') id: string) {
    return await this.pesananService.confirmOrder(userId, id);
  }

  // Penyedia: Statistik (total terjual & pendapatan)
  @Get('stats')
  @UseGuards(JwtAuthGuard)
  async getStats(@GetUser('sub') userId: string) {
    return await this.pesananService.getStats(userId);
  }

  // Pembeli: Hapus riwayat pesanan (hanya SELESAI atau DIBATALKAN)
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteOrder(@GetUser('sub') userId: string, @Param('id') id: string) {
    return await this.pesananService.deleteOrder(userId, id);
  }
}
