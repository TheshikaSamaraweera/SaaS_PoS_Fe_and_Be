import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CashierModule } from './cashier/cashier.module';
import { InventoryModule } from './inventory/inventory.module';
import { BillModule } from './bill/bill.module';
import { BranchManagerModule } from './branchManager/branchManager.module';
import { BranchModule } from './branch/branch.module';
import { RequestModule } from './request/request.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    CashierModule,
    InventoryModule,
    BillModule,
    BranchManagerModule,
    BranchModule,
    RequestModule,
    UsersModule,
    CategoriesModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
