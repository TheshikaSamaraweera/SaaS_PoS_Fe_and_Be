import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Cashier {
  @Prop()
  cashierId: string;

  @Prop()
  cashierFirstName: string;

  @Prop()
  cashierLastName: string;

  @Prop()
  cashierEmail: string;

  @Prop()
  cashierAddress: string;

  @Prop()
  cashierPhone: string;

  @Prop()
  cashierDoB: string;

  @Prop()
  cashierGender: string;

  @Prop()
  cashierBranch: string;
}

export const CashierSchema = SchemaFactory.createForClass(Cashier);
