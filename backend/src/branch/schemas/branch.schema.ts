import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema({
  timestamps: true,
})
export class Branch {
  @Prop()
  branchid: string;

  @Prop()
  branchName: string;

  @Prop()
  city: string;

  @Prop()
  street: string;
}

export const BranchSchema = SchemaFactory.createForClass(Branch);
