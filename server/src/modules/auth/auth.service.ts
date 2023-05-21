import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CryptoService } from '../../shared/services/crypto.service';
import {
  SignInRequestDto,
  SignInResponseDto,
  SignUpRequestDto,
  UserResponseDto,
} from './dto';
import { UserService } from '../user/user.service';
import { EmailService } from '../../shared/services/email.service';
import { JwtService } from '@nestjs/jwt';
import { emailTokenExpiresAt } from '../../common/constants/';
import { appConfig } from '../../shared/configs/app.config';
import { JwtVerifyOptions } from '@nestjs/jwt/dist/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  async registration(dto: SignUpRequestDto): Promise<UserResponseDto> {
    const hashedPassword = await this.cryptoService.encryptPassword(
      dto.password,
    );

    const user = await this.userService.create({
      ...dto,
      password: hashedPassword,
    });

    const confirmURL = await this.getEmailConfirmationUrl(dto.email);
    await this.emailService.sendEmail(dto.email, confirmURL);

    return UserResponseDto.mapFrom(user);
  }

  async login(dto: SignInRequestDto): Promise<SignInResponseDto> {
    const user = await this.userService.getByEmail(dto.email);
    if (!user) {
      throw new NotFoundException(
        `User with email ${dto.email} does not exist`,
      );
    }
    if (!user.isEmailConfirmed) {
      throw new UnauthorizedException('Email unconfirmed');
    }

    const isPasswordEq = await this.cryptoService.checkPassword(
      dto.password,
      user.password,
    );
    if (!isPasswordEq) {
      throw new UnauthorizedException('Wrong email or password');
    }
    const accessToken = await this.getJwtToken(user.id);

    return {
      accessToken,
    };
  }

  async verifyEmail(token: string): Promise<UserResponseDto> {
    const payload = this.verifyToken(token);

    const user = await this.userService.getByEmail(payload.email);
    if (!user) {
      throw new NotFoundException(
        `User with email ${payload.email} does not exist`,
      );
    }
    if (user.isEmailConfirmed) {
      throw new ConflictException('Email already confirmed');
    }
    return this.userService.updateById(user.id, {
      isEmailConfirmed: true,
    });
  }

  async resendConfirmationLink(email: string): Promise<UserResponseDto> {
    const user = await this.userService.getByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} does not exist`);
    }
    if (user.isEmailConfirmed) {
      throw new ConflictException('Email already confirmed');
    }
    const confirmURL = await this.getEmailConfirmationUrl(email);
    await this.emailService.sendEmail(email, confirmURL);

    return user;
  }

  async getEmailConfirmationUrl(email: string): Promise<string> {
    const token = await this.getEmailConfirmationJwt(email);
    return `${appConfig.getConfirmUrl()}?token=${token}`;
  }

  async getEmailConfirmationJwt(email: string): Promise<string> {
    return this.jwtService.signAsync(
      { email },
      { expiresIn: emailTokenExpiresAt },
    );
  }

  verifyToken(token: string, options?: JwtVerifyOptions): any {
    let payload;
    try {
      payload = this.jwtService.verify(token, options);
    } catch (error) {
      if (error.message === 'jwt expired') {
        throw new UnauthorizedException('Jwt expired');
      }
      if (error.message === 'invalid token') {
        throw new UnauthorizedException('Invalid token');
      }
      throw new Error(error);
    }

    return payload;
  }

  async getJwtToken(id: string): Promise<string> {
    return this.jwtService.signAsync({ id });
  }
}
