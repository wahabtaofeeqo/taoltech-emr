import React from 'react';
import 'boxicons/css/boxicons.min.css';

type activeInfo = {
  viewInfo: boolean;
  setViewInfo: React.Dispatch<React.SetStateAction<boolean>>;
  viewCare: boolean;
  setViewCare: React.Dispatch<React.SetStateAction<boolean>>;
}

const FixedBar: React.FC<activeInfo> = ({ viewInfo, setViewInfo, viewCare, setViewCare }) => {

  const handleToggle = () => {
    setViewInfo(false); 
    setViewCare(false);
    console.log("am here")
  }

  const viewCarePlan = () => {
        if(viewInfo) {
          setViewCare(true)
        }
  }


  return (
    <div className="">
        <div className="text-white text-3xl bg-[#175CD3] pl-4 pt-4 pb-4 font-semibold">Patients</div>
        <div className="flex justify-between pl-4 pt-4 pb-4 pr-2 ">
                <div className="flex gap-2">
                    <span onClick={handleToggle}  className={`active pt-2 pb-2 pl-4 pr-4 bg-[#175CD3] ${!viewInfo ? 'text-white' : 'text-[#175CD3]' } text-sm rounded-md font-semibold ${!viewInfo ? 'bg-[#175CD3]' : 'bg-[#F9FAFB]' }`}>All</span>
                    <span className={`pt-2 pb-2  pl-4 pr-4 text-sm rounded-md font-semibold ${viewInfo && !viewCare ? 'text-white' : 'text-[#175CD3]' }  ${viewInfo && !viewCare? 'bg-[#175CD3]' : 'bg-[#F9FAFB]' }`}>Patients Bio-data</span>
                    <button onClick={() => viewCarePlan()} disabled={!viewInfo} className={`pt-2 pb-2  pl-4 pr-4  outline-none ${viewInfo && viewCare ? 'text-white' : 'text-[#175CD3]' }  ${viewInfo && viewCare? 'bg-[#175CD3]' : 'bg-[#F9FAFB]' } text-sm rounded-md font-semibold`}>Care Plan</button>
                </div>
                <span className="text-2xl"><i className='bx bx-bell'></i></span>
        </div>
    </div>
    
  )
}

export default FixedBar