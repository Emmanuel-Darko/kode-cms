import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { ChurchesService } from './churches.service';
import { CreateChurchDto } from './dto/create-church.dto';
import { UpdateChurchDto } from './dto/update-church.dto';

@Controller('churches')
export class ChurchesController {
  constructor(private readonly churchesService: ChurchesService) {}

  @Get()
  findAll(@Query('name') name: any) {
    return this.churchesService.findAll(name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.churchesService.findOne(id);
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  @Post()
  create(@Body() createChurchDto: CreateChurchDto) {
    try {
      return this.churchesService.create(createChurchDto);
    } catch (error) {
      throw new NotAcceptableException(`${error}`);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChurchDto: UpdateChurchDto) {
    try {
      return this.churchesService.update(id, updateChurchDto);
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.churchesService.remove(id);
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }
}
