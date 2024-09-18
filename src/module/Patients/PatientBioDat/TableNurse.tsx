import React from 'react';

/*type Patient = {
    firstName: string;
    surname: string;
    dob: string;
    maritalStatus: string;
    bloodGroup: string;
    registrationNumber: string;
    hmo: string;
    occupation: string;
    gender: string;
  };
  */

type labels = {
    tags: string[];
    patient: {
        [key: string]: string; 
      };
    topTags: string;
    bottomTags: string;
    col: number;
    tagToField: { [key: string]: string };
}


const TableNurse: React.FC<labels>  = ({patient, tags, topTags, bottomTags, col, tagToField}) => {

  return (
    <div className="w-full">
        <div className="w-full flex gap-4">
            <div className="p-4 border border-[#EAECF0] rounded-md w-full mb-4">
                <div className="block border-b border-[#EAECF0]">
                    <span className="font-semibold text-sm block pb-2">{topTags}</span>
                    <span className="text-xs text-[#878583] block pb-2">{bottomTags}</span>
                </div>
                <div className={`grid grid-cols-${col} pt-4 gap-6 w-full`}>
                {tags.map((tag, index) => (
                    <div key={index}>
                        <span className="font-semibold text-sm">{tag}</span>
                            <div className="mt-1 text-[#878583] text-xs font-normal bg-[#F9FAFB] pt-2 pb-2 pl-2 pr-2 rounded">
                                {tagToField[tag] ? tag === "Gender" ? 
                                <div className="flex gap-2">
                                    <div className="flex items-center">
                                        <span className="text-xl">{patient.gender === 'male' || patient.gender === "Male" ? <i className='bx bx-radio-circle-marked text-black'></i> : <i className='bx bx-radio-circle'></i> }</span>
                                        <span>Male</span>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <span className="text-xl">{patient.gender === 'female' || patient.gender === "Female" ? <i className='bx bx-radio-circle-marked text-black'></i> : <i className='bx bx-radio-circle'></i> }</span>
                                        <span>Female</span>
                                    </div>
                                </div> : 
                                patient[tagToField[tag]] : 'N/A'}
                            </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default TableNurse