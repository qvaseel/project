import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupService {

    constructor(private prisma: PrismaService) {}

    public async create(data: CreateGroupDto) {
        return await this.prisma.group.create({ data });
    }
}
