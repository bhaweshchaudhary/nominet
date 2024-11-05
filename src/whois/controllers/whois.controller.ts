import { Body, Controller, Post } from '@nestjs/common';
import { WhoisService } from '../services/whois.service';

@Controller('whois')
export class WhoisController {
  constructor(private readonly whoisService: WhoisService) {}

  @Post('lookup')
  async lookup(@Body('domain') domain: string) {
    return this.whoisService.lookupDomain(domain);
  }
}
