import { IsJWT } from 'class-validator';

export class VerifyEmailRequestQueryDto {
  @IsJWT()
  readonly token: string;
}
