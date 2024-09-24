import { useState } from "react";
import FormSelect from "../../../components/FormSelect/FormSelect";
import StaffContact from "../../../components/StaffContact/StaffContact";
import { IoMailUnreadOutline, IoWifiOutline } from "react-icons/io5";

interface StaffInformation {
  name: string;
  email: string;
  image: string;
}

   const mockData: StaffInformation[] = [
     {
       name: "Denna Anis",
       email: "denna@gmail.com",
       image:
         "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
     },
     {
       name: "Taylor Swift",
       email: "swift@gmail.com",

       image:
         "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
     },
     {
       name: "Taylor Swift",
       email: "swift@gmail.com",

       image:
         "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
     },
     {
       name: "John Doe",
       email: "john@gmail.com",
       image:
         "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
     },
   ];
     const options = [
       { value: "option1", label: "Radiologist" },
       { value: "option2", label: "Nurses on duty" },
       { value: "option3", label: "Midwives" },
     ];


const ContactStaff = () => {

  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSelect = (value: string) => {
    setSelectedOption(value);
    console.log("Selected Value:", value);
  };

  return (
    <div className="w-full flex-1">
      <div className="mt-3 py-2 flex justify-between">
        <h3 className="text-lg font-bold text-gray-700">Contact Staff</h3>
        <div className="">
          <FormSelect
            options={options}
            onSelect={handleSelect}
            placeholder="Laboratory Technicians"
          />

        </div>
      </div>

      {mockData.map((contact, index) => (
        <>
          <StaffContact
            key={index}
            name={contact.name}
            email={contact.email}
            imageUrl={contact.image}
            Icons={[{ Icon: IoWifiOutline }, { Icon: IoMailUnreadOutline }]}
          />
        </>
      ))}
    </div>
  );
}

export default ContactStaff