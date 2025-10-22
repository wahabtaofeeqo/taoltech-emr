import Pagination from "@/components/ui/Pagination";
import StatusPill, { StatusVariant } from "@/components/ui/StatusPill";
import { ReportData } from "@/constants/admin";
import React, { useState } from "react";

const ReportAndLogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalItems = ReportData.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = ReportData.slice(startIndex, endIndex);

  const tableHeaders = [
    "Report ID",
    "Date",
    "Time",
    "Activity Type",
    "Description Details",
    "Status",
  ];

  return (
    <main>
      <div className="py-3 px-6 bg-light-blue text-black mb-4">
        <h1 className="font-lora text-2xl font-bold">Report and Logs</h1>
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
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, i) => (
                    <tr
                      key={item.reportId}
                      className="text-xs font-bold hover:bg-gray-100"
                    >
                      <td className="px-2 py-2 text-left  border-b border-gray-3">
                        {i + 1}
                      </td>
                      <td className="px-2 py-2 text-left  border-b border-gray-3">
                        {item.Date}
                      </td>
                      <td className="px-2 py-2 text-left  border-b border-gray-3">
                        {item.Time}
                      </td>
                      <td className="px-2 py-2 text-left  border-b border-gray-3">
                        {item.ActivityType}
                      </td>
                      <td className="px-2 py-2 text-left  border-b border-gray-3">
                        {item.DescriptionDetails}
                      </td>
                      <td className="px-2 py-2 text-left  border-b border-gray-3">
                        <StatusPill
                          label={item.status}
                          variant={
                            item.status == "successful"
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
      </div>
    </main>
  );
};

export default ReportAndLogs;
