import { IsString, IsInt, Min } from 'class-validator';

export class CreatePesananDto {
  @IsString()
  produk_id: string;

  @IsInt()
  @Min(1)
  jumlah: number;
}
