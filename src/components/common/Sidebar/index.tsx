import React from "react";
import SuperAdminSidebar from "./SuperAdminSidebar";
import AdminSidebar from "./AdminSidebar";
import DoctorSidebar from "./DoctorSidebar";
import NurseSidebar from "./NurseSidebar";
import PatientSidebar from "./PatientSidebar";

interface SidebarProps {
  role: string;
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const renderSidebar = () => {
    switch (role) {
      case "super-admin":
        return <SuperAdminSidebar />;
      case "admin":
        return <AdminSidebar />;
      case "doctor":
        return <DoctorSidebar />;
      case "nurse":
        return <NurseSidebar />;
      case "patient":
        return <PatientSidebar />;
      default:
        return <AdminSidebar />;
    }
  };

  return (
    <div className="w-64 min-h-screen bg-white shadow-md">
      {renderSidebar()}
    </div>
  );
};

export default Sidebar;
