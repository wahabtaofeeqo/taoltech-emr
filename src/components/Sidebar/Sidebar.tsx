import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PiChatsTeardrop } from "react-icons/pi";
import { RiHome5Line } from "react-icons/ri";
import { RxFilePlus } from "react-icons/rx";
import { TbBuildingHospital, TbMessage2 } from "react-icons/tb";
import { FaUserInjured } from "react-icons/fa";
import { BiBookContent } from "react-icons/bi";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { CiSettings } from "react-icons/ci";
import UsedSpace from "./Components/UsedSpace/UsedSpace";
import User from "./Components/User/User";

interface LinkItem {
  path: string;
  label: string;
  icon: React.ComponentType<any>;
}

const Sidebar: React.FC = () => {
  // const location = useLocation<{
  //   pathname: string;
  // }>(); // Typing the location object

  const links: LinkItem[] = [
    {
      path: `/dashboard/home`,
      label: "Home",
      icon: RiHome5Line,
    },
    {
      path: `/dashboard/registration`,
      label: "Registration",
      icon: RxFilePlus,
    },
    {
      path: `/dashboard/consultation`,
      label: "Consultation",
      icon: PiChatsTeardrop,
    },
    {
      path: `/dashboard/ward-management`,
      label: "Ward Management",
      icon: TbBuildingHospital,
    },
    {
      path: `/dashboard/patients`,
      label: "Patients",
      icon: FaUserInjured,
    },
    {
      path: `/dashboard/resources`,
      label: "Resources",
      icon: BiBookContent,
    },
    {
      path: `/dashboard/messages`,
      label: "Messages",
      icon: TbMessage2,
    },
    {
      path: `/dashboard/support`,
      label: "Support",
      icon: HiOutlineViewGridAdd,
    },
    {
      path: `/dashboard/settings`,
      label: "Settings",
      icon: CiSettings,
    },
  ];

  return (
    <aside className="w-20 md:w-[250px] space-y-6 py-7 px-2 inset-y-0 left-0 transition duration-200 ease-in-out  bg-health-primary-blue text-health-off-white">
      <p>EMR</p>
      <nav className="mt-[100px]">
        <ul>
          {links.map((link, index) => {
            const IconComponent = link.icon;
            const isActive = location.pathname.startsWith(link.path);
            return (
              <li key={index} className="w-full">
                <Link
                  to={`${link.path}`}
                  className={`px-4 py-1 text-sm mb-4 transition duration-200 flex items-center justify-center md:justify-start w-full ${
                    isActive
                      ? " text-white bg-health-secondary-cyan rounded-md font-medium"
                      : ""
                  }`}
                >
                  <IconComponent
                    className={`text-2xl ${
                      isActive ? "text-deskit-blue-600" : "text-deskit-gray-400"
                    }`}
                  />
                  <span
                    className={`ml-4 hidden md:inline text-deskit-blue-300`}
                  >
                    {link.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        {/* Used Space */}
        <div className="mt-[100px]">
          <UsedSpace />
        </div>
        {/* User */}
        <div className="mt-[50px]">
          <User />
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
