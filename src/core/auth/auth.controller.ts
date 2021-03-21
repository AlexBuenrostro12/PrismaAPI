import { Controller, Request, Post } from '@nestjs/common';
import { IResponseBase } from '../interfaces/types';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req): Promise<IResponseBase> {
    const { email, password } = req.body;
    return this.authService.login(email, password);
  }
}
