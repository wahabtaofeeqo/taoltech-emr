interface CTAButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
}
type ButtonVariant = "primary" | "secondary" | "danger" | "success"|"outline";
type ButtonSize = "small" | "medium" | "large";
const getButtonClasses = (variant: ButtonVariant, size: ButtonSize) => {
  const baseClasses = "font-medium rounded focus:outline-none transition";

  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    success: "bg-green-500 text-white hover:bg-green-600",
    outline: "bg-transparent ring-2 ring-gray-300",
  };

  const sizeClasses = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
};

const CTAButton = ({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  disabled,
  ...rest
}: CTAButtonProps) => {
  return (
    <button
      className={`${getButtonClasses(variant, size)} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } py-3 rounded-lg shadow-lg`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default CTAButton;
