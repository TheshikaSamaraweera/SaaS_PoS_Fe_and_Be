import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request-dto';
import { Request } from './schemas/request.schema';

@Controller('request')
export class RequestController {
  constructor(private requestService: RequestService) {}

  @Get()
  async getAllRequests(): Promise<Request[]> {
    return await this.requestService.findAll();
  }

  @Post()
  async createRequest(@Body() request: CreateRequestDto): Promise<Request> {
    return this.requestService.create(request);
  }

  @Get(':id')
  async getRequest(@Param('id') id: string): Promise<Request> {
    return this.requestService.findById(id);
  }

  @Put(':id')
  async updateRequest(
    @Param('id') id: string,
    @Body() request: CreateRequestDto,
  ): Promise<Request> {
    return this.requestService.updateById(id, request);
  }

  @Delete(':id')
  async deleteRequest(@Param('id') id: string): Promise<Request> {
    return this.requestService.deleteById(id);
  }
}
