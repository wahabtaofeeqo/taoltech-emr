import React, { useState, useEffect} from 'react';
import { patients } from './PatientBioDat/patientData';
import { PatientDetails } from './PatientBioDat/patientDetailsType';

type AllPatientProps = {
  showPatientInfo: (id: string) => void;
};

const AllPatient: React.FC<AllPatientProps> = ({ showPatientInfo }) => {

  const [wordSearch, setWordSearch] = useState<string>(''); 
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [canPrevPage, setCanPrevPage] = useState(false);
  const [canNextPage, setCanNextPage] = useState(true);

  const patientsPerPage = 10;

  const filteredPatient = patients.filter(patient =>{ 
    const searchItem = wordSearch.toLowerCase();
    return (
      patient.id.toLowerCase().includes(searchItem) ||
      patient.patient.firstName.toLowerCase().includes(searchItem) ||
      patient.patient.surname.toLowerCase().includes(searchItem)
    )
  })

  const patientLen = filteredPatient.length;

  const totalPages = Math.ceil(filteredPatient.length / patientsPerPage)

      useEffect(() => {
        setCanPrevPage(currentPage > 0);
        setCanNextPage(currentPage + patientsPerPage <  patientLen )
    }, [currentPage, patientLen, patientsPerPage])

    const handleCurrentPage = () => {
        if(currentPage + patientsPerPage < patientLen){
            setCurrentPage(currentPage + patientsPerPage)
        }
    }

    const handlePrevPage = () => {
        if(currentPage - patientsPerPage >= 0){
            setCurrentPage(currentPage - patientsPerPage)
        }
    }

  return (
    <div className="w-full">
      <div className="text-white text-3xl bg-[#175CD3] pl-4 pt-4 pb-4 font-semibold">Patients</div>
      <div className="p-4 w-full ">
        <div className="p-4 border border-[#EAECF0] rounded-md w-full mb-6">
          <div className="block border-b border-[#EAECF0]">
            <span className="font-semibold text-sm block pb-2">Search</span>
            <span className="text-xs text-[#878583] block pb-2">Search for any of your patients </span>
          </div>
          <div className=" flex items-center rounded-md pl-2 lr-2 pt-1 pb-1 mt-4 w-[40%] bg-[#F9FAFB]">
          <i className='bx bx-search text-[#878583] text-2xl pr-2'></i>
            <input 
            type="text" 
            name="search"
            placeholder="Search"
            value={wordSearch}
            onChange={(e) => setWordSearch(e.target.value)} 
            className="outline-none border-none text-sm text-[#878583] bg-[#F9FAFB]"
            />
          </div>
        </div>
        <div className="p-4 border border-[#EAECF0] rounded-md w-full mb-6">
          <div className="block border-b border-[#EAECF0] mb-6 pb-4">
              <span className="font-semibold text-sm block pb-2">Patients in the wards.</span>
              <span className="text-xs text-[#878583] block pb-2">List of patients in the wards.</span>
          </div>
          <div className="overflow-x-auto bg-white border border-gray-200 rounded-tl-xl rounded-bl-xl">
            <table className="min-w-full">
              <thead>
                <tr className="bg-[#EAECF0] border-b">
                  <th className="text-left pl-4 pt-3 pb-3 text-xs font-bold text-gray-600">Hospital ID</th>
                  <th className="text-left  pt-3 pb-3 text-xs font-bold text-gray-600">Patient Name</th>
                  <th className="text-left  pt-3 pb-3 text-xs font-bold text-gray-600">Ward</th>
                  <th className="text-left  pt-3 pb-3 text-xs font-bold text-gray-600">Doctor Assigned</th>
                  <th className="text-left  pt-3 pb-3 text-xs font-bold text-gray-600">Contact Information</th>
                  <th className="text-left pr-4  pt-3 pb-3 text-xs font-bold text-gray-600"></th>
                </tr>
              </thead>
              <tbody>
                {filteredPatient.slice(currentPage, currentPage + patientsPerPage).map((patientInfo: PatientDetails) => (
                  <tr key={patientInfo.id} className="border-b">
                    <td className="pl-4 pt-3 pb-3 text-xs font-medium text-[#49566C]">{patientInfo.id}</td>
                    <td className="pt-3 pb-3 text-xs font-medium text-[#49566C]">{patientInfo.patient.firstName} {patientInfo.patient.surname}</td>
                    <td className="pt-3 pb-3 text-xs font-medium text-[#49566C]">{patientInfo.patient.ward}</td>
                    <td className="pt-3 pb-3 text-xs font-medium text-[#49566C]">{patientInfo.primaryInfo.assignedPhysician}</td>
                    <td className="pt-3 pb-3 text-xs font-medium text-[#49566C]">{patientInfo.contactInfo.phoneNumber}</td>
                    <td className="pr-4  pt-3 pb-3 text-xs font-medium text-[#49566C]">
                      <button 
                        className="text-[#49566C] hover:underline border rounded-md border-[#EAECF0] p-2"
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
          <hr className="bg-[#EAECF0] w-full mt-6 mb-4" />
          <div className="flex justify-between w-full mb-6">
          <button className="text-[#344054] text-xs border rounded-md border-[#EAECF0] p-2 font-semibold"
              onClick={handlePrevPage}
              disabled={!canPrevPage ? true : false}>Previous</button>
          <span className="text-[#344054] text-xs p-2 font-semibold">Page {currentPage} of {totalPages}</span>
          <div className="gap-2 flex">
            <button className="text-[#344054] text-xs border rounded-md border-[#EAECF0] p-2 font-semibold"
            onClick={handleCurrentPage}
            disabled={canNextPage ? false : true}>Next</button>
            <button className="text-[#344054] text-xs border rounded-md border-[#EAECF0] p-2 font-semibold">End</button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPatient;
