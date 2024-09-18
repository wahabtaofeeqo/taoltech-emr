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
    <footer className="bg-[#17263F] flex flex-col items-center justify-between px-4 py-8 min-h-[70vh] w-full ms:px-6 mdd:px-6 lgg:px-6  ms:min-h-[45vh]  mdd:min-h-[45vh] lgg:min-h-[45vh] xll:min-h-[80vh]">
      <div className="flex justify-between flex-col items-center smm:flex-row w-full flex-wrap">
        <div className=" flex-1">
          <h1 className="text-white">Logo</h1>
          <p className="p text-xs text-white mt-6 font-normal text-base ms:text-sm mdd:text-sm">Discover our dedication to transforming healthcare with innovative technology. Learn about our journey and how our EMR platform is designed to meet the needs of modern healthcare providers.</p>
        </div>
          <ul className="flex flex-1 justify-end mt-6 smm:mt-0">
              <li className="px-2 ms:px-3"><Link  className='text-xs font-medium text-[#FFFFFF] p  ms:text-sm mdd:text-sm' to="/">Home</Link></li>
              <li className="px-2 ms:px-3"><Link className='text-xs font-medium text-[#FFFFFF] p ms:text-sm mdd:text-sm' to="/about">About</Link></li>
              <li className="px-2 ms:px-3"><Link className='text-xs font-medium text-[#FFFFFF] p ms:text-sm mdd:text-sm' to="/support">Support</Link></li>
              <li className="px-2 ms:px-3"><Link className='text-xs font-medium text-[#FFFFFF] p ms:text-sm mdd:text-sm' to="/pricing">Pricing</Link></li>
          </ul>
      </div>
      <div className="flex w-full justify-between items-center flex-wrap mt-6 smm:mt-0">
        <span className="text-white text-sm">Subscribe to our newsletter</span>
        <div className="flex rounded-lg border-[1px] border-white px-2 py-2 mt-4  smm:mt-0">
          <input className="bg-transparent outline-none h-20px  mr-2 mdd:h-[20px] lgg:h-[30px] text-xs" type="email" value={emailForm.email} onChange={(e) => setEmail({...emailForm, email: e.target.value})} placeholder='Enter Your Email' />
          <button className="px-6 py-1 bg-[#175CD3] rounded-lg ms:py-1 ms:px-4 mdd:py-1 lgg:py-1 xll:py-3" onClick={submitEmail}><Link className="text-sm text-white font-normal ms:text-xs" to="/demo">Subscribe</Link></button>
        </div>
        <div className="mt-6  smm:mt-0">
          <Link className=" px-4 text-white text-xl ms:text-lg" to="twitter"><i className='bx bxl-twitter'></i></Link>
          <Link className=" px-4 text-white text-xl ms:text-lg" to="facebook"><i className='bx bxl-facebook'></i></Link>
          <Link className=" px-4 text-white text-xl ms:text-lg" to="instagram"><i className='bx bxl-instagram'></i></Link>
        </div>

      </div> 
      <span className="mt-16 text-white text-xs ms:text-sm">Blank. All right reserved. © {new Date().getFullYear()}</span>
    </footer>
  )
}

export default Footer