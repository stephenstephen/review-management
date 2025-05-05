import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const config = {
          type: 'postgres' as const,
          host: configService.get('DB_HOST') ?? 'postgres',
          port: parseInt(configService.get('DB_PORT') ?? '5432', 10),
          username: configService.get('DB_USERNAME') ?? 'admin',
          password: configService.get('DB_PASSWORD') ?? '123456',
          database: configService.get('DB_NAME') ?? 'review-management',
          autoLoadEntities: true,
          synchronize: configService.get('NODE_ENV') === 'development',
          logging: true,
          retryAttempts: 10,
          retryDelay: 3000,
        };
        
        console.log('Database configuration:', {
          host: config.host,
          port: config.port,
          username: config.username,
          database: config.database,
        });
        
        return config;
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // ✅ C'est cette ligne qu’il manquait
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true, // ou graphiql: true selon ce que tu veux
    }),
    UsersModule,
    AuthModule
  ]
})
export class AppModule {}
