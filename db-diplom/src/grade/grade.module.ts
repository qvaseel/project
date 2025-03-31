import { Module } from '@nestjs/common';
import { GradeController } from './grade.controller';
import { GradeService } from './grade.service';
import { PrismaModule } from 'src/prisma.module';

@Module({
  controllers: [GradeController],
  providers: [GradeService],
  imports: [PrismaModule]
})
export class GradeModule {}
