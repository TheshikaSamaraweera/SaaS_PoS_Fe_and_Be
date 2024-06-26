// src/payment/payment.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async handlePayment(@Body() data: any) {
    return this.paymentService.processPayment(data);
  }
}
