import Table from "../../Table";

type FormFieldProps = {
  id: string;
  label: string;
  placeholder?: string;
  readOnly?: boolean;
  type?: string;
  options?: string[];
  className: string;
};

// Reusable form field component
const FormField = ({
  id,
  label,
  placeholder,
  readOnly = false,
  type = "text",
  options = [],
  className= '',
}: FormFieldProps) => (
  <div className="flex flex-col w-full gap-3">
    <label className="font-semibold" htmlFor={id}>
      {label}
    </label>
    {type === "select" ? (
      <select
        id={id}
        className="bg-[#f9fafb] py-3 pr-[14px] px-3 rounded-lg text-[#878583]
        "
      >
        {options.map((option, index) => (
          <option key={index} value={option} selected={index === 0}>
            {option}
          </option>
        ))}
      </select>
    ) : (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`bg-[#f9fafb] py-[14px] px-3 rounded-lg placeholder:text-[#878583] ${className} text-[#878583]`}
        aria-readonly={readOnly}
      />
    )}
  </div>
);

const PatientBioData = ({ onNext }: { onNext: () => void }) => {
  const handleNextClick = () => {
    // Call the onNext callback to change the tab
    if (onNext) {
      onNext();
    }
  };

  const physicianData = [
    [
      "Dr. Mike",
      "Family Medicine",
      "dr.mike@email.com",
      "Mon-Fri, 9 AM - 5 PM",
      "+23490000000",
    ],
    [
      "Dr. Mike",
      "Family Medicine",
      "dr.mike@email.com",
      "Mon-Fri, 9 AM - 5 PM",
      "+23490000000",
    ],
  ];

  const referralData = [
    {
      name: "Dr. Mike",
      avatar: "/src/assets/Doctor/Avatar.svg",
      department: "Family Medicine",
      hospital: "Saint Michaels hospital, Ogun",
      date: "Mon-Fri, 9 AM - 5 PM",
      contact: "+23490000000",
    },
    {
      name: "Dr. Mike",
      avatar: "/src/assets/Doctor/Avatar.svg",
      department: "Family Medicine",
      hospital: "Saint Michaels hospital, Ogun",
      date: "Mon-Fri, 9 AM - 5 PM",
      contact: "+23490000000",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Physician Assigned */}
      <div className="flex flex-col w-full gap-6 px-6 py-6 border rounded-lg">
        <div>
          <h4 className="label-text">Primary Care</h4>
          <p className="sub-label">Primary physician assigned to patient</p>
        </div>
        <hr className="divider" />
        <div className="flex flex-col items-center w-full gap-6 md:flex-row">
          <FormField
            id="assignedPhysician"
            label="Assigned Physician"
            placeholder="Martins"
            readOnly
            className=""
          />
          <FormField
            id="contact"
            label="Contact"
            placeholder="0812345678"
            readOnly
            className=""
          />
        </div>
      </div>

      {/* Vitals */}
      <div className="flex flex-col w-full gap-6 px-6 py-6 border rounded-lg">
        <div>
          <h4 className="label-text">Vitals</h4>
          <p className="sub-label">Most recent record of vitals taken.</p>
        </div>
        <hr className="divider" />
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                label: "Body Temperature",
                placeholder: "Enter Temperature in °F or °C",
                className: 'placeholder:text-[#afaead]'
              },
              {
                label: "Heart Rate (Pulse)",
                placeholder: "Enter heart rate in bpm",
              },
              {
                label: "Respiratory Rate",
                placeholder: "Enter breaths per minute",
              },
              {
                label: "Blood Pressure",
                placeholder: "Enter BP (e.g 120/80 mmHg)",
              },
              {
                label: "Oxygen Saturation (SpO2)",
                placeholder: "Enter SpO2 percentage",
              },
              { label: "Pain Level", placeholder: "Enter pain level (0-10)" },
              { label: "Weight", placeholder: "Enter weight in lbs or kg" },
              { label: "Height", placeholder: "Enter height in ft/in or cm" },
              {
                label: "Blood Glucose Level",
                placeholder: "Enter BGL in mg/dL or mmol/L",
              },
            ].map((field, index) => (
              <FormField
                key={index}
                id={`vitals-${index}`}
                label={field.label}
                placeholder={field.placeholder}
                className={`placeholder:text-[#afaead]`}
              />
            ))}
          </div>
          <FormField
            id="additionalNotes"
            label="Additional Notes"
            placeholder="Enter additional notes on patient's vital and include time stamp."
            className={`placeholder:text-[#afaead]`}
          />
        </div>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col w-full gap-6 px-6 py-6 border rounded-lg">
        <div>
          <h4 className="label-text">Contact Information</h4>
          <p className="sub-label">Patient&#39;s contact details.</p>
        </div>
        <hr className="divider" />
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {[
            {
              label: "Home Address",
              placeholder: "15, Tom Jones Street, Lagos Island",
            },
            { label: "Phone Number", placeholder: "0812345678" },
            { label: "Email Address", placeholder: "Johndoe@gmail.com" },
          ].map((info, index) => (
            <FormField
              key={index}
              id={`contactInfo-${index}`}
              label={info.label}
              placeholder={info.placeholder}
              readOnly
              className=""
            />
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="flex flex-col w-full gap-6 px-6 py-6 border rounded-lg">
        <div>
          <h4 className="label-text">Emergency Contact</h4>
          <p className="sub-label">Contact in case of emergency.</p>
        </div>
        <hr className="divider" />
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {[
            { label: "Next of Kin", placeholder: "Mr. Victor Alfred" },
            { label: "Relationship to Patient", placeholder: "Husband" },
            { label: "Phone Number", placeholder: "08012345678" },
            { label: "Home Address", placeholder: "No 42 Montgomery Road" },
          ].map((info, index) => (
            <FormField
              key={index}
              id={`emergencyContact-${index}`}
              label={info.label}
              placeholder={info.placeholder}
              readOnly
              className=""
            />
          ))}
        </div>
      </div>

      {/* List of Assigned Physician*/}
      <div className="flex flex-col w-full gap-6 px-6 py-6 border rounded-lg">
        <div>
          <h4 className="label-text">List of Assigned to Mary James</h4>
          <p className="sub-label">Primary physician assigned to patient.</p>
        </div>
        <hr className="divider" />
        <Table
          headers={[
            "Physician",
            "Specialty",
            "Email",
            "Office Hours",
            "Contact",
          ]}
          data={physicianData}
        />
      </div>

      {/* Referral Info */}
      <div className="flex flex-col w-full gap-6 px-6 py-6 border rounded-lg">
        <div>
          <h4 className="label-text">Referral Info</h4>
          <p className="sub-label">
            List of referrals and doctors who signed off.
          </p>
        </div>
        <hr className="divider" />
        <Table
          headers={[
            "Referred by",
            "Department referred from",
            "Hospital Reffered to",
            "Date",
            "Contact",
          ]}
          data={referralData.map((item) => [
            { avatar: item.avatar, name: item.name },
            item.department,
            item.hospital,
            item.date,
            item.contact,
          ])}
        />
      </div>

      {/* Additional Info */}
      <div className="flex flex-col w-full gap-6 px-6 py-6 border rounded-lg">
        <h3 className="pl-2 label-text">Additional Information</h3>
        <div className="grid w-full grid-cols-1 gap-5 mt-3 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              label: "Past Medical Conditions",
              type: "select",
              options: ["Hypertension", "Diabetes", "Asthma", "None"],
            },
            {
              label: "Past Medical Conditions",
              type: "select",
              options: ["Hypertension", "Diabetes", "Asthma", "None"],
            },
            {
              label: "Current Medication",
              type: "input",
              placeholder: "Panadol (Paracetamol/Acetaminophen)",
            },
            { label: "Surgical History", type: "input", placeholder: "None" },
          ].map((info, index) => (
            <FormField
              key={index}
              id={`additionalInfo-${index}`}
              label={info.label}
              placeholder={info.placeholder}
              type={info.type}
              options={info.options}
              className=""
            />
          ))}
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end mt-3 font-inter">
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

export default PatientBioData;
