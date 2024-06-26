import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './schemas/users.schema';
import { CreateUsersDto } from './dto/create-users-dto';
import { diskStorage } from 'multer';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<Users[]> {
    return await this.UsersService.findAll();
  }

  @Post()
  async createUsers(
    @Body() 
    users: CreateUsersDto): Promise<Users> {
    return this.UsersService.create(users);
  }

  // @Post()
  // @UseInterceptors(FileInterceptor('cashierImage'))
  // async createCashier(
  //   @UploadedFile() file,
  //   @Body() cashier: CreateCashierDto,
  // ): Promise<Cashier> {
  //   return this.CashierService.create(cashier, file);
  // }

  @Get(':id')
  async getUsers(@Param('id') id: string): Promise<Users> {
    return this.UsersService.findById(id);
  }

  @Put(':id')
  async updateUsers(
    @Param('id') id: string,
    @Body() users,
  ): Promise<Users> {
    return this.UsersService.updateById(id, users);
  }

  @Delete(':id')
  async deleteCashier(@Param('id') id: string): Promise<Users> {
    return this.UsersService.deleteById(id);
  }

}

