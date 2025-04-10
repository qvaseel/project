import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Prisma, User } from '@prisma/client';
import { AddRoleDto } from './dto/add-role.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  async createUser(@Body() data: CreateUserDto): Promise<User> {
    return this.userService.create(data);
  }

  @Roles('ADMIN', 'TEACHER', 'STUDENT')
  @UseGuards(RolesGuard)
  @Get('/:id')
  getOneUserById(@Param('id') id: number) {
    return this.userService.findById(Number(id));
  }

  @Roles('ADMIN', 'TEACHER', 'STUDENT')
  @UseGuards(RolesGuard)
  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() data: AddRoleDto) {
    return this.userService.addRole(data);
  }

  @Roles('ADMIN', 'TEACHER', 'STUDENT')
  @UseGuards(RolesGuard)
  @Get('/get/students')
    getStudents() {
    return this.userService.findAllStudents();
  }

  @Roles('ADMIN', 'TEACHER', 'STUDENT')
  @UseGuards(RolesGuard)
  @Get('/get/students/:groupId')
  getStudentsByGroup(@Param('groupId') groupId: number) {
    return this.userService.findAllStudentsByGroup(Number(groupId));
  }

  @Roles('ADMIN', 'TEACHER', 'STUDENT')
  @UseGuards(RolesGuard)
  @Get('/get/teachers')
  getTeachers() {
    return this.userService.findAllTeachers();
  }
}
