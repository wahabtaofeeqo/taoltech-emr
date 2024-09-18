import React from 'react'
import { Link } from 'react-router-dom';
import hero4 from '../../assets/hero4.png';
import hero2 from '../../assets/hero2.png';
import './about.css'

const AboutComponent: React.FC = () => {
  return (
    <div className="mt-16 min-h-screen">
        <section className="flex px-12 w-full min-h-screen h-screen ">
        <div className="flex-1 flex flex-col py-16 justify-center h-full">
            <h1 className="text-5xl leading-[3.5rem] font-bold max-w-[80%]">Revolutionizing <span className="text-[#175CD3]">Hospital</span> Management and Patient Care</h1>
            <p className="text-sm text-black font-light max-w-[50%] leading-5 mt-2">Empower Your Healthcare Practice with Our Comprehensive, Cloud-Based EMR Platform</p>
            <button className="px-6 py-3 bg-[#175CD3] w-32 rounded-xl flex items-center mt-8 text-center"><Link className="text-sm text-center text-white font-normal" to="/demo">Get started</Link></button>
        </div>
        <div className="flex-1 h-full flex items-center justify-center relative">
            <div className="outer bg-[#6690D9] px-10 py-10 h-5/6 w-4/5 rounded-full">
                <div className="inner bg-[#8F8F8F] px-3 py-3 h-full w-full rounded-full"></div>
            </div>
            <img className="img2 w-full absolute" src={hero4} alt="hero" />
        </div>
        </section> 
        <section className="flex px-12 py-16 w-full min-h-screen h-screen bg-[#F0F5FE] gap-x-12">
            <div className="flex-1 flex items-center h-full">
                <img className="h-full rounded-3xl" src={hero2} alt="" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
                <h1 className="text-[#175CD3] text-3xl font-bold">About us</h1>
                <p className="mt-4 font-normal">EMR software is a digital version of the traditional paper-based medical records system used in healthcare. It is designed to store, manage, and retrieve patient health information, including medical history, diagnoses, treatments, prescriptions, and test results. This software facilitates efficient healthcare delivery by enabling quick access to patient data, improving accuracy, and streamlining workflow for healthcare providers.</p>
                <button className="px-6 py-3 bg-[#175CD3] w-32 rounded-xl flex items-center mt-8 text-center"><Link className="text-sm text-center text-white font-normal" to="/demo">Learn More</Link></button>
            </div>
        </section>
    </div>
  )
}

export default AboutComponent