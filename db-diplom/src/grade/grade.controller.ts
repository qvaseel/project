import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GradeService } from './grade.service';
import { CreateGradeDto } from './dto/create-grade.dto';

@Controller('grades')
export class GradeController {

    constructor(private gradeService: GradeService) {}

    @Post()
    async create(@Body() data: CreateGradeDto) {
        return this.gradeService.create(data);
    }

    @Get()
    async getAll() {
        return this.gradeService.findAll();
    }

    @Get("/:studentId")
    async getOneByStudent(@Param('studentId') studentId: number) {
        return this.gradeService.findOne(studentId)
    }

}
