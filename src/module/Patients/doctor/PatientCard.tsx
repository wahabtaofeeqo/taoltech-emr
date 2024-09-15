interface InputProps {
  label: string;
  placeholder: string;
  
}

const InputField = ({ label, placeholder }: InputProps) => (
    <div className="flex flex-col gap-[10px]">
      <label className="font-semibold">{label}</label>
      <input
        placeholder={placeholder}
        readOnly
        className="border placeholder:text-[#383431] border-[#eaecf0] rounded-md h-[40px] pr-2 pl-2"
        aria-label={label}
      />
    </div>
  );
  
  const PatientCard = () => {
    return (
      <div className="flex px-6 py-6 border rounded-lg">
        <div className="flex gap-[10px] flex-col lg:flex-row w-full">
          
          {/* Patient's Image */}
          <div className="flex items-center justify-center lg:justify-none lg:items-start">
            <img
              src='/src/assets/Doctor/Patient.svg'
              width={149}
              height={184}
              alt='Patient Image'
            />
          </div>
          
          {/* Input fields */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <InputField label="Patient's Name" placeholder="Mary James" />
            <InputField label="Age" placeholder="31" />
            <InputField label="Date of Birth" placeholder="12-01-1985" />
            <InputField label="Phone Number of E.C" placeholder="08012345678" />
            <InputField label="Sex" placeholder="Female" />
            <InputField label="Blood Group" placeholder="O+" />
            <InputField label="Reg. Number" placeholder="SJ-6150" />
          </div>
          
        </div>
      </div>
    );
  };
  
  export default PatientCard;