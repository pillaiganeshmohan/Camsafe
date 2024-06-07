import React from "react";
import "./HistoryHeader.css";
import image from "../../assets/Male_User.png";
import { Link } from 'react-router-dom';

function HistoryHeader({ toggleDashboard }) {
  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn1")) {
      var dropdowns = document.getElementsByClassName("dropdown-content1");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };

  return (
    <div className="adminheader">
      <header>
        <div className="main1">
          <nav className="left1">
            <div className='logo_header1'>
                <div className='CamLogo'><img src={require('../../assets/loginlogo.png')} alt="logo" /></div>
                <div className='CamS'><span>CamSafe</span></div>
            </div>
            <ul className="nav-op1">
            <li><Link to="/" className=' hover:no-underline font-bold relative inline cursor-pointer text-xl  before:bg-violet-600  before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100'>Home</Link></li>
            <li><Link to="/history" className=' hover:no-underline font-bold relative inline cursor-pointer text-xl before:bg-violet-600  before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100'>Records</Link></li>
            <li><Link to="/about"  className='hover:no-underline relative font-bold inline cursor-pointer text-xl before:bg-violet-600  before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100'> About Us</Link></li>
            <li><Link to="/contact"  className='hover:no-underline font-bold relative inline cursor-pointer text-xl before:bg-violet-600  before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100'>Contact Us</Link></li>
          </ul>
          </nav>
          <nav className="right1">
            <ul className="navbar1">
              <div className="dropdown1">
                <button
                  onClick={() => myFunction()}
                  className="dropbtn1"
                ></button>
                <div id="myDropdown" className="dropdown-content1">
                  <a href="/">Home</a>
                  <a href="/history">Records</a>
                  <a href="/about">About Us</a>
                  <a href="/contact">Contact Us</a>
                </div>
              </div>
              <span className="avtar1">
                <div className="icon1">
                  <a href="link" className="icon_username1">
                    {localStorage.getItem('Name')?localStorage.getItem('Name'):'Guest'}
                    {/* GANESH MOHAN PILLAI */}
                  </a>
                  <img src={image} />
                </div>
              </span>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default HistoryHeader;
