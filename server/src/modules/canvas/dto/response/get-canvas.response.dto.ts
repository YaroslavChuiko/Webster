import { Expose, plainToClass } from 'class-transformer';
import { Canvas } from '@prisma/client';

export class GetCanvasResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  content: JSON;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  authorId: string;

  static mapFrom(data: Canvas): GetCanvasResponseDto {
    return plainToClass(GetCanvasResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }
}
