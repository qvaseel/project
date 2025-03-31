"use client"

import { useState } from "react";

const Schedule = () => {
  const [schedule, setSchedule] = useState([
    { day: "Понедельник", time: "08:30 - 10:00", subject: "Математика", room: "Ауд. 101" },
    { day: "Понедельник", time: "10:10 - 11:40", subject: "Программирование", room: "Ауд. 202" },
    { day: "Вторник", time: "08:30 - 10:00", subject: "Английский язык", room: "Ауд. 303" },
    { day: "Среда", time: "12:00 - 13:30", subject: "Физика", room: "Ауд. 404" },
    { day: "Четверг", time: "08:30 - 10:00", subject: "Алгоритмы и структуры данных", room: "Ауд. 105" },
    { day: "Пятница", time: "10:10 - 11:40", subject: "Экономика", room: "Ауд. 207" },
  ]);

  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h1 className="text-2xl font-bold text-sky-500 mb-4">Расписание</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-sky-500 text-white">
            <tr>
              <th className="py-2 px-4">День</th>
              <th className="py-2 px-4">Время</th>
              <th className="py-2 px-4">Дисциплина</th>
              <th className="py-2 px-4">Аудитория</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">{item.day}</td>
                <td className="py-2 px-4">{item.time}</td>
                <td className="py-2 px-4">{item.subject}</td>
                <td className="py-2 px-4">{item.room}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;
