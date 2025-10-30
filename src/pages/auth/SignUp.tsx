import Logo from "@/assets/logo.svg";
import CustomButton from "@/components/ui/Button";
import CustomInput from "@/components/ui/Input";
import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import facebook from "@/assets/facebook.svg";
import google from "@/assets/google.svg";
import apple from "@/assets/apple.svg";
import CustomCheckbox from "@/components/ui/Checkbox";
import CustomPhoneInput from "@/components/ui/PhoneInput";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    countryCode: "+234",
    phoneNumber: "",
    confirmPassword: "",
    role: "",
    terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  const validatePhoneNumber = (number: string) => {
    if (number.length < 10) {
      setError("Phone number must be at least 10 digits");
    } else {
      setError("");
    }
  };

  const handlePhoneNumberChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phoneNumber: value }));
    validatePhoneNumber(value);
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
            Sign Up
          </h2>
          <p className="font-light py-2 text-gray-2">
            Let’s get you all set up so you can access your personal account
          </p>
        </div>
        <form className="mt-8  flex flex-col gap-4 w-full">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <CustomInput
              name="firstName"
              type="text"
              label="First Name"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />

            <CustomInput
              name="lastName"
              type="text"
              label="Last Name"
              placeholder="Enter last name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <CustomInput
              name="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <CustomPhoneInput
              countryCode={formData.countryCode}
              phoneNumber={formData.phoneNumber}
              onCountryCodeChange={(value) =>
                setFormData((prev) => ({ ...prev, countryCode: value }))
              }
              onPhoneNumberChange={handlePhoneNumberChange}
              error={error}
              required
            />
          </div>

          <CustomInput
            name="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            icon={showPassword ? <HiEyeOff /> : <HiEye />}
            onIconClick={() => setShowPassword(!showPassword)}
            required
          />
          <CustomInput
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            label="Confirm Password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            icon={showPassword ? <HiEyeOff /> : <HiEye />}
            onIconClick={() => setShowPassword(!showPassword)}
            required
          />

          <div>
            <CustomCheckbox
              size="sm"
              name="terms"
              checked={formData.terms}
              onChange={handleCheckboxChange}
              label="I agree to all the Terms and Privacy Policies"
              className="mt-4" //
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <CustomButton type="submit" fullWidth size="lg">
              Sign Up
            </CustomButton>
            <p className="text-xs">
              Already have an account?{" "}
              <Link
                to={"/login"}
                type="submit"
                className="text-primary-blue cursor-pointer "
              >
                Login
              </Link>
            </p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-4 pb-4">
              <div className="border border-gray-1 w-full"></div>
              <div className="min-w-fit text-gray-3">Or Sign up with </div>
              <div className="border border-gray-1 w-full"></div>
            </div>
            <div className="flex gap-4 my-4">
              <CustomButton
                variant="outline"
                type="submit"
                fullWidth
                size="lg"
                className="border-black"
              >
                <img src={facebook} alt="taoltech" className="" />
              </CustomButton>
              <CustomButton
                variant="outline"
                type="submit"
                fullWidth
                size="lg"
                className="border-black"
              >
                <img src={google} alt="taoltech" className="" />
              </CustomButton>
              <CustomButton
                variant="outline"
                type="submit"
                fullWidth
                size="lg"
                className="border-black"
              >
                <img src={apple} alt="taoltech" className="" />
              </CustomButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
