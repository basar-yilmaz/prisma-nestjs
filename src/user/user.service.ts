import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async getUserByID(id: number): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { id: id },
    });
  }

  async createUser(data: User): Promise<User> {
    return await this.prisma.user.create({
      data,
    });
  }

  async updateUser(id: number, data: User): Promise<User> {
    return await this.prisma.user.update({
      where: { id: id },
      data: { ...data },
    });
  }

  async deleteUser(id: number): Promise<User> {
    return await this.prisma.user.delete({ where: { id: id } });
  }
}
