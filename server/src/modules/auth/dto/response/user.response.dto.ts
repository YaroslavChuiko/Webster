import { User } from '@prisma/client';
import { plainToClass, Expose } from 'class-transformer';

export class UserResponseDto implements Omit<User, 'password'> {
  @Expose()
  id: string;
  @Expose()
  email: string;
  @Expose()
  username: string;
  @Expose()
  isEmailConfirmed: boolean;
  static mapFrom(data: User): UserResponseDto {
    return plainToClass(UserResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }
}
