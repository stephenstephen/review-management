import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres' as const,
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME ?? 'admin',
  password: process.env.DB_PASSWORD ?? '123456',
  database: process.env.DB_NAME ?? 'review-management',
  autoLoadEntities: true,
  synchronize: process.env.NODE_ENV === 'development',
  logging: true,
  retryAttempts: 10,
  retryDelay: 3000,
};
