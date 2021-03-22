import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { IResponseBase, STATUS_TYPE } from '../interfaces/types';
import { USER_RESPONSE } from './types/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(user: Prisma.UserCreateInput): Promise<IResponseBase> {
    try {
      const response = await this.prisma.user.create({
        data: {
          ...user,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      return {
        status: STATUS_TYPE.SUCCESS,
        data: response,
        message: USER_RESPONSE.CREATE_SUCCESS,
      };
    } catch (error) {
      return {
        status: STATUS_TYPE.ERROR,
        error: USER_RESPONSE.CREATE_ERROR,
      };
    }
  }

  async getAll(): Promise<IResponseBase> {
    try {
      const response = await this.prisma.user.findMany();

      return {
        status: STATUS_TYPE.SUCCESS,
        data: response,
        message: USER_RESPONSE.GET_ALL_SUCCESS,
      };
    } catch (error) {
      return {
        status: STATUS_TYPE.ERROR,
        error: USER_RESPONSE.GET_ALL_ERROR,
      };
    }
  }

  async getById(id: number): Promise<IResponseBase> {
    try {
      const response = await this.prisma.user.findFirst({
        where: {
          id,
        },
      });

      return {
        status: STATUS_TYPE.SUCCESS,
        data: response,
        message: USER_RESPONSE.GET_BY_ID_SUCCESS,
      };
    } catch (error) {
      return {
        status: STATUS_TYPE.ERROR,
        error: USER_RESPONSE.GET_BY_ID_ERROR,
      };
    }
  }
}
