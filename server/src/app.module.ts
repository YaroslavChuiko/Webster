import { Module } from '@nestjs/common';
import { LoggerModule } from './modules/logger/logger.module';
import { LoggerService } from './modules/logger/logger.service';
import { PrismaService } from './shared/services/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [AuthModule, LoggerModule, UserModule],
  providers: [PrismaService, LoggerService],
})
export class AppModule {}
