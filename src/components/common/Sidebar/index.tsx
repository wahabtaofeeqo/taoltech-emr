import React from "react";
import { Link, useLocation } from "react-router-dom";

import Logo from "@/assets/logo.svg";
import { getRoleMenuItems } from "./sidebar";

interface SidebarProps {
  role: string;
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const location = useLocation();
  const menuItems = getRoleMenuItems(role);
  return (
    <div className="w-64 min-h-screen bg-white shadow-md">
      <aside className=" bg-silver-gray h-screen">
        <h2 className=" text-center flex items-center py-8 px-4">
          <img src={Logo} alt="taoltech" className="w-[40px] h-[20px]" />
          <span className="font-extrabold text-xl text-primary-blue">
            TAOLHEALTH
          </span>
        </h2>
        <nav className="">
          <ul className="px-4 flex flex-col items-start justify-start gap-1">
            {menuItems.map((item) => (
              <li key={item.path} className="w-full">
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 gap-2 rounded-lg ${
                    location.pathname === item.path
                      ? "bg-primary-blue text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="ml-3 text-sm ">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
