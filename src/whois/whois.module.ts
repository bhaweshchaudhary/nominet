import { Module } from '@nestjs/common';
import { WhoisService } from './services/whois.service';
import { WhoisController } from './controllers/whois.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WhoisData } from './models/whois-data.entity';
import { User } from 'src/user/models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WhoisData, User])],
  providers: [WhoisService],
  controllers: [WhoisController],
  exports: [WhoisService],
})
export class WhoisModule {}
