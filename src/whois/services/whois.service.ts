import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as whois from 'whois-json';
import { WhoisData } from '../models/whois-data.entity';

@Injectable()
export class WhoisService {
  constructor(
    @InjectRepository(WhoisData)
    private readonly whoisDataRepository: Repository<WhoisData>,
  ) {}

  async lookupDomain(domain: string, userId: number): Promise<WhoisData> {
    const data = await whois(domain);
    const whoisData = this.parseRelevantFields(data);

    const whoisDataToInsert = {
      ...whoisData,
      userId,
      nameServer: whoisData.nameServer,
    };

    await this.whoisDataRepository.insert(whoisDataToInsert);

    return await this.whoisDataRepository.findOne({
      where: { domainName: whoisData.domainName, userId },
      relations: ['user'],
    });
  }

  private parseRelevantFields(data: any): Partial<WhoisData> {
    return {
      domainName: data.domainName,
      registryDomainId: data.registryDomainId,
      registrarWhoisServer: data.registrarWhoisServer,
      registrarUrl: data.registrarUrl,
      updatedDate: data.updatedDate,
      creationDate: data.creationDate,
      registrarRegistrationExpirationDate:
        data.registrarRegistrationExpirationDate,
      registrar: data.registrar,
      registrarIanaId: data.registrarIanaId,
      registrarAbuseContactEmail: data.registrarAbuseContactEmail,
      registrarAbuseContactPhone: data.registrarAbuseContactPhone,
      domainStatus: data.domainStatus,
      registrantName: data.registrantName,
      registrantOrganization: data.registrantOrganization,
      registrantStreet: data.registrantStreet,
      registrantCity: data.registrantCity,
      registrantStateProvince: data.registrantStateProvince,
      registrantPostalCode: data.registrantPostalCode,
      registrantCountry: data.registrantCountry,
      registrantPhone: data.registrantPhone,
      registrantFax: data.registrantFax,
      registrantEmail: data.registrantEmail,
      adminName: data.adminName,
      adminOrganization: data.adminOrganization,
      adminStreet: data.adminStreet,
      adminCity: data.adminCity,
      adminStateProvince: data.adminStateProvince,
      adminPostalCode: data.adminPostalCode,
      adminCountry: data.adminCountry,
      adminPhone: data.adminPhone,
      adminFax: data.adminFax,
      adminEmail: data.adminEmail,
      techName: data.techName,
      techOrganization: data.techOrganization,
      techStreet: data.techStreet,
      techCity: data.techCity,
      techStateProvince: data.techStateProvince,
      techPostalCode: data.techPostalCode,
      techCountry: data.techCountry,
      techPhone: data.techPhone,
      techFax: data.techFax,
      techEmail: data.techEmail,
      nameServer: data.nameServer ? data.nameServer.split(' ') : [],
      dnssec: data.dnssec,
      urlOfTheIcannWhoisDataProblemReportingSystem:
        data.urlOfTheIcannWhoisDataProblemReportingSystem,
      lastUpdateOfWhoisDatabase: data.lastUpdateOfWhoisDatabase,
    };
  }
}
