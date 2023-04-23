import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './modules/logger/logger.module';
import { LoggerService } from './modules/logger/logger.service';

@Module({
  imports: [LoggerModule],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule {}
