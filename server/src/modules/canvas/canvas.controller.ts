import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  UseGuards,
  Put,
  Param,
  ParseUUIDPipe,
  Query,
  ValidationPipe,
} from '@nestjs/common';

import { HttpUser } from '../../shared/decorators';
import {
  CreateCanvasRequestDto,
  UpdateCanvasRequestDto,
  UpdateCanvasResponseDto,
} from './dto';
import { HttpUserPayload } from '../../shared/types';
import { CreateCanvasResponseDto } from './dto';
import { CanvasService } from './canvas.service';
import { JWTAuthGuard } from '../../shared/guards';
import { GetListCanvasQueryDto } from './dto/request/get-list-canvas-query.dto';
import { Canvas } from '@prisma/client';

@Controller('canvas')
export class CanvasController {
  constructor(private readonly canvasService: CanvasService) {}
  @Post()
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  async createCanvas(
    @HttpUser() user: HttpUserPayload,
    @Body() body: CreateCanvasRequestDto,
  ): Promise<CreateCanvasResponseDto> {
    return this.canvasService.createCanvas(body, user.id);
  }

  @Get(':canvasId')
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  async getCanvas(
    @Param('canvasId', ParseUUIDPipe) canvasId: string,
    @HttpUser() user: HttpUserPayload,
  ): Promise<CreateCanvasResponseDto> {
    return this.canvasService.getCanvasById(canvasId, user.id);
  }

  @Put(':canvasId')
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  async updateCanvas(
    @Param('canvasId', ParseUUIDPipe) canvasId: string,
    @HttpUser() user: HttpUserPayload,
    @Body() body: UpdateCanvasRequestDto,
  ): Promise<UpdateCanvasResponseDto> {
    return this.canvasService.updateCanvas(body, canvasId, user.id);
  }

  @Get()
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  async getAll(
    @HttpUser() user: HttpUserPayload,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: GetListCanvasQueryDto,
  ): Promise<{ canvases: Omit<Canvas, 'content'>[]; count: number }> {
    const cursor = query?.cursor ? { id: query?.cursor } : undefined;
    return this.canvasService.getListCanvases(
      {
        name: query?.name,
        description: query?.description,
        authorId: user.id,
      },
      {
        cursor,
        take: query?.take,
        skip: query?.skip,
      },
    );
  }

  @Delete(':canvasId')
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  async deleteCanvas(
    @Param('canvasId', ParseUUIDPipe) canvasId: string,
    @HttpUser() user: HttpUserPayload,
  ): Promise<Canvas> {
    return this.canvasService.deleteCanvas(canvasId, user.id);
  }
}
