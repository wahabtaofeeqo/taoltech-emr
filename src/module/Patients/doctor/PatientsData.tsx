import { useState } from "react";
import PatientCard from "./PatientCard";
import CaseNotes from "./Tabs/CaseNotes/CaseNotes";
import NurseChart from "./Tabs/NurseChart/NurseChart";
import PatientBioData from "./Tabs/PatientBioData/PatientBioData";
import Prescription from "./Tabs/Prescription/Prescription";
import Referrals from "./Tabs/Referrals/Referrals";
import Tests from "./Tests/Tests";


interface TabProps {
  text: string;
  isActive: boolean;
  onClick: () => void;
}

const allergies = [
  { allergy: "Food Allergy" },
  { allergy: "Food Allergy" },
  { allergy: "Food Allergy" },
  { allergy: "Food Allergy" },
];

const TabItem = ({ text, isActive, onClick }: TabProps) => (
  <li
    role="tab"
    aria-selected={isActive}
    className={`py-2 px-3 h-10 rounded-md font-semibold flex items-center cursor-pointer text-xs md:text-base
      ${isActive ? "bg-[#0843aa] text-white" : "bg-[#f9fafb] text-health-primary"}`}
      onClick={onClick}
  >
    {text}
  </li>
);

const Patients = () => {
  const tabData = [
    { text: "Patient Bio-data", component: <PatientBioData onNext={() => handleTabChange(1)}/> },
    { text: "Case Notes", component: <CaseNotes onNext={() => handleTabChange(2)} onBack={() => handleTabChange(0)} /> },
    { text: "Prescription", component: <Prescription onNext={() => handleTabChange(3)} onBack={() => handleTabChange(1)}/> },
    { text: "Tests", component: <Tests onNext={() => handleTabChange(4)} onBack={() => handleTabChange(2)}/> },
    { text: "Referrals", component: <Referrals /> },
    { text: "Nurse Chart", component: <NurseChart /> },
  ];
  
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabChange = (index: any) => {
    setActiveIndex(index);
  };

  return (
    <div className="w-full bg-[#fff] pb-6 h-full">
      
      {/* Header */}
      <header className="flex flex-col gap-[10px] font-inter w-full">
          <h2 className="header-text bg-health-primary">
            Patients
          </h2>
        <nav className="flex items-center justify-between w-full px-8 py-6">
          <div className="overflow-x-auto">
            <ul className="flex gap-3">
              {tabData.map((nav, index) => (
                <TabItem
                  key={index}
                  text={nav.text}
                  isActive={activeIndex === index}
                  onClick={() => handleTabChange(index)}
                />
              ))}
            </ul>
          </div>
          <div>
            <img
              src="/src/assets/Doctor/vuesax.svg"
              width={24}
              height={24}
              alt="Notification-bell"
            />
          </div>
        </nav>
      </header>

      {/*  */}
      <div className="flex flex-col gap-10 px-8 pt-6">
        
        {/* Allergy */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[20px] font-semibold">Allergies</h3>
          <div className="flex gap-4 md:items-center">
            <div className="bg-[#d30000] w-3 h-3 rounded-full"></div>
            <ul className="flex flex-col gap-3 md:flex-row">
              {allergies.map((data, index) => (
                <li key={index} className="text-[#d30000]">
                  {data.allergy}
                  {index < allergies.length - 1 ? ", " : ""}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Patient Card */}
        <div>
          <PatientCard />
        </div>
      </div>

      {/* Navigation Components */}
      <div className="px-8 pt-6">
        {tabData[activeIndex].component}
      </div>
    </div>
  );
};

export default Patients;


