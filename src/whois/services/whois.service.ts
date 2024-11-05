import { Injectable } from '@nestjs/common';
import * as whois from 'whois-json';

@Injectable()
export class WhoisService {
  async lookupDomain(domain: string): Promise<any> {
    const data = await whois(domain);
    return this.parseRelevantFields(data);
  }

  private parseRelevantFields(data: any): any {
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
