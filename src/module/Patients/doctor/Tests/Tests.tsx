import Table from "../Table";

interface TestProps {
  onNext: () => void;
  onBack: () => void;
}

const Tests = ({ onNext, onBack }: TestProps) => {
  const prescriptionData = [
    {
      name: "Dr Mike",
      avatar: "/src/assets/Doctor/Avatar.svg",
      date: "22-07-2024",
      test: "Malaria Test",
      lab: "Richard O",
    },
    {
      name: "Dr Mike",
      avatar: "/src/assets/Doctor/Avatar.svg",
      date: "22-07-2024",
      test: "Malaria Test",
      lab: "Richard O",
    },
    {
      name: "Dr Mike",
      avatar: "/src/assets/Doctor/Avatar.svg",
      date: "22-07-2024",
      test: "Malaria Test",
      lab: "Richard O",
    },
    {
      name: "Dr Mike",
      avatar: "/src/assets/Doctor/Avatar.svg",
      date: "22-07-2024",
      test: "Malaria Test",
      lab: "Richard O",
    },
    {
      name: "Dr Mike",
      avatar: "/src/assets/Doctor/Avatar.svg",
      date: "22-07-2024",
      test: "Malaria Test",
      lab: "Richard O",
    },
    {
      name: "Dr Mike",
      avatar: "/src/assets/Doctor/Avatar.svg",
      date: "22-07-2024",
      test: "Malaria Test",
      lab: "Richard O",
    },
  ];

  const handleNextClick = () => {
    if (onNext) {
      onNext();
    }
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    }
  };
  return (
    <div>
      <div className="flex flex-col w-full gap-6 px-6 py-6 border rounded-lg">
        {/* Label */}
        <div>
          <h4 className="label-text">Tests done</h4>
          <p className="sub-label">List of tests done by patient.</p>
        </div>

        {/* Line */}
        <hr className="divider" />

        <Table
          headers={[
            "Date",
            "Test Conducted",
            "Doctor's Name",
            "Lab Tech's Name",
          ]}
          data={prescriptionData.map((item) => [
            item.date,
            item.test,
            { name: item.name, avatar: item.avatar },
            item.lab,
          ])}
        />
      </div>
      
      {/* Back and Next Btn  */}
      <div className="flex justify-between px-3 mt-5 font-inter">
        <button
          className="bg-[#1659cc] text-[#fff] px-5 py-3 font-semibold rounded-lg"
          onClick={handleBackClick}
        >
          Back
        </button>
        <button
          className="bg-[#1659cc] text-[#fff] px-5 py-3 font-semibold rounded-lg"
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Tests;
