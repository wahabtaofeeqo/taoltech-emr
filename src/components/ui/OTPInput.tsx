import React, { useRef, useEffect, useState } from "react";

interface OTPInputProps {
  value: string;
  length?: number;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
  disabled?: boolean;
  type?: "text" | "number";
  autoFocus?: boolean;
  inputClassName?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({
  value,
  length = 6,
  onChange,
  onComplete,
  label,
  error,
  helperText,
  className = "",
  disabled = false,
  type = "text",
  autoFocus = true,
  inputClassName = "",
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (index: number, inputValue: string) => {
    if (type === "number") {
      inputValue = inputValue.replace(/\D/g, "");
    }

    if (inputValue.length > 1) {
      inputValue = inputValue.charAt(0);
    }

    const newValue =
      value.slice(0, index) + inputValue + value.slice(index + 1);
    onChange(newValue);

    if (inputValue && index < length - 1) {
      setTimeout(() => inputRefs.current[index + 1]?.focus(), 10);
    }

    if (newValue.length === length && onComplete) {
      onComplete(newValue);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (!value[index] && index > 0) {
        const newValue = value.slice(0, index - 1) + value.slice(index);
        onChange(newValue);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newValue = value.slice(0, index) + value.slice(index + 1);
        onChange(newValue);
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    setIsFocused(true);
    inputRefs.current[index]?.select();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);

    if (type === "number") {
      const numbersOnly = pastedData.replace(/\D/g, "");
      onChange(numbersOnly);
    } else {
      onChange(pastedData);
    }

    const focusIndex = Math.min(pastedData.length, length - 1);
    setTimeout(() => inputRefs.current[focusIndex]?.focus(), 10);
  };

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [autoFocus]);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {label}
        </label>
      )}

      <div className="flex items-start gap-2">
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type={type === "number" ? "tel" : "text"}
            inputMode={type === "number" ? "numeric" : "text"}
            maxLength={1}
            value={value[index] || ""}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onFocus={() => handleFocus(index)}
            onPaste={handlePaste}
            disabled={disabled}
            className={`
              w-14 h-14 text-center border-2 rounded-lg transition-all duration-200
              text-xl font-semibold outline-none
              disabled:opacity-50 disabled:cursor-not-allowed
              ${
                error
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-300 hover:border-gray-400"
              }
              ${inputClassName}
            `}
            aria-label={`OTP digit ${index + 1}`}
          />
        ))}
      </div>

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

      {helperText && !error && (
        <p className="text-gray-500 text-sm mt-2">{helperText}</p>
      )}
    </div>
  );
};

export default OTPInput;
