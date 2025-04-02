import React from "react";
import { Schedule } from "@/interface/index"; // Импортируй тип Schedule
import { useScheduleStore } from "@/store/scheduleStore";
import { Table } from "@radix-ui/themes";

const TeacherScheduleTable: React.FC = () => {
  const schedule = useScheduleStore((state) => state.schedule);
  const currentDayOfWeek = new Date().getDay();

  const adjustedDayOfWeek = currentDayOfWeek === 0 ? 7 : currentDayOfWeek; // 1 = Понедельник, 7 = Воскресенье

  const daysOfWeek = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];

  return (
    <div className="flex justify-between flex-wrap w-full gap-y-8">
      {daysOfWeek.map((day, index) => {
        const dayNumber = index + 1;

        const daySchedule = schedule.filter(
          (item) => item.dayOfWeek === dayNumber
        );

        return (
          <div key={day}  className={`bg-white shadow-md border  ${currentDayOfWeek == Number(dayNumber) ? 'border-2 border-cyan-600' : 'border-slate-400'} rounded-lg p-4`}>
            <h2 className="text-xl font-bold mb-2">{day}</h2>
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>Пара</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Дисциплина</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Ауд.</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Группа</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
              {daySchedule.map((item, index) => (
                  <Table.Row key={index}>
                    <Table.RowHeaderCell>{++index}</Table.RowHeaderCell>
                    <Table.Cell>{item.discipline.name}</Table.Cell>
                    <Table.Cell>{item.room}</Table.Cell>
                    <Table.Cell>{item.group.name}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </div>
        );
      })}
    </div>
  );
};

export default TeacherScheduleTable;
