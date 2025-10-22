import React from "react";

interface CustomCheckboxProps {
  checked?: boolean;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  name?: string;
  id?: string;
  size?: "xs" | "sm" | "md" | "lg";
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked = false,
  className = "",
  onChange,
  label = "",
  name,
  id,
  size = "md",
}) => {
  const checkboxSizeClass =
    size === "xs"
      ? "w-3 h-3"
      : size === "sm"
      ? "w-4 h-4"
      : size === "md"
      ? "w-5 h-5"
      : "w-6 h-6";

  const inputId = id || name || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex items-center gap-x-2 cursor-pointer group">
      <input
        type="checkbox"
        id={inputId}
        name={name}
        checked={checked}
        onChange={onChange}
        className={`appearance-none border border-gray-300 rounded 
          checked:bg-primary-blue checked:border-transparent 
          focus:ring-2 focus:ring-primary-blue focus:ring-offset-0 
          transition-all duration-150 cursor-pointer 
          ${checkboxSizeClass} ${className}`}
      />
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm text-gray-700 select-none cursor-pointer"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default CustomCheckbox;
