import { User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { IResponseBase, STATUS_TYPE } from '../interfaces/types';
import { jwtConstants } from './constants';
import { AUTH_RESPONSE } from './constants/auth.enum';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<IResponseBase> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email,
        },
      });
      if (user && user.password === pass) {
        return {
          status: STATUS_TYPE.SUCCESS,
          data: user,
          message: AUTH_RESPONSE.VALIDATE_SUCCESS,
        };
      }

      if (user && user.password !== pass) {
        return {
          status: STATUS_TYPE.ERROR,
          error: AUTH_RESPONSE.VALIDATE_ERROR,
        };
      }
    } catch (error) {
      return {
        status: STATUS_TYPE.ERROR,
        error: AUTH_RESPONSE.VALIDATE_ERROR,
      };
    }
  }

  async validateEmail(email: string): Promise<IResponseBase> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email,
        },
      });
      if (user) {
        return {
          status: STATUS_TYPE.ERROR,
          error: AUTH_RESPONSE.EMAIL_EXIST,
        };
      }

      if (!user) {
        return {
          status: STATUS_TYPE.SUCCESS,
          error: AUTH_RESPONSE.EMAIL_SUCCESS,
        };
      }
    } catch (error) {
      return {
        status: STATUS_TYPE.ERROR,
        error: AUTH_RESPONSE.EMAIL_ERROR,
      };
    }
  }

  signToken(payload: { email: string; id: number }): string {
    return this.jwtService.sign(payload, {
      secret: jwtConstants.sessionSecret,
    });
  }

  async login(email: string, password: string): Promise<IResponseBase> {
    try {
      const { status, data } = await this.validateUser(email, password);
      const user = data as User;
      if (status === 'SUCCESS' && user) {
        const payload = { email: user.email, id: user.id };
        return {
          status: STATUS_TYPE.SUCCESS,
          data: this.signToken(payload),
          message: AUTH_RESPONSE.LOGIN_SUCCESS,
        };
      }
      if (status === 'ERROR') {
        return {
          status: STATUS_TYPE.ERROR,
          error: AUTH_RESPONSE.LOGIN_ERROR,
        };
      }
    } catch (error) {
      return {
        status: STATUS_TYPE.ERROR,
        error: AUTH_RESPONSE.LOGIN_ERROR,
      };
    }
  }

  async signup(user: User): Promise<IResponseBase> {
    try {
      const { status } = await this.validateEmail(user.email);
      if (status === 'SUCCESS') {
        const response = await this.prisma.user.create({
          data: {
            ...user,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });

        const payload = { email: response.email, id: response.id };

        return {
          status: STATUS_TYPE.SUCCESS,
          data: this.signToken(payload),
          message: AUTH_RESPONSE.SIGNUP_SUCCESS,
        };
      }

      if (status === 'ERROR') {
        return {
          status: STATUS_TYPE.ERROR,
          error: AUTH_RESPONSE.EMAIL_EXIST,
        };
      }
    } catch (error) {
      return {
        status: STATUS_TYPE.ERROR,
        error: AUTH_RESPONSE.SIGNUP_ERROR,
      };
    }
  }
}
