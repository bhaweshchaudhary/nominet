import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WhoisData } from '../models/whois-data.entity';
import { User } from '../../user/models/user.entity';

@Injectable()
export class WhoisDataService {
  constructor(
    @InjectRepository(WhoisData)
    private readonly whoisDataRepository: Repository<WhoisData>,
  ) {}

  async saveWhoisData(
    whoisData: Partial<WhoisData>,
    user: User,
  ): Promise<WhoisData> {
    const dataToInsert = this.whoisDataRepository.create({
      ...whoisData,
      user: { id: user.id } as User,
    });

    await this.whoisDataRepository.insert(dataToInsert);

    return this.whoisDataRepository.findOne({
      where: { domainName: whoisData.domainName, user: { id: user.id } },
      relations: ['user'],
    });
  }

  async getUserWhoisData(user: User): Promise<WhoisData[]> {
    return this.whoisDataRepository.find({ where: { user } });
  }
}
