import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Branch {
  @Prop()
  id: string;

  @Prop()
  branchName: string;

  @Prop()
  city: string;

  @Prop()
  street: string;
}

export const BranchSchema = SchemaFactory.createForClass(Branch);
