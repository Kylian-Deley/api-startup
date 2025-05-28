import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ProjetsService } from './projets.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorators';
import { UserRole } from '../users/users.entity';
import { CreateProjetDto} from './dto/create-projet.dto';
import { UpdateProjetDto } from './dto/update-projet.dto'; 


@Controller('projects')
export class ProjetsController {
  constructor(private readonly projectsService: ProjetsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ENTREPRENEUR)
  @Post()
  create(@Req() req, @Body() dto: CreateProjetDto) {
    console.log('User making request:', req.user); // Log user details for debugging
    return this.projectsService.create(dto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ENTREPRENEUR)
  @Put(':id')
  update(@Req() req, @Param('id') id: string, @Body() dto: UpdateProjetDto) {
    return this.projectsService.update(id, dto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ENTREPRENEUR, UserRole.ADMIN)
  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    const isAdmin = req.user.role === UserRole.ADMIN;
    return this.projectsService.remove(id, req.user.userId, isAdmin);
  }
}