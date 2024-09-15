import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";


type TableProps = {
  headers: string[];
  data: string[][];
  onRowClick: any;
};


const Table = ({ headers, data, onRowClick }: TableProps) => {
  const navigate = useNavigate();

  const handleRowClick = (rowIndex: number) => {
    if (rowIndex === 0) {
      if (onRowClick) {
        onRowClick();
      } else {
        navigate("/dashboard/patients/patientDetails");
      }
    }
  };

  return (
    <div className="overflow-x-auto border rounded-lg font-inter border-[#eaecf0]">
      <table className="w-full">
        <thead className="bg-[#f9fafb] text-left">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-4 border-b text-[#211B1B] text-xs font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="cursor-pointer "
              onClick={() => handleRowClick(rowIndex)}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-6 py-2 border-t hover:bg-gray-100 h-[72px] text-sm font-medium"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const WardMgt = () => {
  const navigate = useNavigate();
  const patientsData = [
    ["Mary James", "Ward 14", "Female"],
    ["Mary James", "Ward 14", "Female"],
    ["Mary James", "Ward 14", "Female"],
    ["Mary James", "Ward 14", "Female"],
    ["Mary James", "Ward 14", "Female"],
    ["Mary James", "Ward 14", "Female"],
  ];

  const nursesData = [
    {
      name: "Deanna Annis",
      email: "deannaannis@gmail.com",
      ward: "Ward 14",
      avatarSrc: "/src/assets/Doctor/Avatar.svg",
    },
    {
      name: "Deanna Annis",
      email: "deannaannis@gmail.com",
      ward: "Ward 14",
      avatarSrc: "/src/assets/Doctor/Avatar.svg",
    },
    {
      name: "Deanna Annis",
      email: "deannaannis@gmail.com",
      ward: "Ward 14",
      avatarSrc: "/src/assets/Doctor/Avatar.svg",
    },
    {
      name: "Deanna Annis",
      email: "deannaannis@gmail.com",
      ward: "Ward 14",
      avatarSrc: "/src/assets/Doctor/Avatar.svg",
    },
    {
      name: "Deanna Annis",
      email: "deannaannis@gmail.com",
      ward: "Ward 14",
      avatarSrc: "/src/assets/Doctor/Avatar.svg",
    },
  ];

  const handleRowClick = () => {
    navigate("/dashboard/patients/patientDetails");
  };

  return (
    <div className="h-full bg-[#fff] pb-6 w-full">
      <header className="flex items-center justify-between bg-health-primary">
        <h2 className=" header-text">
          Ward Management
        </h2>
        <div className="relative pr-3 text-white">
          <div className="absolute w-2 h-2 bg-red-600 rounded-full left-[13px]"></div>
          <IoNotificationsOutline className="w-6 h-6" />
        </div>
      </header>

      <div className="flex flex-col w-full gap-6 px-6 py-6 lg:flex-row">
        
        {/* Patient's In Ward */}
        <div className="flex flex-col w-full gap-6 px-6 py-6 border rounded-lg lg:w-1/2">
          {/* Patient's Label */}
          <div>
            <h4 className="label-text">Patients in Wards</h4>
            <p className="sub-label">List of Patients in the Ward.</p>
          </div>

          {/* Line */}
          <hr className="divider" />

          {/* Input Field  */}
          <div className="relative flex w-full">
            <span className="absolute inset-y-0 top-0 text-[#878583] flex items-center left-0 pl-2">
              <CiSearch className="w-6 h-6" />
            </span>
            <input
              name="search"
              type="text"
              placeholder="Search"
              className="h-10 bg-[#f9fafb] placeholder:text-[#878583] pl-12 lg:w-[360px] rounded-lg w-full"
            />
          </div>

          <Table
            headers={["Patients", "Ward Assigned", "Gender"]}
            data={patientsData}
            onRowClick={handleRowClick}
          />
        </div>

        {/* Nurses Schedule */}
        <div className="flex flex-col w-full gap-6 px-6 py-6 lg:w-1/2">
          {/* Nurses Label */}
          <div>
            <h4 className="label-text">Nurse's Schedule</h4>
            <p className="sub-label">List of Nurses on duty.</p>
          </div>

          {/* Line */}
          <hr className="divider" />
          
          {nursesData.map((nurse, index) => (
            <div key={index} className="flex items-center justify-between py-2 pl-5 pr-3 ">
              <div className="flex items-center gap-4">
                <img src={nurse.avatarSrc} width={39} height={39} alt="Nurse" />
                <div className="flex flex-col">
                  <p className="text-sm font-bold text-blue-900">{nurse.name}</p>
                  <p className="text-xs text-gray-500">{nurse.email}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">{nurse.ward}</p>
              <div className="flex items-center gap-2">
                <img src="/src/assets/ping-icon.png" width={40} height={40} alt="Ping" />
                <img src="/src/assets/message-icon.png" width={24} height={24} alt="Message" />
              </div>
            </div>
          ))}
    
        </div>
      </div>
    </div>
  );
};

export default WardMgt;
