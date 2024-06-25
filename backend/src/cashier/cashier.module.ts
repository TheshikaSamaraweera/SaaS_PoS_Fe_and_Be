import { Module } from '@nestjs/common';
import { CashierService } from './cashier.service';
import { CashierController } from './cashier.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { CashierSchema } from './schemas/cashier.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Cashier', schema: CashierSchema }]),
  ],
  providers: [CashierService],
  controllers: [CashierController],
})
export class CashierModule {}
