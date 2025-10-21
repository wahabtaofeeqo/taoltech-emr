import React, { useState } from "react";
import CustomInput from "../ui/Input";
import { BsBellFill } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaCircle } from "react-icons/fa";
import Avatar from "@/assets/avatar.jpeg";

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <header className="bg-white">
      <div className="flex items-center justify-between px-16 py-4">
        <div className="w-[548px]">
          <CustomInput
            name="search"
            icon={<CiSearch />}
            type="search"
            className="w-full"
            inputClassName="w-full"
            placeholder="search"
            value={searchTerm}
            onChange={() => {}}
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-full border border-gray-1 p-3">
            <BsBellFill className="text-primary-blue" />
          </div>
          <div>
            <img
              src={Avatar}
              alt=""
              className="w-[44px] h-[44px] rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col items-start">
            <span className="">George Sam</span>
            <div className="flex items-center gap-1">
              <FaCircle className="text-green text-[8px]" />
              <span className="text-gray-1 text-xs">online</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
