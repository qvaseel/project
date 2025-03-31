import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StudyPlanService } from './study-plan.service';
import { CreateStudyPlanDto } from './dto/create-study-plan.dto';

@Controller('study-plans')
export class StudyPlanController {

    constructor(private studyPlanService: StudyPlanService) {}

    @Post()
    async create(@Body() data: CreateStudyPlanDto) {
        return this.studyPlanService.create(data);
    }  

    @Get()
    async getAll() {
        return this.studyPlanService.findAll();
    }

    @Get("/:specialityId")
    async getOneBySpecialityId(@Param('specialityId') specialityId: number) {
        return this.studyPlanService.findOneBySpeciality(Number(specialityId));
    }
}
