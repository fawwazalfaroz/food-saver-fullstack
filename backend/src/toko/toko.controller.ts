import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { TokoService } from './toko.service';
import { CreateTokoDto } from './dto/create-toko.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('toko')
export class TokoController {
  constructor(private readonly tokoService: TokoService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @GetUser('sub') userId: string,
    @Body() dto: CreateTokoDto
  ) {
    return await this.tokoService.create(userId, dto);
  }

  @Get('my-store')
  @UseGuards(JwtAuthGuard)
  async getMyStore(@GetUser('sub') userId: string) {
    const toko = await this.tokoService.getMyStore(userId);
    return toko ?? null;
  }

  // Public: Get store profile by ID (with active products)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tokoService.findOnePublic(id);
  }
}