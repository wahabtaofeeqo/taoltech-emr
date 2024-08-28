import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import 'boxicons/css/boxicons.min.css';
import './navBar.css'

const NavBar = () => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(true);


  const handleToggle = () => {
      setShowMenu(prevState => !prevState)
  }

  return (
    <header className="w-screen px-4 py-3 flex justify-between items-center bg-white fixed top-0 z-10 md:px-6 lg:px-6 xl:px-16">
      <h3 className="">Logo</h3>
      <nav>
        <span className="menu xl:hidden" onClick={handleToggle}><i className='bx bx-menu'></i></span>

        <ul className={`flex  ${showMenu ? 'active' : ''}`}>
          <li className="cancel xl:hidden" onClick={handleToggle} ><i className='bx bx-x'></i></li>
          <li className="px-3 top"><Link  className={`text-sm xl:text-sm font-medium ${location.pathname === '/' ? 'text-[#175CD3]' : 'text-[#8F8F8F]'}`} to="/">Home</Link></li>
          <li className="px-3"><Link className={`text-sm xl:text-sm font-medium ${location.pathname === '/about' ? 'text-[#175CD3]' : 'text-[#8F8F8F]'}`} to="/about">About</Link></li>
          <li className="px-3"><Link className={`text-sm xl:text-sm font-medium ${location.pathname === '/support' ? 'text-[#175CD3]' : 'text-[#8F8F8F]'}`} to="/support">Support</Link></li>
          <li className="px-3"><Link className={`text-sm xl:text-sm font-medium ${location.pathname === '/pricing' ? 'text-[#175CD3]' : 'text-[#8F8F8F]'}`} to="/pricing">Pricing</Link></li>
          <li className="li px-3 py-2 bg-[#175CD3] w-[80%] sm:w-[100%] ms:w-[80%] rounded-xl flex xl:hidden items-center justify-center"><Link className="text-sm xl:text-sm text-white font-normal" to="/demo">Request a Demo</Link></li>
        </ul>
      </nav>

      <button className="px-6 py-3 bg-[#175CD3] rounded-xl xl:flex items-center hidden"><Link className="text-sm text-white font-normal" to="/demo">Request a Demo</Link></button>
    </header>
  )
}

export default NavBar