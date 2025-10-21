import Pagination from "@/components/ui/Pagination";
import { notificationsData } from "@/constants/admin";
import React, { useState, useMemo } from "react";
import { MdCancel, MdSend, MdClose } from "react-icons/md";

// Type definitions
interface Notification {
  id: number;
  patientName: string;
  message: string;
  date: string;
  time: string;
  type: string;
  status: "read" | "unread";
  category: "today" | "week" | "month" | "year";
  email: string;
  phone: string;
}

interface ReplyData {
  notificationId: number;
  patientName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  method: "email" | "sms" | "both";
}

const Notifications = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "today" | "week" | "month" | "year"
  >("all");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] =
    useState<Notification[]>(notificationsData);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [currentReply, setCurrentReply] = useState<ReplyData | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [replySubject, setReplySubject] = useState("");
  const [replyMethod, setReplyMethod] = useState<"email" | "sms" | "both">(
    "email"
  );
  const [isSending, setIsSending] = useState(false);

  // Filter notifications based on active filters, date, and search
  const filteredNotifications = useMemo(() => {
    let filtered = notifications;

    // Filter by time period
    if (activeFilter !== "all") {
      filtered = filtered.filter(
        (notification) => notification.category === activeFilter
      );
    }

    // Filter by selected date
    if (selectedDate) {
      filtered = filtered.filter(
        (notification) => notification.date === selectedDate
      );
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (notification) =>
          notification.patientName.toLowerCase().includes(term) ||
          notification.message.toLowerCase().includes(term) ||
          notification.type.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [notifications, activeFilter, selectedDate, searchTerm]);

  // Pagination calculations
  const totalItems = filteredNotifications.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredNotifications.slice(startIndex, endIndex);

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

  const handleReply = (notification: Notification) => {
    setCurrentReply({
      notificationId: notification.id,
      patientName: notification.patientName,
      email: notification.email,
      phone: notification.phone,
      subject: `Re: ${notification.type} - ${notification.date}`,
      message: "",
      method: "email",
    });
    setReplySubject(`Re: ${notification.type} - ${notification.date}`);
    setReplyMessage("");
    setReplyMethod("email");
    setShowReplyModal(true);
  };

  const handleSendReply = async () => {
    if (!currentReply || !replyMessage.trim()) return;

    setIsSending(true);

    try {
      // Simulate API call to send reply
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Here you would typically make an API call to:
      // - Send email
      // - Send SMS
      // - Save the reply to your database

      console.log("Sending reply:", {
        ...currentReply,
        subject: replySubject,
        message: replyMessage,
        method: replyMethod,
      });

      // Mark notification as read and add reply record
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === currentReply.notificationId
            ? { ...notification, status: "read" as const }
            : notification
        )
      );

      // Show success message (you can replace this with a toast notification)
      alert(`Reply sent successfully via ${replyMethod.toUpperCase()}!`);

      // Close modal
      setShowReplyModal(false);
      setCurrentReply(null);
      setReplyMessage("");
      setReplySubject("");
    } catch (error) {
      console.error("Failed to send reply:", error);
      alert("Failed to send reply. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleDelete = (notificationId: number) => {
    if (window.confirm("Are you sure you want to delete this notification?")) {
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== notificationId)
      );
    }
  };

  const markAsRead = (notificationId: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, status: "read" as const }
          : notification
      )
    );
  };

  const closeReplyModal = () => {
    setShowReplyModal(false);
    setCurrentReply(null);
    setReplyMessage("");
    setReplySubject("");
  };

  // Get button styles based on active state
  const getFilterButtonClass = (filter: string) => {
    const baseClass =
      "px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50 text-sm hover:bg-primary-blue hover:text-white transition";
    return activeFilter === filter
      ? `text-white bg-primary-blue ${baseClass}`
      : `text-black bg-gray-1 ${baseClass}`;
  };

  // Get status badge style
  const getStatusBadge = (status: "read" | "unread") => {
    return status === "unread"
      ? "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-bold"
      : "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold";
  };

  return (
    <main>
      <div className="py-3 px-6 bg-light-blue text-black mb-4">
        <h1 className="font-lora text-2xl font-bold">Notifications</h1>
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
        Showing {currentItems.length} of {totalItems} notifications
        {activeFilter !== "all" && ` from ${activeFilter}`}
        {selectedDate && ` on ${selectedDate}`}
        {searchTerm && ` matching "${searchTerm}"`}
      </div>

      <div className="p-4">
        <div className="space-y-4 p-4 bg-off-white rounded-2xl max-h-[70vh] overflow-y-auto scrollbar-hide">
          <div className="bg-[#F0FAFF] p-4 rounded-xl shadow">
            {/* Search Bar */}
            <div className="mb-6 w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search by patient name, message, or type..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
            </div>

            {/* Notifications List */}
            <div className="space-y-4">
              {currentItems.length > 0 ? (
                currentItems.map((notification) => (
                  <div
                    key={notification.id}
                    className={`border-l-4 rounded-2xl p-4 flex items-start justify-between transition-all duration-200 ${
                      notification.status === "unread"
                        ? "bg-red-50 border-red-500 shadow-sm"
                        : "bg-white border-gray-300"
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <p className="text-lg font-semibold">
                          {notification.patientName}
                        </p>
                        <span className={getStatusBadge(notification.status)}>
                          {notification.status}
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {notification.type}
                        </span>
                      </div>
                      <p className="text-gray-700">{notification.message}</p>
                      <p className="text-gray-500 text-sm">
                        <span>Date: {notification.date}</span> |{" "}
                        <span>Time: {notification.time}</span>
                      </p>
                      <div className="flex gap-4 text-xs text-gray-600">
                        <span>Email: {notification.email}</span>
                        <span>Phone: {notification.phone}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReply(notification);
                        }}
                        className="bg-primary-blue text-white rounded-2xl py-2 px-4 hover:bg-blue-700 transition-colors text-sm"
                      >
                        Reply
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(notification.id);
                        }}
                        className="flex items-center justify-center bg-red-500 text-white rounded-2xl w-8 h-8 hover:bg-red-600 transition-colors"
                        title="Delete notification"
                      >
                        <MdCancel size={16} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 bg-white rounded-xl">
                  <p className="text-gray-500 text-lg">
                    No notifications found
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    {searchTerm || selectedDate || activeFilter !== "all"
                      ? "Try changing your filters or search term"
                      : "You're all caught up!"}
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

      {/* Reply Modal */}
      {showReplyModal && currentReply && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Send Reply</h2>
                <button
                  onClick={closeReplyModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <MdClose size={24} />
                </button>
              </div>

              {/* Recipient Info */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-lg mb-2">
                  Replying to: {currentReply.patientName}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium">Email:</span>{" "}
                    {currentReply.email}
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span>{" "}
                    {currentReply.phone}
                  </div>
                </div>
              </div>

              {/* Reply Method */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Send via:
                </label>
                <div className="flex gap-4">
                  {["email", "sms", "both"].map((method) => (
                    <label key={method} className="flex items-center">
                      <input
                        type="radio"
                        value={method}
                        checked={replyMethod === method}
                        onChange={(e) =>
                          setReplyMethod(
                            e.target.value as "email" | "sms" | "both"
                          )
                        }
                        className="mr-2"
                      />
                      <span className="capitalize">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Subject */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject:
                </label>
                <input
                  type="text"
                  value={replySubject}
                  onChange={(e) => setReplySubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  placeholder="Enter subject..."
                />
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message:
                </label>
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue resize-none"
                  placeholder="Type your reply message here..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={closeReplyModal}
                  disabled={isSending}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendReply}
                  disabled={isSending || !replyMessage.trim()}
                  className="flex items-center gap-2 px-6 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <MdSend size={16} />
                      Send Reply
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Notifications;
