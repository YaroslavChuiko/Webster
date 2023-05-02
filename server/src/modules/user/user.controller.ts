import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JWTAuthGuard } from '../../shared/guards';
import { HttpUser } from '../../shared/decorators';
import { HttpUserPayload } from '../../shared/types';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('me')
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  async getMe(@HttpUser() user: HttpUserPayload) {
    return this.userService.getById(user.id);
  }
}
