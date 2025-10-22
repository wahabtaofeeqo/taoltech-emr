// Registration.tsx
import CustomButton from "@/components/ui/Button";
import CustomInput from "@/components/ui/Input";
import CustomRadio from "@/components/ui/Radio";
import CustomDropdown from "@/components/ui/Select";
import CustomCheckbox from "@/components/ui/Checkbox";
import React, { useState } from "react";

type PhoneItem = {
  id: string;
  country: string;
  number: string;
};

type FormData = {
  title: string;
  surname: string;
  firstName: string;
  middleName: string;
  sex: string;
  email: string;
  identityNumber: string;
  dateOfBirth: string;
  options: {
    newBorn: boolean;
    specialChild: boolean;
    existingPatient: boolean;
  };
  billing: {
    insuranceType: string;
    insuranceProvider: string;
    insuranceEnrollmentNumber: string;
    employerName: string;
    addFeeCurrency: string;
    addFeeAmount: string;
  };
  contact: {
    address: string;
    country: string;
    state: string;
    city: string;
    referral: string;
    nextOfKinName: string;
    nextOfKinPhone: string;
    nextOfKinAddress: string;
    relationshipToNextOfKin: string;
  };
  social: {
    maritalStatus: string;
    preferredLanguage: string;
    religion: string;
    tribe: string;
    occupation: string;
    employmentDate: string;
    educationalLevel: string;
    schoolName: string;
    numberOfChildren: string;
  };
};

const mock = {
  titles: [
    { id: "1", value: "mr", label: "Mr" },
    { id: "2", value: "mrs", label: "Mrs" },
    { id: "3", value: "ms", label: "Ms" },
    { id: "4", value: "dr", label: "Dr" },
  ],
  countries: [
    { id: "ng", value: "NG", label: "Nigeria" },
    { id: "gh", value: "GH", label: "Ghana" },
    { id: "us", value: "US", label: "United States" },
  ],
  insuranceProviders: [
    {
      id: "private",
      value: "private",
      label: "Private patient (No insurance)",
    },
    { id: "provider1", value: "provider1", label: "Provider One" },
    { id: "provider2", value: "provider2", label: "Provider Two" },
    { id: "provider3", value: "provider3", label: "Provider Three" },
  ],
  insuranceTypes: [
    { id: "principal", value: "principal", label: "Principal" },
    { id: "dependent", value: "dependent", label: "Dependent" },
    { id: "spouse", value: "spouse", label: "Spouse" },
    { id: "child", value: "child", label: "Child" },
  ],
  maritalStatuses: [
    { id: "single", value: "single", label: "Single" },
    { id: "married", value: "married", label: "Married" },
    { id: "divorced", value: "divorced", label: "Divorced" },
    { id: "widowed", value: "widowed", label: "Widowed" },
    { id: "separated", value: "separated", label: "Separated" },
  ],
  religions: [
    { id: "christian", value: "christian", label: "Christian" },
    { id: "muslim", value: "muslim", label: "Muslim" },
    { id: "traditional", value: "traditional", label: "Traditional" },
    { id: "other", value: "other", label: "Other" },
    { id: "none", value: "none", label: "None" },
  ],
  languages: [
    { id: "en", value: "en", label: "English" },
    { id: "ig", value: "ig", label: "Igbo" },
    { id: "yo", value: "yo", label: "Yoruba" },
    { id: "ha", value: "ha", label: "Hausa" },
    { id: "fr", value: "fr", label: "French" },
  ],
  occupations: [
    { id: "student", value: "student", label: "Student" },
    { id: "employee", value: "employee", label: "Employee" },
    { id: "self-employed", value: "self-employed", label: "Self-employed" },
    { id: "unemployed", value: "unemployed", label: "Unemployed" },
    { id: "retired", value: "retired", label: "Retired" },
  ],
  educationLevels: [
    { id: "none", value: "none", label: "None" },
    { id: "primary", value: "primary", label: "Primary" },
    { id: "secondary", value: "secondary", label: "Secondary" },
    { id: "tertiary", value: "tertiary", label: "Tertiary" },
    { id: "post-graduate", value: "post-graduate", label: "Post Graduate" },
  ],
  childrenOptions: [
    { id: "0", value: "0", label: "0" },
    { id: "1", value: "1", label: "1" },
    { id: "2", value: "2", label: "2" },
    { id: "3", value: "3", label: "3" },
    { id: "4", value: "4", label: "4" },
    { id: "5+", value: "5+", label: "5+" },
  ],
  states: [
    { id: "lagos", value: "lagos", label: "Lagos" },
    { id: "abuja", value: "abuja", label: "Abuja" },
    { id: "rivers", value: "rivers", label: "Rivers" },
    { id: "kano", value: "kano", label: "Kano" },
    { id: "oyo", value: "oyo", label: "Oyo" },
  ],
  referrals: [
    { id: "walkin", value: "walkin", label: "Walk-in" },
    { id: "doctor", value: "doctor", label: "Doctor Referral" },
    { id: "online", value: "online", label: "Online Booking" },
    { id: "insurance", value: "insurance", label: "Insurance Referral" },
    { id: "other", value: "other", label: "Other" },
  ],
  relationships: [
    { id: "spouse", value: "spouse", label: "Spouse" },
    { id: "parent", value: "parent", label: "Parent" },
    { id: "child", value: "child", label: "Child" },
    { id: "sibling", value: "sibling", label: "Sibling" },
    { id: "friend", value: "friend", label: "Friend" },
    { id: "other", value: "other", label: "Other" },
  ],
};

