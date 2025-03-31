import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { GroupModule } from './group/group.module';
import { SpecialityModule } from './speciality/speciality.module';
import { DisciplineModule } from './discipline/discipline.module';
import { StudyPlanModule } from './study-plan/study-plan.module';
import { ScheduleModule } from './schedule/schedule.module';
import { LessonModule } from './lesson/lesson.module';
import { GradeModule } from './grade/grade.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, RoleModule, GroupModule, SpecialityModule, DisciplineModule, StudyPlanModule, ScheduleModule, LessonModule, GradeModule, AuthModule],
})
export class AppModule {}
