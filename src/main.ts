import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import errsole from 'errsole';
import ErrsoleSequelize from 'errsole-sequelize';
import * as morgan from 'morgan';

errsole.initialize({
  storage: new ErrsoleSequelize({
    dialect: 'sqlite',
    storage: '/tmp/logs.sqlite',
  }),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('combined'));
  await app.listen(3000);
}
bootstrap();
