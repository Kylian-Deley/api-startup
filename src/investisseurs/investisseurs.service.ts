import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investisseur } from './investisseurs.entity';

@Injectable()
export class InvestisseursService {
  constructor(
    @InjectRepository(Investisseur)
    private readonly repo: Repository<Investisseur>,
  ) {}

  create(userId: string, projectId: string, amount: number): Promise<Investisseur> {
    const inv = this.repo.create({ investor: { id: userId }, project: { id: projectId }, amount });
    return this.repo.save(inv);
  }

  findByUser(userId: string): Promise<Investisseur[]> {
    return this.repo.find({ where: { investor: { id: userId } }, relations: ['project'] });
  }

  findByProject(projectId: string): Promise<Investisseur[]> {
    return this.repo.find({ where: { project: { id: projectId } }, relations: ['investor'] });
  }

  findAll(): Promise<Investisseur[]> {
    return this.repo.find({ relations: ['investor', 'project'] });
  }

  async remove(id: string, userId: string): Promise<any> {
    const inv = await this.repo.findOne({ where: { id }, relations: ['investor'] });
    if (!inv || inv.investor.id !== userId) throw new NotFoundException('Not found');
    return this.repo.delete(id);
  }
}
