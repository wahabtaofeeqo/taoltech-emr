import Pagination from "@/components/ui/Pagination";
import React, { useState } from "react";
import { BiSolidUserDetail } from "react-icons/bi";
import { FaUserDoctor, FaUserNurse } from "react-icons/fa6";
import { RiCalendarScheduleLine } from "react-icons/ri";

const NurseHome: React.FC = () => {
  const statistics = [
    {
      id: 1,
      label: "Patients Under Care",
      value: 248,
      icon: BiSolidUserDetail,
    },
    { id: 2, label: "Total Task", value: 248, icon: FaUserDoctor },
    { id: 3, label: "Notifications", value: 18, icon: FaUserNurse },
    {
      id: 4,
      label: "Administer Notications",
      value: 248,
      icon: RiCalendarScheduleLine,
    },
  ];

  const RecentAppointments = [
    {
      name: "James Smith",
      mrn: "02345",
      roomBed: "Room 12, Bed 3",
      task: "Routine",
      date: "20-06-97",
      time: "2:00PM",
    },
    {
      name: "James Smith",
      mrn: "02345",
      roomBed: "Room 12, Bed 3",
    },
    {
      name: "James Smith",
      mrn: "02345",
      roomBed: "Room 12, Bed 3",
    },
    {
      name: "James Smith",
      mrn: "02345",
      roomBed: "Room 12, Bed 3",
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
        <h1 className="font-lora text-2xl font-bold">Overview</h1>
      </div>
      <div className="flex items-center gap-2 px-4">
        <button className="text-black bg-gray-1 px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50 text-sm hover:bg-primary-blue hover:text-white transition">
          Today
        </button>
        <button className="text-black bg-gray-1 px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50 text-sm hover:bg-primary-blue hover:text-white transition">
          Week
        </button>
        <button className="text-black bg-gray-1 px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50 text-sm hover:bg-primary-blue hover:text-white transition">
          Month
        </button>
        <button className="text-black bg-gray-1 px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50 text-sm hover:bg-primary-blue hover:text-white transition">
          Year
        </button>
        <button className="text-black bg-gray-1 px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50 text-sm hover:bg-primary-blue hover:text-white transition">
          <input type="date" placeholder="Filter By Date" />
        </button>
      </div>
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
          {/* table */}
          <div className="bg-[#F0FAFF] p-4 rounded-xl shadow">
            <div className="flex justify-between items-center mb-2">
              <h4 className="mb-4 text-[#020714]">Patients Under Care</h4>
            </div>
            <div className="rounded-xl overflow-hidden bg-white">
              <table className="min-w-full rounded-lg">
                <thead>
                  <tr>
                    <th className="px-4 py-4 text-left border-b border-gray-3 font-semibold">
                      Patient Name
                    </th>
                    <th className="px-4 py-4 text-left border-b border-gray-3 font-semibold">
                      MRN
                    </th>
                    <th className="px-4 py-4 text-left border-b border-gray-3 font-semibold">
                      Room and Bed
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item) => (
                    <tr key={item.name}>
                      <td className="px-4 py-4 text-left text-gray-3 border-b border-gray-1">
                        {item.name}
                      </td>
                      <td className="px-4 py-4 text-left text-gray-3 border-b border-gray-1">
                        {item.mrn}
                      </td>
                      <td className="px-4 py-4 text-left text-gray-3 border-b border-gray-1">
                        {item.roomBed}
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
          <div className="flex items-start w-full gap-4">
            {/* table */}
            <div className="bg-[#F0FAFF] p-4 rounded-xl shadow w-full">
              <div className="flex justify-between items-center mb-2">
                <h4 className="mb-4 text-[#020714]">Upcoming Tasks</h4>
              </div>
              <div className="rounded-xl overflow-hidden bg-white">
                <table className="min-w-full rounded-lg">
                  <thead>
                    <tr>
                      <th className="px-4 py-4 text-left border-b border-gray-3 font-semibold">
                        Patient Name
                      </th>
                      <th className="px-4 py-4 text-left border-b border-gray-3 font-semibold">
                        Task
                      </th>
                      <th className="px-4 py-4 text-left border-b border-gray-3 font-semibold">
                        Date
                      </th>
                      <th className="px-4 py-4 text-left border-b border-gray-3 font-semibold">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item) => (
                      <tr key={item.name}>
                        <td className="px-4 py-4 text-left text-gray-3 border-b border-gray-1">
                          {item.name}
                        </td>
                        <td className="px-4 py-4 text-left text-gray-3 border-b border-gray-1">
                          {item.task}
                        </td>
                        <td className="px-4 py-4 text-left text-gray-3 border-b border-gray-1">
                          {item.date}
                        </td>
                        <td className="px-4 py-4 text-left text-gray-3 border-b border-gray-1">
                          {item.time}
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
            {/* table */}
            <div className="bg-[#F0FAFF] p-4 rounded-xl shadow w-full">
              <div className="flex justify-between items-center mb-2">
                <h4 className="mb-4 text-[#020714]">Notifications</h4>
              </div>
              <div className="rounded-xl overflow-hidden bg-white">
                <table className="min-w-full rounded-lg">
                  <thead>
                    <tr>
                      <th className="px-4 py-4 text-left border-b border-gray-3 font-semibold">
                        Admin
                      </th>
                      <th className="px-4 py-4 text-left border-b border-gray-3 font-semibold">
                        Notifications
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item) => (
                      <tr key={item.name}>
                        <td className="px-2 py-3 border-b border-gray-1">
                          <div className="flex items-center gap-2">
                            <img
                              src={""}
                              alt={""}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <p>Admin 1</p>
                              <p className="text-xs text-gray-3">{item.name}</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-left text-gray-3 border-b border-gray-1">
                          Administer medication
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
      </div>
    </main>
  );
};

export default NurseHome;
