import React, {useState, useEffect} from 'react';

type medicationItem = {
    date: string;
    medication: string;
    dosage: number;
    frequency: string;
    condition: string;
    administeredBy: string;
}
type medicationProp = {
    medications: medicationItem[];
    
}


const Medication:React.FC<medicationProp> = ({medications}) => {

    const [viewMedication, setViewMedication] = useState(false);
    const [viewHistory, setViewHistory] = useState(false);
    const [current, setViewCurrent] = useState<medicationItem[] >([])

    const handleMedicationView = (todo: number) => {
        if(todo === 0) {
        setViewMedication(false)
        } else {
            setViewMedication(true)
        }
    }

    const handleHistory = () => {
        setViewHistory(prevState => !prevState)
    }

    useEffect(() => {

        if(medications.length > 0){
        const sortedMedication = medications.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
        console.log(sortedMedication)
        const currentMedication = medications.filter((medic) =>  medic.date === sortedMedication.date)
        setViewCurrent(currentMedication);
        }

    }, [medications])

  return (
    <div className="w-full flex gap-4 p-4">
    <div className="p-4 border border-[#EAECF0] rounded-md w-full mb-4">
        <div className="block border-b border-[#EAECF0] gap-4 pt-4 pb-4">
            <span className="font-semibold text-sm block pb-2">Medication</span>
            <span className="text-xs text-[#878583] block pb-2">List of medication prescribed by doctor.</span>
        </div>
        <div className="w-full mb-6 block"> 
            <div className="flex w-full mt-4 gap-4">
                <span className={`font-medium text-xs  text-white  rounded-md block p-2  cursor-pointer ${!viewMedication ? 'bg-[#175CD3]' :  'bg-[#D2E3FF]' }`} onClick={() => handleMedicationView(0)}>Current</span>
                <span className={`font-medium text-xs text-white block  rounded-md p-2 cursor-pointer ${viewMedication ? 'bg-[#175CD3]' :  'bg-[#D2E3FF]'}`} onClick={() => handleMedicationView(1)}>History</span>
            </div>
            {!viewMedication ?   
            (<div className="w-full mt-6 border border-[#EAECF0] rounded-xl">
                <table className="w-full text-left">
                    <thead className="bg-[#F9FAFB] rounded-md">
                        <tr>
                            <th className="pl-2 pb-4 pt-4 text-sm rounded-tl-xl">Date</th>
                            <th className="pb-4 pt-4 text-sm">Medication</th>
                            <th className="pb-4 pt-4 text-sm">Dosage</th>
                            <th className="pb-4 pt-4 text-sm ">Frequency</th>
                            <th className="pb-4 pt-4 text-sm">Condition</th>
                            <th className="pr-2 pb-4 pt-4 text-sm rounded-tr-xl">Administered by</th>
                        </tr>
                    </thead>
                    {!viewHistory ?  <tbody>
                        {medications.slice(0, 4).map((medication, index) => (<tr key={index}>
                            <td className=" pl-2 pb-4 pt-4 text-xs">{medication.date}</td>
                            <td className="pb-4 pt-4 text-xs">{medication.medication}</td>
                            <td className="pr-2 pb-4 pt-4 text-xs">{medication.dosage}</td>
                            <td className="pb-4 pt-4 text-xs">{medication.frequency}</td>
                            <td className="pb-4 pt-4 text-xs">{medication.condition}</td>
                            <td className="pb-4 pt-4 text-xs">{medication.administeredBy}</td>
                        </tr>
                        ))}
                    </tbody> : <tbody>
                        {medications.map((medication, index) => (<tr key={index}>
                            <td className=" pl-2 pb-4 pt-4 text-xs">{medication.date}</td>
                            <td className="pb-4 pt-4 text-xs">{medication.medication}</td>
                            <td className="pr-2 pb-4 pt-4 text-xs">{medication.dosage}</td>
                            <td className="pb-4 pt-4 text-xs">{medication.frequency}</td>
                            <td className="pb-4 pt-4 text-xs">{medication.condition}</td>
                            <td className="pb-4 pt-4 text-xs">{medication.administeredBy}</td>
                        </tr>
                        ))}
                    </tbody> }
                </table>
            </div>) : (<div className="w-full mt-6 border border-[#EAECF0] rounded-xl">
                <table className="w-full text-left">
                    <thead className="bg-[#F9FAFB] rounded-md">
                        <tr>
                            <th className="pl-2 pb-4 pt-4 text-sm rounded-tl-xl">Date</th>
                            <th className="pb-4 pt-4 text-sm">Medication</th>
                            <th className="pb-4 pt-4 text-sm">Dosage</th>
                            <th className="pb-4 pt-4 text-sm ">Frequency</th>
                            <th className="pb-4 pt-4 text-sm">Condition</th>
                            <th className="pr-2 pb-4 pt-4 text-sm rounded-tr-xl">Administered by</th>
                        </tr>
                    </thead>
                    <tbody>
                        {current.map((medication: medicationItem, index: number) => (<tr key={index}>
                            <td className=" pl-2 pb-4 pt-4 text-xs">{medication.date}</td>
                            <td className="pb-4 pt-4 text-xs">{medication.medication}</td>
                            <td className="pr-2 pb-4 pt-4 text-xs">{medication.dosage}</td>
                            <td className="pb-4 pt-4 text-xs">{medication.frequency}</td>
                            <td className="pb-4 pt-4 text-xs">{medication.condition}</td>
                            <td className="pb-4 pt-4 text-xs">{medication.administeredBy}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>)
            }
        </div>
        <span onClick={handleHistory} className='border border-[#EAECF0] rounded-md p-2 text-sm mt-4 float-right'>{!viewHistory?  'View full medication list' : 'View less medication history'}</span>
    </div>
</div>
  )
}

export default Medication