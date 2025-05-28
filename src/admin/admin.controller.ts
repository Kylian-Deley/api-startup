import { Controller, Get, Delete, Param, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { InvestisseursService } from '../investisseurs/investisseurs.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorators';
import { UserRole } from '../users/users.entity';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(
    private readonly usersService: UsersService,
    private readonly investisseursService: InvestisseursService,
  ) {}

  @Get('users')
  findAllUsers() {
    return this.usersService.findAll();
  }

  @Delete('users/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Get('investments')
  findAllInvestments() {
    return this.investisseursService.findAll();
  }
}
