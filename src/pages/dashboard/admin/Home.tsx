import ActivityStat from "@/components/common/Admin/ActivityStat";
import AppointmentStatus from "@/components/common/Admin/AppointmentStatus";
import Pagination from "@/components/ui/Pagination";
import StatusPill, { StatusVariant } from "@/components/ui/StatusPill";
import React, { useState } from "react";
import { BiSolidUserDetail } from "react-icons/bi";
import { FaUserDoctor, FaUserNurse } from "react-icons/fa6";
import { RiCalendarScheduleLine } from "react-icons/ri";

const AdminHome: React.FC = () => {
  const statistics = [
    { id: 1, label: "Total Patients", value: 248, icon: BiSolidUserDetail },
    { id: 2, label: "Active Doctors", value: 248, icon: FaUserDoctor },
    { id: 3, label: "Total Nurses", value: 248, icon: FaUserNurse },
    {
      id: 4,
      label: "Total Appointments",
      value: 248,
      icon: RiCalendarScheduleLine,
    },
  ];

  const RecentAppointments = [
    {
      month: "Jan",
      activity: 40,
      patientName: "John Doe",
      date: "2023-10-01",
      time: "10:00 AM",
      doctorAssigned: "Dr. Smith",
      purpose: "General Checkup",
      status: "Completed",
    },
    {
      month: "Feb",
      activity: 300,
      patientName: "Jane Smith",
      date: "2023-10-02",
      time: "11:00 AM",
      doctorAssigned: "Dr. Brown",
      purpose: "Dental Cleaning",
      status: "Pending",
    },
    {
      month: "Mar",
      activity: 200,
      patientName: "Alice Johnson",
      date: "2023-10-03",
      time: "09:30 AM",
      doctorAssigned: "Dr. White",
      purpose: "Eye Exam",
      status: "Cancelled",
    },
    {
      month: "Apr",
      activity: 28,
      patientName: "Bob Lee",
      date: "2023-10-04",
      time: "02:00 PM",
      doctorAssigned: "Dr. Green",
      purpose: "Physical Therapy",
      status: "Completed",
    },
    {
      month: "Jun",
      activity: 23,
      patientName: "Charlie Kim",
      date: "2023-10-05",
      time: "01:00 PM",
      doctorAssigned: "Dr. Black",
      purpose: "Vaccination",
      status: "Pending",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalItems = RecentAppointments.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = RecentAppointments.slice(startIndex, endIndex);

  return (
    <main>
      <div className="py-3 px-6 bg-light-blue text-black mb-4">
        <h1 className="font-lora text-2xl font-bold">Welcome George Udonte</h1>
      </div>
      <div className="px-4">man</div>
      <div className="p-4">
        <div className="space-y-4  p-4 bg-off-white rounded-2xl max-h-[70vh] overflow-y-auto scrollbar-hide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-manrope ">
            {statistics.map((stat) => (
              <div
                key={stat.id}
                className="bg-white p-4 rounded-lg shadow flex-col items gap-6"
              >
                <div className="flex items-start gap-2 mb-4">
                  <stat.icon className="text-[#03BD5D] text-2xl" />
                  <h3 className=" mb-2 text-[#020714]">{stat.label}</h3>
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
          {/* charts */}
          <div className="flex items-start gap-x-4">
            <div className="bg-white p-4 rounded-lg shadow w-1/2">
              <div className="mb-4">
                <h4 className=" text-[#020714]">Activity</h4>
              </div>
              <div className="">
                <ActivityStat />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow w-1/2">
              <AppointmentStatus />
            </div>
          </div>
          {/* table */}
          <div className="bg-[#F0FAFF] p-4 rounded-xl shadow">
            <div className="flex justify-between items-center mb-2">
              <h4 className="mb-4 text-[#020714]">Recent Activities</h4>
              <button className="text-primary-blue">Continue</button>
            </div>
            <div className="rounded-xl overflow-hidden bg-white">
              <table className="min-w-full rounded-lg">
                <thead>
                  <tr>
                    <th className="px-4 py-4 text-center border-b border-gray-3 font-semibold">
                      S/N
                    </th>
                    <th className="px-4 py-4 text-left border-b border-gray-3 font-semibold">
                      Patient Name
                    </th>
                    <th className="px-4 py-4 text-left border-b border-gray-3 font-semibold">
                      Date
                    </th>
                    <th className="px-4 py-4 text-left border-b border-gray-3 font-semibold">
                      Time
                    </th>
                    <th className="px-4 py-4 text-left border-b border-gray-3 font-semibold">
                      Doctor Assigned
                    </th>
                    <th className="px-4 py-4 text-left border-b border-gray-3 font-semibold">
                      Purpose
                    </th>
                    <th className="px-4 py-4 text-left border-b border-gray-3 font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, i) => (
                    <tr key={item.month}>
                      <td className="px-4 py-4 text-center text-gray-3 border-b border-gray-1">
                        {(currentPage - 1) * itemsPerPage + i + 1}
                      </td>
                      <td className="px-4 py-4 text-left text-gray-3 border-b border-gray-1">
                        {item.patientName}
                      </td>
                      <td className="px-4 py-4 text-left text-gray-3 border-b border-gray-1">
                        {item.date}
                      </td>
                      <td className="px-4 py-4 text-left text-gray-3 border-b border-gray-1">
                        {item.time}
                      </td>
                      <td className="px-4 py-4 text-left text-gray-3 border-b border-gray-1">
                        {item.doctorAssigned}
                      </td>
                      <td className="px-4 py-4 text-left text-gray-3 border-b border-gray-1">
                        {item.purpose}
                      </td>
                      <td className="px-4 py-4 text-left text-gray-3 border-b border-gray-1">
                        <StatusPill
                          label={item.status}
                          variant={
                            item.status == "Completed"
                              ? "success"
                              : item.status === "Pending"
                              ? "warning"
                              : ("error" as StatusVariant)
                          }
                          size="md"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
              showItemsPerPage={true}
              onItemsPerPageChange={(value) => {
                setItemsPerPage(value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminHome;
