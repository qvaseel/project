import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useScheduleStore } from "@/store/scheduleStore";
import { useDisciplineStore } from "@/store/disciplineStore";
import { CreateScheduleDto } from "@/interface/index";
import { useUserStore } from "@/store/userStore";

interface ScheduleFormProps {
  selectedGroup: number | null;
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({ selectedGroup }) => {
  const { createSchedule, fetchScheduleForGroup } = useScheduleStore();
  const { disciplines, fetchDisciplines } = useDisciplineStore();
  const { users: teachers, fetchTeachers } = useUserStore();

  const { register, handleSubmit, control, reset } = useForm<Partial<CreateScheduleDto>>();

  useEffect(() => {
    fetchDisciplines();
    fetchTeachers();
  }, [fetchDisciplines, fetchTeachers]);
  
  const onSubmit = async (data: Partial<CreateScheduleDto>) => {
    if (!selectedGroup) return alert("Сначала выберите группу!");

    const scheduleData = {
      ...data,
      groupId: selectedGroup,
      disciplineId: Number(data.disciplineId) || null,
      teacherId: Number(data.teacherId)
    };

    console.log(scheduleData)

    await createSchedule(scheduleData);
    await fetchScheduleForGroup(selectedGroup);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-6 p-4 border rounded bg-gray-100">
      <div className="mb-2">
        <label>Дисциплина:</label>
        <Controller
          name="disciplineId"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="border p-2 w-full"
              defaultValue=""
            >
              <option value="" disabled>Выберите дисциплину</option>
              {disciplines.map((discipline) => (
                <option key={discipline.id} value={discipline.id}>
                  {discipline.name}
                </option>
              ))}
            </select>
          )}
        />
      </div>

      {/* Учитель */}
      <div className="mb-2">
        <label>Учитель:</label>
        <Controller
          name="teacherId"
          control={control}
          render={({ field }) => (
            <select {...field} className="border p-2 w-full" defaultValue="">
              <option value="" disabled>Выберите учителя</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.lastName}
                </option>
              ))}
            </select>
          )}
        />
      </div>

      <input
        {...register("room")}
        placeholder="Аудитория"
        className="border p-2 mb-2 w-full"
      />

      <input
        {...register("dayOfWeek", { valueAsNumber: true })}
        type="number"
        placeholder="День недели (1 - Понедельник, 7 - Воскресенье)"
        className="border p-2 mb-2 w-full"
      />

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Создать
      </button>
    </form>
  );
};

export default ScheduleForm;
