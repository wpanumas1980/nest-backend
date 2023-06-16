import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {

    return {
      type: 'mysql',
      host: configService.get('DB_HOST'),
      port: parseInt(configService.get('DB_PORT'), 10),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    };
  },
};
