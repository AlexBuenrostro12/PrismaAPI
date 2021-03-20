import { Controller, Post, Get, Body } from '@nestjs/common';
import { User } from '.prisma/client';
import { UserService } from './user.service';
import { IResponseBase } from '../interfaces/types';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() body: User): Promise<IResponseBase> {
    return this.userService.create(body);
  }

  @Get()
  getAll(): Promise<IResponseBase> {
    return this.userService.getAll();
  }
}
