import Pagination from "@/components/ui/Pagination";
import StatusPill, { StatusVariant } from "@/components/ui/StatusPill";
import CustomButton from "@/components/ui/Button";
import React, { useState, useMemo } from "react";
import {
  MdSearch,
  MdAdd,
  MdEdit,
  MdDelete,
  MdLocalPharmacy,
  MdInventory,
  MdReceipt,
} from "react-icons/md";

// Types
interface Medication {
  id: string;
  name: string;
  genericName: string;
  category: string;
  stock: number;
  price: number;
  expiryDate: string;
  supplier: string;
  status: "in_stock" | "low_stock" | "out_of_stock";
  minStockLevel: number;
}

interface Prescription {
  id: string;
  patientName: string;
  doctorName: string;
  medications: PrescribedMedication[];
  date: string;
  status: "pending" | "filled" | "dispensed" | "cancelled";
  totalAmount: number;
}

interface PrescribedMedication {
  medicationId: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: number;
  price: number;
}

// Mock Data
const medicationsData: Medication[] = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    genericName: "Acetaminophen",
    category: "Analgesic",
    stock: 150,
    price: 250,
    expiryDate: "2026-12-31",
    supplier: "Pharma Ltd",
    status: "in_stock",
    minStockLevel: 50,
  },
  {
    id: "2",
    name: "Amoxicillin 250mg",
    genericName: "Amoxicillin",
    category: "Antibiotic",
    stock: 25,
    price: 1200,
    expiryDate: "2025-06-30",
    supplier: "MediCorp",
    status: "low_stock",
    minStockLevel: 30,
  },
  {
    id: "3",
    name: "Insulin Glargine",
    genericName: "Insulin Glargine",
    category: "Diabetes",
    stock: 0,
    price: 4500,
    expiryDate: "2025-09-15",
    supplier: "BioPharm",
    status: "out_of_stock",
    minStockLevel: 20,
  },
  {
    id: "4",
    name: "Atorvastatin 20mg",
    genericName: "Atorvastatin",
    category: "Cholesterol",
    stock: 80,
    price: 800,
    expiryDate: "2026-03-20",
    supplier: "Pharma Ltd",
    status: "in_stock",
    minStockLevel: 25,
  },
  {
    id: "5",
    name: "Ventolin Inhaler",
    genericName: "Salbutamol",
    category: "Respiratory",
    stock: 15,
    price: 3200,
    expiryDate: "2025-11-30",
    supplier: "Respire Med",
    status: "low_stock",
    minStockLevel: 20,
  },
];

const prescriptionsData: Prescription[] = [
  {
    id: "RX001",
    patientName: "John Doe",
    doctorName: "Dr. Sarah Smith",
    medications: [
      {
        medicationId: "1",
        name: "Paracetamol 500mg",
        dosage: "500mg",
        frequency: "3 times daily",
        duration: "5 days",
        quantity: 15,
        price: 250,
      },
    ],
    date: "2024-01-15",
    status: "pending",
    totalAmount: 3750,
  },
  {
    id: "RX002",
    patientName: "Emily Johnson",
    doctorName: "Dr. Michael Brown",
    medications: [
      {
        medicationId: "2",
        name: "Amoxicillin 250mg",
        dosage: "250mg",
        frequency: "2 times daily",
        duration: "7 days",
        quantity: 14,
        price: 1200,
      },
      {
        medicationId: "1",
        name: "Paracetamol 500mg",
        dosage: "500mg",
        frequency: "3 times daily",
        duration: "3 days",
        quantity: 9,
        price: 250,
      },
    ],
    date: "2024-01-14",
    status: "filled",
    totalAmount: 20100,
  },
];

