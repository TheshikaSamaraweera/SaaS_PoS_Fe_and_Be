import { Module } from '@nestjs/common';
import { CashierService } from './cashier.service';
import { CashierController } from './cashier.controller';
import mongoose, { mongo } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { CashierSchema } from './schemas/cashier.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Cashier', schema: CashierSchema }])
  ],
  providers: [CashierService],
  controllers: [CashierController],
})
export class CashierModule {}
