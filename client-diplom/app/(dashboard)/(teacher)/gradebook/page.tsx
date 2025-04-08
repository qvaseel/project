"use client";

import { useEffect, useState } from "react";
import GroupSelector from "@/components/GroupSelector";
import { useUserStore } from "@/store/userStore";
import { useLessonStore } from "@/store/lessonStore";
import { useGradeStore } from "@/store/gradeStore";
import { useScheduleStore } from "@/store/scheduleStore";
import dayjs from "dayjs";
import Link from "next/link";
import { useDisciplineStore } from "@/store/disciplineStore";
import { useGroupStore } from "@/store/groupStore";
import DisciplineSelector from "@/components/DisciplineSelector";
import { Select } from "@radix-ui/themes";
import useAuthStore from "@/store/authStore";
import { useUserProfile } from "@/hooks/useUserProfile";

export default function TeacherJournalPage() {
  const { profileUser: user, loading } = useUserProfile();
  const { lessons, loadLessonsByFilter } = useLessonStore();
  const { grades, loadAllGradeByGroup } = useGradeStore();

  const { disciplines, fetchDisciplines } = useDisciplineStore();
  const { users: students, fetchStudentsByGroup } = useUserStore();

  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [selectedDiscipline, setSelectedDiscipline] = useState<number | null>(
    null
  );

  const { fetchGroups } = useGroupStore();

  const [semester, setSemester] = useState<number>(1);

  useEffect(() => {
    fetchGroups();
    if (selectedGroup) fetchStudentsByGroup(selectedGroup);

    fetchDisciplines();
  }, [selectedGroup, fetchStudentsByGroup, fetchGroups]);

  // Загружаем уроки при смене фильтров
  useEffect(() => {
    if (selectedGroup && selectedDiscipline && user?.id) {
      loadAllGradeByGroup(selectedGroup, selectedDiscipline)
      console.log(selectedGroup, selectedDiscipline)
      loadLessonsByFilter(selectedGroup, selectedDiscipline);
      console.log(grades)
    }
  }, [selectedGroup, selectedDiscipline, semester, user?.id]);

  const sortedLessons = [...lessons].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Журнал преподавателя</h1>

      {/* === Фильтры === */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <GroupSelector setSelectedGroup={setSelectedGroup} />

        <DisciplineSelector setSelectedDiscipline={setSelectedDiscipline} />

        <div>
          <label>Семестр</label>
          <Select.Root
            value={String(semester)}
            onValueChange={(val: string) => setSemester(Number(val))}
          >
            <Select.Content>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <Select.Item key={s} value={String(s)}>
                  {s}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </div>
      </div>

      {/* === Таблица журнала === */}
      {students.length > 0 && sortedLessons.length > 0 ? (
        <div className="overflow-auto">
          <table className="min-w-full border border-gray-300 mt-6 text-sm text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1 text-left">Студент</th>
                {sortedLessons.map((lesson) => (
                  <th key={lesson.id} className="border px-2 py-1">
                    <Link
                      href={`/gradebook/${lesson.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {dayjs(lesson.date).format("DD.MM")}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="border px-2 py-1 text-left">
                    {`${student.lastName} ${student.firstName} ${student.patronymic}`}
                  </td>
                  {sortedLessons.map((lesson) => {
                    const grade = grades.find(
                      (g) => g.lesson.id === lesson.id && g.student.id === student.id
                    );
                    return (
                      <td key={lesson.id} className="border px-2 py-1">
                        {grade?.grade ?? (
                          <span className="text-gray-400">–</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">
          Выберите фильтры для отображения журнала.
        </p>
      )}
    </div>
  );
}
