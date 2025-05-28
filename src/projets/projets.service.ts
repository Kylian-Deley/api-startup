import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Projet } from './projets.entity';
import { CreateProjetDto} from './dto/create-projet.dto';
import { UpdateProjetDto } from './dto/update-projet.dto'; 

@Injectable()
export class ProjetsService {
  constructor(
    @InjectRepository(Projet)
    private readonly repo: Repository<Projet>,
  ) {}

  create(dto: CreateProjetDto, ownerId: string): Promise<Projet> {
    const project = this.repo.create({ ...dto, owner: { id: ownerId } });
    return this.repo.save(project);
  }

  findAll(): Promise<Projet[]> {
    return this.repo.find({ relations: ['owner'] });
  }

  async findOne(id: string): Promise<Projet> {
    const project = await this.repo.findOne({ where: { id }, relations: ['owner'] });
    if (!project) throw new NotFoundException('Projet not found');
    return project;
  }

  async update(id: string, dto: UpdateProjetDto, userId: string): Promise<any> {
    const project = await this.findOne(id);
    if (project.owner.id !== userId) throw new NotFoundException('Not your project');
    return this.repo.update(id, dto);
  }

  async remove(id: string, userId: string, isAdmin: boolean): Promise<any> {
    const project = await this.findOne(id);
    if (!isAdmin && project.owner.id !== userId) throw new NotFoundException('Not allowed');
    return this.repo.delete(id);
  }
}