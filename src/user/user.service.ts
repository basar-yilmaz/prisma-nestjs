import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async getUserByID(id: number) {
    try {
      return await this.prisma.user.findUniqueOrThrow({ where: { id: Number(id) } });
    }
    catch (error) {
      throw new NotFoundException();
    }
  }

  async createUser(data: User): Promise<User> {
    try {
      return await this.prisma.user.create({
        data,
      });
    } catch (error) {
      throw new NotAcceptableException("User with this email already exists");
    }
  }

  async updateUser(id: number, data: User): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { id: Number(id) },
        data: { ...data },
      });
    } catch (error) {
      throw new NotFoundException("There is no such user");
    }
  }

  async deleteUser(id: number): Promise<String> {
    try {
      await this.prisma.user.delete({ where: { id: Number(id) } });
      return `User with id ${id} deleted successfully`;
    }
    catch (error) {
      throw new NotFoundException("There is no such user");
    }
  }
}
