import CustomButton from "@/components/ui/Button";
import CustomInput from "@/components/ui/Input";
import CustomDropdown from "@/components/ui/Select";
import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

interface Visit {
  id: string;
  date: string;
  reason: string;
  symptoms: string;
  diagnosis: string;
  treatment: string;
  followUp: string;
  prescribedBy: string;
  notes?: string;
  visitType: string;
  status: string;
}

const Visits = () => {
  // Form state
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    reason: "",
    symptoms: "",
    diagnosis: "",
    treatment: "",
    followUp: "",
    prescribedBy: "Dr. Smith",
    notes: "",
    visitType: "",
    status: "completed",
  });

  // Sample visit records
  const [visits, setVisits] = useState<Visit[]>([
    {
      id: "1",
      date: "2024-08-14",
      reason: "Routine Checkup",
      symptoms: "Chest pain, headache, back pain",
      diagnosis: "Hypertension, Tension Headache",
      treatment: "Nitroglycerin 0.4mg - 1 tablet as needed",
      followUp: "Follow up in 3 months",
      prescribedBy: "Dr. Johnson",
      visitType: "consultation",
      status: "completed",
    },
    {
      id: "2",
      date: "2024-07-20",
      reason: "Emergency Visit",
      symptoms: "High fever, cough, difficulty breathing",
      diagnosis: "Pneumonia",
      treatment: "Antibiotics course for 7 days",
      followUp: "Follow up in 2 weeks",
      prescribedBy: "Dr. Wilson",
      visitType: "emergency",
      status: "completed",
    },
  ]);

  // Dropdown options
  const visitTypeOptions = [
    { value: "consultation", label: "Consultation" },
    { value: "emergency", label: "Emergency" },
    { value: "follow-up", label: "Follow-up" },
    { value: "routine", label: "Routine Checkup" },
    { value: "specialist", label: "Specialist Referral" },
  ];

  const statusOptions = [
    { value: "scheduled", label: "Scheduled" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const followUpOptions = [
    { value: "1-week", label: "1 week" },
    { value: "2-weeks", label: "2 weeks" },
    { value: "1-month", label: "1 month" },
    { value: "3-months", label: "3 months" },
    { value: "6-months", label: "6 months" },
    { value: "1-year", label: "1 year" },
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

    const newVisit: Visit = {
      id: isEditing ? isEditing : Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      reason: formData.reason,
      symptoms: formData.symptoms,
      diagnosis: formData.diagnosis,
      treatment: formData.treatment,
      followUp: formData.followUp,
      prescribedBy: formData.prescribedBy,
      notes: formData.notes,
      visitType: formData.visitType,
      status: formData.status,
    };

    if (isEditing) {
      // Update existing visit
      setVisits((prev) =>
        prev.map((visit) => (visit.id === isEditing ? newVisit : visit))
      );
      setIsEditing(null);
    } else {
      // Add new visit
      setVisits((prev) => [newVisit, ...prev]);
    }

    // Reset form
    setFormData({
      reason: "",
      symptoms: "",
      diagnosis: "",
      treatment: "",
      followUp: "",
      prescribedBy: "Dr. Smith",
      notes: "",
      visitType: "",
      status: "completed",
    });
  };

  const handleEdit = (visit: Visit) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setFormData({
      reason: visit.reason,
      symptoms: visit.symptoms,
      diagnosis: visit.diagnosis,
      treatment: visit.treatment,
      followUp: visit.followUp,
      prescribedBy: visit.prescribedBy,
      notes: visit.notes || "",
      visitType: visit.visitType,
      status: visit.status,
    });
    setIsEditing(visit.id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this visit record?")) {
      setVisits((prev) => prev.filter((visit) => visit.id !== id));
    }
  };

  const handleCancel = () => {
    setFormData({
      reason: "",
      symptoms: "",
      diagnosis: "",
      treatment: "",
      followUp: "",
      prescribedBy: "Dr. Smith",
      notes: "",
      visitType: "",
      status: "completed",
    });
    setIsEditing(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "scheduled":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getVisitTypeColor = (type: string) => {
    switch (type) {
      case "emergency":
        return "text-red-600";
      case "consultation":
        return "text-blue-600";
      case "follow-up":
        return "text-purple-600";
      case "routine":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="text-sm px-2 pb-8">
      <div className="grid grid-cols-3 gap-4 [300px]">
        {/* Patient Info */}
        <div className="">
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

        {/* Visit Form */}
        <div className="col-span-2 bg-lighter-blue rounded-lg shadow-md p-4 h-[300px] overflow-y-auto scrollbar-hide">
          <form onSubmit={handleSubmit}>
            <p className="font-bold text-lg mb-4">
              {isEditing ? "Edit Visit" : "Add New Visit"}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <CustomInput
                name="reason"
                label="Reason for Visit"
                placeholder="Enter reason for visit"
                value={formData.reason}
                onChange={handleInputChange}
                required
              />
              <CustomDropdown
                name="visitType"
                label="Visit Type"
                placeholder="Select visit type"
                options={visitTypeOptions}
                onSelect={handleDropdownChange}
                defaultOption={formData.visitType}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <CustomInput
                name="symptoms"
                label="Symptoms"
                placeholder="Describe symptoms"
                type="textarea"
                rows={1}
                value={formData.symptoms}
                onChange={handleInputChange}
                required
              />
              <CustomInput
                name="diagnosis"
                label="Diagnosis"
                placeholder="Enter diagnosis"
                type="textarea"
                rows={1}
                value={formData.diagnosis}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-4">
              <CustomInput
                name="treatment"
                label="Treatment Plan"
                placeholder="Describe treatment plan"
                type="textarea"
                rows={1}
                value={formData.treatment}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <CustomDropdown
                name="followUp"
                label="Follow Up"
                placeholder="Select follow up period"
                options={followUpOptions}
                onSelect={handleDropdownChange}
                defaultOption={formData.followUp}
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

            <div className="grid grid-cols-2 gap-4 mb-4">
              <CustomDropdown
                name="status"
                label="Status"
                placeholder="Select status"
                options={statusOptions}
                onSelect={handleDropdownChange}
                defaultOption={formData.status}
              />
            </div>

            <div className="mb-4">
              <CustomInput
                name="notes"
                label="Additional Notes (Optional)"
                placeholder="Enter any additional notes"
                type="textarea"
                rows={2}
                value={formData.notes}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex gap-2">
              <CustomButton type="submit" size="sm">
                {isEditing ? "Update Visit" : "Add Visit"}
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
              {isEditing && (
                <CustomButton
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(isEditing)}
                >
                  Delete
                </CustomButton>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Visit Records */}
      <div className="mt-8">
        <h4 className="mb-4 text-[#020714] font-lora font-semibold text-lg">
          Visit Records ({visits.length})
        </h4>
        <div className="space-y-4">
          {visits.map((visit) => (
            <div key={visit.id} className="bg-[#F0FAFF] p-6 rounded-xl shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <p className="font-semibold text-lg">
                    Visit on {formatDate(visit.date)}
                  </p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      visit.status
                    )}`}
                  >
                    {
                      statusOptions.find((opt) => opt.value === visit.status)
                        ?.label
                    }
                  </span>
                  <span
                    className={`text-sm font-medium ${getVisitTypeColor(
                      visit.visitType
                    )}`}
                  >
                    {
                      visitTypeOptions.find(
                        (opt) => opt.value === visit.visitType
                      )?.label
                    }
                  </span>
                </div>
                <div className="flex gap-2">
                  <CustomButton
                    variant="secondary"
                    size="sm"
                    onClick={() => handleEdit(visit)}
                  >
                    Edit
                  </CustomButton>
                  <CustomButton
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(visit.id)}
                  >
                    Delete
                  </CustomButton>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex">
                    <div className="font-medium w-40">Reason for Visit:</div>
                    <div className="text-gray-700 flex-1">{visit.reason}</div>
                  </div>
                  <div className="flex">
                    <div className="font-medium w-40">Symptoms:</div>
                    <div className="text-gray-700 flex-1">{visit.symptoms}</div>
                  </div>
                  <div className="flex">
                    <div className="font-medium w-40">Diagnosis:</div>
                    <div className="text-gray-700 flex-1">
                      {visit.diagnosis}
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex">
                    <div className="font-medium w-32">Treatment:</div>
                    <div className="text-gray-700 flex-1">
                      {visit.treatment}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="font-medium w-32">Follow up:</div>
                    <div className="text-gray-700 flex-1">{visit.followUp}</div>
                  </div>
                  <div className="flex">
                    <div className="font-medium w-32">Prescribed by:</div>
                    <div className="text-gray-700 flex-1">
                      {visit.prescribedBy}
                    </div>
                  </div>
                </div>
              </div>

              {visit.notes && (
                <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
                  <div className="font-medium mb-1">Additional Notes:</div>
                  <div className="text-gray-700 text-sm">{visit.notes}</div>
                </div>
              )}
            </div>
          ))}

          {visits.length === 0 && (
            <div className="bg-[#F0FAFF] p-8 rounded-xl shadow text-center">
              <p className="text-gray-500 text-lg">No visit records found</p>
              <p className="text-gray-400 text-sm mt-2">
                Add your first visit record using the form above
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Visits;
