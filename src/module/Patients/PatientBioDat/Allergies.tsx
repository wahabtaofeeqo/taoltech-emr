import React from 'react'


type AllergyProps = {
    allergy: string[]
}
const Allergies: React.FC<AllergyProps> = ({ allergy }) => {
  return (
    <div className="block pb-2 pl-4 pr-4 mt-6">
        <span className="font-semibold font-lg">Allergies</span>
        <div className="pl-4 relative gap-2 before:content-[''] before:block before:absolute before:left-0 before:top-2 before:bg-[#D30000]  before:h-[7px] before:w-[7px] before:rounded-full">
        {allergy.map((aller, index) => (
            <span className="text-[#D30000] capitalize text-sm" key={index}>
            {aller} allergy
            {index !== allergy.length - 1 ? ", " : ""}
          </span>
        ))}       
        </div>
    </div>
  )
}

export default Allergies