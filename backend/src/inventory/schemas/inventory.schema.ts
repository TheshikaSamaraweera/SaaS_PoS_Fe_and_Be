import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Inventory {
  @Prop()
  itemID: string;

  @Prop()
  itemName: string;

  @Prop()
  quantity: number;

  @Prop()
  supply: string;

  @Prop()
  date: string;

  @Prop()
  unitPrice: number;

  @Prop()
  sellPrice: number;

  @Prop()
  description: string;

  @Prop()
  category: string;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
