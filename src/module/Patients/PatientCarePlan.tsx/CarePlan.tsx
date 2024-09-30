import React, {useState} from 'react';
import Allergies from '../PatientBioDat/Allergies';
import TableNurse from '../PatientBioDat/TableNurse';
import Billing from './Billing'
import Medication from './medication'
import NursesNote from './NursesNote'
import { PatientDetails } from '../PatientBioDat/patientDetailsType'
import { tagToField2, emergencyTags, tagToField } from '../PatientBioDat/patientData';
import PatientVitalsEditor from './PatientVitalEditor'
import PatientChart from './ChartJs'

const allergy = ["food", "Milk", "peanut", "Dust Mite"]

type careProps = {
    careInfo: PatientDetails | null;
    setSelectedPatient: React.Dispatch<React.SetStateAction<PatientDetails | null>>
}
type BillingItem = {
    subject: string;
    date: string;
    cost: number
}


const CarePlan: React.FC<careProps> = ({ careInfo, setSelectedPatient }) => {

    const [billing, setBilling] = useState<BillingItem[]>(careInfo?.billing || []);

    const addBillingItem = (item: BillingItem) => {
        setBilling((prevBilling) => [...prevBilling, item]);
      };

    const dob = careInfo?.patient?.dob;
    let  age;
        if (dob) {
        const [year, month, day] = dob.split('-'); 
        const birthDate = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10)); 
        age = new Date().getFullYear() - birthDate.getFullYear();

        console.log(`Age: ${age}`);
        }

        const heightStr = careInfo?.vitals.height ?? "0 ft 0 in"; 

        const heightParts = heightStr.match(/(\d+) ft (\d+) in/);

        const heightInInches = heightParts 
        ? (parseInt(heightParts[1]) * 12) + parseInt(heightParts[2]) 
        : 0; 

        const weightStr = careInfo?.vitals.weight ?? "0 lbs"; 
        const weightInLbs = parseInt(weightStr);

        const bmi = (weightInLbs / (heightInInches ** 2)) * 703;


    const handleChange = (field: keyof PatientDetails, value: any) => {
        setSelectedPatient((prevState) => {
          if (!prevState) return null;
      
          return {
            ...prevState,
            [field]: value, 
          };
        });
      };
      
      const onUpdateNote = (updatedNote: string) => {
        setSelectedPatient((prevState) => {
            if (!prevState || !prevState.NursesNote) return prevState;
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split('T')[0];
            return {
                ...prevState,
                NursesNote: {
                    ...prevState.NursesNote,
                    note: updatedNote,
                    updatedOn: formattedDate, 
                }
            };
        });
    };
    

    if (!careInfo) {
        return <div>No care plan for this patient</div>
    }

    return (
        <div>
            <Allergies allergy={allergy} />
            <div className="pl-4 pr-4 mt-4 pb-4 flex w-full gap-4">
                <div className="w-[80%]">
                    <div className="p-4 border border-[#EAECF0] rounded-md w-full mb-4 h-[70vh]">
                        <PatientChart bloodPressureData={careInfo.bloodPressureData} />
                    </div>
                    <PatientVitalsEditor
                        tags={"vitals"}
                        topTags={"Vitals"}
                        bottomTags={"Last record of patient's vitals"}
                        tagToField={tagToField2}
                        handleChange={handleChange}
                    />
                </div>
                <div className="w-[20%]">
                    <div className="h-[40vh] w-full">
                        <img className="h-full w-full rounded-md" src={careInfo.patient.image} alt="profile-pic" />
                    </div>
                    <div className="p-4 w-full mt-4">
                        <h1 className="font-bold font-poppins text-lg pb-2">{careInfo.patient.firstName} {careInfo.patient.surname}</h1>
                        <span className="font-medium font-poppins text-sm text-capitalize block pb-2"><span className="font-semibold text-xs">Gender:</span> {careInfo.patient.gender}</span>
                        <span className="font-medium font-poppins text-sm text-capitalize block pb-2"><span className='font-semibold text-xs'>Age: </span>&nbsp; {age}</span>
                        <span className="font-medium font-poppins text-sm text-capitalize block pb-2"><span className='font-semibold text-xs'>Patient ID: </span>&nbsp; {careInfo.id}</span>
                        <span className="font-medium font-poppins text-sm text-capitalize block pb-2"><span className='font-semibold text-xs'>Blood Group: </span>&nbsp; {careInfo.patient.bloodGroup}</span>
                        <span className="font-medium font-poppins text-sm text-capitalize block pb-2"><span className='font-semibold text-xs'>Weight: </span>&nbsp; {careInfo.vitals.weight}</span>
                        <span className="font-medium font-poppins text-sm text-capitalize block pb-2"><span className='font-semibold text-xs'>BMI: </span>&nbsp; {Number(bmi.toFixed(1))}</span>
                        <span className="font-medium font-poppins text-sm text-capitalize block pb-2"><span className='font-semibold text-xs'>Room Number: </span>&nbsp;007</span>
                    </div>
                </div>
            </div>
            <div className="flex w-full pl-4 pr-4 mt-4 pb-4 gap-4">
                <div className="w-[55%]">
                    <Billing billing={billing}  addBillingItem={addBillingItem}/>
                </div>
                <div className="w-[45%]">
                    <TableNurse patient={careInfo.emergencyContact} tags={emergencyTags} topTags={"Emergency contact"} bottomTags={"Emergency Contact for patient"} col={1} tagToField={tagToField} />
                </div>
            </div>
            <div className="w-full">
                <Medication medications={careInfo.medications} />
            </div>
            <div className="w-full pr-4 pl-4 pb-4">
                <NursesNote Note={careInfo.NursesNote} onUpdateNote={onUpdateNote} />
            </div>
        </div>
    )
}

export default CarePlan;
