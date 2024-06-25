import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRequestDto } from './dto/create-request-dto';
import { Request } from './schemas/request.schema';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel(Request.name) private requestModel: Model<Request>,
  ) {}

  async findAll(): Promise<Request[]> {
    return await this.requestModel.find();
  }

  async create(createRequestDto: CreateRequestDto): Promise<Request> {
    return await this.requestModel.create(createRequestDto);
  }

  async findById(id: string): Promise<Request> {
    const request = await this.requestModel.findById(id);
    if (!request) {
      throw new NotFoundException('Request not found');
    }
    return request;
  }

  async updateById(id: string, updateRequestDto: CreateRequestDto): Promise<Request> {
    return await this.requestModel.findByIdAndUpdate(id, updateRequestDto, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Request> {
    return await this.requestModel.findByIdAndDelete(id);
  }
}
