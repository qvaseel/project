import React from 'react';
import { Schedule } from '@/interface';
import ScheduleEntryRow from './ScheduleEntryRow'
import ScheduleEntryForm from './ScheduleEntryForm';

interface Props {
  dayOfWeek: number;
  dayName: string;
  schedule: Schedule[];
  selectedGroup: number | null;
}

const ScheduleDayColumn: React.FC<Props> = ({ dayOfWeek, dayName, schedule, selectedGroup }) => {
  return (
    <div className="border rounded p-2">
      <h3 className="text-lg font-semibold mb-2">{dayName}</h3>
      {schedule
        .sort((a, b) => (a.orderNumber || 0) - (b.orderNumber || 0))
        .map(item => (
          <ScheduleEntryRow key={item.id} entry={item} selectedGroup={selectedGroup} />
        ))}
      <ScheduleEntryForm dayOfWeek={dayOfWeek} selectedGroup={selectedGroup} />
    </div>
  );
};

export default ScheduleDayColumn;
