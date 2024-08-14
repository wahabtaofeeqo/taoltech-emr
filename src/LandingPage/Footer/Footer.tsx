import React, {useState} from 'react'
import 'boxicons/css/boxicons.min.css';
import { Link } from 'react-router-dom'

type EmailForm = {
  email: string;
}

const Footer : React.FC = () => {

  const [emailForm, setEmail] = useState<EmailForm>({email: ''});

  const submitEmail = () => {
    console.log("Email submitted")
  }

  return (
    <footer className="bg-[#17263F] flex flex-col items-center justify-between px-12 py-10 min-h-[80vh] w-full">
      <div className="flex justify-between items-center w-full">
        <div className=" flex-1">
          <h1 className="text-white">Logo</h1>
          <p className="p text-white mt-6 font-normal text-base">Discover our dedication to transforming healthcare with innovative technology. Learn about our journey and how our EMR platform is designed to meet the needs of modern healthcare providers.</p>
        </div>
          <ul className="flex flex-1 justify-end">
              <li className="px-3"><Link  className='text-base font-medium text-[#FFFFFF] p' to="/">Home</Link></li>
              <li className="px-3"><Link className='text-base font-medium text-[#FFFFFF] p' to="/about">About</Link></li>
              <li className="px-3"><Link className='text-base font-medium text-[#FFFFFF] p' to="/support">Support</Link></li>
              <li className="px-3"><Link className='text-base font-medium text-[#FFFFFF] p' to="/pricing">Pricing</Link></li>
          </ul>
      </div>
      <div className="flex w-full justify-between items-center">
        <span className="text-white text-sm">Subscribe to our newsletter</span>
        <div className="flex rounded-lg border-[1px] border-white px-2 py-2">
          <input className="bg-transparent outline-none mr-2" type="email" value={emailForm.email} onChange={(e) => setEmail({...emailForm, email: e.target.value})} placeholder='Enter Your Email' />
          <button className="px-6 py-3 bg-[#175CD3] rounded-lg" onClick={submitEmail}><Link className="text-sm text-white font-normal" to="/demo">Subscribe</Link></button>
        </div>
        <div>
          <Link className=" px-4 text-white text-xl" to="twitter"><i className='bx bxl-twitter'></i></Link>
          <Link className=" px-4 text-white text-xl" to="facebook"><i className='bx bxl-facebook'></i></Link>
          <Link className=" px-4 text-white text-xl" to="instagram"><i className='bx bxl-instagram'></i></Link>
        </div>

      </div>
      <span className="mt-16 text-white text-base">Blank. All right reserved. © {new Date().getFullYear()}</span>
    </footer>
  )
}

export default Footer