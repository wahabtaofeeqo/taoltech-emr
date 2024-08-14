import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface FormData {
    name: string;
    phone: string;
    email: string;
    text:string;
  }
  

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    text: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
        <div className="bg-[#F0F5FE] w-full max-w-md mx-auto mt-10 p-6 shadow-md rounded-md">
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
                </label>
                <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="John Doe"
                required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Email
                </label>
                <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="example@gmail.com"
                required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone number
                </label>
                <PhoneInput
                country={'us'}
                value={formData.phone}
                onChange={(phone: string) => setFormData({ ...formData, phone })}
                inputClass="w-full h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                buttonClass="bg-gray-100 border border-gray-300 rounded-l-md"
                containerClass="flex w-full"
                dropdownClass="w-full max-h-56 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg"
                placeholder='Enter phone number'
              />
            </div>
            <div className="mb-4">
                <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                Message
                </label>
                <textarea
                id="text"
                name="text"
                value={formData.text}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows={4}
                required
                />
            </div>
            <div className="flex">
                <input type="checkbox" />
                <span className="text-xs pl-4">You agree to our friendly <Link className="under" to="/policy">privacy policy</Link>.</span>
            </div>
        </div>
        <button
            type="submit"
            className="max-w-md mt-10 w-full px-4 py-4 bg-indigo-600 text-white font-medium text-sm leading-tight rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            Send Message
        </button>
    </form>
  );
};

export default ContactForm;
