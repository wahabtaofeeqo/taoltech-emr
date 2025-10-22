import AllDoctors from "@/components/common/Admin/Doctors/AllDoctors";
import RecentlyAppointedDoctor from "@/components/common/Admin/Doctors/RecentlyAppointedDoctors";
import React, { useState } from "react";

const Doctors: React.FC = () => {
  const [showRecentlyAppointed, setShowRecentlyAppointed] = useState(false);
  return (
    <main>
      <div className="py-3 px-6 bg-light-blue text-black mb-4">
        <h1 className="font-lora text-2xl font-bold">Doctors</h1>
      </div>
      <div className="flex items-center gap-2 px-4">
        <button className="text-black bg-gray-1 px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50 text-sm hover:bg-primary-blue hover:text-white transition">
          Today
        </button>
        <button className="text-black bg-gray-1 px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50 text-sm hover:bg-primary-blue hover:text-white transition">
          Week
        </button>
        <button className="text-black bg-gray-1 px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50 text-sm hover:bg-primary-blue hover:text-white transition">
          Month
        </button>
        <button className="text-black bg-gray-1 px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50 text-sm hover:bg-primary-blue hover:text-white transition">
          Year
        </button>
        <button className="text-black bg-gray-1 px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50 text-sm hover:bg-primary-blue hover:text-white transition">
          <input type="date" placeholder="Filter By Date" />
        </button>
      </div>
      <div className="p-4">
        {showRecentlyAppointed ? (
          <RecentlyAppointedDoctor
            setRecentlyAppointed={setShowRecentlyAppointed}
          />
        ) : (
          <AllDoctors
            setRecentlyAppointed={setShowRecentlyAppointed}
            showRecentlyAppointed={showRecentlyAppointed}
          />
        )}
      </div>
    </main>
  );
};

export default Doctors;
