import { Module } from '@nestjs/common';
import { PesananService } from './pesanan.service';
import { PesananController } from './pesanan.controller';
import { PaymentService } from './payment.service';

@Module({
  providers: [PesananService, PaymentService],
  controllers: [PesananController],
})
export class PesananModule { }
