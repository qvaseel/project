"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useLessonStore } from "@/store/lessonStore";
import { useGradeStore } from "@/store/gradeStore";
import { useUserStore } from "@/store/userStore";
import {
  Button,
  Flex,
  Heading,
  Select,
  Switch,
  Table,
  TextField,
} from "@radix-ui/themes";

export default function EditLessonPage() {
  const { id } = useParams();
  const router = useRouter();
  const lessonId = Number(id);
  const searchParams = useSearchParams();
  const groupId = searchParams.get("groupId");
  const disciplineId = searchParams.get("disciplineId");

  const { lesson, getLessonById, updateLesson, deleteLesson } = useLessonStore();
  const { users, fetchStudentsByGroup } = useUserStore();
  const {
    grades,
    loadAllGradeByGroup,
    createGrade,
    updateGrade,
    findGradeByStudentAndLesson,
  } = useGradeStore();

  const [gradesState, setGradesState] = useState<Record<number, number | null>>(
    {}
  );
  const [attendanceState, setAttendanceState] = useState<
    Record<number, boolean>
  >({});
  const [typeOfLessonState, setTypeOfLessonState] = useState("");

  // Загружаем урок
  useEffect(() => {
    getLessonById(lessonId);
    fetchStudentsByGroup(Number(groupId));
    loadAllGradeByGroup(Number(groupId), Number(disciplineId));
  }, [lessonId]);

  // Устанавливаем тип занятия после загрузки lesson
  useEffect(() => {
    if (lesson?.typeOfLesson) {
      setTypeOfLessonState(lesson.typeOfLesson);
    }
  }, [lesson]);

  useEffect(() => {
    const initial: Record<number, number> = {};
    const initialAttendance: Record<number, boolean> = {};
    grades.forEach((g) => {
      if (g.lesson?.id === lessonId) {
        initial[g.student.id] = g.grade ?? 0;
        initialAttendance[g.student.id] = g.attend;
      }
    });

    setGradesState(initial);
    setAttendanceState(initialAttendance);
  }, [grades, lessonId]);

  const handleSave = async () => {
    if (lesson?.id) {
      await updateLesson(lessonId, {
        typeOfLesson: typeOfLessonState,
      });
    }

    for (const student of users) {
      const gradeValue = gradesState[student.id] ?? null;
      const attend = attendanceState[student.id] ?? false;

      const existingGrade = findGradeByStudentAndLesson(student.id, lessonId);

      try {
        if (existingGrade) {
          await updateGrade(existingGrade.id, {
            grade: gradeValue ?? 0,
            attend,
          });
        } else {
          await createGrade({
            studentId: student.id,
            lessonId,
            grade: gradeValue ?? 0,
            attend,
          });
        }
      } catch (err) {
        console.error(
          `Ошибка при сохранении оценки студента ${student.id}:`,
          err
        );
      }
    }

    await loadAllGradeByGroup(Number(groupId), Number(disciplineId));
    alert("Оценки сохранены!");
  };

  const handleDelete = (id: number) => {
    if (confirm("Вы действительно хотите удалить данное занятие?")) {
      deleteLesson(id);
      router.back();
    }
  };

  return (
    <Flex display="flex" direction="column" gap="4">
      <Flex display='flex' direction='row' gap='4'>
      <Button
        onClick={() => {
          router.back();
        }}
      >
        Вернуться назад
      </Button>

      <Button
      color="red"
        onClick={() => handleDelete(lessonId)}
      >
        Удалить занятие
      </Button>
      </Flex>

      <Heading as="h4">
        Оценки за{" "}
        {lesson?.date ? new Date(lesson.date).toLocaleDateString("ru-RU") : ""}
      </Heading>

      {/* блок выбора типа занятия */}
      <div className="max-w-xs">
        <Select.Root
          value={typeOfLessonState}
          onValueChange={(val) => setTypeOfLessonState(val)}
        >
          <Select.Trigger>
            {typeOfLessonState || "Выбрать тип..."}
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="Устный ответ">Устный ответ</Select.Item>
            <Select.Item value="Контрольная работа">
              Контрольная работа
            </Select.Item>
            <Select.Item value="Итоговая работа">Итоговая работа</Select.Item>
            <Select.Item value="Самостоятельная работа">
              Самостоятельная работа
            </Select.Item>
            <Select.Item value="Практическая работа">
              Практическая работа
            </Select.Item>
          </Select.Content>
        </Select.Root>
      </div>

      <Table.Root variant="surface">
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
                  value={gradesState[s.id] || ""}
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
