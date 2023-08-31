import { Injectable } from '@nestjs/common';
import { CreateChurchDto } from './dto/create-church.dto';
import { UpdateChurchDto } from './dto/update-church.dto';

let churches = [];

@Injectable()
export class ChurchesService {
  create(createChurchDto: CreateChurchDto) {
    const findChurchExist = churches.find(
      (church) => church.email == createChurchDto.email,
    );

    if (!findChurchExist) {
      const genId: string = (Math.random() * 1000000).toString();
      const church = { id: genId, ...createChurchDto };
      return churches.push(church);
    } else {
      return 'Church already registered';
    }
  }

  findAll() {
    return JSON.stringify(churches);
  }

  findOne(id: number) {
    const findChurch = churches.find((church) => church?.id == id);
    if (findChurch) {
      return JSON.stringify(findChurch);
    }
    return 'Church not Found!';
  }

  update(id: number, updateChurchDto: UpdateChurchDto) {
    churches = churches.map((church) => {
      if (church.id == id) {
        return { ...church, ...updateChurchDto };
      }
      return church;
    });
    return JSON.stringify(churches); //return user when using entity
  }

  remove(id: string) {
    churches = churches.filter((church) => church?.id !== id);
    return JSON.stringify(churches);
  }
}
