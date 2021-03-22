import { Controller, Post, Get, Body, UseGuards, Param } from '@nestjs/common';
import { User } from '.prisma/client';
import { UserService } from './user.service';
import { IResponseBase } from '../interfaces/types';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: User): Promise<IResponseBase> {
    return this.userService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(): Promise<IResponseBase> {
    return this.userService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getById(@Param() params: { id: string }): Promise<IResponseBase> {
    return this.userService.getById(parseInt(params.id));
  }
}
