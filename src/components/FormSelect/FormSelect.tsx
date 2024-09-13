import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

interface DropdownSelectProps {
  options: { value: string; label: string }[];
  placeholder?: string;
  onSelect: (selectedValue: string) => void;
}

const FormSelect = ({
  options,
  placeholder = "Select an option",
  onSelect,
}:DropdownSelectProps) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onSelect(value);
  };

  return (
    <div className="relative w-full">
      <select
        value={selectedValue}
        onChange={handleChange}
        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <BiChevronDown/>
      </div>
    </div>
  );
};

export default FormSelect;
