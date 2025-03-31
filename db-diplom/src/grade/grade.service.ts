import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateGradeDto } from './dto/create-grade.dto';

@Injectable()
export class GradeService {

    constructor(private prisma: PrismaService) {}

    async create(data: CreateGradeDto) {
        return await this.prisma.grade.create({ data });
    }

    async findAll() {
        return await this.prisma.grade.findMany();
    }

    async findOne(studentId: number) {
        return await this.prisma.grade.findFirst({ where: { studentId }})
    } 

}
