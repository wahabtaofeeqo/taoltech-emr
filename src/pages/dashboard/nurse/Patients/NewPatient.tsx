import CustomButton from "@/components/ui/Button";
import CustomDropdown from "@/components/ui/Select";
import React from "react";
import { FaPlus } from "react-icons/fa";

const NewPatient = () => {
  return (
    <main>
      <div className="py-3 px-6 bg-light-blue text-black mb-4">
        <h1 className="font-lora text-2xl font-bold">Patients</h1>
      </div>

      <div className="p-4">
        <div className="space-y-4  p-4 bg-off-white rounded-2xl max-h-[70vh] overflow-y-auto scrollbar-hide">
          <div className="flex items-center justify-between mb-8">
            <CustomButton
              className="px-4"
              icon={FaPlus}
              iconPosition="right"
              size="md"
            >
              Add New Patient
            </CustomButton>
            <CustomDropdown
              defaultOption="Registered Patient"
              onSelect={(value) => console.log(value)}
              name="patient type"
              className="w-full md:w-1/3"
              options={[{ label: "Option 1", value: "Optional" }]}
            />
          </div>
          <form className="mx-auto w-1/2 space-y-4">
            <div>
              <CustomDropdown
                label="Select Doctor"
                defaultOption="doctor"
                onSelect={(value) => console.log(value)}
                name="doctor"
                size="sm"
                placeholder="Select Doctor"
                className="w-full"
                options={[{ label: "Option 1", value: "Optional" }]}
              />
            </div>
            <div className="flex items-center gap-4">
              <CustomDropdown
                label="Date"
                defaultOption="date"
                size="sm"
                onSelect={(value) => console.log(value)}
                name="date"
                placeholder="Date"
                className="w-full"
                options={[{ label: "Option 1", value: "Optional" }]}
              />
              <CustomDropdown
                label="Time"
                size="sm"
                defaultOption="time"
                onSelect={(value) => console.log(value)}
                name="time"
                placeholder="Select Time"
                className="w-full"
                options={[{ label: "Option 1", value: "Optional" }]}
              />
            </div>
            <div>
              <CustomDropdown
                label="Duration"
                size="sm"
                defaultOption="duration"
                onSelect={(value) => console.log(value)}
                name="doctor"
                placeholder="Select duration"
                className="w-full"
                options={[{ label: "Option 1", value: "Optional" }]}
              />
            </div>
            <div>
              <CustomDropdown
                label="Appointment Type"
                defaultOption="consultation"
                size="sm"
                onSelect={(value) => console.log(value)}
                name="doctor"
                placeholder="Select duration"
                className="w-full"
                options={[{ label: "Option 1", value: "Optional" }]}
              />
            </div>
            <div className="flex items-center gap-4 mt-4">
              <CustomButton
                className="px-4"
                size="md"
                type="button"
                variant="secondary"
                fullWidth
              >
                Cancel
              </CustomButton>
              <CustomButton className="px-4" size="md" type="submit" fullWidth>
                Schedule Appointment
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default NewPatient;
