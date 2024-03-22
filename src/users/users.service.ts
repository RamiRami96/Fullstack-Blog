import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async getUser(email: string) {
    return this.prisma.user.findFirst({ where: { email } });
  }

  async createUser(dto: CreateUserDTO) {
    const user = await this.prisma.user.create({
      data: dto,
    });

    return user;
  }

  async updateUser(email: string, dto: CreateUserDTO) {
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 7);
    }

    return this.prisma.user.update({ where: { email }, data: dto });
  }

  async deleteUser(email: string) {
    return this.prisma.user.delete({ where: { email } });
  }
}
