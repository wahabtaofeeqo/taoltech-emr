import React, { useState } from "react";
import CustomButton from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import { MdOutlineEditNote } from "react-icons/md";
import { staffData as initialStaffData } from "@/constants/admin";
import CustomToggle from "@/components/ui/Toggle";

interface Staff {
  id: string;
  name: string;
  role: string;
  image: string;
  suspension: boolean;
  assigned: boolean;
}

const StaffManagement: React.FC = () => {
  const [staffList, setStaffList] = useState<Staff[]>(initialStaffData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [showModal, setShowModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [newRole, setNewRole] = useState("");

  const roles = ["Admin", "Secretary", "Receptionist", "Nurse"];

  const totalItems = staffList.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = staffList.slice(startIndex, endIndex);

  const tableHeaders = ["S/N", "Name", "Role", "Suspension", "Change Role"];

  const handleToggleSuspension = (id: string) => {
    setStaffList((prev) =>
      prev.map((staff) =>
        staff.id === id ? { ...staff, suspension: !staff.suspension } : staff
      )
    );
  };

  const handleRemove = (id: string) => {
    setStaffList((prev) =>
      prev.map((staff) =>
        staff.id === id ? { ...staff, suspension: true } : staff
      )
    );
  };

  const handleOpenModal = (staff: Staff) => {
    setSelectedStaff(staff);
    setNewRole(staff.role);
    setShowModal(true);
  };

  const handleSaveRole = () => {
    if (selectedStaff && newRole) {
      setStaffList((prev) =>
        prev.map((staff) =>
          staff.id === selectedStaff.id ? { ...staff, role: newRole } : staff
        )
      );
    }
    setShowModal(false);
    setSelectedStaff(null);
  };

  return (
    <main className="pb-8 relative">
      <div className="py-3 px-6 bg-light-blue text-black mb-4">
        <h1 className="font-lora text-2xl font-bold">Staff Management</h1>
      </div>

      <div className="p-4">
        <div className="space-y-4 p-4 bg-off-white rounded-2xl max-h-[80vh] overflow-y-auto scrollbar-hide">
          <div className="bg-[#F0FAFF] p-4 rounded-xl shadow">
            {currentItems.length > 0 ? (
              <div className="rounded-xl overflow-hidden bg-white">
                <table className="min-w-full rounded-lg font-manrope">
                  <thead>
                    <tr>
                      {tableHeaders.map((header) => (
                        <th
                          key={header}
                          className="px-2 py-4 text-left border-b border-gray-3 font-semibold text-sm"
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
                    {currentItems.map((item, i) => (
                      <tr
                        key={item.id}
                        className="text-sm font-medium hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-2 py-3 border-b border-gray-3">
                          {startIndex + i + 1}
                        </td>

                        <td className="px-2 py-3 border-b border-gray-3">
                          <div className="flex items-center gap-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <p>{item.name}</p>
                          </div>
                        </td>

                        <td className="px-2 py-3 border-b border-gray-3">
                          {item.role}
                        </td>

                        <td className="px-2 py-3 border-b border-gray-3">
                          <CustomToggle
                            name={`suspension-${item.id}`}
                            className="text-red-200"
                            checked={!item.suspension}
                            onChange={() => handleToggleSuspension(item.id)}
                            size="md"
                          />
                        </td>

                        <td className="px-2 py-3 border-b border-gray-3">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleOpenModal(item)}
                              className="text-gray-600 hover:text-blue-600 transition"
                            >
                              <MdOutlineEditNote size={20} />
                            </button>
                            <CustomButton
                              variant="danger"
                              size="sm"
                              disabled={item.suspension}
                              onClick={() => handleRemove(item.id)}
                            >
                              {item.suspension ? "Removed" : "Remove"}
                            </CustomButton>
                          </div>
                        </td>
                        <td className="px-2 py-3 border-b border-gray-3 font-semibold">
                          <span className="text-sm text-primary-blue">
                            {item.assigned ? "Assigned" : ""}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 bg-white rounded-xl">
                <p className="text-gray-500">
                  No staff data found for the selected filters.
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

      {/* Role Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 space-y-4">
            <h2 className="text-lg font-semibold">Change Role</h2>
            <p className="text-sm text-gray-600">
              Select a new role for <strong>{selectedStaff?.name}</strong>
            </p>

            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3 pt-2">
              <CustomButton
                variant="secondary"
                size="sm"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </CustomButton>
              <CustomButton
                variant="primary"
                size="sm"
                onClick={handleSaveRole}
              >
                Save
              </CustomButton>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default StaffManagement;
