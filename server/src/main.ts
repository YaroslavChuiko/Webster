import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { LoggerService } from './modules/logger/logger.service';
import { appConfig } from './config/app.config';

const port = appConfig.getPort();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await app
    .listen(port)
    .then(() => new LoggerService().info(`server listening at port ${port}`));
}

bootstrap(1);
