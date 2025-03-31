import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DisciplineService } from './discipline.service';
import { CreateDisciplineDto } from './dto/create-discipline.dto';

@Controller('disciplines')
export class DisciplineController {

    constructor(private disciplineService: DisciplineService) {}

    @Post()
    async create(@Body() data: CreateDisciplineDto) {
        return this.disciplineService.create(data);
    }

    @Get("/:id")
    async getOneById(@Param('id') id: number) {
        return this.disciplineService.findOne(Number(id));
    }

    @Get()
    async getAll() {
        return this.disciplineService.findAll();
    }

}
