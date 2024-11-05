import {
  Controller,
  Post,
  Get,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { WhoisDataService } from '../services/whois-data.service';
import { WhoisData } from '../models/whois-data.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('whois-data')
@UseGuards(AuthGuard('jwt'))
export class WhoisDataController {
  constructor(private readonly whoisDataService: WhoisDataService) {}

  @Post('save')
  async saveWhoisData(
    @Body()
    whoisData: Partial<{
      domainName: string;
      registrar: string;
      creationDate: string;
      expirationDate: string;
      updatedDate: string;
      nameServer: string[];
      registrantOrganization: string;
      registrantCountry: string;
      registrantEmail: string;
    }>,
    @Request() req,
  ) {
    const user = req.user;

    const whoisDataToSave = {
      ...whoisData,
      nameServer: Array.isArray(whoisData.nameServer)
        ? whoisData.nameServer.join(', ')
        : whoisData.nameServer,
    };

    return this.whoisDataService.saveWhoisData(whoisDataToSave, user);
  }

  @Get('user-data')
  async getUserWhoisData(@Request() req): Promise<WhoisData[]> {
    const user = req.user;
    return this.whoisDataService.getUserWhoisData(user);
  }
}
