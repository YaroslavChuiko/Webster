import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
} from 'class-validator';
import {
  minLengthPasswordValidation,
  minLengthUsernameValidation,
  passwordMatchPattern,
} from '../../../../common/constants';

export class SignUpRequestDto {
  @IsEmail()
  @IsDefined()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(minLengthUsernameValidation)
  readonly username: string;

  @IsNotEmpty()
  @MinLength(minLengthPasswordValidation)
  @Matches(passwordMatchPattern, { message: 'password is too weak' })
  password: string;
}
