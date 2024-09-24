import React, { useState } from 'react';
import { PatientDetails } from '../PatientBioDat/patientDetailsType';

export const tagToField = {
  vitals: [
    "Body Temperature",
    "Heart Rate(pulse)",
    "Respiratory Rate",
    "Blood Pressure",
    "Oxygen Saturation (SpO2)",
    "Pain Level",
    "weight",
    "height",
    "Blood Glucose Level",
  ],
};

type LabelsProps = {
  tags: string; 
  topTags: string;
  bottomTags: string;
  tagToField: { [key: string]: string[] };
  handleChange: (field: keyof PatientDetails, values: any) => void;
};

const PatientVitalsEditor: React.FC<LabelsProps> = ({tags, topTags, bottomTags, tagToField, handleChange }) => {
  
  const [info, setInfo] = useState({
    [tags]: (tagToField[tags] || []).reduce((acc, value) => {
      acc[value] = ""; 
      return acc;
    }, {} as { [key: string]: string })
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInfo((prevInfo) => {
      const updatedInfo = {
        ...prevInfo,
        [tags]: {
          ...prevInfo[tags],
          [name]: value
        }
      };

      
      handleChange(tags as keyof PatientDetails, updatedInfo[tags]);

      return updatedInfo;
    });
  };

  return (
    <div className="w-full">
      <div className="w-full flex gap-4">
        <div className="p-4 border border-[#EAECF0] rounded-md w-full mb-4">
          <div className="block border-b border-[#EAECF0]">
            <span className="font-semibold text-sm block pb-2">{topTags}</span>
            <span className="text-xs text-[#878583] block pb-2">{bottomTags}</span>
          </div>
          <div className={`grid grid-cols-2 pt-4 gap-6 w-full`}>
            {(tagToField[tags] || []).map((tag, index) => (
              <div key={index}>
                <span className="font-semibold text-sm">{tag}</span>
                <div className="mt-1 text-[#878583] text-xs font-normal bg-[#F9FAFB] pt-2 pb-2 pl-2 pr-2 rounded">
                  <input
                    name={tag}
                    type="text"
                    value={info[tags]?.[tag] || ''}
                    onChange={handleInputChange}
                    placeholder={`Enter ${tag}`}
                    className="w-full bg-inherit"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientVitalsEditor;
