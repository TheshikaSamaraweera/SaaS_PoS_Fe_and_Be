// src/payment/payment.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PaymentService {
  constructor(private readonly httpService: HttpService) {}

  async processPayment(data: any): Promise<AxiosResponse<any>> {
    const url = 'https://sandbox.payhere.lk/pay/checkout';
    const response = this.httpService.post(url, data);
    return firstValueFrom(response);
  }
}
