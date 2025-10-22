import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEdit, FaSave } from "react-icons/fa";
import { MdEmail, MdOutlineFileDownload } from "react-icons/md";
import CustomInput from "@/components/ui/Input";
import CustomButton from "@/components/ui/Button";
import document from "@/assets/Admin/document-file.svg";

interface PatientData {
  id: string;
  name: string;
  gender: string;
  age: number;
  patientId: string;
  phone: string;
  email: string;
  address: string;
  bloodType: string;
  allergies: string;
  diseases: string;
  height: string;
  weight: string;
  preExistingConditions: string;
  emergencyContact: string;
  insuranceProvider: string;
  insuranceNumber: string;
}

interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  prescribedBy: string;
  date: string;
}

interface MedicalHistory {
  id: string;
  date: string;
  doctor: string;
  summary: string;
  diagnosis: string;
  treatment: string;
}

interface LabFile {
  id: string;
  testName: string;
  date: string;
  fileName: string;
  fileType: string;
  uploadedBy: string;
}

const PatientInfo = () => {
  // State for patient data and editing
  const [isEditing, setIsEditing] = useState(false);
  const [doctorNotes, setDoctorNotes] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // Sample patient data
  const [patientData, setPatientData] = useState<PatientData>({
    id: "1",
    name: "John Carter",
    gender: "Male",
    age: 45,
    patientId: "MD/2005/12",
    phone: "09035653117",
    email: "sammatt@gmail.com",
    address: "12, Araromi Road, Surulere, Lagos",
    bloodType: "O+ Positive",
    allergies: "Milk, Caffeine",
    diseases: "Diabetes, Ulcer",
    height: "189cm",
    weight: "60kg",
    preExistingConditions: "Throat infections",
    emergencyContact: "08035551234",
    insuranceProvider: "HealthPlus Insurance",
    insuranceNumber: "HPI-789456123",
  });

  // Sample prescriptions
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: "1",
      medication: "Amoxilin 500mg",
      dosage: "1 capsule",
      frequency: "3 times daily",
      duration: "7 days",
      prescribedBy: "Dr. Smith",
      date: "2024-01-15",
    },
    {
      id: "2",
      medication: "Metformin 500mg",
      dosage: "1 tablet",
      frequency: "Twice daily",
      duration: "30 days",
      prescribedBy: "Dr. Johnson",
      date: "2024-01-10",
    },
    {
      id: "3",
      medication: "Lisinopril 10mg",
      dosage: "1 tablet",
      frequency: "Once daily",
      duration: "30 days",
      prescribedBy: "Dr. Wilson",
      date: "2024-01-08",
    },
  ]);

  // Sample medical history
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory[]>([
    {
      id: "1",
      date: "20/07/2024",
      doctor: "Dr. John Sam",
      summary: "Routine Checkup",
      diagnosis: "Hypertension, Type 2 Diabetes",
      treatment: "Prescribed medication and lifestyle changes",
    },
    {
      id: "2",
      date: "15/06/2024",
      doctor: "Dr. Sarah Wilson",
      summary: "Follow-up Visit",
      diagnosis: "Upper Respiratory Infection",
      treatment: "Antibiotics and rest",
    },
    {
      id: "3",
      date: "02/05/2024",
      doctor: "Dr. Mike Brown",
      summary: "Emergency Visit",
      diagnosis: "Severe Allergic Reaction",
      treatment: "Epinephrine and antihistamines",
    },
  ]);

  // Sample lab files
  const [labFiles, setLabFiles] = useState<LabFile[]>([
    {
      id: "1",
      testName: "Blood Test",
      date: "12-05-2024",
      fileName: "blood_test_results.pdf",
      fileType: "pdf",
      uploadedBy: "Dr. Smith",
    },
    {
      id: "2",
      testName: "CT Scan",
      date: "10-05-2024",
      fileName: "ct_scan_report.pdf",
      fileType: "pdf",
      uploadedBy: "Dr. Johnson",
    },
    {
      id: "3",
      testName: "Urine Analysis",
      date: "08-05-2024",
      fileName: "urine_analysis.pdf",
      fileType: "pdf",
      uploadedBy: "Dr. Wilson",
    },
  ]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPatientData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSavePatientInfo = () => {
    // In a real application, you would make an API call here
    console.log("Saving patient data:", patientData);
    setIsEditing(false);
    alert("Patient information updated successfully!");
  };

  const handleSaveDoctorNote = () => {
    // In a real application, you would make an API call here
    console.log("Saving doctor note:", doctorNotes);
    setDoctorNotes("");
    alert("Doctor's note saved successfully!");
  };

  const handleDownloadLabFile = (file: LabFile) => {
    // Simulate file download
    alert(`Downloading ${file.fileName}`);
    console.log("Downloading file:", file);
  };

  const handleViewLabFile = (file: LabFile) => {
    // Simulate file view
    alert(`Viewing ${file.fileName}`);
    console.log("Viewing file:", file);
  };

  const calculateBMI = () => {
    const heightInMeters = parseInt(patientData.height) / 100;
    const weightInKg = parseInt(patientData.weight);
    if (heightInMeters > 0 && weightInKg > 0) {
      return (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return "N/A";
  };

  const getBMICategory = (bmi: string) => {
    const bmiValue = parseFloat(bmi);
    if (isNaN(bmiValue)) return "Unknown";
    if (bmiValue < 18.5) return "Underweight";
    if (bmiValue < 25) return "Normal weight";
    if (bmiValue < 30) return "Overweight";
    return "Obese";
  };

  const bmi = calculateBMI();
  const bmiCategory = getBMICategory(bmi);

  return (
    <div className="text-sm px-2 pb-8">
      {/* Patient Header Section */}
      <div className="grid grid-cols-3 gap-4">
        {/* Patient Basic Info */}
        <div>
          <div className="flex items-start gap-4 p-4">
            <div className="relative">
              <img
                src="https://picsum.photos/200/?random=1"
                alt="patient"
                className="rounded-full w-[150px] shadow"
              />
              <button
                className="absolute bottom-2 right-2 bg-primary-blue text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                onClick={() => setIsEditing(!isEditing)}
              >
                <FaEdit size={14} />
              </button>
            </div>
            <div className="space-y-2">
              {isEditing ? (
                <CustomInput
                  name="name"
                  value={patientData.name}
                  onChange={handleInputChange}
                  className="text-lg font-bold"
                />
              ) : (
                <p className="font-bold text-lg mb-4">{patientData.name}</p>
              )}
              <p className="font-bold">{patientData.gender}</p>
              <p>Age: {patientData.age}</p>
              <p>ID: {patientData.patientId}</p>
            </div>
          </div>
          <div className="p-2 font-medium text-base space-y-1">
            <p className="flex items-center gap-2">
              <FaPhoneAlt className="text-primary-blue" />
              {isEditing ? (
                <CustomInput
                  name="phone"
                  value={patientData.phone}
                  onChange={handleInputChange}
                  size="sm"
                />
              ) : (
                <span>{patientData.phone}</span>
              )}
            </p>
            <p className="flex items-center gap-2">
              <MdEmail className="text-primary-blue" />
              {isEditing ? (
                <CustomInput
                  name="email"
                  value={patientData.email}
                  onChange={handleInputChange}
                  size="sm"
                />
              ) : (
                <span>{patientData.email}</span>
              )}
            </p>
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary-blue" />
              {isEditing ? (
                <CustomInput
                  name="address"
                  value={patientData.address}
                  onChange={handleInputChange}
                  size="sm"
                />
              ) : (
                <span>{patientData.address}</span>
              )}
            </p>
          </div>
          {isEditing && (
            <div className="p-4">
              <CustomButton onClick={handleSavePatientInfo} className="w-full">
                <FaSave className="mr-2" />
                Save Changes
              </CustomButton>
            </div>
          )}
        </div>

        {/* Patient Medical Details */}
        <div className="bg-lighter-blue rounded-lg shadow-md p-4 h-full overflow-y-auto scrollbar-hide">
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-lora font-medium">Patient Details</p>
            {!isEditing && (
              <button
                className="text-primary-blue text-sm"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-y-3">
            <div className="font-medium">Blood Type:</div>
            <div className="text-gray-3">
              {isEditing ? (
                <CustomInput
                  name="bloodType"
                  value={patientData.bloodType}
                  onChange={handleInputChange}
                  size="sm"
                />
              ) : (
                patientData.bloodType
              )}
            </div>

            <div className="font-medium">Allergies:</div>
            <div className="text-gray-3">
              {isEditing ? (
                <CustomInput
                  name="allergies"
                  value={patientData.allergies}
                  onChange={handleInputChange}
                  size="sm"
                />
              ) : (
                patientData.allergies
              )}
            </div>

            <div className="font-medium">Diseases:</div>
            <div className="text-gray-3">
              {isEditing ? (
                <CustomInput
                  name="diseases"
                  value={patientData.diseases}
                  onChange={handleInputChange}
                  size="sm"
                />
              ) : (
                patientData.diseases
              )}
            </div>

            <div className="font-medium">Height:</div>
            <div className="text-gray-3">
              {isEditing ? (
                <CustomInput
                  name="height"
                  value={patientData.height}
                  onChange={handleInputChange}
                  size="sm"
                />
              ) : (
                patientData.height
              )}
            </div>

            <div className="font-medium">Weight:</div>
            <div className="text-gray-3">
              {isEditing ? (
                <CustomInput
                  name="weight"
                  value={patientData.weight}
                  onChange={handleInputChange}
                  size="sm"
                />
              ) : (
                patientData.weight
              )}
            </div>

            <div className="font-medium">BMI:</div>
            <div className="text-gray-3">
              {bmi} ({bmiCategory})
            </div>

            <div className="font-medium">Pre-existing conditions:</div>
            <div className="text-gray-3">
              {isEditing ? (
                <CustomInput
                  name="preExistingConditions"
                  value={patientData.preExistingConditions}
                  onChange={handleInputChange}
                  size="sm"
                />
              ) : (
                patientData.preExistingConditions
              )}
            </div>

            <div className="font-medium">Emergency Contact:</div>
            <div className="text-gray-3">
              {isEditing ? (
                <CustomInput
                  name="emergencyContact"
                  value={patientData.emergencyContact}
                  onChange={handleInputChange}
                  size="sm"
                />
              ) : (
                patientData.emergencyContact
              )}
            </div>
          </div>
        </div>

        {/* Insurance & Additional Info */}
        <div className="bg-lighter-blue rounded-lg shadow-md p-4 h-full overflow-y-auto scrollbar-hide">
          <p className="text-lg font-lora font-medium mb-4">
            Insurance Information
          </p>
          <div className="space-y-3">
            <div>
              <div className="font-medium">Provider:</div>
              <div className="text-gray-3 mt-1">
                {isEditing ? (
                  <CustomInput
                    name="insuranceProvider"
                    value={patientData.insuranceProvider}
                    onChange={handleInputChange}
                    size="sm"
                  />
                ) : (
                  patientData.insuranceProvider
                )}
              </div>
            </div>
            <div>
              <div className="font-medium">Policy Number:</div>
              <div className="text-gray-3 mt-1">
                {isEditing ? (
                  <CustomInput
                    name="insuranceNumber"
                    value={patientData.insuranceNumber}
                    onChange={handleInputChange}
                    size="sm"
                  />
                ) : (
                  patientData.insuranceNumber
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 p-3 bg-white rounded-lg">
            <p className="font-medium mb-2">Quick Stats</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>Total Visits:</div>
              <div className="text-gray-3">{medicalHistory.length}</div>
              <div>Active Prescriptions:</div>
              <div className="text-gray-3">{prescriptions.length}</div>
              <div>Lab Tests:</div>
              <div className="text-gray-3">{labFiles.length}</div>
              <div>Last Visit:</div>
              <div className="text-gray-3">{medicalHistory[0]?.date}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section - Prescriptions & Doctor's Notes */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        {/* Prescriptions */}
        <div className="bg-[#F0FAFF] p-4 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-[#020714] font-lora font-medium">
              Current Prescriptions
            </h4>
            <button className="text-primary-blue text-sm">View all</button>
          </div>
          <div className="rounded-xl bg-white overflow-hidden">
            <table className="min-w-full rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left border-b border-gray-3 font-semibold text-xs">
                    Medication
                  </th>
                  <th className="px-4 py-3 text-left border-b border-gray-3 font-semibold text-xs">
                    Dosage
                  </th>
                  <th className="px-4 py-3 text-left border-b border-gray-3 font-semibold text-xs">
                    Frequency
                  </th>
                  <th className="px-4 py-3 text-left border-b border-gray-3 font-semibold text-xs">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.slice(0, 3).map((prescription) => (
                  <tr key={prescription.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-left text-gray-3 border-b border-gray-1 text-xs">
                      {prescription.medication}
                    </td>
                    <td className="px-4 py-3 text-left text-gray-3 border-b border-gray-1 text-xs">
                      {prescription.dosage}
                    </td>
                    <td className="px-4 py-3 text-left text-gray-3 border-b border-gray-1 text-xs">
                      {prescription.frequency}
                    </td>
                    <td className="px-4 py-3 text-left text-gray-3 border-b border-gray-1 text-xs">
                      {prescription.duration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Doctor's Notes */}
        <div className="px-4">
          <CustomInput
            placeholder="Add notes about this file/patient.."
            type="textarea"
            name="doctor_notes"
            label="Doctor's Note"
            value={doctorNotes}
            onChange={(e) => setDoctorNotes(e.target.value)}
            rows={4}
            className="rounded-xl"
          />
          <CustomButton
            onClick={handleSaveDoctorNote}
            className="mt-2"
            disabled={!doctorNotes.trim()}
          >
            Save Note
          </CustomButton>
        </div>
      </div>

      {/* Bottom Section - Medical History & Lab Files */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        {/* Medical History */}
        <div className="bg-[#F0FAFF] p-4 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-[#020714] font-lora font-medium">
              Recent Medical History
            </h4>
            <button className="text-primary-blue text-sm">View all</button>
          </div>
          <div className="rounded-xl bg-white overflow-hidden">
            <table className="min-w-full rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left border-b border-gray-3 font-semibold text-xs">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left border-b border-gray-3 font-semibold text-xs">
                    Doctor
                  </th>
                  <th className="px-4 py-3 text-left border-b border-gray-3 font-semibold text-xs">
                    Summary
                  </th>
                </tr>
              </thead>
              <tbody>
                {medicalHistory.slice(0, 3).map((history) => (
                  <tr key={history.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-left text-gray-3 border-b border-gray-1 text-xs">
                      {history.date}
                    </td>
                    <td className="px-4 py-3 text-left text-gray-3 border-b border-gray-1 text-xs">
                      {history.doctor}
                    </td>
                    <td className="px-4 py-3 text-left text-gray-3 border-b border-gray-1 text-xs">
                      {history.summary}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lab Files */}
        <div className="bg-[#F0FAFF] p-4 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-[#020714] font-lora font-medium">
              Recent Lab Files
            </h4>
            <button className="text-primary-blue text-sm">View all</button>
          </div>
          <div className="rounded-xl bg-white overflow-hidden">
            <table className="min-w-full rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left border-b border-gray-3 font-semibold text-xs">
                    Test
                  </th>
                  <th className="px-4 py-3 text-left border-b border-gray-3 font-semibold text-xs">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left border-b border-gray-3 font-semibold text-xs">
                    View
                  </th>
                  <th className="px-4 py-3 text-center border-b border-gray-3 font-semibold text-xs">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {labFiles.slice(0, 3).map((file) => (
                  <tr key={file.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-left text-gray-3 border-b border-gray-1 text-xs">
                      <div className="flex items-center gap-2">
                        <img src={document} alt="document" className="w-4" />
                        <span>{file.testName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-left text-gray-3 border-b border-gray-1 text-xs">
                      {file.date}
                    </td>
                    <td className="px-4 py-3 text-left text-gray-3 border-b border-gray-1 text-xs">
                      <button
                        className="text-primary-blue cursor-pointer text-xs"
                        onClick={() => handleViewLabFile(file)}
                      >
                        View
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-3 border-b border-gray-1 text-xs">
                      <button
                        className="cursor-pointer"
                        onClick={() => handleDownloadLabFile(file)}
                      >
                        <MdOutlineFileDownload
                          className="text-green-500"
                          size={20}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;
