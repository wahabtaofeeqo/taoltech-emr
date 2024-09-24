import nurseImage from '../../../assets/profileImage.png';

export const patient = {
      firstName: 'John',
      surname: 'Doe',
      dob: '14-05-1990',
      maritalStatus: 'Single',
      bloodGroup: 'O+',
      registrationNumber: '123456',
      hmo: 'HealthFirst',
      occupation: 'Engineer',
      gender: 'Male',
      image: nurseImage
}


export const labelTags  = [
      "First name",
      "Last name",
      "Date of Birth",
      "Marital status",
      "Blood group",
      "Registration number",
      "HMO",
      "Occupation",
      "Gender",
]

export const tagToField = {
  "First name": "firstName",
  "Last name": "surname",
  "Date of Birth": "dob",
  "Marital status": "maritalStatus",
  "Blood group": "bloodGroup",
  "Registration number": "registrationNumber",
  "HMO": "hmo",
  "Occupation": "occupation",
  "Gender": "gender",
  "Home address":"homeAddress" ,
  "Phone number": "phoneNumber",
  "Email address":"emailAddress",
  "Next of Kin": "nextOfKin",
  "Relationship to patient": "relationship",
  "Body Temperature": "bodyTemperature", 
  "Heart Rate(pulse)":  "heartRate",
  "Respiratory Rate": "respiratoryRate",
  "Blood Pressure": "bloodPressure",
  "Oxygen Saturation (SpO2)": "oxygenSaturation",
  "Pain Level": "painLevel",
  "weight": "weight",
  "height": "height",
  "Blood Glucose Level": "bloodGlucoseLevel",
  "Additional Notes": "additionalNotes",
  "Assigned Physician": "assignedPhysician",
  "Past Medical Conditions":  "pastMedicalConditions",
  "Current Medical Conditions": "currentMedicalConditions",
  "Current Medication": "currentMedication",
  "Surgical History": "surgicalHistory"
};
 

export const tagToField2 = {
  vitals: [
    "Body Temperature",
    "Heart Rate(pulse)",
    "Respiratory Rate",
    "Blood Pressure",
    "Oxygen Saturation (SpO2)",
    "Pain Level",
    "weight",
    "height",
    "Blood Glucose Level",
  ],
};



export const contactTags = [
  "Home address",
  "Phone number",
  "Email address" 
]


export const emergencyTags = [
  "Next of Kin",
  "Relationship to patient",
  "Phone number",
  "Home address"
]



export const vitalsTags = [
  "Body Temperature", 
  "Heart Rate(pulse)",
  "Respiratory Rate",
  "Blood Pressure",
  "Oxygen Saturation (SpO2)",
  "Pain Level",
  "weight",
  "height",
  "Blood Glucose Level",
  "Additional Notes"
]

export const primaryTags = [
  "Assigned Physician",
  "Phone number",
]


export const additionalTags = [
  "Past Medical Conditions",
  "Current Medical Conditions",
  "Current Medication",
  "Surgical History"
]


