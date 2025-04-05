import React from 'react';
import { useGroupStore } from '@/store/groupStore';

interface GroupSelectorProps {
  setSelectedGroup: (id: number | null) => void;
}

const GroupSelector: React.FC<GroupSelectorProps> = ({ setSelectedGroup }) => {
  const { groups } = useGroupStore();

  return (
    <div className="mb-4">
      <select
        className="border p-2 rounded"
        onChange={(e) => setSelectedGroup(Number(e.target.value))}
        defaultValue=""
      >
        <option value="" disabled>Выберите группу</option>
        {groups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GroupSelector;
