import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { InventorySchema } from './schemas/inventory.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Inventory', schema: InventorySchema }])
  ],
  providers: [InventoryService],
  controllers: [InventoryController],
})
export class InventoryModule {}
