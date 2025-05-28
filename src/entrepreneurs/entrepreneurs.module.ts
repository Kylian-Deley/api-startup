import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntrepreneursService } from './entrepreneurs.service';
import { EntrepreneursController } from './entrepreneurs.controller';
import { Entrepreneur } from './entrepreneurs.entity';
import { UserEntrepreneur } from './user-entrepreneurs.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Entrepreneur, UserEntrepreneur]),
    UsersModule,
  ],
  providers: [EntrepreneursService],
  controllers: [EntrepreneursController],
  exports: [EntrepreneursService],
})
export class EntrepreneurModule {}
