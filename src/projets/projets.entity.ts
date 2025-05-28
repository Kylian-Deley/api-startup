import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/users.entity';
import { Investisseur } from '../investisseurs/investisseurs.entity';

@Entity()
export class Projet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('decimal')
  budget: number;

  @Column()
  category: string;

  @ManyToOne(() => User, user => user.projets, { onDelete: 'CASCADE' })
  owner: User;

  @OneToMany(() => Investisseur, inv => inv.project)
  investisseurs: Investisseur[];
}
