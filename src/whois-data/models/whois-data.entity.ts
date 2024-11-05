import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/models/user.entity';

@Entity()
export class WhoisData {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.whoisData, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  domainName: string;

  @Column({ nullable: true })
  registrar: string;

  @Column({ nullable: true })
  creationDate: string;

  @Column({ nullable: true })
  expirationDate: string;

  @Column({ nullable: true })
  updatedDate: string;

  @Column({ nullable: true })
  nameServer: string;

  @Column({ nullable: true })
  registrantOrganization: string;

  @Column({ nullable: true })
  registrantCountry: string;

  @Column({ nullable: true })
  registrantEmail: string;
}
