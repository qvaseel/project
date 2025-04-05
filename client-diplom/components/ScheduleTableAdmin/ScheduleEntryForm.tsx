import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDisciplineStore } from '@/store/disciplineStore';
import { useUserStore } from '@/store/userStore';
import { useScheduleStore } from '@/store/scheduleStore';
import { CreateScheduleDto } from '@/interface';

interface Props {
  dayOfWeek: number;
  selectedGroup: number | null;
}

const ScheduleEntryForm: React.FC<Props> = ({ dayOfWeek, selectedGroup }) => {
  const { disciplines, fetchDisciplines } = useDisciplineStore();
  const { users, fetchTeachers } = useUserStore();
  const { createSchedule, fetchScheduleForGroup } = useScheduleStore();

  const { handleSubmit, register, control, reset } = useForm<Partial<CreateScheduleDto>>();

  useEffect(() => {
    fetchDisciplines();
    fetchTeachers();
  }, []);

  const onSubmit = async (data: Partial<CreateScheduleDto>) => {
    if (!selectedGroup) return;

    await createSchedule({
      ...data,
      groupId: selectedGroup,
      dayOfWeek,
    });

    await fetchScheduleForGroup(selectedGroup);
    console.log(data)
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
<Controller
  name="disciplineId"
  control={control}
  render={({ field }) => (
    <select
      {...field}
      onChange={(e) => field.onChange(Number(e.target.value))}
      className="border p-1 mb-1 w-full"
      value={field.value ?? ''}
    >
      <option value="">Выберите дисциплину</option>
      {disciplines.map((d) => (
        <option key={d.id} value={d.id}>{d.name}</option>
      ))}
    </select>
  )}
/>

<Controller
  name="teacherId"
  control={control}
  render={({ field }) => (
    <select
      {...field}
      onChange={(e) => field.onChange(Number(e.target.value))}
      className="border p-1 mb-1 w-full"
      value={field.value ?? ''}
    >
      <option value="">Выберите преподавателя</option>
      {users.map((t) => (
        <option key={t.id} value={t.id}>
          {`${t.lastName} ${t.firstName[0]}. ${t.patronymic[0]}.`}
        </option>
      ))}
    </select>
  )}
/>

      <input
        {...register("room")}
        placeholder="Аудитория"
        className="border p-1 mb-1 w-full"
      />

      <input
        {...register("orderNumber", { valueAsNumber: true })}
        type="number"
        placeholder="Порядковый номер пары"
        className="border p-1 mb-1 w-full"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white w-full py-1 rounded text-sm"
      >
        Добавить
      </button>
    </form>
  );
};

export default ScheduleEntryForm;
