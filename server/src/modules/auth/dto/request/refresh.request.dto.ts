import { IsJWT } from 'class-validator';

export class RefreshRequestDto {
  @IsJWT()
  refreshToken: string;
}
