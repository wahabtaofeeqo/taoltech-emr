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
import { BsWrench } from "react-icons/bs";
import { GoChecklist } from "react-icons/go";
import { FaRegBell } from "react-icons/fa";

export const getRoleMenuItems = (role: string) => {
  switch (role) {
    case "admin":
      return adminNavItems;
    case "nurse":
      return nurseNavItems;
    // Add cases for other roles like 'super-admin', 'doctor', 'nurse', 'patient' as needed
    default:
      return [];
  }
};
const adminNavItems = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: HiHome,
  },
  {
    title: "Doctors",
    path: "/admin/doctors",
    icon: HiUser,
  },
  {
    title: "Patients",
    path: "/admin/patients",
    icon: HiUsers,
  },
  {
    title: "Registration",
    path: "/admin/register-patient",
    icon: HiClipboardList,
  },
  {
    title: "Platform Activity",
    path: "/admin/activity",
    icon: HiChartBar,
  },
  {
    title: "Staff Management",
    path: "/admin/staff",
    icon: HiUsers,
  },
  {
    title: "Pharmacy",
    path: "/admin/pharmacy",
    icon: HiShoppingCart,
  },
  {
    title: "Billing & Payment",
    path: "/admin/billing",
    icon: HiCash,
  },
  {
    title: "Reports & Logs",
    path: "/admin/reports",
    icon: HiChartBar,
  },
  {
    title: "Notifications",
    path: "/admin/notifications",
    icon: HiBell,
  },
  {
    title: "settings",
    path: "/admin/settings",
    icon: BsWrench,
  },
];

const nurseNavItems = [
  {
    title: "Dashboard",
    path: "/nurse",
    icon: HiHome,
  },
  {
    title: "Patients",
    path: "/nurse/patients",
    icon: HiUsers,
  },
  {
    title: "Tasks",
    path: "/nurse/tasks",
    icon: GoChecklist,
  },
  {
    title: "Notifications",
    path: "/nurse/notifications",
    icon: FaRegBell,
  },
];
