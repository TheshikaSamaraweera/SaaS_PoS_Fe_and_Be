import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BranchManagerController } from './branchManager.controller';
import { BranchManagerService } from './branchManager.service';
import { BranchManagerSchema } from './schemas/branchManager.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'BranchManager', schema: BranchManagerSchema },
    ]),
  ],
  controllers: [BranchManagerController],
  providers: [BranchManagerService],
})
export class BranchManagerModule {}
