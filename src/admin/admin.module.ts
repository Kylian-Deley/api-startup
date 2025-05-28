import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UsersModule } from '../users/users.module';
import { InvestisseursModule } from '../investisseurs/investisseurs.module';

@Module({
  imports: [UsersModule, InvestisseursModule],
  controllers: [AdminController],
})
export class AdminModule {}
