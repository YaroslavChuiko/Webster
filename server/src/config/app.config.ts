import 'dotenv/config';
import { LoggerService } from '../modules/logger/logger.service';
import { defaultPort } from '../common/constants';
class AppConfig {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      new LoggerService().error(`config error - missing env.${key}`, 'ENV');
    }

    return value;
  }

  ensureValues(keys: string[]): AppConfig {
    const missingValues = [];
    for (const k of keys) {
      const value = this.getValue(k, false);
      if (!value) {
        missingValues.push(k);
        new LoggerService().error(`config error - missing env.${k}`, 'ENV');
      }
    }
    if (missingValues.length > 0) {
      throw new Error(`Missing config values: ${missingValues.join(', ')}`);
    }
    return this;
  }

  getPepper(): string {
    return this.getValue('PEPPER', true);
  }

  getHost(): string {
    return this.getValue('HOST') || '0.0.0.0';
  }

  getConfirmUrl(): string {
    const clientUrl = this.getValue('CLIENT_URL', true);
    return `${clientUrl}/auth/verify`;
  }

  getPort(): string | number {
    return this.getValue('PORT') || defaultPort;
  }

  getFrontApiLink(): string {
    return this.getValue('FRONT_API_LINK');
  }

  getAppSecret(): string | undefined {
    return this.getValue('APP_SECRET', true);
  }

  getRefreshTokenSecret(): string {
    return this.getValue('REFRESH_TOKEN_SECRET', true);
  }

  getJwtExpired(): string | undefined {
    return this.getValue('JWT_EXPIRED', true);
  }

  getStripeSecretKey(): string {
    return this.getValue('STRIPE_SK', true);
  }

  getStripeWebHookSecret(): string {
    return this.getValue('STRIPE_WH', true);
  }

  getMailgunConfig(): any {
    return {
      client: {
        username: this.getValue('MAILGUN_USERNAME', true),
        key: this.getValue('MAILGUN_KEY', true),
      },
      domain: this.getValue('MAILGUN_DOMAIN', true),
      from: this.getValue('MAILGUN_FROM', true),
    };
  }

  getAWSConfig(): any {
    return {
      accessKeyId: this.getValue('AWS_ACCESS_KEY_ID', true),
      secretAccessKey: this.getValue('AWS_SECRET_ACCESS_KEY', true),
      region: this.getValue('AWS_REGION', true),
    };
  }
}

const appConfig = new AppConfig(process.env).ensureValues([
  'PORT',
  // 'HOST',
  // 'APP_SECRET',
  // 'JWT_EXPIRED',
  // 'FRONT_API_LINK',
  // 'MAILGUN_USERNAME',
  // 'MAILGUN_KEY',
  // 'MAILGUN_DOMAIN',
  // 'MAILGUN_FROM',
  // 'CLIENT_URL',
  // 'REFRESH_TOKEN_SECRET',
]);

export { appConfig };
