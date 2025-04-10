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
import { Flex, Select, Skeleton, Table } from "@radix-ui/themes";
import { useUserProfile } from "@/hooks/useUserProfile";
import { getGradeValue } from "@/utils/getGrade";
import useAuthStore from "@/store/authStore";


export default function TeacherJournalPage() {
  const { profileUser: user, loading } = useUserProfile();
  const { lessons, loadLessonsByFilter } = useLessonStore();
  const { grades, loadAllGradeByGroup } = useGradeStore();

  const { disciplines, fetchDisciplinesOfTeacher } = useDisciplineStore();
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

    if (user?.id) {
      fetchDisciplinesOfTeacher(user?.id);
    }

  }, [selectedGroup, fetchStudentsByGroup, fetchGroups, fetchDisciplinesOfTeacher, user]);


  useEffect(() => {
    if (selectedGroup && selectedDiscipline && user?.id) {
      
      loadAllGradeByGroup(selectedGroup, selectedDiscipline);
      loadLessonsByFilter(selectedGroup, selectedDiscipline);
    }
  }, [selectedGroup, selectedDiscipline, semester, user?.id, fetchDisciplinesOfTeacher]);

  const sortedLessons = [...lessons].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Журнал преподавателя</h1>

      {/* === Фильтры === */}
      <Flex display='flex' direction='row' gap='2'>
        <GroupSelector setSelectedGroup={setSelectedGroup} />

        <DisciplineSelector loading={loading} disciplines={disciplines} setSelectedDiscipline={setSelectedDiscipline} />


        <div>
          <label>Семестр</label>
          <Select.Root
            value={String(semester)}
            onValueChange={(val: string) => setSemester(Number(val))}
          >
            <Select.Content>
              {[1, 2].map((s) => (
                <Select.Item key={s} value={String(s)}>
                  {s}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </div>
      </Flex>

      {/* === Таблица журнала === */}
      {students.length > 0 && sortedLessons.length > 0 ? (
        <div className="overflow-auto">
          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Студент</Table.ColumnHeaderCell>
                {sortedLessons.map((lesson) => (
                  <Table.ColumnHeaderCell key={lesson.id}>
                    <Link
                        href={{
                          pathname: `/gradebook/${lesson.id}`,
                          query: {
                            groupId: selectedGroup,
                            disciplineId: selectedDiscipline,
                          },
                        }}
                      className="text-blue-600 hover:underline"
                    >
                      {dayjs(lesson.date).format("DD.MM")}
                    </Link>
                  </Table.ColumnHeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {students.map((student) => (
                <Table.Row key={student.id}>
                  <Table.RowHeaderCell>
                    {`${student.lastName} ${student.firstName} ${student.patronymic}`}
                  </Table.RowHeaderCell>
                  {sortedLessons.map((lesson) => {
                    const grade = grades.find((g) => g.lesson.id === lesson.id && g.student.id === student.id);
                    return (
                      <Table.Cell key={lesson.id}>
                        {getGradeValue(grade)}
                      </Table.Cell>
                    );
                  })}
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </div>
      ) : (
        <p className="text-gray-500">
          Выберите фильтры для отображения журнала.
        </p>
      )}
    </div>
  );
}
