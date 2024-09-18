import React from 'react';
import { patients } from './PatientBioDat/patientData';
import { PatientData } from './PatientBioDat/patientDetailsType';

type AllPatientProps = {
  showPatientInfo: (id: number) => void;
};

const AllPatient: React.FC<AllPatientProps> = ({ showPatientInfo }) => {
  return (
    <div className="p-4 w-full ">
      <h1 className='font-bold text-2xl pt-4 pb-4'>All Patients</h1>
      <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr className="bg-[#F9FAFB] border-b">
              <th className="text-left py-2 px-4 text-xs font-bold text-gray-600">First Name</th>
              <th className="text-left py-2 px-4 text-xs font-bold text-gray-600">Surname</th>
              <th className="text-left py-2 px-4 text-xs font-bold text-gray-600">Occupation</th>
              <th className="text-left py-2 px-4 text-xs font-bold text-gray-600">Date of Birth</th>
              <th className="text-left py-2 px-4 text-xs font-bold text-gray-600">Gender</th>
              <th className="text-left py-2 px-4 text-xs font-bold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patientInfo: PatientData) => (
              <tr key={patientInfo.id} className="border-b">
                <td className="py-2 px-4 text-xs font-medium">{patientInfo.patient.firstName}</td>
                <td className="py-2 px-4 text-xs font-medium">{patientInfo.patient.surname}</td>
                <td className="py-2 px-4 text-xs font-medium">{patientInfo.patient.occupation}</td>
                <td className="py-2 px-4 text-xs font-medium">{patientInfo.patient.dob}</td>
                <td className="py-2 px-4 text-xs font-medium">{patientInfo.patient.gender}</td>
                <td className="py-2 px-4 text-xs font-medium">
                  <button 
                    className="text-blue-500 hover:underline"
                    onClick={() => showPatientInfo(patientInfo.id)}
                  >
                    View Patient
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPatient;
