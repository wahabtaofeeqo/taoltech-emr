import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar/index.tsx";

const Layout: React.FC = () => {
  // For now, we'll hardcode a role for UI development
  const userRole = "nurse"; // Change this to test different sidebars: 'super-admin', 'admin', 'doctor', 'nurse', 'patient'

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role={userRole} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="bg-white flex-1 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
