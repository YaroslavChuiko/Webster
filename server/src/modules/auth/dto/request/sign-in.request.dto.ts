import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInRequestDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
