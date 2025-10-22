import CustomButton from "@/components/ui/Button";
import CustomInput from "@/components/ui/Input";
import CustomDropdown from "@/components/ui/Select";
import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

interface Prescription {
  id: string;
  dateIssued: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  route: string;
  prescribedBy: string;
  instructions?: string;
}

const Prescriptions = () => {
  const tableHeaders = [
    "Date Issued",
    "Medication",
    "Dosage",
    "Frequency",
    "Duration",
    "Route",
    "Prescribed by",
  ];

  // Sample initial prescriptions
  const initialPrescriptions: Prescription[] = [
    {
      id: "1",
      dateIssued: "12 Aug 2025",
      medication: "Amoxilin",
      dosage: "1 capsule 500mg",
      frequency: "3 times daily",
      duration: "5 days",
      route: "Oral",
      prescribedBy: "Dr. John Dou",
    },
  ];

  const [prescriptions, setPrescriptions] =
    useState<Prescription[]>(initialPrescriptions);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
    route: "",
    prescribedBy: "",
    instructions: "",
  });

  // Dropdown options
  const frequencyOptions = [
    { value: "once-daily", label: "Once daily" },
    { value: "twice-daily", label: "Twice daily" },
    { value: "three-times-daily", label: "Three times daily" },
    { value: "four-times-daily", label: "Four times daily" },
    { value: "every-4-hours", label: "Every 4 hours" },
    { value: "every-6-hours", label: "Every 6 hours" },
    { value: "every-8-hours", label: "Every 8 hours" },
    { value: "every-12-hours", label: "Every 12 hours" },
    { value: "as-needed", label: "As needed" },
    { value: "bedtime", label: "At bedtime" },
  ];

  const routeOptions = [
    { value: "oral", label: "Oral" },
    { value: "topical", label: "Topical" },
    { value: "inhalation", label: "Inhalation" },
    { value: "injection", label: "Injection" },
    { value: "subcutaneous", label: "Subcutaneous" },
    { value: "intramuscular", label: "Intramuscular" },
    { value: "intravenous", label: "Intravenous" },
    { value: "sublingual", label: "Sublingual" },
    { value: "rectal", label: "Rectal" },
    { value: "vaginal", label: "Vaginal" },
  ];

  const durationOptions = [
    { value: "1-day", label: "1 day" },
    { value: "3-days", label: "3 days" },
    { value: "5-days", label: "5 days" },
    { value: "7-days", label: "7 days" },
    { value: "10-days", label: "10 days" },
    { value: "14-days", label: "14 days" },
    { value: "21-days", label: "21 days" },
    { value: "30-days", label: "30 days" },
    { value: "60-days", label: "60 days" },
    { value: "90-days", label: "90 days" },
    { value: "ongoing", label: "Ongoing" },
    { value: "as-needed", label: "As needed" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDropdownChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPrescription: Prescription = {
      id: isEditing ? isEditing : Date.now().toString(),
      dateIssued: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      medication: formData.medication,
      dosage: formData.dosage,
      frequency: formData.frequency,
      duration: formData.duration,
      route: formData.route,
      prescribedBy: formData.prescribedBy || "Dr. John Dou",
    };

    if (isEditing) {
      // Update existing prescription
      setPrescriptions((prev) =>
        prev.map((prescription) =>
          prescription.id === isEditing ? newPrescription : prescription
        )
      );
      setIsEditing(null);
    } else {
      // Add new prescription
      setPrescriptions((prev) => [...prev, newPrescription]);
    }

    // Reset form
    setFormData({
      medication: "",
      dosage: "",
      frequency: "",
      duration: "",
      route: "",
      prescribedBy: "",
      instructions: "",
    });
  };

  const handleEdit = (prescription: Prescription) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setFormData({
      medication: prescription.medication,
      dosage: prescription.dosage,
      frequency: prescription.frequency,
      duration: prescription.duration,
      route: prescription.route,
      prescribedBy: prescription.prescribedBy,
      instructions: "",
    });
    setIsEditing(prescription.id);
  };

  const handleDelete = (id: string) => {
    setPrescriptions((prev) =>
      prev.filter((prescription) => prescription.id !== id)
    );
  };

  const handleCancel = () => {
    setFormData({
      medication: "",
      dosage: "",
      frequency: "",
      duration: "",
      route: "",
      prescribedBy: "",
      instructions: "",
    });
    setIsEditing(null);
  };

  return (
    <div className="text-sm px-2 pb-8">
      <div className="flex items-start gap-4 h-[300px]">
        {/* Patient Info */}
        <div className="w-1/3">
          <div className="flex items-start gap-4 p-4">
            <div>
              <img
                src="https://picsum.photos/200/?random=1"
                alt="patient"
                className="rounded-full w-[150px] shadow"
              />
            </div>
            <div className="space-y-2">
              <p className="font-bold text-lg mb-4">John Carter</p>
              <p className="font-bold">Male</p>
              <p className="">Age: 45</p>
              <p className="">ID: MD/2005/12</p>
            </div>
          </div>
          <div className="p-2 font-medium text-base space-y-1">
            <p className="flex items-center gap-2">
              <FaPhoneAlt className="text-primary-blue" />
              <span>09035653117</span>
            </p>
            <p className="flex items-center gap-2">
              <MdEmail className="text-primary-blue" />
              <span>sammatt@gmail.com</span>
            </p>
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary-blue" />
              <span>12, Araromi Road, Surulere, Lagos</span>
            </p>
          </div>
        </div>

        {/* Prescription Form */}
        <div className="bg-lighter-blue rounded-lg shadow-md p-4 h-full overflow-y-auto scrollbar-hide w-2/3">
          <form onSubmit={handleSubmit}>
            <p className="font-bold text-lg mb-4">
              {isEditing ? "Edit Prescription" : "Add New Prescription"}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <CustomInput
                name="medication"
                label="Medication Name"
                placeholder="Enter medication name"
                value={formData.medication}
                onChange={handleInputChange}
                required
              />
              <CustomInput
                name="dosage"
                label="Dosage"
                placeholder="e.g., 500mg, 1 tablet"
                value={formData.dosage}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <CustomDropdown
                name="frequency"
                label="Frequency"
                placeholder="Select frequency"
                options={frequencyOptions}
                onSelect={handleDropdownChange}
                defaultOption={formData.frequency}
              />
              <CustomDropdown
                name="route"
                label="Route"
                placeholder="Select route"
                options={routeOptions}
                onSelect={handleDropdownChange}
                defaultOption={formData.route}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <CustomDropdown
                name="duration"
                label="Duration"
                placeholder="Select duration"
                options={durationOptions}
                onSelect={handleDropdownChange}
                defaultOption={formData.duration}
              />
              <CustomInput
                name="prescribedBy"
                label="Prescribed By"
                placeholder="Enter prescriber's name"
                value={formData.prescribedBy}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-4">
              <CustomInput
                name="instructions"
                label="Additional Instructions (Optional)"
                placeholder="Enter any additional instructions"
                type="textarea"
                rows={3}
                value={formData.instructions}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex gap-2">
              <CustomButton type="submit" size="sm">
                {isEditing ? "Update Prescription" : "Add Prescription"}
              </CustomButton>
              {isEditing && (
                <CustomButton
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleCancel}
                >
                  Cancel
                </CustomButton>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Prescriptions Table */}
      <div className="mt-8">
        <div className="bg-[#F0FAFF] p-4 rounded-xl shadow">
          <div className="flex justify-between items-center mb-2">
            <h4 className="mb-4 text-[#020714] font-lora font-semibold text-lg">
              Prescription History
            </h4>
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
                  <th className="px-2 py-4 text-left border-b border-gray-3 font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((prescription) => (
                  <tr
                    key={prescription.id}
                    className="text-xs font-bold hover:bg-gray-100"
                  >
                    <td className="px-2 py-2 text-left border-b border-gray-3">
                      {prescription.dateIssued}
                    </td>
                    <td className="px-2 py-2 text-left border-b border-gray-3">
                      {prescription.medication}
                    </td>
                    <td className="px-2 py-2 text-left border-b border-gray-3">
                      {prescription.dosage}
                    </td>
                    <td className="px-2 py-2 text-left border-b border-gray-3">
                      {frequencyOptions.find(
                        (opt) => opt.value === prescription.frequency
                      )?.label || prescription.frequency}
                    </td>
                    <td className="px-2 py-2 text-left border-b border-gray-3">
                      {durationOptions.find(
                        (opt) => opt.value === prescription.duration
                      )?.label || prescription.duration}
                    </td>
                    <td className="px-2 py-2 text-left border-b border-gray-3">
                      {routeOptions.find(
                        (opt) => opt.value === prescription.route
                      )?.label || prescription.route}
                    </td>
                    <td className="px-2 py-2 text-left border-b border-gray-3">
                      {prescription.prescribedBy}
                    </td>
                    <td className="px-2 py-2 text-left border-b border-gray-3">
                      <div className="flex items-center gap-2">
                        <CustomButton
                          size="sm"
                          onClick={() => {
                            // Handle view action
                            console.log("View prescription:", prescription);
                          }}
                        >
                          View
                        </CustomButton>
                        <CustomButton
                          variant="secondary"
                          size="sm"
                          onClick={() => handleEdit(prescription)}
                        >
                          Edit
                        </CustomButton>
                        <CustomButton
                          variant="danger"
                          size="sm"
                          className="text-red-500"
                          onClick={() => handleDelete(prescription.id)}
                        >
                          Delete
                        </CustomButton>
                      </div>
                    </td>
                  </tr>
                ))}
                {prescriptions.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-2 py-4 text-center border-b border-gray-3"
                    >
                      No prescriptions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prescriptions;
