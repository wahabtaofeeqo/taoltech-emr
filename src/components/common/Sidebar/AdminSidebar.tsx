import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiHome,
  HiUser,
  HiUsers,
  HiClipboardList,
  HiChartBar,
  HiCash,
  HiShoppingCart,
  HiBell,
} from "react-icons/hi";
import Logo from "@/assets/logo.svg";
import { BsWrench } from "react-icons/bs";

const AdminSidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      path: "/admin",
      icon: <HiHome className="w-5 h-5" />,
    },
    {
      title: "Doctors",
      path: "/admin/doctors",
      icon: <HiUser className="w-5 h-5" />,
    },
    {
      title: "Patients",
      path: "/admin/patients",
      icon: <HiUsers className="w-5 h-5" />,
    },
    {
      title: "Registration",
      path: "/admin/register-patient",
      icon: <HiClipboardList className="w-5 h-5" />,
    },
    {
      title: "Platform Activity",
      path: "/admin/activity",
      icon: <HiChartBar className="w-5 h-5" />,
    },
    {
      title: "Staff Management",
      path: "/admin/staff",
      icon: <HiUsers className="w-5 h-5" />,
    },
    {
      title: "Pharmacy",
      path: "/admin/pharmacy",
      icon: <HiShoppingCart className="w-5 h-5" />,
    },
    {
      title: "Billing & Payment",
      path: "/admin/billing",
      icon: <HiCash className="w-5 h-5" />,
    },
    {
      title: "Reports & Logs",
      path: "/admin/reports",
      icon: <HiChartBar className="w-5 h-5" />,
    },
    {
      title: "Notifications",
      path: "/admin/notifications",
      icon: <HiBell className="w-5 h-5" />,
    },
    {
      title: "settings",
      path: "/admin/settings",
      icon: <BsWrench className="w-5 h-5" />,
    },
  ];

  return (
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
                {item.icon}
                <span className="ml-3 text-sm ">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
