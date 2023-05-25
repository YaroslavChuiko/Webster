import { Injectable } from '@nestjs/common';
import { Prisma, Canvas } from '@prisma/client';
import { PrismaService } from '../services/prisma.service';
import {
  GetAllCanvasesOptionsType,
  GetAllCanvasesWhereType,
} from '../../modules/canvas/types';
@Injectable()
export class CanvasRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CanvasUncheckedCreateInput): Promise<Canvas> {
    return this.prisma.canvas.create({ data });
  }

  async getById(canvasId: string): Promise<Canvas> {
    return this.prisma.canvas.findUnique({
      where: { id: canvasId },
    });
  }

  async updateById(
    data: Prisma.CanvasUncheckedUpdateInput,
    canvasId: string,
  ): Promise<Canvas> {
    return this.prisma.canvas.update({ where: { id: canvasId }, data });
  }

  async deleteById(canvasId: string): Promise<Canvas> {
    return this.prisma.canvas.delete({ where: { id: canvasId } });
  }

  async getList(
    where?: GetAllCanvasesWhereType,
    options?: GetAllCanvasesOptionsType,
  ): Promise<Omit<Canvas, 'content'>[]> {
    return this.prisma.canvas.findMany({
      ...options,
      where: {
        name: {
          search: where?.name,
        },
        description: {
          search: where?.description,
        },
        authorId: {
          equals: where?.authorId,
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        authorId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
