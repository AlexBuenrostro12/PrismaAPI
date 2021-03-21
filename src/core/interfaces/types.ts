import { User } from '@prisma/client';
export enum STATUS_TYPE {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface IResponseBase {
  status: STATUS_TYPE;
  data?: User | User[] | string | null;
  message?: string | null;
  error?: string | null;
}
