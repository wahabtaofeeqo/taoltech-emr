import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import FixedBar from './PatientBioDat/fixedBar';
import PatientBioData from './PatientBioDat/patientBioData'
import CarePlan from './PatientCarePlan.tsx/CarePlan';
import { PatientDetails } from './PatientBioDat/patientDetailsType';
import {patients} from './PatientBioDat/patientData';



const PatientsEntry:React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<PatientDetails | null>(null);

  const { id } = useParams<{ id: string }>()
  const [viewCare, setViewCare] = useState(1);

  useEffect(() => {
    const foundPatient = patients.find((patient) => patient.id === id);

      if (foundPatient) {
        setSelectedPatient(foundPatient); 
      }
      console.log(foundPatient)
  }, [])

  
  return (
      <div className="w-full min-h-[100vh] bg-white">
        <FixedBar viewCare={viewCare} setViewCare={setViewCare} />
         {viewCare  === 1 && <PatientBioData patientInfo={selectedPatient} />} 
         {viewCare === 2  && <CarePlan careInfo={selectedPatient} setSelectedPatient={setSelectedPatient} />} 
         
      </div>
  );
};

export default PatientsEntry;
