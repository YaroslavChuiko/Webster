import { IsString } from 'class-validator';

export class CreateCanvasRequestDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  content: string;

  static isValidJson(json: string): boolean {
    try {
      JSON.parse(json);
    } catch (e) {
      return false;
    }
    return true;
  }
}
