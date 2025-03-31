import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()    
    lastName: string;

    @IsNotEmpty()
    @IsString() 
    firstName: string;

    @IsNotEmpty()
    @IsString() 
    patronymic: string;
}