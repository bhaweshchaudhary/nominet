import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WhoisDataService } from './services/whois-data.service';
import { WhoisDataController } from './controllers/whois-data.controller';
import { WhoisData } from './models/whois-data.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([WhoisData]), UserModule],
  providers: [WhoisDataService],
  controllers: [WhoisDataController],
  exports: [WhoisDataService],
})
export class WhoisDataModule {}
