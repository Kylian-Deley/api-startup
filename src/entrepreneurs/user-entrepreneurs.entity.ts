import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { Entrepreneur } from './entrepreneurs.entity';

@Entity()
export class UserEntrepreneur {
  @PrimaryColumn('uuid')
  userId: string;

  @PrimaryColumn('uuid')
  interestId: string;

  @ManyToOne(() => User, user => user.Userentrepreneurs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Entrepreneur, entrepreneur => entrepreneur.userEntrepreneurs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'interestId' })
  interest: Entrepreneur;
}
