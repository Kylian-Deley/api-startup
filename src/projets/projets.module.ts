import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjetsService } from './projets.service';
import { ProjetsController } from './projets.controller';
import { Projet } from './projets.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Projet]),
    UsersModule,  // pour valider l’owner, etc.
  ],
  providers: [ProjetsService],
  controllers: [ProjetsController],
  exports: [ProjetsService],
})
export class ProjetModule {}
