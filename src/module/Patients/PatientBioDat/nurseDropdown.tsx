import React from 'react';

type labels2 = {
  tags: string[];
  patient: {
    [key: string]: string | string[]; // Supports both strings and arrays
  };
  topTags: string;
  bottomTags: string;
  tagToField: { [key: string]: string };
}

const Nurse3Dropdown: React.FC<labels2> = ({ patient, tags, topTags, bottomTags, tagToField }) => {

  return (
    <div className="w-full">
      <div className="w-full flex gap-4">
        <div className="p-4 border border-[#EAECF0] rounded-md w-full mb-4">
          <div className="block border-b border-[#EAECF0]">
            <span className="font-semibold text-sm block pb-2">{topTags}</span>
            <span className="text-xs text-[#878583] block pb-2">{bottomTags}</span>
          </div>
          <div className={`grid grid-cols-3 pt-4 gap-6 w-full`}>
            {tags.map((tag, index) => {
              const field = tagToField[tag];
              const value = patient[field];

              return (
                <div key={index}>
                  <span className="font-semibold text-sm">{tag}</span>
                  <div className="mt-1 text-[#878583] text-xs font-normal bg-[#F9FAFB] pt-2 pb-2 pl-2 pr-2 rounded">
                    {value ? 
                      (Array.isArray(value) ? (
                        value.length > 0 ? (
                          <select className="bg-[#F9FAFB] w-full outline-none">
                            {value.map((val, idx) => (
                              <option key={idx} value={val}>
                                {val}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span>None</span> // Display "None" if the array is empty
                        )
                      ) : (
                        <span>{value === "" ? "None" : value}</span> // Handle empty string case
                      )) : (
                      <span>None</span> // Handle when there's no value for the tag
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nurse3Dropdown;
