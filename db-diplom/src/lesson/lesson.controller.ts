import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Controller('lessons')
export class LessonController {

    constructor(private lessonService: LessonService) {}

    @Post()
    async create(@Body() data: CreateLessonDto) {
        return this.lessonService.create(data);
    }

    // @Get()
    // async getAll() {
    //     return this.lessonService.findAll();
    // }

    @Get("/:id")
    async getOneById(@Param("id") id: number) {
        return this.lessonService.findOne(Number(id));
    }

    @Get()
    async getAllByParams(@Query('groupId') groupId: number, @Query('disciplineId') disciplineId: number) {
        return this.lessonService.findAllByGroupAndDiscipline(Number(groupId), Number(disciplineId));
    }
}
