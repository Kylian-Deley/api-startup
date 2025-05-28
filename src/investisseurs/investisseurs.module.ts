import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestisseursService } from './investisseurs.service';
import { InvestisseursController } from './investisseurs.controller';
import { Investisseur } from './investisseurs.entity';
import { UsersModule } from '../users/users.module';
import { ProjetModule } from '../projets/projets.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Investisseur]),
    UsersModule,
    ProjetModule,
  ],
  providers: [InvestisseursService],
  controllers: [InvestisseursController],
  exports: [InvestisseursService],
})
export class InvestisseursModule {}
