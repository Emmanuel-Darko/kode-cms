import { Injectable } from '@nestjs/common';
import { CreateChurchDto } from './dto/create-church.dto';
import { UpdateChurchDto } from './dto/update-church.dto';

@Injectable()
export class ChurchesService {
  private churches = [];
  constructor() {}

  findAll(name?: any) {
    if (name) {
      return this.churches.filter((church) => church.name.includes(name));
    }
    return JSON.stringify(this.churches);
  }

  findOne(id: string) {
    const findChurch = this.churches.find((church) => church?.id == id);
    if (findChurch) return JSON.stringify(findChurch);
    else throw new Error(`No Church exists!`);
  }

  create(createChurchDto: CreateChurchDto) {
    const findChurchExist = this.churches.find(
      (church) => church.email == createChurchDto.email,
    );

    if (!findChurchExist) {
      const genId: string = (Math.random() * 1000000).toString();
      const church = { id: genId, ...createChurchDto };
      this.churches.push(church);
      return this.findOne(genId);
    } else throw new Error('Church already exists');
  }

  update(id: string, updateChurchDto: UpdateChurchDto) {
    this.churches = this.churches.map((church) => {
      if (church.id == id) {
        return { ...church, ...updateChurchDto };
      }
      return church;
    });
    return this.findOne(id);
  }

  remove(id: string) {
    this.churches = this.churches.filter((church) => church?.id !== id);
    return this.findAll();
  }
}
