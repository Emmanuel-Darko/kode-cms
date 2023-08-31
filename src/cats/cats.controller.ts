import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { CreateCatDto, ListCatDto } from './create-cat.dto';

@Controller('cats')
export class CatsController {
  @Get()
  async findAll(@Query() query: ListCatDto): Promise<any> {
    if (query) return query;
    return 'All cats';
  }

  @Get(':id')
  findOne(@Param('id') id: number): string {
    return `This action returns a #${id} cat`;
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<any> {
    return `${JSON.stringify(createCatDto)}`;
  }
}