const Pharmacy = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState<
    "inventory" | "prescriptions" | "orders"
  >("inventory");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddMedication, setShowAddMedication] = useState(false);
  const [selectedMedication, setSelectedMedication] =
    useState<Medication | null>(null);
  const [newMedication, setNewMedication] = useState<Partial<Medication>>({
    name: "",
    genericName: "",
    category: "",
    stock: 0,
    price: 0,
    expiryDate: "",
    supplier: "",
    minStockLevel: 10,
  });

  // Get unique categories for filter
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(medicationsData.map((med) => med.category)),
    ];
    return ["all", ...uniqueCategories];
  }, []);

  // Filter medications
  const filteredMedications = useMemo(() => {
    let filtered = medicationsData;

    if (searchTerm) {
      filtered = filtered.filter(
        (med) =>
          med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          med.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          med.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((med) => med.category === categoryFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((med) => med.status === statusFilter);
    }

    return filtered;
  }, [searchTerm, categoryFilter, statusFilter]);

  // Filter prescriptions
  const filteredPrescriptions = useMemo(() => {
    let filtered = prescriptionsData;

    if (searchTerm) {
      filtered = filtered.filter(
        (pres) =>
          pres.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pres.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pres.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm]);

  // Pagination calculations
  const currentData =
    activeTab === "inventory" ? filteredMedications : filteredPrescriptions;
  const totalItems = currentData.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = currentData.slice(startIndex, endIndex);

  // Handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleAddMedication = () => {
    // In real app, this would make an API call
    console.log("Adding medication:", newMedication);
    setShowAddMedication(false);
    setNewMedication({
      name: "",
      genericName: "",
      category: "",
      stock: 0,
      price: 0,
      expiryDate: "",
      supplier: "",
      minStockLevel: 10,
    });
  };

  const handleUpdateStock = (medicationId: string, newStock: number) => {
    // In real app, this would update the database
    console.log(`Updating stock for ${medicationId} to ${newStock}`);
  };

  const getStatusVariant = (status: string): StatusVariant => {
    switch (status) {
      case "in_stock":
        return "success";
      case "low_stock":
        return "warning";
      case "out_of_stock":
        return "error";
      case "pending":
        return "warning";
      case "filled":
        return "info";
      case "dispensed":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status: string) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const renderInventoryTable = () => (
    <div className="rounded-xl overflow-hidden bg-white">
      <table className="min-w-full rounded-lg font-manrope">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-3 text-left border-b border-gray-3 font-semibold text-gray-700">
              Medication
            </th>
            <th className="px-4 py-3 text-left border-b border-gray-3 font-semibold text-gray-700">
              Category
            </th>
            <th className="px-4 py-3 text-left border-b border-gray-3 font-semibold text-gray-700">
              Stock
            </th>
            <th className="px-4 py-3 text-left border-b border-gray-3 font-semibold text-gray-700">
              Price
            </th>
            <th className="px-4 py-3 text-left border-b border-gray-3 font-semibold text-gray-700">
              Expiry Date
            </th>
            <th className="px-4 py-3 text-left border-b border-gray-3 font-semibold text-gray-700">
              Status
            </th>
            <th className="px-4 py-3 text-left border-b border-gray-3 font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((medication) => (
            <tr
              key={medication.id}
              className="text-sm hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 py-3 text-left border-b border-gray-3">
                <div>
                  <p className="font-semibold">{medication.name}</p>
                  <p className="text-gray-500 text-xs">
                    {medication.genericName}
                  </p>
                </div>
              </td>
              <td className="px-4 py-3 text-left border-b border-gray-3">
                {medication.category}
              </td>
              <td className="px-4 py-3 text-left border-b border-gray-3">
                <div className="flex items-center gap-2">
                  <span
                    className={
                      medication.stock <= medication.minStockLevel
                        ? "text-red-600 font-semibold"
                        : ""
                    }
                  >
                    {medication.stock}
                  </span>
                  {medication.stock <= medication.minStockLevel && (
                    <span className="text-xs text-red-500">(Low)</span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 text-left border-b border-gray-3">
                ₦{medication.price.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-left border-b border-gray-3">
                {medication.expiryDate}
              </td>
              <td className="px-4 py-3 text-left border-b border-gray-3">
                <StatusPill
                  label={getStatusLabel(medication.status)}
                  variant={getStatusVariant(medication.status)}
                  size="sm"
                />
              </td>
              <td className="px-4 py-3 text-left border-b border-gray-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedMedication(medication)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <MdEdit size={16} />
                  </button>
                  <button
                    onClick={() =>
                      handleUpdateStock(medication.id, medication.stock + 10)
                    }
                    className="text-green-600 hover:text-green-800 transition-colors"
                  >
                    Restock
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderPrescriptionsTable = () => (
    <div className="rounded-xl overflow-hidden bg-white">
      <table className="min-w-full rounded-lg font-manrope">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-3 text-left border-b border-gray-3 font-semibold text-gray-700">
              Prescription ID
            </th>
            <th className="px-4 py-3 text-left border-b border-gray-3 font-semibold text-gray-700">
              Patient
            </th>
            <th className="px-4 py-3 text-left border-b border-gray-3 font-semibold text-gray-700">
              Doctor
            </th>
            <th className="px-4 py-3 text-left border-b border-gray-3 font-semibold text-gray-700">
              Date
            </th>
            <th className="px-4 py-3 text-left border-b border-gray-3 font-semibold text-gray-700">
              Medications
            </th>
            <th className="px-4 py-3 text-left border-b border-gray-3 font-semibold text-gray-700">
              Total Amount
            </th>
            <th className="px-4 py-3 text-left border-b border-gray-3 font-semibold text-gray-700">
              Status
            </th>
            <th className="px-4 py-3 text-left border-b border-gray-3 font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((prescription) => (
            <tr
              key={prescription.id}
              className="text-sm hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 py-3 text-left border-b border-gray-3 font-medium">
                {prescription.id}
              </td>
              <td className="px-4 py-3 text-left border-b border-gray-3">
                {prescription.patientName}
              </td>
              <td className="px-4 py-3 text-left border-b border-gray-3">
                {prescription.doctorName}
              </td>
              <td className="px-4 py-3 text-left border-b border-gray-3">
                {prescription.date}
              </td>
              <td className="px-4 py-3 text-left border-b border-gray-3">
                <div className="space-y-1">
                  {prescription.medications.map((med, index) => (
                    <div key={index} className="text-xs">
                      {med.name} - {med.quantity}x
                    </div>
                  ))}
                </div>
              </td>
              <td className="px-4 py-3 text-left border-b border-gray-3 font-semibold">
                ₦{prescription.totalAmount.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-left border-b border-gray-3">
                <StatusPill
                  label={getStatusLabel(prescription.status)}
                  variant={getStatusVariant(prescription.status)}
                  size="sm"
                />
              </td>
              <td className="px-4 py-3 text-left border-b border-gray-3">
                <div className="flex gap-2">
                  {prescription.status === "pending" && (
                    <button className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition">
                      Fill
                    </button>
                  )}
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition">
                    View
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <main>
      <div className="py-3 px-6 bg-light-blue text-black mb-4">
        <h1 className="font-lora text-2xl font-bold">Pharmacy Management</h1>
        <p className="text-gray-600">
          Manage medications, prescriptions, and inventory
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 px-4 border-b border-gray-200">
        <button
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
            activeTab === "inventory"
              ? "border-primary-blue text-primary-blue"
              : "border-transparent text-gray-600 hover:text-primary-blue"
          }`}
          onClick={() => setActiveTab("inventory")}
        >
          <MdInventory size={20} />
          Inventory
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
            activeTab === "prescriptions"
              ? "border-primary-blue text-primary-blue"
              : "border-transparent text-gray-600 hover:text-primary-blue"
          }`}
          onClick={() => setActiveTab("prescriptions")}
        >
          <MdReceipt size={20} />
          Prescriptions
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
            activeTab === "orders"
              ? "border-primary-blue text-primary-blue"
              : "border-transparent text-gray-600 hover:text-primary-blue"
          }`}
          onClick={() => setActiveTab("orders")}
        >
          <MdLocalPharmacy size={20} />
          Orders
        </button>
      </div>

      {/* Filters and Search */}
      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <MdSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
            />
          </div>

          {activeTab === "inventory" && (
            <>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
              >
                <option value="all">All Status</option>
                <option value="in_stock">In Stock</option>
                <option value="low_stock">Low Stock</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </>
          )}

          {activeTab === "inventory" && (
            <button
              onClick={() => setShowAddMedication(true)}
              className="flex items-center gap-2 bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <MdAdd size={20} />
              Add Medication
            </button>
          )}
        </div>

        {/* Content */}
        <div className="space-y-4 p-4 bg-off-white rounded-2xl max-h-[70vh] overflow-y-auto scrollbar-hide">
          <div className="bg-[#F0FAFF] p-4 rounded-xl shadow">
            {activeTab === "inventory" && renderInventoryTable()}
            {activeTab === "prescriptions" && renderPrescriptionsTable()}
            {activeTab === "orders" && (
              <div className="text-center py-8">
                <MdLocalPharmacy
                  size={48}
                  className="mx-auto text-gray-400 mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-600">
                  Orders Management
                </h3>
                <p className="text-gray-500">
                  Manage supplier orders and purchases
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

      {/* Add Medication Modal */}
      {showAddMedication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Add New Medication
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medication Name
                  </label>
                  <input
                    type="text"
                    value={newMedication.name}
                    onChange={(e) =>
                      setNewMedication({
                        ...newMedication,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    placeholder="e.g., Paracetamol 500mg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Generic Name
                  </label>
                  <input
                    type="text"
                    value={newMedication.genericName}
                    onChange={(e) =>
                      setNewMedication({
                        ...newMedication,
                        genericName: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    placeholder="e.g., Acetaminophen"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={newMedication.category}
                    onChange={(e) =>
                      setNewMedication({
                        ...newMedication,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    placeholder="e.g., Analgesic"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₦)
                  </label>
                  <input
                    type="number"
                    value={newMedication.price}
                    onChange={(e) =>
                      setNewMedication({
                        ...newMedication,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Initial Stock
                  </label>
                  <input
                    type="number"
                    value={newMedication.stock}
                    onChange={(e) =>
                      setNewMedication({
                        ...newMedication,
                        stock: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Stock Level
                  </label>
                  <input
                    type="number"
                    value={newMedication.minStockLevel}
                    onChange={(e) =>
                      setNewMedication({
                        ...newMedication,
                        minStockLevel: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    placeholder="10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={newMedication.expiryDate}
                    onChange={(e) =>
                      setNewMedication({
                        ...newMedication,
                        expiryDate: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Supplier
                  </label>
                  <input
                    type="text"
                    value={newMedication.supplier}
                    onChange={(e) =>
                      setNewMedication({
                        ...newMedication,
                        supplier: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    placeholder="e.g., Pharma Ltd"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowAddMedication(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMedication}
                  className="px-6 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Medication
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Pharmacy;
