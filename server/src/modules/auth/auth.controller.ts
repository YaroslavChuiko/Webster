import {
  Body,
  Controller,
  HttpCode,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ResendConfirmationLinkRequestDto,
  SignInRequestDto,
  SignInResponseDto,
  SignUpRequestDto,
  UserResponseDto,
  VerifyEmailRequestQueryDto,
} from './dto';
import { JWTAuthGuard } from '../../shared/guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async register(
    @Body() signUpDto: SignUpRequestDto,
  ): Promise<UserResponseDto> {
    return this.authService.registration(signUpDto);
  }

  @Get('is-logged-in')
  @UseGuards(JWTAuthGuard)
  @HttpCode(200)
  async jwtGuard() {
    return {
      message: 'Logged in',
    };
  }

  @Post('sign-in')
  @HttpCode(200)
  async login(@Body() signInDto: SignInRequestDto): Promise<SignInResponseDto> {
    return this.authService.login(signInDto);
  }

  @Post('resend-confirmation-link')
  @HttpCode(200)
  async resendConfirmationLink(
    @Body() resendConfirmationLinkDto: ResendConfirmationLinkRequestDto,
  ): Promise<UserResponseDto> {
    return this.authService.resendConfirmationLink(
      resendConfirmationLinkDto.email,
    );
  }

  @Post('verify-email')
  @HttpCode(200)
  async verifyEmail(
    @Body() verifyEmailRequestQueryDto: VerifyEmailRequestQueryDto,
  ): Promise<UserResponseDto> {
    return this.authService.verifyEmail(verifyEmailRequestQueryDto.token);
  }
}
