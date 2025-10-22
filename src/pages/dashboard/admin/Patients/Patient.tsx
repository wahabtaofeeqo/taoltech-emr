import History from "@/components/common/Admin/Patients/History";
import Laboratory from "@/components/common/Admin/Patients/Laboratory";
import PatientInfo from "@/components/common/Admin/Patients/PatientInfo";
import Prescriptions from "@/components/common/Admin/Patients/Prescriptions";
import Visits from "@/components/common/Admin/Patients/Visits";
import React, { useState } from "react";
import { GoChevronLeft } from "react-icons/go";

const Patient = () => {
  const [activeTab, setActiveTab] = useState("info");

  const tabs = [
    { id: "info", label: "Patient Information" },
    { id: "prescription", label: "Prescriptions" },
    { id: "lab", label: "Lab & Attachments" },
    { id: "visits", label: "Visits/Appointments" },
    { id: "history", label: "Medical History" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "info":
        return <PatientInfo />;
      case "prescription":
        return <Prescriptions />;
      case "lab":
        return <Laboratory />;
      case "visits":
        return <Visits />;
      case "history":
        return <History />;
      default:
        return null;
    }
  };

  return (
    <main>
      <div className="py-3 px-6 bg-light-blue text-black mb-4">
        <h1 className="font-lora text-2xl font-bold">
          Patient File{" "}
          <span className="text-sm font-manrope"> - Sam Tali/PCN/2005/002</span>
        </h1>
      </div>
      <div className="flex items-center gap-2 px-4">
        <button className="flex items-center gap-2 font-semibold text-sm cursor-pointer">
          <GoChevronLeft />
          <span>Back to Patients List</span>
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between border-b border-gray-200 bg-[#F0FAFF] p-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 font-medium text-sm transition-colors duration-200 rounded cursor-pointer ${
                activeTab === tab.id
                  ? "text-primary-blue  bg-white font-bold"
                  : "text-gray-3 hover:text-primary-blue hover:bg-blue-50"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="space-y-4  p-2  rounded-2xl max-h-[70vh] overflow-y-auto scrollbar-hide">
          {renderTabContent()}
        </div>
      </div>
    </main>
  );
};

export default Patient;
