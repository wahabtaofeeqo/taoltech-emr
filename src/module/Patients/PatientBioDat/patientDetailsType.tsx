export type PatientDetails = {
    id: string;
    patient: {
      firstName: string;
      surname: string;
      dob: string;
      maritalStatus: string;
      bloodGroup: string;
      registrationNumber: string;
      hmo: string;
      occupation: string;
      gender: string;
      image: string;
      ward:  string;
    };
    contactInfo: {
      homeAddress: string;
      phoneNumber: string;
      emailAddress: string;
    };
    allergens: string[];
    emergencyContact: {
      nextOfKin: string;
      relationship: string;
      phoneNumber: string;
      homeAddress: string;
    };
    vitals: {
      bodyTemperature: string;
      heartRate: string;
      respiratoryRate: string;
      bloodPressure: string;
      oxygenSaturation: string;
      painLevel: string;
      weight: string;
      height: string;
      bloodGlucoseLevel: string;
      additionalNotes: string;
    };
    primaryInfo: {
      assignedPhysician: string;
      phoneNumber: string;
    };
    additionalInfo: {
      pastMedicalConditions: string[];
      currentMedicalConditions: string[];
      currentMedication: string[];
      surgicalHistory: string;
    };
    tableData: {
      physician: string;
      specialty: string;
      email: string;
      officeHours: string;
      role: string;
      contact: string;
    }[];
    bloodPressureData: {
      day: string; 
      systolic: number;
      diastolic: number 
    }[],
    billing: {
      subject: string;
      date: string;
      cost: number
    }[],
    medications: {
      date: string;
      medication: string;
      dosage: number;
      frequency: string;
      condition: string;
      administeredBy: string;
    }[],
    NursesNote: {
      note: string;
      doctor: string;
      updatedOn: string;
      updatedBy: string;
    };
  };

  type NursesNote = {
    note: string;
    doctor: string;
    updatedOn: string;
    updatedBy: string;
  };
  
  type Patient = {
    firstName: string;
    surname: string;
    dob: string;
    maritalStatus: string;
    bloodGroup: string;
    registrationNumber: string;
    hmo: string;
    occupation: string;
    gender: string;
    image: string;
    ward: string;
  };
  
  type ContactInfo = {
    homeAddress: string;
    phoneNumber: string;
    emailAddress: string;
  };
  
  type EmergencyContact = {
    nextOfKin: string;
    relationship: string;
    phoneNumber: string;
    homeAddress: string;
  };
  
  type Vitals = {
    bodyTemperature: string;
    heartRate: string;
    respiratoryRate: string;
    bloodPressure: string;
    oxygenSaturation: string;
    painLevel: string;
    weight: string;
    height: string;
    bloodGlucoseLevel: string;
    additionalNotes: string;
  };
  
  type PrimaryInfo = {
    assignedPhysician: string;
    phoneNumber: string;
  };
  
  type AdditionalInfo = {
    pastMedicalConditions: string[];
    currentMedicalConditions: string[];
    currentMedication: string[];
    surgicalHistory: string;
  };
  
  type TableData = {
    physician: string;
    specialty: string;
    email: string;
    officeHours: string;
    role: string;
    contact: string;
  }[];

  type BloodPressureData = {
    day: string; 
    systolic: number;
    diastolic: number 
  }[]
  type Billing = {
    subject: string;
    date: string;
    cost: number
  }  
 export  type PatientData = {
    id: string; 
    patient: Patient;
    contactInfo: ContactInfo;
    emergencyContact: EmergencyContact;
    vitals: Vitals;
    primaryInfo: PrimaryInfo;
    additionalInfo: AdditionalInfo;
    tableData: TableData;
    allergens: string[];
    bloodPressureData: BloodPressureData;
    billing: Billing[];
    nursesNote: NursesNote;
  };