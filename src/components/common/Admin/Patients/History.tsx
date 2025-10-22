import CustomButton from "@/components/ui/Button";
import CustomInput from "@/components/ui/Input";
import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

interface MedicalHistory {
  id: string;
  type: "medical" | "medication" | "social" | "past";
  allergies: string;
  immunizations: string;
  pastSurgeries: string;
  chronicConditions: string;
  currentMedications: string[];
  lifestyleFactors: string;
  occupation: string;
  livingSituation: string;
  pastMedicalConditions: string[];
  familyHistory: string;
  lastUpdated: string;
}

const MedicalHistory = () => {
  // Form state
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<
    "medical" | "medication" | "social" | "past"
  >("medical");
  const [formData, setFormData] = useState({
    allergies: "",
    immunizations: "",
    pastSurgeries: "",
    chronicConditions: "",
    currentMedications: [""],
    lifestyleFactors: "",
    occupation: "",
    livingSituation: "",
    pastMedicalConditions: [""],
    familyHistory: "",
  });

  // Sample medical history data
  const [historyData, setHistoryData] = useState<MedicalHistory[]>([
    {
      id: "1",
      type: "medical",
      allergies: "Penicillin, Peanuts",
      immunizations: "Up to date",
      pastSurgeries: "ACL Reconstruction (2018), Appendectomy (2015)",
      chronicConditions: "Hypertension, Type 2 Diabetes",
      currentMedications: [],
      lifestyleFactors: "",
      occupation: "",
      livingSituation: "",
      pastMedicalConditions: [],
      familyHistory: "",
      lastUpdated: "2024-01-15",
    },
    {
      id: "2",
      type: "medication",
      allergies: "",
      immunizations: "",
      pastSurgeries: "",
      chronicConditions: "",
      currentMedications: [
        "Metformin 500mg - twice daily",
        "Lisinopril 10mg - daily",
        "Aspirin 81mg - daily",
        "Vitamin D 1000IU - daily",
      ],
      lifestyleFactors: "",
      occupation: "",
      livingSituation: "",
      pastMedicalConditions: [],
      familyHistory: "",
      lastUpdated: "2024-01-15",
    },
    {
      id: "3",
      type: "social",
      allergies: "",
      immunizations: "",
      pastSurgeries: "",
      chronicConditions: "",
      currentMedications: [],
      lifestyleFactors:
        "Non-smoker, Occasional alcohol (1-2 drinks/week), Regular exercise",
      occupation: "Software Engineer",
      livingSituation: "Living with spouse and two children",
      pastMedicalConditions: [],
      familyHistory: "",
      lastUpdated: "2024-01-15",
    },
    {
      id: "4",
      type: "past",
      allergies: "",
      immunizations: "",
      pastSurgeries: "",
      chronicConditions: "",
      currentMedications: [],
      lifestyleFactors: "",
      occupation: "",
      livingSituation: "",
      pastMedicalConditions: [
        "Type 2 Diabetes (diagnosed 2023)",
        "Asthma (childhood, resolved)",
        "Pneumonia (2020, hospitalized)",
      ],
      familyHistory:
        "Father: Hypertension, Mother: Type 2 Diabetes, Brother: Asthma",
      lastUpdated: "2024-01-15",
    },
  ]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayInputChange = (
    index: number,
    value: string,
    field: "currentMedications" | "pastMedicalConditions"
  ) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData((prev) => ({
      ...prev,
      [field]: newArray,
    }));
  };

  const addArrayField = (
    field: "currentMedications" | "pastMedicalConditions"
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayField = (
    index: number,
    field: "currentMedications" | "pastMedicalConditions"
  ) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      [field]: newArray,
    }));
  };

  const handleSectionChange = (
    section: "medical" | "medication" | "social" | "past"
  ) => {
    setActiveSection(section);
    const existingData = historyData.find((item) => item.type === section);

    if (existingData) {
      setFormData({
        allergies: existingData.allergies || "",
        immunizations: existingData.immunizations || "",
        pastSurgeries: existingData.pastSurgeries || "",
        chronicConditions: existingData.chronicConditions || "",
        currentMedications:
          existingData.currentMedications.length > 0
            ? existingData.currentMedications
            : [""],
        lifestyleFactors: existingData.lifestyleFactors || "",
        occupation: existingData.occupation || "",
        livingSituation: existingData.livingSituation || "",
        pastMedicalConditions:
          existingData.pastMedicalConditions.length > 0
            ? existingData.pastMedicalConditions
            : [""],
        familyHistory: existingData.familyHistory || "",
      });
      setIsEditing(existingData.id);
    } else {
      setFormData({
        allergies: "",
        immunizations: "",
        pastSurgeries: "",
        chronicConditions: "",
        currentMedications: [""],
        lifestyleFactors: "",
        occupation: "",
        livingSituation: "",
        pastMedicalConditions: [""],
        familyHistory: "",
      });
      setIsEditing(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newHistory: MedicalHistory = {
      id: isEditing ? isEditing : Date.now().toString(),
      type: activeSection,
      allergies: formData.allergies,
      immunizations: formData.immunizations,
      pastSurgeries: formData.pastSurgeries,
      chronicConditions: formData.chronicConditions,
      currentMedications: formData.currentMedications.filter(
        (med) => med.trim() !== ""
      ),
      lifestyleFactors: formData.lifestyleFactors,
      occupation: formData.occupation,
      livingSituation: formData.livingSituation,
      pastMedicalConditions: formData.pastMedicalConditions.filter(
        (cond) => cond.trim() !== ""
      ),
      familyHistory: formData.familyHistory,
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    if (isEditing) {
      // Update existing history
      setHistoryData((prev) =>
        prev.map((item) => (item.id === isEditing ? newHistory : item))
      );
    } else {
      // Add new history
      setHistoryData((prev) => [...prev, newHistory]);
    }

    // Reset form
    setFormData({
      allergies: "",
      immunizations: "",
      pastSurgeries: "",
      chronicConditions: "",
      currentMedications: [""],
      lifestyleFactors: "",
      occupation: "",
      livingSituation: "",
      pastMedicalConditions: [""],
      familyHistory: "",
    });
    setIsEditing(null);
  };

  const handleCancel = () => {
    setFormData({
      allergies: "",
      immunizations: "",
      pastSurgeries: "",
      chronicConditions: "",
      currentMedications: [""],
      lifestyleFactors: "",
      occupation: "",
      livingSituation: "",
      pastMedicalConditions: [""],
      familyHistory: "",
    });
    setIsEditing(null);
  };

  const getSectionData = (
    type: "medical" | "medication" | "social" | "past"
  ) => {
    return historyData.find((item) => item.type === type);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="text-sm px-2 pb-8">
      <div className="grid grid-cols-3 gap-4 min-h-[400px]">
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

        {/* Medical History Form */}
        <div className="col-span-2 bg-lighter-blue rounded-lg shadow-md p-4 h-full overflow-y-auto scrollbar-hide">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center mb-4">
              <p className="font-bold text-lg">
                {isEditing
                  ? `Edit ${
                      activeSection.charAt(0).toUpperCase() +
                      activeSection.slice(1)
                    } History`
                  : `Add ${
                      activeSection.charAt(0).toUpperCase() +
                      activeSection.slice(1)
                    } History`}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleSectionChange("medical")}
                  className={`px-3 py-1 rounded text-xs ${
                    activeSection === "medical"
                      ? "bg-primary-blue text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Medical
                </button>
                <button
                  type="button"
                  onClick={() => handleSectionChange("medication")}
                  className={`px-3 py-1 rounded text-xs ${
                    activeSection === "medication"
                      ? "bg-primary-blue text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Medication
                </button>
                <button
                  type="button"
                  onClick={() => handleSectionChange("social")}
                  className={`px-3 py-1 rounded text-xs ${
                    activeSection === "social"
                      ? "bg-primary-blue text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Social
                </button>
                <button
                  type="button"
                  onClick={() => handleSectionChange("past")}
                  className={`px-3 py-1 rounded text-xs ${
                    activeSection === "past"
                      ? "bg-primary-blue text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Past
                </button>
              </div>
            </div>

            {activeSection === "medical" && (
              <div className="space-y-4">
                <CustomInput
                  name="allergies"
                  label="Allergies"
                  placeholder="List any allergies (e.g., Penicillin, Peanuts)"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  type="textarea"
                  rows={2}
                />
                <CustomInput
                  name="immunizations"
                  label="Immunizations"
                  placeholder="Immunization status"
                  value={formData.immunizations}
                  onChange={handleInputChange}
                />
                <CustomInput
                  name="pastSurgeries"
                  label="Past Surgeries/Operations"
                  placeholder="List past surgeries and dates"
                  value={formData.pastSurgeries}
                  onChange={handleInputChange}
                  type="textarea"
                  rows={2}
                />
                <CustomInput
                  name="chronicConditions"
                  label="Chronic Conditions"
                  placeholder="List any chronic conditions"
                  value={formData.chronicConditions}
                  onChange={handleInputChange}
                  type="textarea"
                  rows={2}
                />
              </div>
            )}

            {activeSection === "medication" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Medications
                  </label>
                  {formData.currentMedications.map((medication, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <CustomInput
                        name="currentMedications"
                        value={medication}
                        onChange={(e) =>
                          handleArrayInputChange(
                            index,
                            e.target.value,
                            "currentMedications"
                          )
                        }
                        placeholder="e.g., Metformin 500mg, twice daily"
                      />
                      {formData.currentMedications.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeArrayField(index, "currentMedications")
                          }
                          className="px-3 bg-red-500 text-white rounded text-xs"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayField("currentMedications")}
                    className="mt-2 px-3 py-1 bg-green-500 text-white rounded text-xs"
                  >
                    + Add Medication
                  </button>
                </div>
              </div>
            )}

            {activeSection === "social" && (
              <div className="space-y-4">
                <CustomInput
                  name="lifestyleFactors"
                  label="Lifestyle Factors"
                  placeholder="Smoking, alcohol, exercise habits"
                  value={formData.lifestyleFactors}
                  onChange={handleInputChange}
                  type="textarea"
                  rows={2}
                />
                <CustomInput
                  name="occupation"
                  label="Occupation"
                  placeholder="Current occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                />
                <CustomInput
                  name="livingSituation"
                  label="Living Situation"
                  placeholder="Living arrangements"
                  value={formData.livingSituation}
                  onChange={handleInputChange}
                  type="textarea"
                  rows={2}
                />
              </div>
            )}

            {activeSection === "past" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Past Medical Conditions
                  </label>
                  {formData.pastMedicalConditions.map((condition, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <CustomInput
                        name="pastMedicalConditions"
                        value={condition}
                        onChange={(e) =>
                          handleArrayInputChange(
                            index,
                            e.target.value,
                            "pastMedicalConditions"
                          )
                        }
                        placeholder="e.g., Type 2 Diabetes (2023)"
                      />
                      {formData.pastMedicalConditions.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeArrayField(index, "pastMedicalConditions")
                          }
                          className="px-3 bg-red-500 text-white rounded text-xs"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayField("pastMedicalConditions")}
                    className="mt-2 px-3 py-1 bg-green-500 text-white rounded text-xs"
                  >
                    + Add Condition
                  </button>
                </div>
                <CustomInput
                  name="familyHistory"
                  label="Family History"
                  placeholder="Family medical history"
                  value={formData.familyHistory}
                  onChange={handleInputChange}
                  type="textarea"
                  rows={2}
                />
              </div>
            )}

            <div className="flex gap-2 mt-6">
              <CustomButton type="submit" size="sm">
                {isEditing ? "Update History" : "Save History"}
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

      {/* Medical History Records */}
      <div className="mt-8">
        <div className="space-y-4">
          {/* Medical History */}
          <div className="bg-[#F0FAFF] p-6 rounded-xl shadow">
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold font-lora text-lg">Medical History</p>
              <CustomButton
                variant="secondary"
                size="sm"
                onClick={() => handleSectionChange("medical")}
              >
                Edit
              </CustomButton>
            </div>
            {getSectionData("medical") ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex">
                    <div className="font-medium w-48">Allergies:</div>
                    <div className="text-gray-700 flex-1">
                      {getSectionData("medical")?.allergies || "None reported"}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="font-medium w-48">Immunization:</div>
                    <div className="text-gray-700 flex-1">
                      {getSectionData("medical")?.immunizations ||
                        "Not specified"}
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex">
                    <div className="font-medium w-48">
                      Past Surgeries/Operations:
                    </div>
                    <div className="text-gray-700 flex-1">
                      {getSectionData("medical")?.pastSurgeries || "None"}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="font-medium w-48">Chronic Conditions:</div>
                    <div className="text-gray-700 flex-1">
                      {getSectionData("medical")?.chronicConditions || "None"}
                    </div>
                  </div>
                </div>
                <div className="col-span-2 text-xs text-gray-500 mt-2">
                  Last updated:{" "}
                  {getSectionData("medical")?.lastUpdated
                    ? formatDate(getSectionData("medical")!.lastUpdated)
                    : "Never"}
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No medical history recorded</p>
            )}
          </div>

          {/* Current Medication */}
          <div className="bg-[#F0FAFF] p-6 rounded-xl shadow">
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold font-lora text-lg">Current Medication</p>
              <CustomButton
                variant="secondary"
                size="sm"
                onClick={() => handleSectionChange("medication")}
              >
                Edit
              </CustomButton>
            </div>
            {getSectionData("medication")?.currentMedications &&
            getSectionData("medication")!.currentMedications.length > 0 ? (
              <div className="space-y-2">
                {getSectionData("medication")!.currentMedications.map(
                  (medication, index) => (
                    <div
                      key={index}
                      className="text-gray-700 pl-4 border-l-4 border-primary-blue"
                    >
                      {medication}
                    </div>
                  )
                )}
                <div className="text-xs text-gray-500 mt-2">
                  Last updated:{" "}
                  {getSectionData("medication")?.lastUpdated
                    ? formatDate(getSectionData("medication")!.lastUpdated)
                    : "Never"}
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No current medications recorded</p>
            )}
          </div>

          {/* Social History */}
          <div className="bg-[#F0FAFF] p-6 rounded-xl shadow">
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold font-lora text-lg">Social History</p>
              <CustomButton
                variant="secondary"
                size="sm"
                onClick={() => handleSectionChange("social")}
              >
                Edit
              </CustomButton>
            </div>
            {getSectionData("social") ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex">
                    <div className="font-medium w-48">Lifestyle Factors:</div>
                    <div className="text-gray-700 flex-1">
                      {getSectionData("social")?.lifestyleFactors ||
                        "Not specified"}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="font-medium w-48">Occupation:</div>
                    <div className="text-gray-700 flex-1">
                      {getSectionData("social")?.occupation || "Not specified"}
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex">
                    <div className="font-medium w-48">Living Situation:</div>
                    <div className="text-gray-700 flex-1">
                      {getSectionData("social")?.livingSituation ||
                        "Not specified"}
                    </div>
                  </div>
                </div>
                <div className="col-span-2 text-xs text-gray-500 mt-2">
                  Last updated:{" "}
                  {getSectionData("social")?.lastUpdated
                    ? formatDate(getSectionData("social")!.lastUpdated)
                    : "Never"}
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No social history recorded</p>
            )}
          </div>

          {/* Past Medical History */}
          <div className="bg-[#F0FAFF] p-6 rounded-xl shadow">
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold font-lora text-lg">
                Past Medical History
              </p>
              <CustomButton
                variant="secondary"
                size="sm"
                onClick={() => handleSectionChange("past")}
              >
                Edit
              </CustomButton>
            </div>
            {getSectionData("past") ? (
              <div className="space-y-4">
                <div>
                  <div className="font-medium mb-2">
                    Past Medical Conditions:
                  </div>
                  {getSectionData("past")!.pastMedicalConditions.length > 0 ? (
                    <div className="space-y-2">
                      {getSectionData("past")!.pastMedicalConditions.map(
                        (condition, index) => (
                          <div
                            key={index}
                            className="text-gray-700 pl-4 border-l-4 border-orange-500"
                          >
                            {condition}
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      No past medical conditions recorded
                    </p>
                  )}
                </div>
                <div>
                  <div className="font-medium mb-2">Family History:</div>
                  <div className="text-gray-700">
                    {getSectionData("past")?.familyHistory ||
                      "No family history recorded"}
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Last updated:{" "}
                  {getSectionData("past")?.lastUpdated
                    ? formatDate(getSectionData("past")!.lastUpdated)
                    : "Never"}
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No past medical history recorded</p>
            )}
          </div>

          {historyData.length === 0 && (
            <div className="bg-[#F0FAFF] p-8 rounded-xl shadow text-center">
              <p className="text-gray-500 text-lg">
                No medical history records found
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Add your medical history using the form above
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;
