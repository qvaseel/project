import { IsString, IsInt, Min } from 'class-validator';

export class CreatePortfolioDto {
  @IsString()
  title: string;

  @IsString()
  description?: string;

  @IsString()
  type: string;

  @IsInt()
  @Min(0)
  points: number;
}
