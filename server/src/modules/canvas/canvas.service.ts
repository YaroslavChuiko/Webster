import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateCanvasRequestDto,
  CreateCanvasResponseDto,
  UpdateCanvasRequestDto,
  GetCanvasResponseDto,
  UpdateCanvasResponseDto,
} from './dto';
import { CanvasRepository } from '../../shared/repositories/canvas.repository';
import { GetAllCanvasesOptionsType, GetAllCanvasesWhereType } from './types';

@Injectable()
export class CanvasService {
  constructor(private readonly canvasRepository: CanvasRepository) {}

  async createCanvas(data: CreateCanvasRequestDto, authorId: string) {
    if (!CreateCanvasRequestDto.isValidJson(data.content)) {
      throw new BadRequestException('Invalid content JSON');
    }

    try {
      const canvas = await this.canvasRepository.create({
        ...data,
        content: JSON.parse(data.content),
        authorId,
      });
      return CreateCanvasResponseDto.mapFrom(canvas);
    } catch (e) {
      throw new BadRequestException('Invalid content JSON');
    }
  }

  async updateCanvas(
    data: UpdateCanvasRequestDto,
    canvasId: string,
    authorId: string,
  ) {
    if (!CreateCanvasRequestDto.isValidJson(data.content)) {
      throw new BadRequestException('Invalid content JSON');
    }

    await this.getCanvasById(canvasId, authorId);

    try {
      const canvas = await this.canvasRepository.updateById(
        {
          ...data,
          content: JSON.parse(data.content),
        },
        canvasId,
      );
      return UpdateCanvasResponseDto.mapFrom(canvas);
    } catch (e) {
      throw new BadRequestException('Invalid content JSON');
    }
  }

  async getCanvasById(canvasId: string, userId: string) {
    const canvas = await this.canvasRepository.getById(canvasId);
    if (!canvas || canvas.authorId !== userId) {
      throw new NotFoundException('Not found');
    }
    return GetCanvasResponseDto.mapFrom(canvas);
  }

  async getListCanvases(
    where?: GetAllCanvasesWhereType,
    options?: GetAllCanvasesOptionsType,
  ) {
    return this.canvasRepository.getList(where, options);
  }

  async deleteCanvas(canvasId: string, authorId: string) {
    await this.getCanvasById(canvasId, authorId);
    return this.canvasRepository.deleteById(canvasId);
  }
}
