import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjetModule } from './projets/projets.module';
import { EntrepreneurModule } from './entrepreneurs/entrepreneurs.module';
import { InvestisseursModule } from './investisseurs/investisseurs.module';
import { AdminModule } from './admin/admin.module';

import { User } from './users/users.entity';
import { Projet } from './projets/projets.entity';
import { Entrepreneur } from './entrepreneurs/entrepreneurs.entity';
import { UserEntrepreneur } from './entrepreneurs/user-entrepreneurs.entity';
import { Investisseur } from './investisseurs/investisseurs.entity';
console.log(ConfigModule)

@Module({
  imports: [
    // Chargement des variables d'environnement
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configuration de TypeORM avec MySQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [User, Projet, Entrepreneur, UserEntrepreneur, Investisseur],
        synchronize: true, // À désactiver en production
      }),
      inject: [ConfigService],
    }),

    // Modules de l'application
    AuthModule,
    UsersModule,
    ProjetModule,
    EntrepreneurModule,
    InvestisseursModule,
    AdminModule,
  ],
})
export class AppModule {}
