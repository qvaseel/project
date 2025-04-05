import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useScheduleStore } from "@/store/scheduleStore";
import { useDisciplineStore } from "@/store/disciplineStore";
import { useUserStore } from "@/store/userStore";
import { Schedule, CreateScheduleDto } from "@/interface";

interface Props {
  entry: Schedule;
  selectedGroup: number | null;
}

const ScheduleEntryRow: React.FC<Props> = ({ entry, selectedGroup }) => {
  const { updateSchedule, deleteSchedule, fetchScheduleForGroup } =
    useScheduleStore();
  const { disciplines, fetchDisciplines } = useDisciplineStore();
  const { users, fetchTeachers } = useUserStore();
  const [editing, setEditing] = useState(false);

  const { register, control, handleSubmit, reset } =
    useForm<Partial<CreateScheduleDto>>();

  useEffect(() => {
    fetchDisciplines();
    fetchTeachers();
  }, []);

  const handleDelete = async () => {
    await deleteSchedule(entry.id);
    if (selectedGroup) await fetchScheduleForGroup(selectedGroup);
  };

  const handleEdit = () => {
    reset({
      disciplineId: entry.discipline.id,
      room: entry.room,
      teacherId: entry.teacher?.id,
      orderNumber: entry.orderNumber,
    });
    setEditing(true);
  };

  const onSubmit = async (data: Partial<CreateScheduleDto>) => {
    if (!selectedGroup) return;

    await updateSchedule(entry.id, {
      ...data,
      groupId: selectedGroup,
      dayOfWeek: entry.dayOfWeek,
    });
    if (selectedGroup) await fetchScheduleForGroup(selectedGroup);
    setEditing(false);
  };

  if (editing) {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-2 p-2 border rounded bg-yellow-50"
      >
        <input
          {...register("orderNumber", { valueAsNumber: true })}
          type="number"
          placeholder="Порядковый номер"
          className="border p-1 mb-1 w-full"
        />

        <Controller
          name="disciplineId"
          control={control}
          render={({ field }) => (
            <select {...field} className="border p-1 mb-1 w-full">
              <option value="">Выберите дисциплину</option>
              {disciplines.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          )}
        />

        <Controller
          name="teacherId"
          control={control}
          render={({ field }) => (
            <select {...field} className="border p-1 mb-1 w-full">
              <option value="">Выберите преподавателя</option>
              {users.map((t) => (
                <option
                  key={t.id}
                  value={t.id}
                >{`${t.lastName} ${t.firstName[0]}. ${t.patronymic[0]}.`}</option>
              ))}
            </select>
          )}
        />

        <input
          {...register("room")}
          placeholder="Аудитория"
          className="border p-1 mb-1 w-full"
        />

        <div className="flex justify-between gap-2">
          <button
            type="submit"
            className="bg-green-500 text-white px-2 py-1 rounded text-sm"
          >
            Сохранить
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="bg-gray-400 text-white px-2 py-1 rounded text-sm"
          >
            Отмена
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="mb-2 p-2 border rounded bg-white flex justify-between items-center">
      <div>
        <div>
          <strong>#{entry.orderNumber}</strong> — {entry.discipline.name}
        </div>
        <div className="text-sm text-gray-600">
          Преподаватель:{" "}
          {`${entry.teacher.lastName} ${entry.teacher.firstName[0]}. ${entry.teacher.patronymic[0]}.` ||
            "—"}
          , Аудитория: {entry.room}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleEdit}
          className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
        >
          Редактировать
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-2 py-1 rounded text-sm"
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default ScheduleEntryRow;
