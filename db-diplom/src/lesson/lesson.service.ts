import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateScheduleDto } from 'src/schedule/dto/create-schedule.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { group } from 'console';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateLessonDto) {
    return await this.prisma.lesson.create({ data });
  }

  async findAll() {
    return this.prisma.lesson.findMany({
      include: {
        schedule: true,
      },
    });
  }

  async findAllByGroupAndDiscipline(groupId: number, disciplineId: number) {
    return this.prisma.lesson.findMany({
      where: { schedule: { groupId: groupId, disciplineId: disciplineId } },
      include: {
        grades: true,
        schedule: { include: { discipline: true, group: true } },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.lesson.findFirst({ where: { id } });
  }

  async update(id: number, data: Partial<CreateLessonDto>) {
    return await this.prisma.lesson.update({
      where: { id: id },
      data,
    });
  }

  async delete(id: number) {
    return await this.prisma.lesson.delete({ where: { id: id }})
  }
}
