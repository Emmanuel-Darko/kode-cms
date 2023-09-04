import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MembersService {
  private members = [];
  constructor() {}

  findAll(name?: string) {
    if (name) {
      return this.members.filter((member) => member.name.includes(name));
    }
    return this.members;
  }

  findOne(id: string) {
    const findMember = this.members.find((member) => member?.id == id);
    if (findMember) return findMember;
    else throw new Error('Member not found!');
  }

  create(createMemberDto: CreateMemberDto) {
    const findMember = this.members.find(
      (member) =>
        member.email == createMemberDto.email ||
        member.phone == createMemberDto.phone,
    );
    if (!findMember) {
      const memId: string = Math.floor(Math.random() * 100000).toString();
      this.members.push({ id: memId, ...createMemberDto });
      return this.findOne(memId);
    } else {
      throw new Error('Member already exists');
    }
  }

  update(id: string, updateMemberDto: UpdateMemberDto) {
    this.members = this.members.map((member) => {
      if (member.id == id) {
        return { ...member, updateMemberDto };
      }
      return member;
    });
    return this.findOne(id);
  }

  remove(id: string) {
    this.members = this.members.filter((member) => member?.id == id);
    return this.findAll();
  }
}
