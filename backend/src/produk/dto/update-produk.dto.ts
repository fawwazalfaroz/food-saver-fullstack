import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

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

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
