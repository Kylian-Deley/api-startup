import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { Projet } from '../projets/projets.entity';

@Entity()
export class Investisseur {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.investments, { onDelete: 'CASCADE' })
  investor: User;

  @ManyToOne(() => Projet, project => Projet, { onDelete: 'CASCADE' })
  project: Projet;

  @Column('decimal')
  amount: number;

  @CreateDateColumn()
  date: Date;
}
