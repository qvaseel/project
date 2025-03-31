import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
    async getAll() {
        return this.scheduleService.findAll();
    }

    @Get("/:groupId")
    async getOneByGroup(@Param('groupId') groupId: number) {
        return this.scheduleService.findOneByGroup(groupId);
    }

}
