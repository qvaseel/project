import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Param,
  Get,
  Delete,
  Query,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PortfolioService } from './portfolio.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';
import { UpdateAchievementDto } from './dto/update-achievement.dto';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post('/create/:userId')
  async createPortfolio(@Param('userId') userId: number) {
    return this.portfolioService.createPortfolio(Number(userId));
  }

  @Post('/achievement')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/achievements',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
      fileFilter: (req, file, cb) => {
        // Разрешить только изображения и PDF
        const allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (allowedMimeTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Недопустимый формат файла'), false);
        }
      },
    }),
  )
  async uploadAchievement(
    @Query('studentId') studentId: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateAchievementDto,
  ) {
    if (!file) throw new BadRequestException('Файл не был загружен');

    const fileUrl = `/uploads/achievements/${file.filename}`;
    return this.portfolioService.createAchievement(
      Number(studentId),
      dto,
      fileUrl,
    );
  }

  @Get('/get/:userId')
  async getPortfolio(@Param('userId') userId: number) {
    return this.portfolioService.getPortfolio(Number(userId));
  }

  // Удаление достижения
  @Delete('/achievement/:achievementId')
  async deleteAchievement(@Param('achievementId') achievementId: number) {
    return this.portfolioService.deleteAchievement(Number(achievementId));
  }

  @Get('/achievement/:achievementId')
  async getOneAchievement(@Param('achievementId') achievementId: number) {
    return this.portfolioService.getOneAchievement(Number(achievementId));
  }

  @Patch('/achievement/update/:achievementId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/achievements',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (allowedMimeTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Недопустимый формат файла'), false);
        }
      },
    }),
  )
  async updateAchievement(
    @Param('achievementId') achievementId: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UpdateAchievementDto,
  ) {
    const fileUrl = file ? `/uploads/achievements/${file.filename}` : undefined;
    return this.portfolioService.updateAchievement(
      Number(achievementId),
      dto,
      fileUrl,
    );
  }

  @Patch('/achievement/pass/:achievementId')
  async markAsPassed(@Param('achievementId') achievementId: number) {
    return this.portfolioService.markAsPassed(Number(achievementId));
  }
}
