'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLessonStore } from '@/store/lessonStore';
import { useGradeStore } from '@/store/gradeStore'
import { useUserStore } from '@/store/userStore';
import { Button, TextField } from '@radix-ui/themes';

export default function EditLessonPage() {
  const { id } = useParams();
  const lessonId = Number(id);

  const { lesson, getLessonById } = useLessonStore();
  const { users, fetchStudentsByGroup } = useUserStore();
  const { grades, loadAllGradeByGroup, createGrade } = useGradeStore();

  const [gradesState, setGradesState] = useState<Record<number, number>>({});

  useEffect(() => {
    getLessonById(lessonId);
    
    if (lesson && lesson.schedule && lesson.schedule.groupId) {
      fetchStudentsByGroup(lesson.schedule.groupId);
      loadAllGradeByGroup(lesson?.schedule.groupId, lesson?.schedule.discipline.id);
    }
  }, [lessonId]);

  useEffect(() => {
    const initial: Record<number, number> = {};
    grades.forEach((g) => {
      if (g.lesson.id === lessonId) {
        initial[g.student.id] = g.grade;
      }
    });
    setGradesState(initial);
  }, [grades, lessonId]);

  const handleSave = async () => {
    for (const [studentId, grade] of Object.entries(gradesState)) {
      await createGrade({
        studentId: Number(studentId),
        lessonId,
        grade: Number(grade),
        attend: true,
      });
    }
    alert('Оценки сохранены!');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Оценки за {lesson?.date ? new Date(lesson.date).toLocaleDateString('ru-RU') : ''}
      </h2>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">ФИО</th>
            <th className="border p-2">Оценка</th>
          </tr>
        </thead>
        <tbody>
          {users.map((s) => (
            <tr key={s.id}>
              <td className="border p-2">{`${s.lastName} ${s.firstName[0]}.${s.patronymic[0]}.`}</td>
              <td className="border p-2">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button className="mt-4" onClick={handleSave}>
        Сохранить
      </Button>
    </div>
  );
}
