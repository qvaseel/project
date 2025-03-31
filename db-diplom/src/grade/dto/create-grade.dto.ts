import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateGradeDto {
    @IsNotEmpty()
    @IsNumber()
    lessonId: number;

    @IsNotEmpty()
    @IsNumber()
    studentId: number;

    @IsNotEmpty()
    @IsNumber()
    grade: number;

    @IsString()
    comment?: string;
}