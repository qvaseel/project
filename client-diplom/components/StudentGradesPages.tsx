"use client";

import { useEffect, useState } from "react";
import { useGradeStore } from "@/store/gradeStore";
import { useUserStore } from "@/store/userStore";
import { useDisciplineStore } from "@/store/disciplineStore";
import { Select, Table, Heading, Flex, Text } from "@radix-ui/themes";
import { useUserProfile } from "@/hooks/useUserProfile";

export default function StudentGradesPage() {
  const { profileUser: user, loading } = useUserProfile();
  const { disciplines, fetchDisciplines } = useDisciplineStore();
  const { grades, loadAllGradeByStudent } = useGradeStore();

  const [selectedDisciplineId, setSelectedDisciplineId] = useState<
    number | null
  >(null);

  useEffect(() => {
    fetchDisciplines();
  }, []);

  useEffect(() => {
    if (user?.id && selectedDisciplineId) {
      loadAllGradeByStudent(user.id, selectedDisciplineId);
    }
  }, [user?.id, selectedDisciplineId]);

  const calculateAverageGrade = () => {
    const numericGrades = grades
      .map((g) => g.grade)
      .filter((val) => {
        const num = Number(val);
        return !isNaN(num) && num >= 1 && num <= 5;
      })
      .map(Number);

    if (numericGrades.length === 0) return "-";

    const sum = numericGrades.reduce((acc, val) => acc + val, 0);
    return (sum / numericGrades.length).toFixed(2);
  };

  return (
    <Flex direction="column" gap="4" p='4'>
      <Heading as="h2" size='5'>Мои оценки</Heading>

      <Select.Root
        value={selectedDisciplineId?.toString() || ""}
        onValueChange={(val) => setSelectedDisciplineId(Number(val))}
      >
        <Select.Trigger placeholder="Выберите дисциплину" />
        <Select.Content>
          {disciplines.map((d) => (
            <Select.Item key={d.id} value={d.id.toString()}>
              {d.name}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>

      {grades.length === 0 && selectedDisciplineId && (
        <Text>Нет оценок по выбранной дисциплине.</Text>
      )}

      {grades.length > 0 && (
        <>
          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Дата занятия</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Тип занятия</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Оценка</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Присутствие</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {grades
                .filter((g) => g.lesson && g.lesson.date)
                .sort(
                  (a, b) =>
                    new Date(a.lesson.date).getTime() -
                    new Date(b.lesson.date).getTime()
                )
                .map((g) => (
                  <Table.Row key={g.id}>
                    <Table.Cell>
                      {new Date(g.lesson.date).toLocaleDateString("ru-RU")}
                    </Table.Cell>
                    <Table.Cell>{g.lesson.typeOfLesson || "-"}</Table.Cell>
                    <Table.Cell>{g.grade == 0 ? `-` : `${g.grade}`}</Table.Cell>
                    <Table.Cell>{g.attend ? "✔️" : "❌"}</Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table.Root>

          <Text size="3" mt="2">
            Средняя оценка по дисциплине:{" "}
            <strong>{calculateAverageGrade()}</strong>
          </Text>
        </>
      )}
    </Flex>
  );
}
