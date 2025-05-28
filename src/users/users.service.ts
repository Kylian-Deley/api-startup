import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './users.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable() 
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  create(dto: CreateUserDto): Promise<User> {
    const user = this.repo.create({
      ...dto,
      role: dto.role as UserRole, // Map role to UserRole enum
    });
    return this.repo.save(user);
  }

  findByEmail(email: string): Promise<User|null> {
    return this.repo.findOne({ where: { email } });
  }

  findOne(id: string): Promise<User|null> {
    return this.repo.findOne({ where: { id } });
  }

  findAll(): Promise<User[]> {
    return this.repo.find();
  }

  update(id: string, dto: UpdateProfileDto): Promise<any> {
    const updateData: Partial<User> = { ...dto };
    return this.repo.update(id, updateData);
  }

  remove(id: string): Promise<any> {
    return this.repo.delete(id);
  }
}
