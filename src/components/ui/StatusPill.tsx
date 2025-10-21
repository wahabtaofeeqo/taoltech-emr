// components/StatusPill.tsx
import React from "react";
import {
  FaCheck,
  FaExclamationTriangle,
  FaTimes,
  FaInfo,
  FaCircle,
  FaBell,
} from "react-icons/fa";
import { IconType } from "react-icons";

export type StatusVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "primary"
  | "secondary";

export type StatusSize = "sm" | "md" | "lg";

export interface StatusPillProps {
  label: string;
  variant?: StatusVariant;
  size?: StatusSize;
  className?: string;
  showIcon?: boolean;
  icon?: IconType;
  onClick?: () => void;
  disabled?: boolean;
}

// Default icons for each variant
const defaultIcons: Record<
  StatusVariant,
  React.ComponentType<React.SVGProps<SVGSVGElement>> | null
> = {
  success: FaCheck,
  warning: FaExclamationTriangle,
  error: FaTimes,
  info: FaInfo,
  primary: FaBell,
  secondary: FaCircle,
  default: null,
};

const StatusPill: React.FC<StatusPillProps> = ({
  label,
  variant = "default",
  size = "md",
  className = "",
  showIcon = false,
  icon: CustomIcon,
  onClick,
  disabled = false,
}) => {
  // Base classes
  const baseClasses =
    "inline-flex items-center font-medium rounded-full transition-colors duration-200";

  // Variant classes
  const variantClasses: Record<StatusVariant, string> = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    primary: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    secondary:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    success: "bg-[#D6FFDD] text-[#001019]",
    warning: "bg-[#FEF3C7] text-[#9A6A00]",
    error: "bg-[#F7C8D7] text-[#001019]",
    info: "bg-[#A5D8E6] text-[#001019]",
  };

  // Size classes
  const sizeClasses: Record<StatusSize, string> = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-3 py-1 text-sm gap-1.5",
    lg: "px-4 py-1.5 text-base gap-2",
  };

  // Icon size classes
  const iconSizeClasses: Record<StatusSize, string> = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
    lg: "w-4 h-4",
  };

  // Interactive classes
  const interactiveClasses =
    onClick && !disabled
      ? "cursor-pointer hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-opacity-50"
      : "";

  // Disabled classes
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  const combinedClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    interactiveClasses,
    disabledClasses,
    className,
  ].join(" ");

  const handleClick = () => {
    if (onClick && !disabled) {
      onClick();
    }
  };

  // Determine which icon to display
  const IconComponent = CustomIcon || (showIcon ? defaultIcons[variant] : null);

  return (
    <span
      className={combinedClasses}
      onClick={handleClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && onClick && !disabled) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {IconComponent && (
        <IconComponent
          className={`flex-shrink-0 ${iconSizeClasses[size]}`}
          aria-hidden="true"
        />
      )}
      {label}
    </span>
  );
};

export default StatusPill;
