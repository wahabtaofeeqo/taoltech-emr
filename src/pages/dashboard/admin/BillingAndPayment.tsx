import Pagination from "@/components/ui/Pagination";
import CustomRadio from "@/components/ui/Radio";
import StatusPill, { StatusVariant } from "@/components/ui/StatusPill";
import { billingData } from "@/constants/admin";
import React, { useState, useMemo } from "react";

// Define types for billing data
export interface BillingItem {
  id: string;
  invoiceNo: string;
  date: string;
  description: string;
  amount: number;
  status: "pending" | "paid" | "overdue";
  patientName: string;
  serviceType: string;
}

const BillingAndPayment = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "today" | "week" | "month" | "year"
  >("all");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedInvoice, setSelectedInvoice] = useState<BillingItem | null>(
    null
  );
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "transfer" | "cash"
  >("card");

  // Filter billing data based on active filters
  const filteredData = useMemo(() => {
    let filtered = billingData;

    // Filter by time period
    if (activeFilter !== "all") {
      // In a real app, you would filter by actual dates
      // This is a simplified version
      filtered = filtered.filter((item) => {
        // Add your date filtering logic here based on activeFilter
        return true; // Placeholder
      });
    }

    // Filter by selected date
    if (selectedDate) {
      filtered = filtered.filter((item) => item.date.includes(selectedDate));
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.patientName.toLowerCase().includes(term) ||
          item.invoiceNo.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [billingData, activeFilter, selectedDate, statusFilter, searchTerm]);

  // Pagination calculations
  const totalItems = filteredData.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  // Handler functions
  const handleFilterChange = (
    filter: "all" | "today" | "week" | "month" | "year"
  ) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setCurrentPage(1);
  };

  const clearDateFilter = () => {
    setSelectedDate("");
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleDownloadReceipt = (invoice: BillingItem) => {
    // Implement receipt download logic
    console.log("Downloading receipt for:", invoice.invoiceNo);
    // Generate and download PDF receipt
    alert(`Receipt for ${invoice.invoiceNo} downloaded successfully!`);
  };

  const handlePayNow = (invoice: BillingItem) => {
    setSelectedInvoice(invoice);
    setPaymentAmount(invoice.amount);
    setShowPaymentModal(true);
  };

  const handleProcessPayment = async () => {
    if (!selectedInvoice) return;

    // Simulate payment processing
    try {
      // In a real app, you would integrate with a payment gateway here
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Processing payment:", {
        invoice: selectedInvoice.invoiceNo,
        amount: paymentAmount,
        method: paymentMethod,
      });

      // Update invoice status to paid
      // In a real app, you would update this in your database
      alert(
        `Payment of ₦${paymentAmount.toLocaleString()} processed successfully for ${
          selectedInvoice.invoiceNo
        }!`
      );

      setShowPaymentModal(false);
      setSelectedInvoice(null);
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  const getStatusVariant = (status: string): StatusVariant => {
    switch (status) {
      case "paid":
        return "success";
      case "pending":
        return "warning";
      case "overdue":
        return "error";
      default:
        return "default";
    }
  };

  const getActionButton = (item: BillingItem) => {
    if (item.status === "paid") {
      return (
        <button
          onClick={() => handleDownloadReceipt(item)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-700 transition text-sm"
        >
          Download Receipt
        </button>
      );
    } else {
      return (
        <button
          onClick={() => handlePayNow(item)}
          className="bg-primary-blue text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition text-sm"
        >
          Pay Now
        </button>
      );
    }
  };

  // Get filter button styles
  const getFilterButtonClass = (filter: string) => {
    const baseClass =
      "px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50 text-sm hover:bg-primary-blue hover:text-white transition";
    return activeFilter === filter
      ? `text-white bg-primary-blue ${baseClass}`
      : `text-black bg-gray-1 ${baseClass}`;
  };

  const tableHeaders = [
    "Invoice No",
    "Date",
    "Patient Name",
    "Description/Service",
    "Amount",
    "Status",
    "Action",
  ];

  return (
    <main>
      <div className="py-3 px-6 bg-light-blue text-black mb-4">
        <h1 className="font-lora text-2xl font-bold">Billing & Payments</h1>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 px-4 flex-wrap">
        <button
          className={getFilterButtonClass("all")}
          onClick={() => handleFilterChange("all")}
        >
          All
        </button>
        <button
          className={getFilterButtonClass("today")}
          onClick={() => handleFilterChange("today")}
        >
          Today
        </button>
        <button
          className={getFilterButtonClass("week")}
          onClick={() => handleFilterChange("week")}
        >
          Week
        </button>
        <button
          className={getFilterButtonClass("month")}
          onClick={() => handleFilterChange("month")}
        >
          Month
        </button>
        <button
          className={getFilterButtonClass("year")}
          onClick={() => handleFilterChange("year")}
        >
          Year
        </button>

        {/* Date Filter */}
        <div className="relative">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className="text-black bg-gray-1 px-4 py-2 rounded-lg cursor-pointer text-sm hover:bg-primary-blue hover:text-white transition min-w-[150px]"
          />
          {selectedDate && (
            <button
              onClick={clearDateFilter}
              className="absolute -right-2 -top-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-600"
              title="Clear date filter"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Results Summary */}
      <div className="px-4 py-2 text-sm text-gray-600">
        Showing {currentItems.length} of {totalItems} invoices
        {activeFilter !== "all" && ` from ${activeFilter}`}
        {selectedDate && ` on ${selectedDate}`}
        {statusFilter !== "all" && ` with status: ${statusFilter}`}
        {searchTerm && ` matching "${searchTerm}"`}
      </div>

      <div className="p-4">
        <div className="space-y-4 p-4 bg-off-white rounded-2xl max-h-[70vh] overflow-y-auto scrollbar-hide">
          <div className="bg-[#F0FAFF] p-4 rounded-xl shadow">
            {/* Search and Filter Section */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 mb-6">
              <div className="w-full md:w-1/2">
                <input
                  type="text"
                  placeholder="Search by invoice number, patient name, or service..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>
              <div className="w-full md:w-1/2">
                <CustomRadio
                  label="Filter by Status:"
                  name="statusFilter"
                  value={statusFilter}
                  onChange={handleStatusChange}
                  options={[
                    { value: "all", label: "All" },
                    { value: "pending", label: "Pending" },
                    { value: "paid", label: "Paid" },
                    { value: "overdue", label: "Overdue" },
                  ]}
                  orientation="horizontal"
                  size="sm"
                />
              </div>
            </div>

            {/* Table */}
            <div className="rounded-xl overflow-hidden bg-white">
              {currentItems.length > 0 ? (
                <table className="min-w-full rounded-lg font-manrope">
                  <thead>
                    <tr className="bg-gray-50">
                      {tableHeaders.map((header) => (
                        <th
                          key={header}
                          className="px-4 py-3 text-left border-b border-gray-3 font-semibold text-gray-700"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item, index) => (
                      <tr
                        key={item.id}
                        className="text-sm hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3 text-left border-b border-gray-3 font-medium">
                          {item.invoiceNo}
                        </td>
                        <td className="px-4 py-3 text-left border-b border-gray-3">
                          {item.date}
                        </td>
                        <td className="px-4 py-3 text-left border-b border-gray-3">
                          {item.patientName}
                        </td>
                        <td className="px-4 py-3 text-left border-b border-gray-3">
                          {item.description}
                        </td>
                        <td className="px-4 py-3 text-left border-b border-gray-3 font-semibold">
                          ₦{item.amount.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-left border-b border-gray-3">
                          <StatusPill
                            label={
                              item.status.charAt(0).toUpperCase() +
                              item.status.slice(1)
                            }
                            variant={getStatusVariant(item.status)}
                            size="sm"
                          />
                        </td>
                        <td className="px-4 py-3 text-center border-b border-gray-3">
                          {getActionButton(item)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-8 bg-white rounded-xl">
                  <p className="text-gray-500 text-lg">No invoices found</p>
                  <p className="text-gray-400 text-sm mt-2">
                    {searchTerm || selectedDate || statusFilter !== "all"
                      ? "Try changing your filters or search term"
                      : "No billing records available"}
                  </p>
                </div>
              )}
            </div>

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

      {/* Payment Modal */}
      {showPaymentModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Process Payment
              </h2>

              {/* Invoice Details */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-lg mb-2">Invoice Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Invoice No:</span>
                    <span className="font-medium">
                      {selectedInvoice.invoiceNo}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Patient:</span>
                    <span className="font-medium">
                      {selectedInvoice.patientName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span className="font-medium">
                      {selectedInvoice.description}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-semibold text-lg">
                      ₦{selectedInvoice.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Method:
                </label>
                <div className="space-y-2">
                  {["card", "transfer", "cash"].map((method) => (
                    <label key={method} className="flex items-center">
                      <input
                        type="radio"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) =>
                          setPaymentMethod(
                            e.target.value as "card" | "transfer" | "cash"
                          )
                        }
                        className="mr-3"
                      />
                      <span className="capitalize">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProcessPayment}
                  className="px-6 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Process Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default BillingAndPayment;
