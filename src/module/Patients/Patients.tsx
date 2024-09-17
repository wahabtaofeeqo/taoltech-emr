import React, {useState} from 'react';
import FixedBar from './PatientBioDat/fixedBar';
import PatientBioData from './PatientBioDat/patientBioData'
import AllPatient from './AllPatient';
import CarePlan from './PatientCarePlan.tsx/CarePlan';
import { patients } from './PatientBioDat/patientData';
import { PatientDetails } from './PatientBioDat/patientDetailsType'

const Patients:React.FC = () => {

  const [viewInfo, setViewInfo] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<PatientDetails | null>(null);
  const [viewCare, setViewCare] = useState(false)

  const showPatientInfo = (id: number) => {
      setViewInfo(true)
      const foundPatient = patients.find((patient) => patient.id === id);

      if (foundPatient) {
        setSelectedPatient(foundPatient); 
      }
      console.log(foundPatient)
  }
  return (
      <div className="w-full min-h-[100vh] bg-white">
        <FixedBar  viewInfo={viewInfo} setViewInfo={setViewInfo} viewCare={viewCare} setViewCare={setViewCare} />
        {!viewInfo &&
        <AllPatient  showPatientInfo={showPatientInfo} />}
         {viewInfo && !viewCare && <PatientBioData patientInfo={selectedPatient} />} 
         {viewInfo && viewCare  && <CarePlan />} 
         
      </div>
  );
};

export default Patients;
