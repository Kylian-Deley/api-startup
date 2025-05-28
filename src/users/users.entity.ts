import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { Exclude, classToPlain } from 'class-transformer';
import { Entrepreneur } from '../entrepreneurs/entrepreneurs.entity';
import { UserEntrepreneur } from '../entrepreneurs/user-entrepreneurs.entity';
import { Projet } from '../projets/projets.entity';
import { Investisseur } from '../investisseurs/investisseurs.entity';

export enum UserRole {
  ENTREPRENEUR = 'entrepreneur',
  INVESTISSEUR = 'investisseur',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.INVESTISSEUR })
  role: UserRole;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  bio?: string;

  @OneToMany(() => Projet, project => project.owner)
  projets: Projet[];

  @OneToMany(() => Investisseur, inv => inv.investor)
  investments: Investisseur[];

  @OneToMany(() => UserEntrepreneur, ui => ui.user)
  Userentrepreneurs: UserEntrepreneur[];

  toJSON() {
    return classToPlain(this);
  }
}
