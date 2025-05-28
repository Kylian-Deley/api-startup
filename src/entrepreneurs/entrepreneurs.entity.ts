import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserEntrepreneur } from './user-entrepreneurs.entity';

@Entity()
export class Entrepreneur {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => UserEntrepreneur, ui => ui.interest)
  userEntrepreneurs: UserEntrepreneur[];
}
