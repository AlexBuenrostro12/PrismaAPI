import { User } from '.prisma/client';
import { Controller, Post, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(user: User) {
    return this.userService.create(user);
  }

  @Get()
  getAll() {
    return this.userService.getAll();
  }
}
