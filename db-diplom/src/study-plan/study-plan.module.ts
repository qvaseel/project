import { Module } from '@nestjs/common';
import { StudyPlanController } from './study-plan.controller';
import { StudyPlanService } from './study-plan.service';
import { PrismaModule } from 'src/prisma.module';

@Module({
  controllers: [StudyPlanController],
  providers: [StudyPlanService],
  imports: [PrismaModule]
})
export class StudyPlanModule {}
