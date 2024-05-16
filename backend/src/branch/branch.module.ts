import { Module } from '@nestjs/common';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';
import { BranchSchema } from './schemas/branch.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Branch', schema: BranchSchema }]),
  ],
  controllers: [BranchController],
  providers: [BranchService],
})
export class BranchModule {}
