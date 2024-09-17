import { Table, TableColumn } from "../../../components/Table/Table";
import { AppointmentList } from "../../../interfaces/appointmentList";
import CTAButton from "../../../components/Button/Button";

const PatientsInWard = () => {
  const mockData: AppointmentList[] = [
    {
      regID: "1",
      patientName: "patient 1",
      gender: "Female",
      avatar:
        "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
    },
    {
      regID: "2",
      patientName: "patient 1",
      gender: "Female",
      avatar:
        "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
    },
    {
      regID: "3",
      patientName: "patient 1",
      gender: "Female",
      avatar:
        "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
    },
    {
      regID: "4",
      patientName: "patient 1",
      gender: "Male",
      avatar:
        "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
    },
    {
      regID: "5",
      patientName: "patient 1",
      gender: "Female",
      avatar:
        "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
    },
    {
      regID: "6",
      patientName: "patient 1",
      gender: "Female",
      avatar:
        "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
    },
    {
      regID: "7",
      patientName: "patient 1",
      gender: "Male",
      avatar:
        "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
    },
  ];
  const columns: TableColumn<AppointmentList>[] = [
    { key: "regID", header: "RegID" },
    {
      key: "patientName",
      header: "Patient Name",
    },
    { key: "gender", header: "Gender" },
    {
      key: "avatar",
      header: "Primary Care Giver",
      render: (value, item) => (
        <div className="flex items-center">
          {item.avatar && (
            <img
              src={item.avatar}
              alt={`${value} avatar`}
              className="w-8 h-8 rounded-full mr-2"
            />
          )}
          <p>Dr. John Smith</p>
        </div>
      ),
    },
  ];
  return (
    <section className="w-full border border-gray-200 p-1 rounded-xl shadow-lg mt-5 mx-auto bg-white xl:w-[98%] xl:mx-auto">
      <div className=" w-full mt-3 md:w-full xl:flex lg:gap-x-2 xl:px-3">
        <div className="border-b mb-5"></div>

        <div className="overflow-x-auto rounded-lg border border-gray-200 px-2 w-full mt-4">
          <div className="mb-4 py-4">
            <h3 className="text-xl font-bold text-gray-700">
              Patients In Ward
            </h3>
            <p className="text-sm text-gray-500">
              This is a list of all patients in the ward
            </p>
          </div>
          <Table data={mockData} columns={columns} />
          <div className="flex flex-col w-full gap-y-3 mt-4 mb-7 xl:flex xl:flex-row xl:items-end xl:justify-end py-6 gap-4 ml-[-5px]">
            <CTAButton
              variant="outline"
              size="medium"
              onClick={() => alert("Primary button clicked")}
            >
              View Full List
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientsInWard;
