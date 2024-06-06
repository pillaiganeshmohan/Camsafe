import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  const token = localStorage.getItem('token');

  function logout() {
    // Implement logout functionality here
    // For example, you can remove the token from local storage
    localStorage.removeItem('token');
    // Optionally, you can redirect the user to the login page
    // window.location.href = '/login';
  }

  return (
    <header>
      <div className="main">
        <nav className="left">
          <div className="dropdown">
            <button onClick={() => {localStorage.clear();}} className="dropbtn"></button>
            <div id="myDropdown" className="dropdown-content">
              <Link to="/">Home</Link>
              <Link to="/history">Records</Link>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact Us</Link>
            </div>
          </div>
          <div className='logo_header'>
            <div className='CamLogo'><img src={require('../assets/loginlogo.png')} alt="logo" /></div>
            <div className='CamS'><span>CamSafe</span></div>
          </div>

          <ul className='nav-op'>
            <li><Link to="/" className='hover:no-underline font-bold relative inline cursor-pointer text-xl before:bg-violet-600  before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100'>Home</Link></li>
            <li><Link to="/history" className='hover:no-underline font-bold relative inline cursor-pointer text-xl before:bg-violet-600  before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100'>Records</Link></li>
            <li><Link to="/about" className='hover:no-underline relative font-bold inline cursor-pointer text-xl before:bg-violet-600  before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100'> About Us</Link></li>
            <li><Link to="/contact" className='hover:no-underline font-bold relative inline cursor-pointer text-xl before:bg-violet-600  before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100'>Contact Us</Link></li>
          </ul>
        </nav>

        <nav className="right  -mr-14">
          <ul className="navbar gap-8 sm:gap-2 h-3/4">
            {token ? (
              <button onClick={logout} className="font-bold relative inline-flex items-center justify-center rounded-md overflow-hidden group">
                <span className="w-full rounded-md h-3/4 p-2 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700 group-hover:from-pink-700 group-hover:via-purple-600 group-hover:to-blue-600 absolute"></span>
                <span className="relative w-[98%] h-[72%] px-6 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                  <span className="relative text-white ml-2 h-full flex items-center">Logout</span>
                </span>
              </button>
            ) : (
              <>
                <Link to="/signup" className="w-1/2 relative inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
                  <span className="w-full rounded-md h-3/4 p-2 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700 group-hover:from-pink-700 group-hover:via-purple-600 group-hover:to-blue-600 absolute"></span>
                  <span className="relative w-[98%] h-[72%] px-6 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                    <span className="relative text-white ml-2 h-full flex items-center">User</span>
                  </span>
                </Link>
                <Link to="/adminsignup" className="w-1/2 relative inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
                  <span className="w-full rounded-md h-3/4 p-2 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700 group-hover:from-pink-700 group-hover:via-purple-600 group-hover:to-blue-600 absolute"></span>
                  <span className="relative w-[98%] h-[72%] px-6 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                    <span className="relative text-white mr-2 h-full flex items-center">Admin</span>
                  </span>
                </Link>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header;
