import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entrepreneur } from './entrepreneurs.entity';
import { UserEntrepreneur } from './user-entrepreneurs.entity';

@Injectable()
export class EntrepreneursService {
  constructor(
    @InjectRepository(Entrepreneur)
    private readonly entrepreneurRepo: Repository<Entrepreneur>,
    @InjectRepository(UserEntrepreneur)
    private readonly uiRepo: Repository<UserEntrepreneur>,
  ) {}

  findAll(): Promise<Entrepreneur[]> {
    return this.entrepreneurRepo.find();
  }

  async addToUser(userId: string, entrepreneurIds: string[]): Promise<any> {
    const records = entrepreneurIds.map(id => this.uiRepo.create({ userId, interestId: id }));
    return this.uiRepo.save(records);
  }

  getUserEntrepreneurs(userId: string): Promise<UserEntrepreneur[]> {
    return this.uiRepo.find({ where: { userId }, relations: ['entrepreneur'] });
  }
}