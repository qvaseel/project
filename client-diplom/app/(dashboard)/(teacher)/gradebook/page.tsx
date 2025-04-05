"use client"

import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@radix-ui/react-dialog';
import { Checkbox } from '@radix-ui/react-checkbox';
import { HomeIcon, ScaleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import { Button } from '@radix-ui/themes';

const AttendanceJournal = () => {
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState([
    { id: 1, name: 'Иван Иванов', group: 'ИС-2101', grade: '', attendance: false },
    { id: 2, name: 'Анна Смирнова', group: 'ИС-2101', grade: '', attendance: false },
    { id: 3, name: 'Пётр Петров', group: 'ИС-2101', grade: '', attendance: false },
  ]);

  const handleSave = () => {
    setShowModal(true);
  };

  const confirmSave = () => {
    console.log('Сохранено:', students);
    toast.success('Оценки успешно сохранены!');
    setShowModal(false);
  };

  const updateStudent = (index: any, key: any, value: any) => {
    const updatedStudents = [...students];
    setStudents(updatedStudents);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Журнал успеваемости</h1>

      <div className="flex gap-4 mb-4">
        <select>
          <option>ИС-2101</option>
          <option>ИС-2102</option>
        </select>

        <select>
          <option>Математика</option>
          <option>Программирование</option>
        </select>

        <select>
          <option>2025-04-04</option>
          <option>2025-04-03</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">ФИО</th>
              <th className="border px-4 py-2">Группа</th>
              <th className="border px-4 py-2">Оценка</th>
              <th className="border px-4 py-2">Посещаемость</th>
              <th className="border px-4 py-2">Сохранить</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td className="border px-4 py-2">{student.name}</td>
                <td className="border px-4 py-2">{student.group}</td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={student.grade}
                    onChange={(e) => updateStudent(index, 'grade', e.target.value)}
                    className="border p-1 w-full"
                  />
                </td>
                <td className="border px-4 py-2">
                  <Checkbox
                    checked={student.attendance}
                    onCheckedChange={(value) => updateStudent(index, 'attendance', value)}
                  />
                </td>
                <td className="border px-4 py-2">
                  <Button onClick={handleSave}>
                    <ScaleIcon className="w-5 h-5 mr-1 inline-block" />Сохранить
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogTrigger />
        <DialogContent>
          <DialogTitle>Подтверждение сохранения</DialogTitle>
          <DialogDescription>Вы уверены, что хотите сохранить изменения?</DialogDescription>
          <div className="flex gap-4 mt-4">
            <Button onClick={confirmSave}>Да, сохранить</Button>
            <Button onClick={() => setShowModal(false)}>Отмена</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AttendanceJournal;
