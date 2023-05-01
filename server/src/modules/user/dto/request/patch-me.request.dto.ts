import { IsOptional, IsString } from 'class-validator';

export class PatchMeRequestDto {
  @IsString()
  @IsOptional()
  username?: string;
}
