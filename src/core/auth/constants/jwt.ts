import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const jwtConstants = {
  sessionSecret: configService.get('SESSION_SECRET'),
};
