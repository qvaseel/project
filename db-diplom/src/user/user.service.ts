import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { ExistUserBodyDto } from 'src/auth/dto/exist-user-body.dto';
import { GetUserDto } from './dto/get-user.dto';
import { RoleService } from 'src/role/role.service';
import { AddRoleDto } from './dto/add-role.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: PrismaService,
    private roleService: RoleService,
  ) {}

  public async create(data: CreateUserDto) {
    // const role = await this.roleService.getRoleByValue("STUDENT");
    const user = await this.userRepository.user.create({ data });
    return user;
  }

  public async findByEmail(email: string) {
    return await this.userRepository.user.findFirst({
      where: { email },
      include: {
        role: true,
        grades: true,
        group: true,
        disciplines: true,
        shedule: true,
      },
    });
  }

  public async findById(id: number) {
    return await this.userRepository.user.findFirst({
      where: { id },
      include: {
        role: true,
        grades: true,
        group: true,
        disciplines: true,
        shedule: true,
      },
    });
  }

  public async existUserByEmail(
    data: ExistUserBodyDto,
  ): Promise<GetUserDto | null> {
    return this.userRepository.user.findUnique({
      where: { email: data.email },
    });
  }

  public async findAll() {
    return this.userRepository.user.findMany({
      include: {
        role: true,
        grades: true,
        group: true,
        disciplines: true,
        shedule: true,
      },
    });
  }

  public async findAllStudents() {
    return this.userRepository.user.findMany({ where: { role: { value: 'STUDENT' } } });
  }

  public async findAllStudentsByGroup(groupId: number) {
    return this.userRepository.user.findMany({ where: { group: {id: groupId }} })
  }

  public async findAllTeachers() {
    return this.userRepository.user.findMany({ where: { role: { value: 'TEACHER' } } });
  }

  public async addRole(data: AddRoleDto) {
    const user = await this.userRepository.user.findUnique({
      where: { id: data.userId },
    });
    const role = await this.roleService.getRoleByValue(data.value);

    if (!user || !role) {
      throw new HttpException(
        'Пользователь или роль не найдены',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.userRepository.user.update({
      where: { id: user.id },
      data: { roleId: role.id },
    });
  }
}
