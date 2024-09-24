import CTAButton from "../../components/Button/Button";
import { Table, TableColumn } from "../../components/Table/Table";
import { AppointmentList } from "../../interfaces/appointmentList";
import PatientsInWard from "./PatientsInWard/PatientsInWard";
import ContactStaff from "./contactStaff/ContactStaff";

const Home = () => {
  const mockData: AppointmentList[] = [
    { regID: "1", patientName: "patient 1", gender: "Female" },
    { regID: "2", patientName: "patient 1", gender: "Female" },
    { regID: "3", patientName: "patient 1", gender: "Female" },
    { regID: "4", patientName: "patient 1", gender: "Male" },
    { regID: "5", patientName: "patient 1", gender: "Female" },
    { regID: "6", patientName: "patient 1", gender: "Female" },
    { regID: "7", patientName: "patient 1", gender: "Male" },
  ];
  const columns: TableColumn<AppointmentList>[] = [
    { key: "regID", header: "RegID" },
    {
      key: "patientName",
      header: "Patient Name",
    },
    { key: "gender", header: "Gender" },
  ];

  return (
    <section className="w-full border border-gray-200 p-1 rounded-xl shadow-lg mt-5 mx-auto bg-white xl:w-[98%] xl:mx-auto">
      <div className=" w-full mt-3 md:w-full xl:flex lg:gap-x-2 xl:px-3">
        <div className="border-b mb-5"></div>

        <div className="overflow-x-auto rounded-lg border border-gray-200 px-2 w-full mt-4">
          <div className="mb-4 py-4">
            <h3 className="text-xl font-bold text-gray-700">
              Consultation Management
            </h3>
            <p className="text-sm text-gray-500">
              This is a list of appointments
            </p>
          </div>
          <Table data={mockData} columns={columns} />
          <div className="flex flex-col w-full gap-y-3 mt-4 mb-7 xl:flex xl:flex-row xl:items-end xl:justify-end py-6 gap-4 ml-[-5px]">
            <CTAButton
              variant="primary"
              size="medium"
              onClick={() => alert("Primary button clicked")}
            >
              View Full List
            </CTAButton>
            <CTAButton
              variant="outline"
              size="medium"
              onClick={() => alert("Primary button clicked")}
            >
              Admit Next Patient
            </CTAButton>
          </div>
        </div>

        <div className="border mt-4 border-gray-200 rounded-lg px-2 w-full xl:w-[45%]">
          <ContactStaff />
        </div>
      </div>
      <div>
        <PatientsInWard />
      </div>
    </section>
  );
};

export default Home;
