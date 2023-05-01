import { IsEmail } from 'class-validator';

export class ResendConfirmationLinkRequestDto {
  @IsEmail()
  email: string;
}
