import React from "react";
import { useGroupStore } from "@/store/groupStore";
import { Select } from "@radix-ui/themes";
import { useDisciplineStore } from "@/store/disciplineStore";

interface GroupSelectorProps {
  setSelectedDiscipline: (id: number | null) => void;
}

const DisciplineSelector: React.FC<GroupSelectorProps> = ({ setSelectedDiscipline }) => {
  const { disciplines } =  useDisciplineStore();
  const [value, setValue] = React.useState<string>("");


  const handleChange = (val: string) => {
    setValue(val);
    setSelectedDiscipline(val ? Number(val) : null);
  };

  return (
    <div className="mb-4">
      <Select.Root value={value} onValueChange={handleChange}>
        <Select.Trigger placeholder="Выберите дисциплину" />
        <Select.Content position="popper">
          {disciplines.map((group) => (
            <Select.Item key={group.id} value={String(group.id)}>
              {group.name}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </div>
  );
};

export default DisciplineSelector;
