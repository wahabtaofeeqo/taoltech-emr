import React from 'react';
import TableNurse from './TableNurse';
import Nurse3Dropdown from './nurseDropdown'
import Physician from './PhysicianFile';
import Allergies from './Allergies';
import {labelTags, tagToField ,
    contactTags,emergencyTags,
    vitalsTags, primaryTags,
     additionalTags} from './patientData';
import { PatientDetails } from './patientDetailsType'


const allergy = ["food", "Milk", "peanut", "Dust Mite"]

  type patientProps = {
    patientInfo: PatientDetails | null;
  }

const PatientBioData: React.FC<patientProps> = ({patientInfo}) => {

    if (!patientInfo) {
        return <div>No patient information available</div>;
    }
    
  return (
    <div>
        <Allergies  allergy={allergy}/>
        <div className="pl-4 pr-4 mt-4 pb-4 flex w-full gap-4">
            <div className="w-[80%]">
              <TableNurse patient={patientInfo.patient} tags={labelTags} topTags={"Patient Information"} bottomTags={"Patient Personal Information"} col={2} tagToField={tagToField} />
              <TableNurse patient={patientInfo.contactInfo} tags={contactTags} topTags={"Contact Information"} bottomTags={"Patient Contact Information"} col={2} tagToField={tagToField} />
              <TableNurse patient={patientInfo.emergencyContact} tags={emergencyTags} topTags={"Emergency contact"} bottomTags={"Emergency Contact for patient"} col={2} tagToField={tagToField} />
            </div>
            <div className="w-[20%]">
                <div className="h-[40vh] w-full">
                  <img  className="h-full w-full rounded-md" src={patientInfo.patient.image} alt="profile-pic" />
                </div>
                <div className="w-full border border-[#EAECF0] mt-4 rounded-md p-2">
                    <div className="border-b border-[#EAECF0] pt-1 pb-2">
                        <span className="block text-black text-sm mb-2 font-semibold">Allergies</span>
                        <p className="block text-[#878583] text-xs w-full">Things that cause allergic reaction to the patient</p>
                    </div>
                    <div className="pt-4">
                        {patientInfo.allergens && patientInfo.allergens.map((allergen, index) => (
                            
                            <div className='flex gap-2 mb-3' key={index}>
                                <div className="flex items-center justify-center bg-white h-[18px] w-[18px] border border-[#EAECF0] rounded-md">
                                    <span className='text-xs text-[#EAECF0]'><i className='bx bx-check'></i></span>
                                </div>
                                <span className="text-xs text-black">{allergen}</span>
                            </div>
                          
                        ))}
                    </div>
                </div> 
            </div>
        </div>
        <div className='pl-4 pr-4 mt-4 pb-4 w-full'>
            <Nurse3Dropdown patient={patientInfo.vitals} tags={vitalsTags} topTags={"Vitals"} bottomTags={"Last record of patient's vitals"}  tagToField={tagToField} />
            <Nurse3Dropdown patient={patientInfo.primaryInfo} tags={primaryTags} topTags={"Primary care"} bottomTags={"The assigned primary physician for this patient"}  tagToField={tagToField} />
            <Physician  topTags={"Phyiscians on file"}  bottomTags={"List of physician attached to this file"} physician={patientInfo.tableData} />
            <Nurse3Dropdown patient={patientInfo.additionalInfo} tags={additionalTags} topTags={"Additional  Information"} bottomTags={"More information on the patient"}  tagToField={tagToField} />
        </div>
    </div>
  )
}

export default PatientBioData