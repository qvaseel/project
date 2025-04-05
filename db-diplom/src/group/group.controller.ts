import { Body, Controller, Get, Post } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';

@Controller('groups')
export class GroupController {

    constructor(private groupService: GroupService) {}

    @Post()
    async create(@Body() data: CreateGroupDto) {
        return this.groupService.create(data);
    }

    @Get()
    async getAll() {
        return this.groupService.findAll();
    }
}
