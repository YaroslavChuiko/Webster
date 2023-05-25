import { CreateCanvasRequestDto } from './create-canvas.request.dto';
import { IsString } from 'class-validator';

export class UpdateCanvasRequestDto implements CreateCanvasRequestDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  content: string;
}
