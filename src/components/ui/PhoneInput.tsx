import React from "react";
import ReactCountryFlag from "react-country-flag";
import CustomDropdown, { DropdownOption } from "./Select";

interface PhoneInputProps {
  countryCode: string;
  phoneNumber: string;
  onCountryCodeChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  name?: string;
  showFlags?: boolean;
}

const CustomPhoneInput: React.FC<PhoneInputProps> = ({
  countryCode,
  phoneNumber,
  onCountryCodeChange,
  onPhoneNumberChange,
  label = "Phone Number",
  placeholder = "Enter phone number",
  error,
  disabled = false,
  required = false,
  className = "",
  name = "phone",
  showFlags = true,
}) => {
  const countryOptions: DropdownOption[] = [
    {
      value: "+234",
      label: "Nigeria (+234)",
      icon: (
        <ReactCountryFlag
          countryCode="NG"
          svg
          style={{ width: "20px", height: "15px" }}
        />
      ),
      id: "NG",
    },
    {
      value: "+1",
      label: "USA (+1)",
      icon: (
        <ReactCountryFlag
          countryCode="US"
          svg
          style={{ width: "20px", height: "15px" }}
        />
      ),
      id: "US",
    },
    {
      value: "+44",
      label: "UK (+44)",
      icon: (
        <ReactCountryFlag
          countryCode="GB"
          svg
          style={{ width: "20px", height: "15px" }}
        />
      ),
      id: "GB",
    },
    {
      value: "+233",
      label: "Ghana (+233)",
      icon: (
        <ReactCountryFlag
          countryCode="GH"
          svg
          style={{ width: "20px", height: "15px" }}
        />
      ),
      id: "GH",
    },
    {
      value: "+254",
      label: "Kenya (+254)",
      icon: (
        <ReactCountryFlag
          countryCode="KE"
          svg
          style={{ width: "20px", height: "15px" }}
        />
      ),
      id: "KE",
    },
    {
      value: "+27",
      label: "South Africa (+27)",
      icon: (
        <ReactCountryFlag
          countryCode="ZA"
          svg
          style={{ width: "20px", height: "15px" }}
        />
      ),
      id: "ZA",
    },
    {
      value: "+91",
      label: "India (+91)",
      icon: (
        <ReactCountryFlag
          countryCode="IN"
          svg
          style={{ width: "20px", height: "15px" }}
        />
      ),
      id: "IN",
    },
    {
      value: "+86",
      label: "China (+86)",
      icon: (
        <ReactCountryFlag
          countryCode="CN"
          svg
          style={{ width: "20px", height: "15px" }}
        />
      ),
      id: "CN",
    },
    {
      value: "+81",
      label: "Japan (+81)",
      icon: (
        <ReactCountryFlag
          countryCode="JP"
          svg
          style={{ width: "20px", height: "15px" }}
        />
      ),
      id: "JP",
    },
    {
      value: "+49",
      label: "Germany (+49)",
      icon: (
        <ReactCountryFlag
          countryCode="DE"
          svg
          style={{ width: "20px", height: "15px" }}
        />
      ),
      id: "DE",
    },
    {
      value: "+33",
      label: "France (+33)",
      icon: (
        <ReactCountryFlag
          countryCode="FR"
          svg
          style={{ width: "20px", height: "15px" }}
        />
      ),
      id: "FR",
    },
    {
      value: "+39",
      label: "Italy (+39)",
      icon: (
        <ReactCountryFlag
          countryCode="IT"
          svg
          style={{ width: "20px", height: "15px" }}
        />
      ),
      id: "IT",
    },
    {
      value: "+34",
      label: "Spain (+34)",
      icon: (
        <ReactCountryFlag
          countryCode="ES"
          svg
          style={{ width: "20px", height: "15px" }}
        />
      ),
      id: "ES",
    },
    {
      value: "+61",
      label: "Australia (+61)",
      icon: (
        <ReactCountryFlag
          countryCode="AU"
          svg
          style={{ width: "20px", height: "15px" }}
        />
      ),
      id: "AU",
    },
    {
      value: "+55",
      label: "Brazil (+55)",
      icon: (
        <ReactCountryFlag
          countryCode="BR"
          svg
          style={{ width: "20px", height: "15px" }}
        />
      ),
      id: "BR",
    },
  ];

  const currentCountry = countryOptions.find(
    (opt) => opt.value === countryCode
  );

  const handleCountrySelect = (name: string, value: string) => {
    onCountryCodeChange(value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d+]/g, "");
    onPhoneNumberChange(value);
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        className={`
          flex items-center gap-2 border border-gray-300 rounded-lg bg-white
          transition-all duration-200 focus-within:border-primary-blue 
          ${
            error
              ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-200"
              : ""
          }
          ${disabled ? "bg-gray-100 opacity-50 cursor-not-allowed" : ""}
          overflow-hidden
        `}
      >
        {/* Country Code Selector with Flag */}
        <div className="flex-shrink-0 border-r border-gray-200 relative z-10">
          <CustomDropdown
            options={countryOptions}
            onSelect={handleCountrySelect}
            name="countryCode"
            placeholder={
              countryCode || "+234"
            }
            value={countryCode}
            disabled={disabled}
            size="md"
            className="border-0 shadow-none min-w-[110px]"
          />
        </div>

        {/* Divider */}
        <div className="flex-shrink-0 mx-3">
          <div className="w-px bg-gray-300 h-6"></div>
        </div>

        {/* Phone Number Input */}
        <div className="flex-1">
          <input
            type="tel"
            name={`${name}-number`}
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`
              w-full h-full px-3 py-3 border-0 outline-none bg-transparent
              placeholder-gray-400 text-gray-900 text-sm
              ${disabled ? "cursor-not-allowed" : ""}
            `}
            maxLength={15}
          />
        </div>
      </div>

      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CustomPhoneInput;
