import { ApiBody } from '@nestjs/swagger';
import { User } from './user.model';
import { UserService } from './user.service';
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UserModelDto } from 'src/dto/user-model.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post()
  @ApiBody({ type: UserModelDto })
  async createUser(@Body() data: User): Promise<User> {
    return this.userService.createUser(data);
  }

  @Get(':id')
  async getUserByID(@Param('id') id: number) {
    return this.userService.getUserByID(id);
  }

  @Patch(':id')
  @ApiBody({ type: UserModelDto })
  async updateUser(@Param('id') id: number, @Body() data: User) {
    return this.userService.updateUser(id, data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
