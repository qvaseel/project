import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateGradeDto } from './dto/create-grade.dto';

@Injectable()
export class GradeService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateGradeDto) {
    return await this.prisma.grade.create({
      data,
      include: { student: true, lesson: true },
    });
  }

  async findAll() {
    return await this.prisma.grade.findMany();
  }

  async findOne(studentId: number) {
    return await this.prisma.grade.findFirst({ where: { studentId } });
  }

  public async findAllByStudentAndDiscipline(
    studentId: number,
    disciplineId: number,
  ) {
    return await this.prisma.grade.findMany({
      where: {
        studentId: studentId,
        lesson: { schedule: { disciplineId: disciplineId } },
      },
      include: { lesson: true, student: true },
    });
  }

  public async findAllByGroupAndDiscipline(
    groupId: number,
    disciplineId: number,
  ) {
    return await this.prisma.grade.findMany({
      where: {
        lesson: { schedule: { groupId: groupId, disciplineId: disciplineId } },
      },
      include: { lesson: true, student: true },
    });
  }

  async update(id: number, data: Partial<CreateGradeDto>) {
    return await this.prisma.grade.update({
      where: { id },
      data,
    });
  }
}
