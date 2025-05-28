import { Controller, Post, Get, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { InvestisseursService } from './investisseurs.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorators';
import { UserRole } from '../users/users.entity';

@Controller('investisseurs')
export class InvestisseursController {
  constructor(private readonly investisseursService: InvestisseursService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INVESTISSEUR)
  @Post()
  invest(@Req() req, @Body() body: { projectId: string; amount: number }) {
    return this.investisseursService.create(req.user.userId, body.projectId, body.amount);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INVESTISSEUR)
  @Get()
  findByUser(@Req() req) {
    return this.investisseursService.findByUser(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('project/:id')
  findByProject(@Param('id') id: string) {
    return this.investisseursService.findByProject(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INVESTISSEUR)
  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.investisseursService.remove(id, req.user.userId);
  }
}