import { Controller, Post, Body, Get, UseGuards, Patch, Param, Delete } from '@nestjs/common';
import { ProdukService } from './produk.service';
import { CreateProdukDto } from './dto/create-produk.dto';
import { UpdateProdukDto } from './dto/update-produk.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('produk')
export class ProdukController {
  constructor(private readonly produkService: ProdukService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@GetUser('sub') userId: string, @Body() dto: CreateProdukDto) {
    return await this.produkService.create(userId, dto);
  }

  @Get()
  async findAll() {
    return await this.produkService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.produkService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @GetUser('sub') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateProdukDto,
  ) {
    return await this.produkService.update(userId, id, dto);
  }

  @Patch(':id/toggle-status')
  @UseGuards(JwtAuthGuard)
  async toggleStatus(@GetUser('sub') userId: string, @Param('id') id: string) {
    return await this.produkService.toggleStatus(userId, id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@GetUser('sub') userId: string, @Param('id') id: string) {
    return await this.produkService.remove(userId, id);
  }
}
