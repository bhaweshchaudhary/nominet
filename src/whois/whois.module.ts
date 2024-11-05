import { Module } from '@nestjs/common';
import { WhoisService } from './services/whois.service';
import { WhoisController } from './controllers/whois.controller';

@Module({
  providers: [WhoisService],
  controllers: [WhoisController],
  exports: [WhoisService],
})
export class WhoisModule {}
