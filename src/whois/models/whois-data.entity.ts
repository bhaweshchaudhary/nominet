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

  @Column({ nullable: true })
  userId: number; // Explicitly define userId as a column for clarity

  @ManyToOne(() => User, (user) => user.whoisData, {
    onDelete: 'CASCADE',
    eager: false, // Keep eager loading false to control loading
  })
  @JoinColumn({ name: 'userId' }) // Ensure userId is the linked foreign key column
  user: User;

  @Column()
  domainName: string;

  @Column({ nullable: true })
  registryDomainId: string;

  @Column({ nullable: true })
  registrarWhoisServer: string;

  @Column({ nullable: true })
  registrarUrl: string;

  @Column({ nullable: true })
  updatedDate: string;

  @Column({ nullable: true })
  creationDate: string;

  @Column({ nullable: true })
  registrarRegistrationExpirationDate: string;

  @Column({ nullable: true })
  registrar: string;

  @Column({ nullable: true })
  registrarIanaId: string;

  @Column({ nullable: true })
  registrarAbuseContactEmail: string;

  @Column({ nullable: true })
  registrarAbuseContactPhone: string;

  @Column({ nullable: true })
  domainStatus: string;

  @Column({ nullable: true })
  registrantName: string;

  @Column({ nullable: true })
  registrantOrganization: string;

  @Column({ nullable: true })
  registrantStreet: string;

  @Column({ nullable: true })
  registrantCity: string;

  @Column({ nullable: true })
  registrantStateProvince: string;

  @Column({ nullable: true })
  registrantPostalCode: string;

  @Column({ nullable: true })
  registrantCountry: string;

  @Column({ nullable: true })
  registrantPhone: string;

  @Column({ nullable: true })
  registrantFax: string;

  @Column({ nullable: true })
  registrantEmail: string;

  @Column({ nullable: true })
  adminName: string;

  @Column({ nullable: true })
  adminOrganization: string;

  @Column({ nullable: true })
  adminStreet: string;

  @Column({ nullable: true })
  adminCity: string;

  @Column({ nullable: true })
  adminStateProvince: string;

  @Column({ nullable: true })
  adminPostalCode: string;

  @Column({ nullable: true })
  adminCountry: string;

  @Column({ nullable: true })
  adminPhone: string;

  @Column({ nullable: true })
  adminFax: string;

  @Column({ nullable: true })
  adminEmail: string;

  @Column({ nullable: true })
  techName: string;

  @Column({ nullable: true })
  techOrganization: string;

  @Column({ nullable: true })
  techStreet: string;

  @Column({ nullable: true })
  techCity: string;

  @Column({ nullable: true })
  techStateProvince: string;

  @Column({ nullable: true })
  techPostalCode: string;

  @Column({ nullable: true })
  techCountry: string;

  @Column({ nullable: true })
  techPhone: string;

  @Column({ nullable: true })
  techFax: string;

  @Column({ nullable: true })
  techEmail: string;

  @Column({ type: 'text', array: true, nullable: true })
  nameServer: string[];

  @Column({ nullable: true })
  dnssec: string;

  @Column({ nullable: true })
  urlOfTheIcannWhoisDataProblemReportingSystem: string;

  @Column({ nullable: true })
  lastUpdateOfWhoisDatabase: string;
}
