import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/Users.schema';
import * as mongoose from 'mongoose';
import { CreateUsersDto } from './dto/create-Users-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private UsersModel: mongoose.Model<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    const Users = await this.UsersModel.find();
    return Users;
  }

  async create(Users: Users): Promise<Users> {
    const res = await this.UsersModel.create(Users);
    return res;
  }

  async findById(id: string): Promise<Users> {
    const Users = await this.UsersModel.findById(id);
    if (!Users) {
      throw new NotFoundException('Users is not found!');
    }
    return Users;
  }

  async updateById(id: string, Users: Users): Promise<Users> {
    return await this.UsersModel.findByIdAndUpdate(id, Users, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Users> {
    return await this.UsersModel.findByIdAndDelete(id);
  }

  // async create(
  //   Users: CreateUsersDto,
  //   file: Express.Multer.File,
  // ): Promise<Users> {
  //   const newUsers = new this.UsersModel(Users);
  //   newUsers.UsersImage = file.path;
  //   return newUsers.save();
  // }
}

