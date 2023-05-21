import { IsJWT } from 'class-validator';

export class VerifyEmailRequestQueryDto {
  @IsJWT()
  token: string;
}
