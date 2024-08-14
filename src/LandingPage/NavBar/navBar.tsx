import { Link, useLocation } from 'react-router-dom';
import './navBar.css'

const NavBar = () => {
  const location = useLocation()

  return (
    <header className="w-screen px-12 py-3 flex justify-between items-center bg-white fixed top-0 z-10">
      <h3 className="">Logo</h3>
      <nav>
        <ul className="flex">
          <li className="px-3"><Link  className={`text-sm font-medium ${location.pathname === '/' ? 'text-[#175CD3]' : 'text-[#8F8F8F]'}`} to="/">Home</Link></li>
          <li className="px-3"><Link className={`text-sm font-medium ${location.pathname === '/about' ? 'text-[#175CD3]' : 'text-[#8F8F8F]'}`} to="/about">About</Link></li>
          <li className="px-3"><Link className={`text-sm font-medium ${location.pathname === '/support' ? 'text-[#175CD3]' : 'text-[#8F8F8F]'}`} to="/support">Support</Link></li>
          <li className="px-3"><Link className={`text-sm font-medium ${location.pathname === '/pricing' ? 'text-[#175CD3]' : 'text-[#8F8F8F]'}`} to="/pricing">Pricing</Link></li>
        </ul>
      </nav>

      <button className="px-6 py-3 bg-[#175CD3] rounded-xl flex items-center"><Link className="text-sm text-white font-normal" to="/demo">Request a Demo</Link></button>
    </header>
  )
}

export default NavBar