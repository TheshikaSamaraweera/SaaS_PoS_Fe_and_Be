import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// export enum Category {
//   ADVENTURE = 'adventure',
//   FANTASY = 'fantasy',
//   HORROR = 'horror',
//   SCIENCE_FICTION = 'science fiction',
// }

@Schema({
  timestamps: true,
})
export class BranchManager {
  @Prop()
  branchManagerId: string;

  @Prop()
  branchManagerFirstName: string;

  @Prop()
  branchManagerLastName: string;

  @Prop()
  branchManagerEmail: string;

  @Prop()
  branchManagerAddress: string;

  @Prop()
  branchManagerPhone: string;

  @Prop()
  branchManagerDoB: string;

  @Prop()
  branchManagerGender: string;

  @Prop()
  branchManagerBranch: string;
}
export const BranchManagerSchema = SchemaFactory.createForClass(BranchManager);
