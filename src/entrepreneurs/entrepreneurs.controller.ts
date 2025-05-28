import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { EntrepreneursService } from './entrepreneurs.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller()
export class EntrepreneursController {
  constructor(private readonly entrepreneursService: EntrepreneursService) {}

  @Get('entrepreneurs')
  findAll() {
    return this.entrepreneursService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('users/entrepreneurs')
  addUserEntrepreneurs(@Req() req, @Body('entrepreneurs') entrepreneurs: string[]) {
    return this.entrepreneursService.addToUser(req.user.userId, entrepreneurs);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/entrepreneurs')
  getUserEntrepreneurs(@Req() req) {
    return this.entrepreneursService.getUserEntrepreneurs(req.user.userId);
  }
}