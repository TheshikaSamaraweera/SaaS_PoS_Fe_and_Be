import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Inventory } from './schemas/inventory.schema';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory-dto';

@Controller('inventory')
export class InventoryController {
  constructor(private InventoryService: InventoryService) {}

  @Get()
  async getAllInventories(): Promise<Inventory[]> {
    return await this.InventoryService.findAll();
  }

  @Post()
  async createInventory(
    @Body() inventory: CreateInventoryDto,
  ): Promise<Inventory> {
    return this.InventoryService.create(inventory);
  }

  @Get(':id')
  async getInventory(@Param('id') id: string): Promise<Inventory> {
    return this.InventoryService.findById(id);
  }

  @Put(':id')
  async updateInventory(
    @Param('id') id: string,
    @Body() inventory,
  ): Promise<Inventory> {
    return this.InventoryService.updateById(id, inventory);
  }

  @Delete(':id')
  async deleteInventory(@Param('id') id: string): Promise<Inventory> {
    return this.InventoryService.deleteById(id);
  }
}
