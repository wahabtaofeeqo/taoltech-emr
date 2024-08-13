import { Outlet } from "react-router-dom";
// import NavBar from "../NavBar/NavBar";
import Sidebar from "../Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <main className="flex h-screen bg-white text-deskit-blue-300 flex-col">
      {/* <NavBar /> */}
      <div className="flex flex-1">
        <Sidebar />
        <div
          className="flex-1 bg-gray-100 overflow-y-scroll  "
          style={{
            scrollbarWidth: "none" /* For Firefox */,
            scrollbarColor:
              "#888 #f1f1f1" /* Color of the scrollbar thumb and track */,
            borderRadius: "4px" /* Radius of the scrollbar thumb */,
          }}
        >
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
