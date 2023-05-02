import { PrismaService } from '../services/prisma.service';
import { User, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async getByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async getById(id: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateById(
    id: string,
    data: Prisma.UserUncheckedUpdateInput,
  ): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }
}
