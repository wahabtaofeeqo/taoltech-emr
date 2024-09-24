import React from 'react';
import { useNavigate } from 'react-router-dom';
import AllPatient from './AllPatient';

const Patients:React.FC = () => {

  const navigate = useNavigate()

  const showPatientInfo = (id: string) => {
      navigate(`/dashboard/patients/${id}`)
  }

  return (
      <div className="w-full min-h-[100vh] bg-white">
        <AllPatient  showPatientInfo={showPatientInfo} /> 
      </div>
  );
};

export default Patients;
