// src/payment/payment.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';

@Module({
  imports: [
    HttpModule,
    // Other modules if needed
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
