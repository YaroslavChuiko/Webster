import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GetListCanvasQueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  authorId?: string;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsOptional()
  skip?: number;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsOptional()
  take?: number;

  @IsOptional()
  @IsUUID()
  cursor?: string;
}
