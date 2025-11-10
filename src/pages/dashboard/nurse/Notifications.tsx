import CustomCheckbox from "@/components/ui/Checkbox";
import Pagination from "@/components/ui/Pagination";
import { notificationsData } from "@/constants/nurse";
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Define the Task type
interface Task {
  completed: boolean;
  taskName: string;
  patientName: string;
  priority: string;
}

const Notifications = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalItems = notificationsData.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = notificationsData.slice(startIndex, endIndex);

  const tableHeaders = ["Staff", "Message", "Date"];

  return (
    <main>
      <div className="py-3 px-6 bg-light-blue text-black mb-4">
        <h1 className="font-lora text-2xl font-bold">Notifications</h1>
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
                  {currentItems.map((item, index) => (
                    <tr
                      key={`${item.date}-${index}`}
                      className="text-xs font-bold hover:bg-gray-100"
                    >
                      <td className="px-2 py-2 text-left border-b border-gray-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={item.image}
                            alt={item.staff}
                            className="w-10 h-10 rounded-full"
                          />
                          <p>{item.staff}</p>
                        </div>
                      </td>

                      <td className="px-2 py-2 text-left  border-b border-gray-3">
                        {item.message}
                      </td>
                      <td className="px-2 py-2 text-left  border-b border-gray-3">
                        {item.date}
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

export default Notifications;
