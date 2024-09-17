import React from 'react';


type tableData =  {
    physician: string;
    specialty: string;
    email: string;
    officeHours: string;
    role: string;
    contact: string;
  }[];

type tags =  {
    topTags: string;
    bottomTags: string;
    physician: tableData
}

const Physician: React.FC<tags> = ({topTags, bottomTags, physician}) => {


    return (
        <div className="w-full">
            <div className="w-full flex gap-4">
                <div className="p-4 border border-[#EAECF0] rounded-md w-full mb-4">
                    <div className="block border-b border-[#EAECF0]">
                        <span className="font-semibold text-sm block pb-2">{topTags}</span>
                        <span className="text-xs text-[#878583] block pb-2">{bottomTags}</span>
                    </div>
                    <div className="mt-4 w-full overflow-hidden rounded-lg border border-[#EAECF0]">
                        <table className="w-full text-left">
                            <thead className="">
                                <tr className="pt-4 border-b border-[#EAECF0] bg-[#F9FAFB]">
                                    <th className="text-xs pb-4 pt-4 pl-4">Physician</th>
                                    <th className="text-xs pb-4 pt-4 ">Specialty</th>
                                    <th className="text-xs pb-4 pt-4">Email</th>
                                    <th className="text-xs pb-4 pt-4">Office Hours</th>
                                    <th className="text-xs pb-4 pt-4">Role</th>
                                    <th className="text-xs pb-4 pt-4  pr-4">Contact</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                    {physician.length !== 0 && physician.map((data, index) => (
                                        <tr key={index} className="border-b border-[#EAECF0]">
                                            <td className="text-xs font-medium pb-6 pt-6 pl-4">{data.physician}</td>
                                            <td className="text-xs font-medium pb-6 pt-6">{data.specialty}</td>
                                            <td className="text-xs font-medium pb-6 pt-6">{data.email}</td>
                                            <td className="text-xs font-medium pb-6 pt-6">{data.officeHours}</td>
                                            <td className="text-xs font-medium pb-6 pt-6">{data.role}</td>
                                            <td className="text-xs font-medium pb-6 pt-6 pr-4">{data.contact}</td>
                                        </tr>
                                    ))}
                                    
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Physician;