const makePhone = (idx = 0): PhoneItem => ({
  id: String(Date.now()) + "-" + idx,
  country: "NG",
  number: "",
});

const Registration: React.FC = () => {
  // Form state
  const [form, setForm] = useState<FormData>({
    title: "",
    surname: "",
    firstName: "",
    middleName: "",
    sex: "male",
    email: "",
    identityNumber: "",
    dateOfBirth: "",
    options: {
      newBorn: false,
      specialChild: false,
      existingPatient: false,
    },
    billing: {
      insuranceType: "",
      insuranceProvider: "",
      insuranceEnrollmentNumber: "",
      employerName: "",
      addFeeCurrency: "NGN",
      addFeeAmount: "",
    },
    contact: {
      address: "",
      country: "NG",
      state: "",
      city: "",
      referral: "",
      nextOfKinName: "",
      nextOfKinPhone: "",
      nextOfKinAddress: "",
      relationshipToNextOfKin: "",
    },
    social: {
      maritalStatus: "",
      preferredLanguage: "",
      religion: "",
      tribe: "",
      occupation: "",
      employmentDate: "",
      educationalLevel: "",
      schoolName: "",
      numberOfChildren: "",
    },
  });

  const [phoneNumbers, setPhoneNumbers] = useState<PhoneItem[]>([makePhone(0)]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setForm((prev) => {
      const fields = field.split(".");
      if (fields.length === 1) {
        return { ...prev, [field]: value };
      } else if (fields.length === 2) {
        return {
          ...prev,
          [fields[0]]: {
            ...prev[fields[0] as keyof FormData],
            [fields[1]]: value,
          },
        };
      } else if (fields.length === 3) {
        return {
          ...prev,
          [fields[0]]: {
            ...prev[fields[0] as keyof FormData],
            [fields[1]]: {
              ...prev[fields[0] as keyof FormData][
                fields[1] as keyof FormData[keyof FormData]
              ],
              [fields[2]]: value,
            },
          },
        };
      }
      return prev;
    });
  };

  // Handle dropdown selection
  const handleDropdownSelect = (name: string, value: string) => {
    handleInputChange(name, value);
  };

  // Handle radio button changes
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleInputChange(name, value);
  };

  // Handle checkbox changes
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setForm((prev) => {
      const fields = name.split(".");
      if (fields.length === 2) {
        return {
          ...prev,
          [fields[0]]: {
            ...prev[fields[0] as keyof FormData],
            [fields[1]]: checked,
          },
        };
      }
      return prev;
    });
  };

  // Phone number management
  const addPhone = () => {
    if (phoneNumbers.length < 3) {
      setPhoneNumbers((prev) => [...prev, makePhone(prev.length)]);
    }
  };

  const removePhone = (id: string) => {
    if (phoneNumbers.length > 1) {
      setPhoneNumbers((prev) => prev.filter((phone) => phone.id !== id));
    }
  };

  const handlePhoneChange = (
    id: string,
    field: "country" | "number",
    value: string
  ) => {
    setPhoneNumbers((prev) =>
      prev.map((phone) =>
        phone.id === id ? { ...phone, [field]: value } : phone
      )
    );
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required fields validation
    if (!form.title) newErrors.title = "Title is required";
    if (!form.surname) newErrors.surname = "Surname is required";
    if (!form.firstName) newErrors.firstName = "First name is required";
    if (!form.sex) newErrors.sex = "Sex is required";
    if (!form.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!form.email) newErrors.email = "Email is required";

    // Email format validation
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone number validation
    if (phoneNumbers.length > 0 && !phoneNumbers[0].number) {
      newErrors["phoneNumbers[0]"] = "At least one phone number is required";
    }

    // Next of kin validation
    if (!form.contact.nextOfKinName) {
      newErrors["contact.nextOfKinName"] = "Next of kin name is required";
    }
    if (!form.contact.nextOfKinPhone) {
      newErrors["contact.nextOfKinPhone"] = "Next of kin phone is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Reset form
  const resetForm = () => {
    setForm({
      title: "",
      surname: "",
      firstName: "",
      middleName: "",
      sex: "male",
      email: "",
      identityNumber: "",
      dateOfBirth: "",
      options: {
        newBorn: false,
        specialChild: false,
        existingPatient: false,
      },
      billing: {
        insuranceType: "",
        insuranceProvider: "",
        insuranceEnrollmentNumber: "",
        employerName: "",
        addFeeCurrency: "NGN",
        addFeeAmount: "",
      },
      contact: {
        address: "",
        country: "NG",
        state: "",
        city: "",
        referral: "",
        nextOfKinName: "",
        nextOfKinPhone: "",
        nextOfKinAddress: "",
        relationshipToNextOfKin: "",
      },
      social: {
        maritalStatus: "",
        preferredLanguage: "",
        religion: "",
        tribe: "",
        occupation: "",
        employmentDate: "",
        educationalLevel: "",
        schoolName: "",
        numberOfChildren: "",
      },
    });
    setPhoneNumbers([makePhone(0)]);
    setErrors({});
  };

  // Form submission
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!validateForm()) {
      alert("Please fix the validation errors before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare form data with phone numbers
      const formData = {
        ...form,
        phoneNumbers: phoneNumbers.filter(
          (phone) => phone.number.trim() !== ""
        ),
      };

      console.log("Form submitted:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert("Patient registered successfully!");
      resetForm();
    } catch (error) {
      console.error("Registration error:", error);
      alert("Failed to register patient. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="p-6">
      <div className="py-3 px-6 bg-blue-100 text-black mb-4 rounded-md flex justify-between items-center">
        <h1 className="font-lora text-2xl font-bold">Patient Registration</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="p-4">
          <div className="space-y-6 p-4 bg-gray-50 rounded-2xl max-h-[72vh] overflow-y-auto">
            {/* Top Row: Personal Profile (left) & Billing (right) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Profile */}
              <section className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Personal Profile</h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                  {/* Avatar stub */}
                  <div className="col-span-1 flex items-start">
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-300">
                      <span className="text-xs text-center">
                        Patient
                        <br />
                        Photo
                      </span>
                    </div>
                  </div>

                  {/* Title & Surname */}
                  <div className="col-span-2 grid grid-cols-2 gap-3">
                    <div>
                      <CustomDropdown
                        name="title"
                        label="Title"
                        options={mock.titles}
                        onSelect={handleDropdownSelect}
                        placeholder="eg. Mr"
                        defaultOption={form.title}
                        error={errors["title"]}
                        required
                      />
                    </div>

                    <div>
                      <CustomInput
                        name="surname"
                        label="Surname"
                        placeholder="eg. Johnson"
                        value={form.surname}
                        onChange={(e) =>
                          handleInputChange("surname", e.target.value)
                        }
                        required
                        error={errors["surname"]}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                  <CustomInput
                    name="firstName"
                    label="First name"
                    placeholder="e.g. Michael"
                    value={form.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    required
                    error={errors["firstName"]}
                    className="sm:col-span-1"
                  />

                  <CustomInput
                    name="middleName"
                    label="Middle name"
                    placeholder="e.g. James"
                    value={form.middleName}
                    onChange={(e) =>
                      handleInputChange("middleName", e.target.value)
                    }
                    className="sm:col-span-1"
                  />

                  <div className="sm:col-span-1">
                    <CustomRadio
                      label="Sex"
                      name="sex"
                      options={[
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                      ]}
                      value={form.sex}
                      onChange={handleRadioChange}
                      orientation="horizontal"
                      error={errors["sex"]}
                    />
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="mt-4">
                  <CustomInput
                    name="dateOfBirth"
                    label="Date of Birth"
                    type="date"
                    value={form.dateOfBirth}
                    onChange={(e) =>
                      handleInputChange("dateOfBirth", e.target.value)
                    }
                    required
                    error={errors["dateOfBirth"]}
                  />
                  {form.dateOfBirth && (
                    <p className="text-sm text-gray-600 mt-1">
                      Age: {calculateAge(form.dateOfBirth)} years
                    </p>
                  )}
                </div>

                {/* Phone(s) and Email */}
                <div className="mt-4 grid grid-cols-1 gap-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone number{" "}
                    {phoneNumbers.length > 0 && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>

                  {phoneNumbers.map((p, idx) => (
                    <div key={p.id} className="flex gap-3 items-start">
                      <div className="w-40">
                        <CustomDropdown
                          name={`phone.${p.id}.country`}
                          options={mock.countries}
                          onSelect={(_n, v) =>
                            handlePhoneChange(p.id, "country", v)
                          }
                          placeholder="Country"
                          defaultOption={p.country}
                          size="sm"
                        />
                      </div>

                      <div className="flex-1">
                        <CustomInput
                          name={`phone.${p.id}.number`}
                          placeholder="Enter phone number"
                          value={p.number}
                          onChange={(e) =>
                            handlePhoneChange(p.id, "number", e.target.value)
                          }
                          required={idx === 0}
                          error={errors[`phoneNumbers[${idx}]`]}
                        />
                      </div>

                      <div className="flex items-center space-x-2 pt-2">
                        {idx === 0 ? (
                          <button
                            type="button"
                            onClick={addPhone}
                            className="text-sm text-blue-600 underline disabled:text-gray-400"
                            disabled={phoneNumbers.length >= 3}
                          >
                            Add number
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => removePhone(p.id)}
                            className="text-sm text-red-600 underline"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    <CustomInput
                      name="email"
                      label="Email"
                      placeholder="email@example.com"
                      value={form.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      error={errors["email"]}
                      required
                    />

                    <CustomInput
                      name="identityNumber"
                      label="Identity number"
                      placeholder="1234566"
                      value={form.identityNumber}
                      onChange={(e) =>
                        handleInputChange("identityNumber", e.target.value)
                      }
                      error={errors["identityNumber"]}
                    />
                  </div>

                  {/* Option checkboxes */}
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Patient Options
                    </label>
                    <div className="flex flex-col gap-2">
                      <CustomCheckbox
                        label="New born"
                        checked={form.options.newBorn}
                        onChange={(e) =>
                          handleCheckboxChange(
                            "options.newBorn",
                            e.target.checked
                          )
                        }
                        name="newBorn"
                      />

                      <CustomCheckbox
                        label="Special Child"
                        checked={form.options.specialChild}
                        onChange={(e) =>
                          handleCheckboxChange(
                            "options.specialChild",
                            e.target.checked
                          )
                        }
                        name="specialChild"
                      />

                      <CustomCheckbox
                        label="Existing patient"
                        checked={form.options.existingPatient}
                        onChange={(e) =>
                          handleCheckboxChange(
                            "options.existingPatient",
                            e.target.checked
                          )
                        }
                        name="existingPatient"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Billing */}
              <section className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Billing</h3>

                <div className="grid grid-cols-1 gap-3">
                  <CustomDropdown
                    name="billing.insuranceType"
                    label="Insurance Dependency Type"
                    options={mock.insuranceTypes}
                    onSelect={handleDropdownSelect}
                    placeholder="Select dependency type"
                    defaultOption={form.billing.insuranceType}
                    error={errors["billing.insuranceType"]}
                  />

                  <CustomDropdown
                    name="billing.insuranceProvider"
                    label="Insurance Provider"
                    options={mock.insuranceProviders}
                    onSelect={handleDropdownSelect}
                    placeholder="Select provider"
                    defaultOption={form.billing.insuranceProvider}
                  />

                  <CustomInput
                    name="billing.insuranceEnrollmentNumber"
                    label="Insurance Enrollment Number"
                    placeholder="Enter enrollment number"
                    value={form.billing.insuranceEnrollmentNumber}
                    onChange={(e) =>
                      handleInputChange(
                        "billing.insuranceEnrollmentNumber",
                        e.target.value
                      )
                    }
                    error={errors["billing.insuranceEnrollmentNumber"]}
                  />

                  <CustomInput
                    name="billing.employerName"
                    label="Employer name"
                    placeholder="Employer name"
                    value={form.billing.employerName}
                    onChange={(e) =>
                      handleInputChange("billing.employerName", e.target.value)
                    }
                  />

                  <div className="grid grid-cols-3 gap-3 items-end">
                    <div>
                      <CustomDropdown
                        name="billing.addFeeCurrency"
                        label="Add fee"
                        options={[
                          { id: "ngn", value: "NGN", label: "NGN" },
                          { id: "usd", value: "USD", label: "USD" },
                          { id: "gbp", value: "GBP", label: "GBP" },
                        ]}
                        onSelect={handleDropdownSelect}
                        defaultOption={form.billing.addFeeCurrency}
                        size="sm"
                      />
                    </div>

                    <div className="col-span-2">
                      <CustomInput
                        name="billing.addFeeAmount"
                        label="Amount"
                        placeholder="0"
                        value={form.billing.addFeeAmount}
                        onChange={(e) =>
                          handleInputChange(
                            "billing.addFeeAmount",
                            e.target.value
                          )
                        }
                        type="number"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Lower row: Contact Info & Social Profile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Info */}
              <section className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Contact Info</h3>

                <div className="grid grid-cols-1 gap-3">
                  <CustomInput
                    name="contact.address"
                    label="Address"
                    placeholder="Enter address"
                    value={form.contact.address}
                    onChange={(e) =>
                      handleInputChange("contact.address", e.target.value)
                    }
                    type="textarea"
                    rows={2}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <CustomDropdown
                      name="contact.country"
                      label="Country"
                      options={mock.countries}
                      onSelect={handleDropdownSelect}
                      defaultOption={form.contact.country}
                    />

                    <CustomDropdown
                      name="contact.state"
                      label="State/Region"
                      options={mock.states}
                      onSelect={handleDropdownSelect}
                      placeholder="State/Region"
                      defaultOption={form.contact.state}
                    />

                    <CustomInput
                      name="contact.city"
                      label="City/Town"
                      placeholder="City/Town"
                      value={form.contact.city}
                      onChange={(e) =>
                        handleInputChange("contact.city", e.target.value)
                      }
                    />
                  </div>

                  <CustomDropdown
                    name="contact.referral"
                    label="Referral"
                    options={mock.referrals}
                    onSelect={handleDropdownSelect}
                    placeholder="Select referral"
                    defaultOption={form.contact.referral}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <CustomInput
                      name="contact.nextOfKinName"
                      label="Next Of Kin / Emergency Name"
                      placeholder="Enter name of NOK"
                      value={form.contact.nextOfKinName}
                      onChange={(e) =>
                        handleInputChange(
                          "contact.nextOfKinName",
                          e.target.value
                        )
                      }
                      error={errors["contact.nextOfKinName"]}
                    />

                    <CustomInput
                      name="contact.nextOfKinPhone"
                      label="Next Of Kin Phone No."
                      placeholder="Enter number"
                      value={form.contact.nextOfKinPhone}
                      onChange={(e) =>
                        handleInputChange(
                          "contact.nextOfKinPhone",
                          e.target.value
                        )
                      }
                      error={errors["contact.nextOfKinPhone"]}
                    />
                  </div>

                  <CustomInput
                    name="contact.nextOfKinAddress"
                    label="Next Of Kin Address"
                    placeholder="Enter Next Of Kin Address"
                    value={form.contact.nextOfKinAddress}
                    onChange={(e) =>
                      handleInputChange(
                        "contact.nextOfKinAddress",
                        e.target.value
                      )
                    }
                  />

                  <CustomDropdown
                    name="contact.relationshipToNextOfKin"
                    label="Relationship To Next Of Kin"
                    options={mock.relationships}
                    onSelect={handleDropdownSelect}
                    placeholder="Select relationship"
                    defaultOption={form.contact.relationshipToNextOfKin}
                  />
                </div>
              </section>

              {/* Social Profile */}
              <section className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Social Profile</h3>

                <div className="grid grid-cols-1 gap-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <CustomDropdown
                      name="social.maritalStatus"
                      label="Marital Status"
                      options={mock.maritalStatuses}
                      onSelect={handleDropdownSelect}
                      placeholder="Select marital status"
                      defaultOption={form.social.maritalStatus}
                    />

                    <CustomDropdown
                      name="social.preferredLanguage"
                      label="Preferred Language"
                      options={mock.languages}
                      onSelect={handleDropdownSelect}
                      placeholder="Preferred language"
                      defaultOption={form.social.preferredLanguage}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <CustomDropdown
                      name="social.religion"
                      label="Religion"
                      options={mock.religions}
                      onSelect={handleDropdownSelect}
                      placeholder="Select religion"
                      defaultOption={form.social.religion}
                    />

                    <CustomInput
                      name="social.tribe"
                      label="Tribe"
                      placeholder="Enter tribe"
                      value={form.social.tribe}
                      onChange={(e) =>
                        handleInputChange("social.tribe", e.target.value)
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <CustomDropdown
                      name="social.occupation"
                      label="Occupation"
                      options={mock.occupations}
                      onSelect={handleDropdownSelect}
                      placeholder="Select occupation"
                      defaultOption={form.social.occupation}
                    />

                    <CustomInput
                      name="social.employmentDate"
                      label="Employment Date"
                      type="date"
                      value={form.social.employmentDate}
                      onChange={(e) =>
                        handleInputChange(
                          "social.employmentDate",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <CustomDropdown
                      name="social.educationalLevel"
                      label="Educational Level"
                      options={mock.educationLevels}
                      onSelect={handleDropdownSelect}
                      placeholder="Select educational level"
                      defaultOption={form.social.educationalLevel}
                    />

                    <CustomInput
                      name="social.schoolName"
                      label="School Name"
                      placeholder="School name"
                      value={form.social.schoolName}
                      onChange={(e) =>
                        handleInputChange("social.schoolName", e.target.value)
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <CustomDropdown
                      name="social.numberOfChildren"
                      label="Number Of Children"
                      options={mock.childrenOptions}
                      onSelect={handleDropdownSelect}
                      placeholder="Select number of children"
                      defaultOption={form.social.numberOfChildren}
                    />

                    <div className="flex items-end justify-end space-x-2">
                      <CustomButton
                        type="button"
                        variant="outline"
                        onClick={resetForm}
                        disabled={isSubmitting}
                      >
                        Clear
                      </CustomButton>
                      <CustomButton
                        type="submit"
                        variant="primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Registering..." : "Register Patient"}
                      </CustomButton>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Registration;
