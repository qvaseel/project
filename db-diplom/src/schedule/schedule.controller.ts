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

    @Get()
    async getAll(@Query('groupId') groupId?: number) {
        if (groupId) {
            return this.scheduleService.findOneByGroup(Number(groupId));
        }
        return this.scheduleService.findAll();
    }

}
