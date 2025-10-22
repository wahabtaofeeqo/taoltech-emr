import Pagination from "@/components/ui/Pagination";
import { PlatformData } from "@/constants/admin";
import React, { useState } from "react";

// Define types for our data
interface ActivityItem {
  id: string;
  Name: string;
  Image: string;
  Date: string;
  Event: string;
  Role: "patient" | "doctor" | "nurse";
}

const PlatformActivity = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [tabData, setTabData] = useState<
    "all" | "patients" | "doctors" | "nurses"
  >("all");
  const [selectedDate, setSelectedDate] = useState<string>("");

  // Filter data based on selected tab and date
  const getFilteredData = (): ActivityItem[] => {
    // Cast PlatformData to ActivityItem[] so Role is narrowed to the union type
    let filteredData = PlatformData as ActivityItem[];

    // Filter by tab
    if (tabData === "patients") {
      filteredData = filteredData.filter((item) => item.Role === "patient");
    } else if (tabData === "doctors") {
      filteredData = filteredData.filter((item) => item.Role === "doctor");
    } else if (tabData === "nurses") {
      filteredData = filteredData.filter((item) => item.Role === "nurse");
    }
    // Filter by date if selected
    if (selectedDate) {
      filteredData = filteredData.filter((item) => item.Date === selectedDate);
    }

    // "all" shows all data
    return filteredData;
  };

  const filteredData = getFilteredData();
  const totalItems = filteredData.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const handleTabChange = (tab: "patients" | "doctors" | "nurses" | "all") => {
    setTabData(tab);
    setCurrentPage(1); // Reset to first page when changing tabs
  };

  const handleDateFilter = (date: string) => {
    setSelectedDate(date);
    setCurrentPage(1); // Reset to first page when filtering by date
  };

  const clearDateFilter = () => {
    setSelectedDate("");
    setCurrentPage(1);
  };

  const tableHeaders = ["S/N", "Users", "Date", "Event"];

  // Get active tab styles
  const getTabClass = (tab: string) => {
    const baseClass =
      "px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50 text-sm hover:bg-primary-blue hover:text-white transition";
    const isActive = tabData === tab;

    if (isActive) {
      return `text-white bg-primary-blue ${baseClass}`;
    } else {
      return `text-black bg-gray-1 ${baseClass}`;
    }
  };

  return (
    <main>
      <div className="py-3 px-6 bg-light-blue text-black mb-4">
        <h1 className="font-lora text-2xl font-bold">Platform Activity</h1>
      </div>

      {/* Tabs and Filters */}
      <div className="flex items-center gap-2 px-4 flex-wrap">
        <button
          className={getTabClass("all")}
          onClick={() => handleTabChange("all")}
        >
          All
        </button>
        <button
          className={getTabClass("patients")}
          onClick={() => handleTabChange("patients")}
        >
          Patients
        </button>
        <button
          className={getTabClass("doctors")}
          onClick={() => handleTabChange("doctors")}
        >
          Doctors
        </button>
        <button
          className={getTabClass("nurses")}
          onClick={() => handleTabChange("nurses")}
        >
          Nurses
        </button>

        {/* Date Filter */}
        <div className="relative">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => handleDateFilter(e.target.value)}
            className="text-black bg-gray-1 px-4 py-2 rounded-lg cursor-pointer text-sm hover:bg-primary-blue hover:text-white transition"
          />
          {selectedDate && (
            <button
              onClick={clearDateFilter}
              className="absolute -right-2 -top-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
              title="Clear date filter"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Results Summary */}
      <div className="px-4 py-2 text-sm text-gray-600">
        Showing {currentItems.length} of {totalItems} activities
        {tabData !== "all" && ` for ${tabData}`}
        {selectedDate && ` on ${selectedDate}`}
      </div>

      <div className="p-4">
        <div className="space-y-4 p-4 bg-off-white rounded-2xl max-h-[70vh] overflow-y-auto scrollbar-hide">
          {/* Table */}
          <div className="bg-[#F0FAFF] p-4 rounded-xl shadow">
            {currentItems.length > 0 ? (
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
                        key={item.id || i}
                        className="text-xs font-bold hover:bg-gray-100"
                      >
                        <td className="px-2 py-2 text-left border-b border-gray-3">
                          {startIndex + i + 1}
                        </td>
                        <td className="px-2 py-2 text-left border-b border-gray-3">
                          <div className="flex items-center gap-2">
                            <img
                              src={item.Image}
                              alt={item.Name}
                              className="w-10 h-10 rounded-full"
                            />
                            <p>{item.Name}</p>
                          </div>
                        </td>
                        <td className="px-2 py-2 text-left border-b border-gray-3">
                          {item.Date}
                        </td>
                        <td className="px-2 py-2 text-left border-b border-gray-3">
                          {item.Event}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 bg-white rounded-xl">
                <p className="text-gray-500">
                  No activities found for the selected filters.
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalItems > 0 && (
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
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PlatformActivity;
