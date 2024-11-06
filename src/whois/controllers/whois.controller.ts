import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { WhoisService } from '../services/whois.service';
import { AuthGuard } from '@nestjs/passport';
import { WhoisData } from '../models/whois-data.entity';

@Controller('whois')
@UseGuards(AuthGuard('jwt'))
export class WhoisController {
  constructor(private readonly whoisService: WhoisService) {}

  @Post('lookup')
  @UseGuards(AuthGuard('jwt'))
  async lookup(
    @Body('domain') domain: string,
    @Request() req,
  ): Promise<WhoisData> {
    const userId = req.user.userId;
    console.log('Calling lookup with userId:', userId);
    return this.whoisService.lookupDomain(domain, userId);
  }
}
