import React, { useEffect, useState } from "react";
import { useScheduleStore } from "@/store/scheduleStore";
import { useDisciplineStore } from "@/store/disciplineStore";
import { useUserStore } from "@/store/userStore";
import { Schedule, Discipline, User } from "@/interface/index";

interface EditableScheduleTableProps {
  selectedGroup: number | null;
}

const dayNames = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

const EditableScheduleTable: React.FC<EditableScheduleTableProps> = ({ selectedGroup }) => {
  const { schedule, createSchedule, deleteSchedule, updateSchedule, fetchScheduleForGroup } = useScheduleStore();
  const { disciplines, fetchDisciplines } = useDisciplineStore();
  const { users, fetchTeachers } = useUserStore();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Schedule>>({});
  const [newSchedules, setNewSchedules] = useState<Record<number, Partial<Schedule>>>({
    1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {},
  });

  useEffect(() => {
    fetchDisciplines();
    fetchTeachers();
    if (selectedGroup) {
      fetchScheduleForGroup(selectedGroup);
    }
  }, [selectedGroup]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: name === "orderNumber" ? +value : value });
  };

  const handleEditSave = async () => {
    if (editingId) {
      await updateSchedule(editingId, editData);
      if (selectedGroup) await fetchScheduleForGroup(selectedGroup);
      setEditingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteSchedule(id);
    if (selectedGroup) await fetchScheduleForGroup(selectedGroup);
  };

  const handleNewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, day: number) => {
    const { name, value } = e.target;
    setNewSchedules((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [name]: name === "orderNumber" ? +value : value,
      },
    }));
  };

  const handleAddNewSchedule = async (day: number) => {
    const scheduleData = newSchedules[day];
    if (!scheduleData?.disciplineId || !scheduleData?.room || !scheduleData?.teacherId || !scheduleData?.orderNumber) {
      return alert("Пожалуйста, заполните все поля!");
    }

    await createSchedule({
      ...scheduleData,
      dayOfWeek: day,
      groupId: selectedGroup,
    });

    if (selectedGroup) await fetchScheduleForGroup(selectedGroup);

    setNewSchedules((prev) => ({ ...prev, [day]: {} }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {dayNames.map((day, index) => {
        const daySchedules = schedule
          .filter((item) => item.dayOfWeek === index + 1)
          .sort((a, b) => a.orderNumber - b.orderNumber);

        return (
          <div key={index} className="border rounded p-3 bg-white">
            <h2 className="text-lg font-semibold mb-2">{day}</h2>
            <table className="w-full border-collapse mb-2">
              <thead>
                <tr>
                  <th className="border p-2">№</th>
                  <th className="border p-2">Дисциплина</th>
                  <th className="border p-2">Преподаватель</th>
                  <th className="border p-2">Аудитория</th>
                  <th className="border p-2">Действия</th>
                </tr>
              </thead>
              <tbody>
                {daySchedules.map((item) => (
                  <tr key={item.id}>
                    <td className="border p-2">
                      {editingId === item.id ? (
                        <input
                          name="orderNumber"
                          type="number"
                          value={editData.orderNumber ?? item.orderNumber}
                          onChange={handleEditChange}
                          className="border p-1 w-full"
                        />
                      ) : (
                        item.orderNumber
                      )}
                    </td>
                    <td className="border p-2">
                      {editingId === item.id ? (
                        <select
                          name="disciplineId"
                          value={editData.disciplineId ?? item.discipline.id}
                          onChange={handleEditChange}
                          className="border p-1 w-full"
                        >
                          <option value="">Выберите</option>
                          {disciplines.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        item.discipline.name
                      )}
                    </td>
                    <td className="border p-2">
                      {editingId === item.id ? (
                        <select
                          name="teacherId"
                          value={editData.teacherId ?? item.teacher?.id}
                          onChange={handleEditChange}
                          className="border p-1 w-full"
                        >
                          <option value="">Выберите</option>
                          {users.map((u) => (
                            <option key={u.id} value={u.id}>
                              {u.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        item.teacher?.name || "-"
                      )}
                    </td>
                    <td className="border p-2">
                      {editingId === item.id ? (
                        <input
                          name="room"
                          value={editData.room ?? item.room}
                          onChange={handleEditChange}
                          className="border p-1 w-full"
                        />
                      ) : (
                        item.room
                      )}
                    </td>
                    <td className="border p-2 flex gap-2">
                      {editingId === item.id ? (
                        <>
                          <button
                            onClick={handleEditSave}
                            className="bg-green-500 text-white px-2 py-1 rounded"
                          >
                            Сохранить
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="bg-gray-500 text-white px-2 py-1 rounded"
                          >
                            Отмена
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditingId(item.id);
                              setEditData({
                                disciplineId: item.discipline.id,
                                teacherId: item.teacher?.id,
                                room: item.room,
                                orderNumber: item.orderNumber,
                              });
                            }}
                            className="bg-blue-500 text-white px-2 py-1 rounded"
                          >
                            Редактировать
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                          >
                            Удалить
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="border p-2">
                    <input
                      name="orderNumber"
                      type="number"
                      value={newSchedules[index + 1]?.orderNumber || ""}
                      onChange={(e) => handleNewChange(e, index + 1)}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <select
                      name="disciplineId"
                      value={newSchedules[index + 1]?.disciplineId || ""}
                      onChange={(e) => handleNewChange(e, index + 1)}
                      className="border p-1 w-full"
                    >
                      <option value="">Выберите</option>
                      {disciplines.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border p-2">
                    <select
                      name="teacherId"
                      value={newSchedules[index + 1]?.teacherId || ""}
                      onChange={(e) => handleNewChange(e, index + 1)}
                      className="border p-1 w-full"
                    >
                      <option value="">Выберите</option>
                      {users.map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border p-2">
                    <input
                      name="room"
                      value={newSchedules[index + 1]?.room || ""}
                      onChange={(e) => handleNewChange(e, index + 1)}
                      className="border p-1 w-full"
                      placeholder="Ауд."
                    />
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleAddNewSchedule(index + 1)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Добавить
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default EditableScheduleTable;
