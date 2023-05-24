import { Module } from '@nestjs/common';
import { CanvasController } from './canvas.controller';
import { CanvasService } from './canvas.service';
import { CanvasRepository } from '../../shared/repositories/canvas.repository';
import { PrismaService } from '../../shared/services/prisma.service';

@Module({
  controllers: [CanvasController],
  providers: [CanvasService, CanvasRepository, PrismaService],
})
export class CanvasModule {}
