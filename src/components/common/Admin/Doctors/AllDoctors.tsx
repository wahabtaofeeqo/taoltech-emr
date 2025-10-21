import Pagination from "@/components/ui/Pagination";
import StatusPill, { StatusVariant } from "@/components/ui/StatusPill";
import { AllDoctorsData } from "@/constants/admin";
import React, { useState } from "react";

const AllDoctors = ({ setRecentlyAppointed, showRecentlyAppointed }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalItems = AllDoctorsData.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = AllDoctorsData.slice(startIndex, endIndex);
  return (
    <div className="space-y-4  p-4 bg-off-white rounded-2xl max-h-[70vh] overflow-y-auto scrollbar-hide">
      {/* table */}
      <div className="bg-[#F0FAFF] p-4 rounded-xl shadow">
        <div className="flex justify-between items-center mb-2">
          <h4 className=" text-[#020714] text-2xl font-semibold">
            Appoint a Doctor
          </h4>
          <button
            className="text-primary-blue cursor-pointer"
            onClick={() => setRecentlyAppointed(!showRecentlyAppointed)}
          >
            Recently appointed doctors
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
                  Doctor ID
                </th>
                <th className="px-2 py-4 text-left border-b border-gray-3 font-medium">
                  Name
                </th>
                <th className="px-2 py-4 text-center border-b border-gray-3 font-medium">
                  Specialty
                </th>
                <th className="px-2 py-4 text-center border-b border-gray-3 font-medium">
                  Status
                </th>
                <th className="px-2 py-4 text-center border-b border-gray-3 font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.ID} className="text-xs font-bold">
                  <td className="px-2 py-2 text-center  border-b border-gray-3">
                    {item.ID}
                  </td>
                  <td className="px-2 py-2 text-left   border-b border-gray-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.image}
                        alt={item.Name}
                        className="w-8 h-8 rounded-full"
                      />
                      <p>{item.Name}</p>
                    </div>
                  </td>
                  <td className="px-2 py-2 text-center  border-b border-gray-3">
                    {item.Specialty}
                  </td>
                  <td className="px-2 py-2 text-center  border-b border-gray-3">
                    <StatusPill
                      label={item.Status}
                      variant={
                        item.Status == "Active"
                          ? "success"
                          : ("error" as StatusVariant)
                      }
                      size="sm"
                    />
                  </td>
                  <td className="px-2 py-2 text-center  border-b border-gray-3">
                    <button
                      className="bg-primary-blue text-white px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50 hover:bg-blue-700 transition"
                      disabled={item.Status !== "Active"}
                      onClick={() => {
                        // Handle reschedule action
                        alert("Reschedule clicked for " + item.Name);
                      }}
                    >
                      {item.Status === "Active" ? "Reschedule" : "Assigned"}
                    </button>
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

export default AllDoctors;
