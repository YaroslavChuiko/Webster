import { PipeTransform, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ValidationException } from '../exceptions';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: any): Promise<any> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    if (metatype && !value) {
      throw new ValidationException('Body cant be null');
    }

    const object = plainToInstance(metatype, value);

    const errors = await validate(object, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });
    if (errors.length > 0) {
      const messages = errors.map((error) => {
        return `${error.property} - ${Object.values(error.constraints).join(
          ', ',
        )}`;
      });
      throw new ValidationException(messages);
    }
    return value;
  }

  private toValidate(metatype: { new (...args: any[]): any }): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
