import { WhoisData } from 'src/whois/models/whois-data.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => WhoisData, (whoisData) => whoisData.user)
  whoisData: WhoisData[];
}
