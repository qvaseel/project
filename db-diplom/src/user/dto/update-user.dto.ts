import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  lastName: string;

  @IsString()
  firstName: string;

  @IsString()
  patronymic: string;

  @IsNumber()
  groupId: number;

  @IsString()
  dateOfBirth: string;
}
