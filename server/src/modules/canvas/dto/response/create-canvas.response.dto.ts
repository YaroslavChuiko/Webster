import { Expose, plainToClass } from 'class-transformer';
import { Canvas } from '@prisma/client';

export class CreateCanvasResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  content: JSON;

  @Expose()
  authorId: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  static mapFrom(data: Canvas): CreateCanvasResponseDto {
    return plainToClass(CreateCanvasResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }
}
