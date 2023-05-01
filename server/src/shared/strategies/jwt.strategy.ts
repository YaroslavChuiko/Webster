import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { appConfig } from '../configs/app.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
      ignoreExpiration: true,
      secretOrKey: appConfig.getAppSecret(),
    });
  }

  private static extractJWT(req: any): string | null {
    const token = req.headers['authorization'];
    return token ? token.replace('Bearer ', '') : token;
  }

  async validate(payload: any): Promise<{ id: string; email: string }> {
    return { id: payload.id, email: payload.email };
  }
}