export const patients = [
    {
      "id": "1",
      "patient": {
        "firstName": "John",
        "surname": "Doe",
        "dob": "1990-05-14",
        "maritalStatus": "Single",
        "bloodGroup": "O+",
        "registrationNumber": "123456",
        "hmo": "HealthFirst",
        "occupation": "Engineer",
        "gender": "Male",
        "image": nurseImage,
        "ward": "Ward 1a"
      },
      "contactInfo": {
        "homeAddress": "123 Main St, Apt 4B, Springfield, IL, 62704",
        "phoneNumber": "+1 (555) 123-4567",
        "emailAddress": "example@example.com"
      },
      "allergens": [
        "Peanuts",
        "Tree Nuts",
        "Milk",
        "Shellfish",
        "Wheat",
        "Soy",
        "Dust Mites",
        "Pollen",
        "Insect Stings",
        "Medications ",
        "Fragrances",
        "Chemical",
        "Gluten",
        "Cockroaches",
        "Nickel"
      ],
      "emergencyContact": {
        "nextOfKin": "Mr Victor Alfred",
        "relationship": "Husband",
        "phoneNumber": "+1 (555) 123-4567",
        "homeAddress": "123 Main St, Apt 4B, Springfield, IL, 62704"
      },
      "vitals": {
        "bodyTemperature": "98.6°F(37°C)",
        "heartRate": "72 bpm",
        "respiratoryRate": "16 breaths/min",
        "bloodPressure": "120/80 mmHg",
        "oxygenSaturation": "98%",
        "painLevel": "3/10",
        "weight": "180 lbs(68kg)",
        "height": "5 ft 7 in (170m)",
        "bloodGlucoseLevel": "100 mg/dL (5.6 mmol/L)",
        "additionalNotes": "Patient appears comfortable and no signs of distress."
      },
      "primaryInfo": {
        "assignedPhysician": "Martins Philip",
        "phoneNumber": "08012345678"
      },
      "additionalInfo": {
        "pastMedicalConditions": [
          "Hypertension",
          "Insomnia"
        ],
        "currentMedicalConditions": [
          "Hypertension",
          "Insomnia"
        ],
        "currentMedication": [
          "Panadol (Paracetamol/Acetaminophen)",
          "Amatem",
          "Vitamin C"
        ],
        "surgicalHistory": ""
      },
      "tableData": [
        {
          "physician": "Dr. John Doe",
          "specialty": "Cardiology",
          "email": "johndoe@example.com",
          "officeHours": "9 AM - 5 PM",
          "role": "Consultant",
          "contact": "(123) 456-7890"
        }
      ],
      "bloodPressureData": [
        { day: "Monday", systolic: 120, diastolic: 80 },
        { day: "Tuesday", systolic: 125, diastolic: 82 },
        { day: "Wednesday", systolic: 130, diastolic: 85 },
        { day: "Thursday", systolic: 135, diastolic: 88 },
        { day: "Friday", systolic: 140, diastolic: 90 },
        { day: "Saturday", systolic: 138, diastolic: 89 },
      ],
      "billing":[
        {
            subject: "Consultation Fee",
            date: "2024-09-20",
            cost: 150.00,
        },
        {
            subject: "Blood Test",
            date: "2024-09-18",
            cost: 50.00,
        },
        {
            subject: "X-Ray",
            date: "2024-09-19",
            cost: 100.00,
        },
        {
            subject: "Medication",
            date: "2024-09-21",
            cost: 75.00,
        },
      ],
      "medications":[
        {
          date: "2024-09-20",
          medication: "Ibuprofen",
          dosage: 200,
          frequency: "Twice a day",
          condition: "Headache",
          administeredBy: "Dr. Sarah Lee",
        },
        {
          date: "2024-09-20",
          medication: "omeprazole",
          dosage: 1000,
          frequency: "Once a day",
          condition: "Diabetes",
          administeredBy: "Dr. Michael Smith",
        },
        {
          date: "2024-09-18",
          medication: "Amoxicillin",
          dosage: 500, // in mg
          frequency: "Three times a day",
          condition: "Bacterial Infection",
          administeredBy: "Nurse John Doe",
        },
        {
          date: "2024-09-17",
          medication: "Metformin",
          dosage: 1000, // in mg
          frequency: "Once a day",
          condition: "Diabetes",
          administeredBy: "Dr. Michael Smith",
        },
        {
          date: "2024-09-16",
          medication: "Paracetamol",
          dosage: 650, // in mg
          frequency: "Every 6 hours",
          condition: "Fever",
          administeredBy: "Nurse Mary Johnson",
        },
        {
          date: "2024-09-15",
          medication: "Aspirin",
          dosage: 81,
          frequency: "Once a day",
          condition: "Blood Thinner",
          administeredBy: "Dr. David White",
        }
      ],
      "NursesNote":  {
        note: "John Doe has severe anaphylactic reactions to Penicillin; all records and alert tags must be updated. Avoid beta-lactam antibiotics; consider desensitization if necessary. For the peanut allergy, strict avoidance and carrying an epinephrine auto-injector are essential. Referred to a dietitian for label reading and cross-contamination avoidance. Latex allergy is mild; use non-latex alternatives. Regular follow-ups are crucial; next review in six months.",
        updatedOn: "12/06/24",
        updatedBy: "Nr. Alabi",
        doctor: "Dr. Jane Smith", 
      }
    },
    {
      "id": "2",
      "patient": {
        "firstName": "Jane",
        "surname": "Smith",
        "dob": "1988-08-24",
        "maritalStatus": "Married",
        "bloodGroup": "A-",
        "registrationNumber": "654321",
        "hmo": "Medicare",
        "occupation": "Doctor",
        "gender": "Female",
        "image": nurseImage,
         "ward": "Ward 1b"
      },
      "contactInfo": {
        "homeAddress": "456 Elm St, Apt 2A, Springfield, IL, 62705",
        "phoneNumber": "+1 (555) 987-6543",
        "emailAddress": "jane@example.com"
      },
      "allergens": [
        "Wheat",
        "Soy"
      ],
      "emergencyContact": {
        "nextOfKin": "Mrs Laura Smith",
        "relationship": "Sister",
        "phoneNumber": "+1 (555) 543-2109",
        "homeAddress": "456 Elm St, Apt 2A, Springfield, IL, 62705"
      },
      "vitals": {
        "bodyTemperature": "97.8°F(36.6°C)",
        "heartRate": "80 bpm",
        "respiratoryRate": "18 breaths/min",
        "bloodPressure": "115/75 mmHg",
        "oxygenSaturation": "96%",
        "painLevel": "1/10",
        "weight": "150 lbs(68kg)",
        "height": "5 ft 4 in (162m)",
        "bloodGlucoseLevel": "90 mg/dL (5 mmol/L)",
        "additionalNotes": "Patient in good health."
      },
      "primaryInfo": {
        "assignedPhysician": "Dr. Jane Smith",
        "phoneNumber": "08087654321"
      },
      "additionalInfo": {
        "pastMedicalConditions": [],
        "currentMedicalConditions": [],
        "currentMedication": [],
        "surgicalHistory": ""
      },
      "tableData": [
        {
          "physician": "Dr. Alice Johnson",
          "specialty": "Neurology",
          "email": "alicejohnson@example.com",
          "officeHours": "8 AM - 3 PM",
          "role": "Surgeon",
          "contact": "(567) 890-1234"
        }
      ],
      "bloodPressureData": [
        { day: "Monday", systolic: 120, diastolic: 80 },
        { day: "Tuesday", systolic: 125, diastolic: 82 },
        { day: "Wednesday", systolic: 130, diastolic: 85 },
        { day: "Thursday", systolic: 135, diastolic: 88 },
        { day: "Friday", systolic: 140, diastolic: 90 },
        { day: "Saturday", systolic: 138, diastolic: 89 },
      ],
      "billing":[
        {
            subject: "Consultation Fee",
            date: "2024-09-20",
            cost: 150.00,
        },
        {
            subject: "Blood Test",
            date: "2024-09-18",
            cost: 50.00,
        },
        {
            subject: "X-Ray",
            date: "2024-09-19",
            cost: 100.00,
        },
        {
            subject: "Medication",
            date: "2024-09-21",
            cost: 75.00,
        },
    ],
    "medications": [ {
        date: "2024-09-20",
        medication: "Ibuprofen",
        dosage: 200, 
        frequency: "Twice a day",
        condition: "Headache",
        administeredBy: "Dr. Sarah Lee",
      },
      {
        date: "2024-09-18",
        medication: "Amoxicillin",
        dosage: 500,
        frequency: "Three times a day",
        condition: "Bacterial Infection",
        administeredBy: "Nurse John Doe",
      },
      {
        date: "2024-09-20",
        medication: "omeprazole",
        dosage: 1000,
        frequency: "Once a day",
        condition: "Diabetes",
        administeredBy: "Dr. Michael Smith",
      },
      {
        date: "2024-09-17",
        medication: "Metformin",
        dosage: 1000,
        frequency: "Once a day",
        condition: "Diabetes",
        administeredBy: "Dr. Michael Smith",
      },
      {
        date: "2024-09-16",
        medication: "Paracetamol",
        dosage: 650, 
        frequency: "Every 6 hours",
        condition: "Fever",
        administeredBy: "Nurse Mary Johnson",
      },
      {
        date: "2024-09-15",
        medication: "Aspirin",
        dosage: 81, 
        frequency: "Once a day",
        condition: "Blood Thinner",
        administeredBy: "Dr. David White",
      }
    ],
    "NursesNote":  {
        note: "John Doe has severe anaphylactic reactions to Penicillin; all records and alert tags must be updated. Avoid beta-lactam antibiotics; consider desensitization if necessary. For the peanut allergy, strict avoidance and carrying an epinephrine auto-injector are essential. Referred to a dietitian for label reading and cross-contamination avoidance. Latex allergy is mild; use non-latex alternatives. Regular follow-ups are crucial; next review in six months.",
        updatedOn: "12/06/24",
        updatedBy: "Nr. Alabi",
        doctor: "Dr. Jane Smith", 
    },  
  }
  ]


