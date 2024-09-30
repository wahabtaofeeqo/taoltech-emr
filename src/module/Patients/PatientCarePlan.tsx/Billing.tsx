import React, {useState} from 'react';

type BillingItem = {
    subject: string;
    date: string;
    cost: number
}
type billingProp = {
    billing: BillingItem[];
    addBillingItem: (item: BillingItem) => void
} 

const Billing: React.FC<billingProp> = ({billing, addBillingItem}) => {

    const [newItem, setNewItem] =  useState<BillingItem>({ 
        subject: '', 
        date: '', cost: 0 
    })
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewItem((prev) => ({ ...prev, [name]: name === 'cost' ? parseFloat(value) : value }));
      };
    
      const handleSubmit = () => {
        addBillingItem(newItem)
        setNewItem({ subject: '', date: '', cost: 0 });
      }

    return (

        <div className="w-full flex gap-4">
            <div className="p-4 border border-[#EAECF0] rounded-md w-full mb-4">
                <div className="block border-b border-[#EAECF0]">
                    <span className="font-semibold text-sm block pb-2">Billing List</span>
                    <span className="text-xs text-[#878583] block pb-2">List of items used by patient in the ward.</span>
                </div>
                <div className="w-full mb-6">
                    <div className="block w-full mt-4 justify-between">
                        <span className="font-semibold text-sm block pb-2">Enter New Billing Item</span>
                        <div className="w-full mt-4 flex gap-2"> 
                            <input
                                type="text"
                                name="subject"
                                value={newItem.subject}
                                placeholder="Enter subject"
                                onChange={handleInputChange}
                                className="outline-none text-xs bg-[#F9FAFB] text-black p-1 rounded-md w-[27%]"
                            />
                            <input
                                type="text"
                                name="date"
                                value={newItem.date}
                                placeholder="Enter date"
                                onChange={handleInputChange}
                                className="outline-none bg-[#F9FAFB] text-xs text-black p-1 rounded-md w-[27%]"
                            />
                            <input
                                type="number"
                                name="cost"
                                value={newItem.cost}
                                placeholder="Enter cost"
                                onChange={handleInputChange}
                                className="outline-none text-xs bg-[#F9FAFB] text-black p-1 rounded-md w-[27%]"
                            />
                            <button onClick={handleSubmit} className="outline-none text-xs bg-[#175CD3] text-white p-2 rounded-md">Add item</button>
                        </div>
                    </div>
                    <div className="w-full mt-6 border border-[#EAECF0] rounded-xl">
                        <table className="w-full text-left">
                            <thead className="bg-[#F9FAFB] rounded-md">
                                <tr>
                                    <th className="pl-2 pb-4 pt-4 text-sm rounded-tl-xl">Description</th>
                                    <th className="pb-4 pt-4 text-sm">Date added</th>
                                    <th className="pr-2 pb-4 pt-4 text-sm rounded-tr-xl">Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {billing.map((bill, index) => (<tr key={index}>
                                    <td className=" pl-2 pb-4 pt-4 text-xs">{bill.subject}</td>
                                    <td className="pb-4 pt-4 text-xs">{bill.date}</td>
                                    <td className="pr-2 pb-4 pt-4 text-xs">{bill.cost}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <span className='border border-[#EAECF0] rounded-md p-2 text-sm mt-4 float-right'>View full billing list</span>
            </div>
        </div>
    )
} 

export default Billing