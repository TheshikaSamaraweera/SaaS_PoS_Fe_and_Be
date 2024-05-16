import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CashierService } from './cashier.service';
import { Cashier } from './schemas/cashier.schema';
import { CreateCashierDto } from './dto/create-cashier-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('cashier')
export class CashierController {
  constructor(private CashierService: CashierService) {}

  @Get()
  async getAllCashier(): Promise<Cashier[]> {
    return await this.CashierService.findAll();
  }

  @Post()
  async createCashier(@Body() cashier: CreateCashierDto): Promise<Cashier> {
    return this.CashierService.create(cashier);
  }

  @Get(':id')
  async getCashier(@Param('id') id: string): Promise<Cashier> {
    return this.CashierService.findById(id);
  }

  @Put(':id')
  async updateCashier(
    @Param('id') id: string,
    @Body() cashier,
  ): Promise<Cashier> {
    return this.CashierService.updateById(id, cashier);
  }

  @Delete(':id')
  async deleteCashier(@Param('id') id: string): Promise<Cashier> {
    return this.CashierService.deleteById(id);
  }

}
