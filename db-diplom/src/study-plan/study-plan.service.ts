import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateStudyPlanDto } from './dto/create-study-plan.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class StudyPlanService {

    constructor(private prisma: PrismaService) {}

    async create(data: CreateStudyPlanDto) {
        return await this.prisma.studyPlan.create({ data });
    }

    async findAll() {
        return await this.prisma.studyPlan.findMany();
    }

    async findOneBySpeciality(specialityId: number) {
        return await this.prisma.studyPlan.findFirst({ where: { specialityId }});
    }
}
