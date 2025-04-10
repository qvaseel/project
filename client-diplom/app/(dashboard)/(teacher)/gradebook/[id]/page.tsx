'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLessonStore } from '@/store/lessonStore';
import { useGradeStore } from '@/store/gradeStore'
import { useUserStore } from '@/store/userStore';
import { Button, Flex, Heading, Select, Switch, Table, TextField } from '@radix-ui/themes';

export default function EditLessonPage() {
  const { id } = useParams();
  const router = useRouter();
  const lessonId = Number(id);
  const searchParams = useSearchParams();
  const groupId = searchParams.get("groupId");
  const disciplineId = searchParams.get("disciplineId");

  const { lesson, getLessonById } = useLessonStore();
  const { users, fetchStudentsByGroup } = useUserStore();
  const { grades, loadAllGradeByGroup, createGrade, updateGrade, findGradeByStudentAndLesson } = useGradeStore();

  const [gradesState, setGradesState] = useState<Record<number, number | null>>({});
  const [attendanceState, setAttendanceState] = useState<Record<number, boolean>>({});

  useEffect(() => {
    getLessonById(lessonId);
    fetchStudentsByGroup(Number(groupId));
    loadAllGradeByGroup(Number(groupId), Number(disciplineId));
  }, [lessonId]);

  useEffect(() => {
    const initial: Record<number, number> = {};
    const initialAttendance: Record<number, boolean> = {};
    grades.forEach((g) => {
      if (g.lesson?.id === lessonId) {
        initial[g.student.id] = g.grade ?? 0;
        initialAttendance[g.student.id] = g.attend;
      }
    });
    console.log(grades)
    setGradesState(initial);
    setAttendanceState(initialAttendance);
    
  }, [grades, lessonId]);

  const handleSave = async () => {
    for (const student of users) {
      const gradeValue = gradesState[student.id] ?? null;
      const attend = attendanceState[student.id] ?? false;
  
      const existingGrade = findGradeByStudentAndLesson(student.id, lessonId);
  
      try {
        if (existingGrade) {
          console.log('Updating grade', existingGrade.id);
          await updateGrade(existingGrade.id, {
            grade: gradeValue ?? 0,
            attend,
          });
        } else {
          console.log('Creating grade for student:', student.id);
          await createGrade({
            studentId: student.id,
            lessonId,
            grade: gradeValue ?? 0,
            attend,
          });
        }
      } catch (err) {
        console.error(`Ошибка при сохранении оценки студента ${student.id}:`, err);
      }
    }
  
    await loadAllGradeByGroup(Number(groupId), Number(disciplineId));
    alert('Оценки сохранены!');
  };
  

  return (
    <Flex display='flex' direction='column' gap='4'>
      <Button onClick={() => {router.back()}}>
        Вернуться назад
      </Button>

      <Heading as='h4'>
        Оценки за {lesson?.date ? new Date(lesson.date).toLocaleDateString('ru-RU') : ''}
      </Heading>

      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>ФИО</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Оценка</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Посещаемость</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((s) => (
            <Table.Row key={s.id}>
              <Table.RowHeaderCell>{`${s.lastName} ${s.firstName[0]}.${s.patronymic[0]}.`}</Table.RowHeaderCell>
              <Table.Cell>
                <TextField.Root
                  type="number"
                  min={2}
                  max={5}
                  value={gradesState[s.id] || ''}
                  onChange={(e) =>
                    setGradesState((prev) => ({
                      ...prev,
                      [s.id]: Number(e.target.value),
                    }))
                  }
                />
              </Table.Cell>
              <Table.Cell>
                <Switch
                  checked={attendanceState[s.id] ?? false}
                  onCheckedChange={(checked) =>
                    setAttendanceState((prev) => ({
                      ...prev,
                      [s.id]: checked,
                    }))
                  }
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Button className="mt-4" onClick={handleSave}>
        Сохранить
      </Button>
    </Flex>
  );
}
