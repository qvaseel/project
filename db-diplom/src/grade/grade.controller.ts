import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { GradeService } from './grade.service';
import { CreateGradeDto } from './dto/create-grade.dto';

@Controller('grades')
export class GradeController {

    constructor(private gradeService: GradeService) {}

    @Post()
    async create(@Body() data: CreateGradeDto) {
        return this.gradeService.create(data);
    }

    @Get('by-student')
    async getAllByStudent(@Query('studentId') studentId: number, @Query('disciplineId') disciplineId: number) {
        return this.gradeService.findAllByStudentAndDiscipline(Number(studentId), Number(disciplineId));
    }

    @Get('by-group')
    async getAllByGroup(@Query('groupId') groupId: number, @Query('disciplineId') disciplineId: number) {
        return this.gradeService.findAllByGroupAndDiscipline(Number(groupId), Number(disciplineId));
    }

    @Get("/:studentId")
    async getManyByStudent(@Param('studentId') studentId: number) {
        return this.gradeService.findOne(studentId)
    }

}
