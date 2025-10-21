import Pagination from "@/components/ui/Pagination";
import StatusPill, { StatusVariant } from "@/components/ui/StatusPill";
import { RecentlyApointed } from "@/constants/admin";
import React, { useState } from "react";

const RecentlyAppointedDoctor = ({ setRecentlyAppointed }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalItems = RecentlyApointed.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = RecentlyApointed.slice(startIndex, endIndex);

  return (
    <div className="space-y-4  p-4 bg-off-white rounded-2xl max-h-[70vh] overflow-y-auto scrollbar-hide">
      {/* table */}
      <div className="bg-[#F0FAFF] p-4 rounded-xl shadow">
        <div className="flex justify-between items-center mb-2">
          <h4 className=" text-[#020714] text-2xl font-semibold">
            Recently Appointed Doctors
          </h4>
          <button
            className="text-primary-blue cursor-pointer"
            onClick={() => setRecentlyAppointed(false)}
          >
            Back
          </button>
        </div>
        <div className="mb-6 w-1/2">
          <input
            type="text"
            placeholder="Search doctors..."
            className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary-blue"
            // onChange={handleSearchChange}
          />
        </div>
        <div className="rounded-xl overflow-hidden bg-white">
          <table className="min-w-full rounded-lg font-manrope">
            <thead>
              <tr>
                <th className="px-2 py-4 text-center border-b border-gray-3 font-medium">
                  S/N
                </th>
                <th className="px-2 py-4 text-center border-b border-gray-3 font-medium">
                  Doctor Name
                </th>
                <th className="px-2 py-4 text-center border-b border-gray-3 font-medium">
                  Gender
                </th>
                <th className="px-2 py-4 text-center border-b border-gray-3 font-medium">
                  Date
                </th>
                <th className="px-2 py-4 text-center border-b border-gray-3 font-medium">
                  Time
                </th>
                <th className="px-2 py-4 text-center border-b border-gray-3 font-medium">
                  Assigned Patient
                </th>
                <th className="px-2 py-4 text-center border-b border-gray-3 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.ID} className="text-xs font-bold">
                  <td className="px-2 py-2 text-center  border-b border-gray-3">
                    {item.ID}
                  </td>
                  <td className="px-2 py-2 text-center  border-b border-gray-3">
                    {item.Name}
                  </td>
                  <td className="px-2 py-2 text-center  border-b border-gray-3">
                    {item.Gender}
                  </td>
                  <td className="px-2 py-2 text-center  border-b border-gray-3">
                    {item.Date}
                  </td>
                  <td className="px-2 py-2 text-center  border-b border-gray-3">
                    {item.Time}
                  </td>
                  <td className="px-2 py-2 text-center  border-b border-gray-3">
                    {item.AssignedPatient}
                  </td>
                  <td className="px-2 py-2 text-center  border-b border-gray-3">
                    <StatusPill
                      label={item.Status}
                      variant={
                        item.Status == "Confirmed"
                          ? "success"
                          : ("error" as StatusVariant)
                      }
                      size="sm"
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
  );
};

export default RecentlyAppointedDoctor;
