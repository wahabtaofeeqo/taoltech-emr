import { CiSearch } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import Table from "./Table";
  
const Patients = () => {
 
  const patientsData = [
    ["Mary James", "Ward 14", "Female"],
    ["Mary James", "Ward 14", "Female"],
    ["Mary James", "Ward 14", "Female"],
    ["Mary James", "Ward 14", "Female"],
    ["Mary James", "Ward 14", "Female"],
    ["Mary James", "Ward 14", "Female"],
  ];

  return (
    <div className="h-full bg-[#fff] pb-6 w-full">
      <header className="flex items-center justify-between bg-health-primary">
        <h2 className="header-text">
          Patients
        </h2>
        <div className="relative pr-3 text-white">
          <div className="absolute w-2 h-2 bg-red-600 rounded-full left-[13px] "></div>
          <IoNotificationsOutline className="w-6 h-6" />
        </div>
      </header>

      
      <div className="flex flex-col w-full gap-6 px-6 py-6 lg:flex-row">
        
        {/* left side div */}
        <div className="flex flex-col w-full gap-6 lg:w-1/2">
          
          {/* Search Container */}
          <div className="flex flex-col w-full gap-6 px-6 py-6 border rounded-lg ">
            <div>
              <h4 className="label-text">Search</h4>
              <p className="sub-label">Search for any of your patients.</p>
            </div>
            <hr className="divider" />

            {/* Input Field */}
            <div className="relative w-full">
              <span className="absolute inset-y-0 top-0 left-0 pl-3 text-[#878583] flex items-center">
                <CiSearch className="w-6 h-6" />
              </span>
              <input
                type="text"
                placeholder="Search"
                className="pl-12 bg-[#f9fafb] placeholder:text-[#878583] h-10 lg:w-[360px] rounded-lg w-full"
              />
            </div>
          </div>

          {/* Patients In Ward Contaner */}
          <div className="flex flex-col w-full gap-6 px-6 py-6 border rounded-lg ">
            <div>
              <h4 className="label-text">Patients in Wards</h4>
              <p className="sub-label">List of Patients in the Ward.</p>
            </div>
            <hr className="divider" />

            {/* Table */}
            <Table
              headers={["Patients", "Ward Assigned", "Gender"]}
              data={patientsData}
            />
          </div>
        </div>

        {/* right side div */}
        <div className="flex items-center justify-center w-full text-3xl font-semibold uppercase lg:w-1/2">Not Completed</div>
      </div>
    </div>
  );
};

export default Patients;
