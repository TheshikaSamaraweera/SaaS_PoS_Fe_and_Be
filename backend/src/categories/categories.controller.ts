import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoryService } from './categories.service';

@Controller('/categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async getAllCategories() {
    return this.categoryService.findAll();
  }

  @Post()
  async createCategory(@Body('name') name: string) {
    return this.categoryService.create(name);
  }
}
