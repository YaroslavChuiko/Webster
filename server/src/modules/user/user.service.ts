import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from '../../shared/repositories';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const existingUser = await this.getByEmail(data.email);
    if (existingUser) {
      throw new ConflictException('User already exist');
    }
    return this.userRepository.create(data);
  }

  async getByEmail(email: string): Promise<User> {
    return this.userRepository.getByEmail(email);
  }

  async getById(id: string): Promise<User> {
    return this.userRepository.getById(id);
  }
  async updateById(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.userRepository.updateById(id, data);
  }
}
