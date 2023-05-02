import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CryptoService } from '../../shared/services/crypto.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../shared/strategies';
import { appConfig } from '../../shared/configs/app.config';
import { EmailService } from '../../shared/services/email.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: appConfig.getAppSecret(),
      signOptions: { expiresIn: appConfig.getJwtExpired() },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, CryptoService, JwtStrategy, EmailService],
})
export class AuthModule {}
