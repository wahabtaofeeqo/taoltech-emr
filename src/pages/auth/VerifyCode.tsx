import Logo from "@/assets/logo.svg";
import CustomButton from "@/components/ui/Button";
import OTPInput from "@/components/ui/OTPInput";
import { useState } from "react";
import { HiChevronLeft } from "react-icons/hi";

import { Link } from "react-router-dom";

const VerifyCode: React.FC = () => {
  const [otp, setOtp] = useState("");

  const handleComplete = (value: string) => {
    console.log("OTP Complete:", value);
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
      <div className="w-full md:w-1/2 px-4 md:px-10 flex flex-col gap-8 h-screen items-start justify-center">
        <div className="space-y-2 w-full">
          <Link
            to={"/login"}
            type="submit"
            className="text-black flex items-center cursor-pointer mt-8 text-xs"
          >
            <span className="text-2xl">
              <HiChevronLeft />
            </span>
            <span>Back to login</span>
          </Link>
          <h2 className="mb-8 text-3xl font-lora font-extrabold text-black ">
            Verify Code
          </h2>
          <p className="font-light py-2 text-gray-2">
            An authentication code has been sent to your email.
          </p>
        </div>
        <form className="mt-8 space-y-6 flex flex-col gap-6 w-full">
          <OTPInput
            label="Enter OTP password"
            value={otp}
            onChange={setOtp}
            onComplete={handleComplete}
            length={4}
            className="w-fit"
            type="number"
          />
          <p className="text-xs">
            Didn’t receive a code?{" "}
            <Link
              to={"/login"}
              type="submit"
              className="text-primary-blue cursor-pointer "
            >
              Resend
            </Link>
          </p>
          <div className="flex flex-col items-center justify-center gap-8">
            <CustomButton type="submit" fullWidth size="lg">
              Verify
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyCode;
