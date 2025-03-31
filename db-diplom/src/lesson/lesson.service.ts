import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateScheduleDto } from 'src/schedule/dto/create-schedule.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Injectable()
export class LessonService {

    constructor(private prisma: PrismaService) {}

    async create(data: CreateLessonDto) {
        return await this.prisma.lesson.create({ data });
    }

    async findAll() {
        return await this.prisma.lesson.findMany();
    }

    async findOne(id: number) {
        return await this.prisma.lesson.findFirst({ where: { id }});
    }

}
