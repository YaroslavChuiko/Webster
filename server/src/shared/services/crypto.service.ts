import { Injectable } from '@nestjs/common';
import * as crypto from 'node:crypto';
import {
  cryptoDigest,
  cryptoIterations,
  cryptoKeylen,
} from '../../common/constants';
import { appConfig } from '../configs/app.config';

@Injectable()
export class CryptoService {
  async encryptPassword(password: string): Promise<string> {
    try {
      const salt = crypto.randomBytes(16).toString('hex');
      const pepper = appConfig.getPepper();
      const hash = crypto
        .pbkdf2Sync(
          password,
          salt + pepper,
          cryptoIterations,
          cryptoKeylen,
          cryptoDigest,
        )
        .toString('hex');
      return `${salt}:${hash}`;
    } catch (e) {
      throw new Error('123');
    }
  }

  async checkPassword(
    password: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    const [salt, hash] = encryptedPassword.split(':');
    const pepper = appConfig.getPepper();
    const possibleHash = crypto
      .pbkdf2Sync(
        password,
        salt + pepper,
        cryptoIterations,
        cryptoKeylen,
        cryptoDigest,
      )
      .toString('hex');
    return hash === possibleHash;
  }
}
