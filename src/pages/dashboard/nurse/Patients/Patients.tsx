import Pagination from "@/components/ui/Pagination";
import StatusPill, { StatusVariant } from "@/components/ui/StatusPill";
import { PatientsData } from "@/constants/admin";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Patients = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalItems = PatientsData.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = PatientsData.slice(startIndex, endIndex);

  const tableHeaders = [
    "Patient Name",
    "MRN",
    "Gender",
    "Age",
    "Insurance",
    "Status",
  ];

  return (
    <main>
      <div className="py-3 px-6 bg-light-blue text-black mb-4">
        <h1 className="font-lora text-2xl font-bold">Patients</h1>
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
          {/* table */}
          <div className="bg-[#F0FAFF] p-4 rounded-xl shadow">
            <div className="flex justify-between items-center mb-2">
              <h4 className=" text-[#020714] text-2xl font-semibold">
                All Patients
              </h4>
              <Link
                to={"/admin/patients/new"}
                className="text-primary-blue cursor-pointer"
              >
                Add New Patient for Appointment
              </Link>
            </div>
            <div className="mb-6 w-1/2">
              <input
                type="text"
                placeholder="Search patients..."
                className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary-blue"
                // onChange={handleSearchChange}
              />
            </div>
            <div className="rounded-xl overflow-hidden bg-white">
              <table className="min-w-full rounded-lg font-manrope">
                <thead>
                  <tr>
                    {tableHeaders.map((header) => (
                      <th
                        key={header}
                        className="px-2 py-4 text-left border-b border-gray-3 font-medium"
                      >
                        {header}
                      </th>
                    ))}

                    <th className="px-2 py-4 text-center border-b border-gray-3 font-medium">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item) => (
                    <tr
                      key={item.MRN}
                      className="text-xs font-bold hover:bg-gray-100"
                    >
                      <td className="px-2 py-2 text-left border-b border-gray-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={item.image}
                            alt={item.Name}
                            className="w-10 h-10 rounded-full"
                          />
                          <p>{item.Name}</p>

                          <Link
                            to={`/admin/patients/3`}
                            className="text-primary-blue cursor-pointer text-xs ml-2"
                          >
                            View file
                          </Link>
                        </div>
                      </td>
                      <td className="px-2 py-2 text-left  border-b border-gray-3">
                        {item.MRN}
                      </td>
                      <td className="px-2 py-2 text-left  border-b border-gray-3">
                        {item.Gender}
                      </td>
                      <td className="px-2 py-2 text-left  border-b border-gray-3">
                        {item.Age}
                      </td>
                      <td className="px-2 py-2 text-left  border-b border-gray-3">
                        {item.Insurance}
                      </td>
                      <td className="px-2 py-2 text-left  border-b border-gray-3">
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
      </div>
    </main>
  );
};

export default Patients;
