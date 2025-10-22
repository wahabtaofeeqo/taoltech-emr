import Logo from "@/assets/logo.svg";
import CustomButton from "@/components/ui/Button";
import CustomInput from "@/components/ui/Input";
import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

const ResetPassword: React.FC = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center md:justify-center gap-y-8 md:gap-y-0 ">
      <div className="md:bg-silver-gray w-full md:w-1/2 flex items-center justify-center md:h-screen pt-8 md:pt-0">
        <img
          src={Logo}
          alt="taoltech"
          className="w-[80px] h-[100px] md:w-[500px] md:h-[600px] object-contain"
        />
      </div>
      <div className="w-full md:w-1/2 px-4 md:px-10 flex flex-col gap-8 h-screen items-center justify-center">
        <div className="space-y-2 w-full">
          <h2 className="mb-8 text-3xl font-lora font-extrabold text-black ">
            New Password
          </h2>
          <p className="font-light py-2 text-gray-2">
            Create new password to proceed
          </p>
        </div>
        <form className="mt-8 space-y-6 flex flex-col gap-6 w-full">
          <CustomInput
            name="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="Enter your new password"
            value={formData.password}
            onChange={handleInputChange}
            icon={showPassword ? <HiEyeOff /> : <HiEye />}
            onIconClick={() => setShowPassword(!showPassword)}
            required
          />

          <CustomInput
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="Confirm your new password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            icon={showPassword ? <HiEyeOff /> : <HiEye />}
            onIconClick={() => setShowPassword(!showPassword)}
            required
          />

          <div>
            <CustomButton type="submit" fullWidth size="lg">
              Confirm New Password
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
