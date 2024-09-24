import Table from "../../Table";

interface PrescriptionProps {
  onNext?: () => void;
  onBack?: () => void;
}

const Prescription = ({ onNext, onBack }: PrescriptionProps) => {
  const prescriptionData = [
    {
      name: "Dr Kadija",
      avatar: "/src/assets/Doctor/Avatar.svg",
      prescription: "Panadol (Paracetamol/Acetaminophen)",
      dosage: "1 tablet - 3x daily",
    },
    {
      name: "Dr Kadija",
      avatar: "/src/assets/Doctor/Avatar.svg",
      prescription: "Panadol (Paracetamol/Acetaminophen)",
      dosage: "1 tablet - 2x daily",
    },
    {
      name: "Dr Kadija",
      avatar: "/src/assets/Doctor/Avatar.svg",
      prescription: "Panadol (Paracetamol/Acetaminophen)",
      dosage: "1 capsule - 3x daily",
    },
    {
      name: "Dr Kadija",
      avatar: "/src/assets/Doctor/Avatar.svg",
      prescription: "Panadol (Paracetamol/Acetaminophen)",
      dosage: "1 capsule - 3x daily",
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
          <h4 className="label-text">Prescriptions and Dosage</h4>
          <p className="sub-label">
            List of Prescriptions, dosage and the doctor prescribed by.
          </p>
        </div>

        {/* Line */}
        <hr className="divider" />
        
        {/* Table */}
        <Table
          headers={["Prescription", "Dosage", "Ordered by"]}
          data={prescriptionData.map((item) => [
            item.prescription,
            item.dosage,
            { name: item.name, avatar: item.avatar },
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

export default Prescription;
