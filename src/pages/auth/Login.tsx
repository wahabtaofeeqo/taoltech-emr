import Logo from "@/assets/logo.svg";
import CustomButton from "@/components/ui/Button";
import CustomInput from "@/components/ui/Input";
import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import facebook from "@/assets/facebook.svg";
import google from "@/assets/google.svg";
import apple from "@/assets/apple.svg";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("authToken", "your-auth-token");
    navigate("/admin");
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
            Log in
          </h2>
          <p className="font-light py-2 text-gray-2">
            Login to access your Taolhealth account
          </p>
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
          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="border border-gray-1 w-full"></div>
            <div className="min-w-fit text-gray-3">Or Log in with </div>
            <div className="border border-gray-1 w-full"></div>
          </div>
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

          <CustomButton type="submit" fullWidth size="lg" onClick={handleLogin}>
            Log In
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default Login;
