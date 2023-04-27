import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston/dist/winston.utilities';

@Injectable()
export class LoggerService {
  private context?: string;

  private logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple(),
          winston.format.timestamp(),
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike('Webster', {
            colors: true,
            prettyPrint: true,
          }),
        ),
      }),
    ],
  });

  public info(message: any, context?: string) {
    return this.logger.info(message, { context: context || this.context });
  }

  public error(message: any, trace?: string, context?: string): any {
    return this.logger.error(message, {
      trace,
      context: context || this.context,
    });
  }

  public warn(message: any, context?: string): any {
    return this.logger.warn(message, { context: context || this.context });
  }

  public debug(message: any, context?: string): any {
    return this.logger.debug(message, { context: context || this.context });
  }

  public verbose(message: any, context?: string): any {
    return this.logger.verbose(message, { context: context || this.context });
  }

  public setContext(context: string) {
    this.context = context;
  }
}
