import React from 'react';
import 'boxicons/css/boxicons.min.css';

type activeInfo = {
  viewCare: number;
  setViewCare: React.Dispatch<React.SetStateAction<number>>;
}

const FixedBar: React.FC<activeInfo> = ({ viewCare, setViewCare }) => {

  const handleToggle = (num: number) => {
    setViewCare(num);
  }

  const viewCarePlan = (num: number) => {
      setViewCare(num)
  }
  const viewCarePlan2 = (num: number) => {
    setViewCare(num)
}



  return (
    <div className="">
        <div className="text-white text-3xl bg-[#175CD3] pl-4 pt-4 pb-4 font-semibold">Patients</div>
        <div className="flex justify-between pl-4 pt-4 pb-4 pr-2 ">
                <div className="flex gap-2">
                    <span  onClick={() => handleToggle(1)} className={`pt-2 pb-2 cursor-pointer pl-4 pr-4 text-sm rounded-md font-semibold ${viewCare === 1 ? 'text-white' : 'text-[#175CD3]' }  ${viewCare === 1 ? 'bg-[#175CD3]' : 'bg-[#F9FAFB]' }`}>Patients Bio-data</span>
                    <button onClick={() => viewCarePlan(2)} className={`pt-2 pb-2 cursor-pointer pl-4 pr-4  outline-none ${viewCare === 2 ? 'text-white' : 'text-[#175CD3]' }  ${viewCare === 2? 'bg-[#175CD3]' : 'bg-[#F9FAFB]' } text-sm rounded-md font-semibold`}>Care Plan</button>
                    <button onClick={() => viewCarePlan2(3)} className={`pt-2 pb-2 cursor-pointer pl-4 pr-4  outline-none ${viewCare === 3 ? 'text-white' : 'text-[#175CD3]' }  ${viewCare === 3? 'bg-[#175CD3]' : 'bg-[#F9FAFB]' } text-sm rounded-md font-semibold`}>Nurses plan</button>
                </div>
                <span className="text-2xl"><i className='bx bx-bell'></i></span>
        </div>
    </div>
    
  )
}

export default FixedBar