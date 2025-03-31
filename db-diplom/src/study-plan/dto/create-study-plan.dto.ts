import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateStudyPlanDto {
    @IsNotEmpty()
    @IsNumber()
    specialityId: number;

    @IsNotEmpty()
    @IsNumber()
    disciplineId: number;

    @IsNotEmpty()
    @IsNumber()
    semester: number;
}