import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { LoggerService } from './modules/logger/logger.service';
// import { appConfig } from './shared/configs/app.config';
import { fastifyHelmet } from '@fastify/helmet';
import { PrismaService } from './shared/services/prisma.service';
import { ValidationPipe } from './shared/pipes';
import { AllExceptionsFilter } from './shared/filters';

// const port = appConfig.getPort();
const port = process.env.PORT || 8080;
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.useGlobalPipes(new ValidationPipe());

  await app.useGlobalFilters(new AllExceptionsFilter());

  app.enableCors({
    allowedHeaders: '*',
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: 'GET, POST, PUT, PATCH, DELETE',
  });

  await app
    .listen(port)
    .then(() => new LoggerService().info(`server listening at port ${port}`));
}

bootstrap();
