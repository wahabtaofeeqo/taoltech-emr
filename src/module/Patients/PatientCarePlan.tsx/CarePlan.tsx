import React from 'react';
import Allergies from '../PatientBioDat/Allergies';

const allergy = ["food", "Milk", "peanut", "Dust Mite"]
const CarePlan: React.FC = () => {



    return (
        <div>
            <Allergies allergy={allergy} />
        </div>
    )
}

export default CarePlan;