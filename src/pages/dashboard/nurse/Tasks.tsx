import CustomCheckbox from "@/components/ui/Checkbox";
import Pagination from "@/components/ui/Pagination";
import StatusPill, { StatusVariant } from "@/components/ui/StatusPill";
import { tasksData } from "@/constants/nurse";
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Define the Task type
interface Task {
  completed: boolean;
  taskName: string;
  patientName: string;
  priority: string;
  dueDate: string;
  time: string;
  status: string;
  image: string;
}

const Tasks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [tasks, setTasks] = useState<Task[]>(tasksData);
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>("all");
  const [customDate, setCustomDate] = useState<string>("");

  const totalItems = tasks.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = tasks.slice(startIndex, endIndex);

  const tableHeaders = [
    "",
    "Task Name",
    "Patient",
    "Priority",
    "Due Date",
    "Time",
    "Status",
  ];

  // Handle checkbox changes
  const handleCheckboxChange = (taskIndex: number, checked: boolean) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      const actualIndex = startIndex + taskIndex;
      if (actualIndex < prevTasks.length) {
        updatedTasks[actualIndex] = {
          ...updatedTasks[actualIndex],
          completed: checked,
          status: checked ? "completed" : "pending",
        };
      }
      return updatedTasks;
    });
  };

  // Handle task acceptance
  const handleAcceptTask = (taskIndex: number) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      const actualIndex = startIndex + taskIndex;
      if (actualIndex < prevTasks.length) {
        updatedTasks[actualIndex] = {
          ...updatedTasks[actualIndex],
          status: "accepted",
        };
      }
      return updatedTasks;
    });
  };

  // Filter tasks by date range
  const filterTasksByDate = (filterType: string) => {
    setSelectedDateFilter(filterType);

    if (filterType === "all") {
      setTasks(tasksData);
      return;
    }

    const today = new Date();
    const filteredTasks = tasksData.filter((task) => {
      const taskDate = new Date(task.dueDate.split("-").reverse().join("-"));

      switch (filterType) {
        case "today":
          return taskDate.toDateString() === today.toDateString();
        case "week":
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay());
          const endOfWeek = new Date(today);
          endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
          return taskDate >= startOfWeek && taskDate <= endOfWeek;
        case "month":
          return (
            taskDate.getMonth() === today.getMonth() &&
            taskDate.getFullYear() === today.getFullYear()
          );
        case "year":
          return taskDate.getFullYear() === today.getFullYear();
        case "custom":
          if (!customDate) return true;
          const selectedDate = new Date(customDate);
          return taskDate.toDateString() === selectedDate.toDateString();
        default:
          return true;
      }
    });

    setTasks(filteredTasks);
    setCurrentPage(1);
  };

  // Handle custom date change
  const handleCustomDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const date = event.target.value;
    setCustomDate(date);
    if (date) {
      setSelectedDateFilter("custom");
      filterTasksByDate("custom");
    }
  };

  // Get priority variant
  const getPriorityVariant = (priority: string): StatusVariant => {
    const priorityLower = priority.toLowerCase();
    if (priorityLower === "high") return "error";
    if (priorityLower === "medium") return "warning";
    return "success";
  };

  // Get status variant
  const getStatusVariant = (status: string): StatusVariant => {
    const statusLower = status.toLowerCase();
    if (statusLower === "active" || statusLower === "accepted")
      return "success";
    if (statusLower === "completed") return "primary";
    return "error";
  };

  return (
    <main>
      <div className="py-3 px-6 bg-light-blue text-black mb-4">
        <h1 className="font-lora text-2xl font-bold">Tasks</h1>
      </div>
      <div className="flex items-center gap-2 px-4">
        <button
          className={`px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50 text-sm transition ${
            selectedDateFilter === "all"
              ? "bg-primary-blue text-white"
              : "text-black bg-gray-1 hover:bg-primary-blue hover:text-white"
          }`}
          onClick={() => filterTasksByDate("all")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50 text-sm transition ${
            selectedDateFilter === "today"
              ? "bg-primary-blue text-white"
              : "text-black bg-gray-1 hover:bg-primary-blue hover:text-white"
          }`}
          onClick={() => filterTasksByDate("today")}
        >
          Today
        </button>
        <button
          className={`px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50 text-sm transition ${
            selectedDateFilter === "week"
              ? "bg-primary-blue text-white"
              : "text-black bg-gray-1 hover:bg-primary-blue hover:text-white"
          }`}
          onClick={() => filterTasksByDate("week")}
        >
          Week
        </button>
        <button
          className={`px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50 text-sm transition ${
            selectedDateFilter === "month"
              ? "bg-primary-blue text-white"
              : "text-black bg-gray-1 hover:bg-primary-blue hover:text-white"
          }`}
          onClick={() => filterTasksByDate("month")}
        >
          Month
        </button>
        <button
          className={`px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50 text-sm transition ${
            selectedDateFilter === "year"
              ? "bg-primary-blue text-white"
              : "text-black bg-gray-1 hover:bg-primary-blue hover:text-white"
          }`}
          onClick={() => filterTasksByDate("year")}
        >
          Year
        </button>
        <div className="text-black bg-gray-1 px-4 py-2 rounded-lg cursor-pointer text-sm hover:bg-primary-blue hover:text-white transition">
          <input
            type="date"
            placeholder="Filter By Date"
            value={customDate}
            onChange={handleCustomDateChange}
            className="bg-transparent border-none outline-none cursor-pointer"
          />
        </div>
      </div>
      <div className="p-4">
        <div className="space-y-4  p-4 bg-off-white rounded-2xl max-h-[70vh] overflow-y-auto scrollbar-hide">
          {/* table */}
          <div className="bg-[#F0FAFF] p-4 rounded-xl shadow">
            <div className="flex justify-between items-center mb-2">
              <h4 className=" text-[#020714] text-2xl font-semibold">
                Task List
              </h4>
              <Link
                to={"/admin/patients/new"}
                className="text-primary-blue cursor-pointer"
              >
                Recent Tasks
              </Link>
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
                  {currentItems.map((item, index) => (
                    <tr
                      key={`${item.taskName}-${index}`}
                      className="text-xs font-bold hover:bg-gray-100"
                    >
                      <td className="px-2 py-2 text-left  border-b border-gray-3">
                        <CustomCheckbox
                          label=""
                          checked={item.completed}
                          onChange={(e) =>
                            handleCheckboxChange(index, e.target.checked)
                          }
                          name="completed"
                        />
                      </td>
                      <td className="px-2 py-2 text-left  border-b border-gray-3">
                        {item.taskName}
                      </td>
                      <td className="px-2 py-2 text-left border-b border-gray-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={item.image}
                            alt={item.taskName}
                            className="w-10 h-10 rounded-full"
                          />
                          <p>{item.patientName}</p>

                          <Link
                            to={`/admin/patients/3`}
                            className="text-primary-blue cursor-pointer text-xs ml-2"
                          >
                            View file
                          </Link>
                        </div>
                      </td>
                      <td className="px-2 py-2 text-left  border-b border-gray-3">
                        <StatusPill
                          label={item.priority}
                          variant={getPriorityVariant(item.priority)}
                          size="md"
                        />
                      </td>
                      <td className="px-2 py-2 text-left  border-b border-gray-3">
                        {item.dueDate}
                      </td>
                      <td className="px-2 py-2 text-left  border-b border-gray-3">
                        {item.time}
                      </td>
                      <td className="px-2 py-2 text-left  border-b border-gray-3">
                        <StatusPill
                          label={item.status}
                          variant={getStatusVariant(item.status)}
                          size="md"
                        />
                      </td>

                      <td className="px-2 py-2 text-center  border-b border-gray-3 space-x-2">
                        <button
                          className="bg-primary-white text-primary-blue px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50 transition"
                          disabled={item.status === "completed"}
                          onClick={() => {
                            // Handle view action
                            alert("View clicked for " + item.patientName);
                          }}
                        >
                          View
                        </button>
                        <button
                          className="bg-primary-blue text-white px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50 hover:bg-blue-700 transition"
                          disabled={
                            item.status !== "active" &&
                            item.status !== "pending"
                          }
                          onClick={() => handleAcceptTask(index)}
                        >
                          {item.status === "active" || item.status === "pending"
                            ? "Accept"
                            : "Accepted"}
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

export default Tasks;
