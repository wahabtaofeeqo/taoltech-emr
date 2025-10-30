import Logo from "@/assets/logo.svg";
import CustomButton from "@/components/ui/Button";
import CustomInput from "@/components/ui/Input";
import { useState } from "react";
import { HiArrowLeft, HiChevronLeft, HiEye, HiEyeOff } from "react-icons/hi";
import facebook from "@/assets/facebook.svg";
import google from "@/assets/google.svg";
import apple from "@/assets/apple.svg";
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
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
            Forgot Password
          </h2>
          <p className="font-light py-2 text-gray-2">
            Enter the email associated with this account
          </p>
        </div>
        <form className="mt-8 space-y-6 flex flex-col gap-6 w-full">
          <CustomInput
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <div className="flex flex-col items-center justify-center gap-8">
            <CustomButton type="submit" fullWidth size="lg">
              Enter
            </CustomButton>
            <Link
              to={"/login"}
              type="submit"
              className="text-black flex items-center justify-center cursor-pointer mt-8"
            >
              <span className="text-2xl">
                <HiChevronLeft />
              </span>
              <span>Back to login</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
