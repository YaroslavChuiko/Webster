import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from '../../shared/repositories';
import { PrismaService } from '../../shared/services/prisma.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService],
  exports: [UserService],
})
export class UserModule {}
