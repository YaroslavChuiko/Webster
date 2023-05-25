import { Expose, plainToClass } from 'class-transformer';
import { Canvas } from '@prisma/client';

export class UpdateCanvasResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  content: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  static mapFrom(data: Canvas): UpdateCanvasResponseDto {
    return plainToClass(UpdateCanvasResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }
}
