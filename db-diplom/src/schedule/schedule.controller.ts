import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Controller('schedule')
export class ScheduleController {

    constructor(private scheduleService: ScheduleService) {}

    @Post()
    async create(@Body() data: CreateScheduleDto) {
        return this.scheduleService.create(data)
    }

    @Get('/group/:groupId')
    async getOneByGroup(@Param('groupId') groupId: number) {
        return this.scheduleService.findOneByGroup(Number(groupId));
    }

    @Get('/teacher/:teacherId')
    async getOneByTeacher(@Param('teacherId') teacherId: number) {
        return this.scheduleService.findOneByTeacher(Number(teacherId));
    }

}
