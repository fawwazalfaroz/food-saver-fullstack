import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateProdukDto {
  @IsString()
  @IsOptional()
  nama_makanan?: string;

  @IsString()
  @IsOptional()
  deskripsi?: string;

  @IsNumber()
  @IsOptional()
  harga_asli?: number;

  @IsNumber()
  @IsOptional()
  harga_diskon?: number;

  @IsNumber()
  @IsOptional()
  stok?: number;

  @IsString()
  @IsOptional()
  foto?: string;

  @IsString()
  @IsOptional()
  waktu_pickup?: string;
}
