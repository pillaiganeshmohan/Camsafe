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
            <li><Link to="/">Home</Link></li>
            <li><Link to="/history">Records</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
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
                  <a href="link">Home</a>
                  <a href="link">Records</a>
                  <a href="link">About Us</a>
                  <a href="link4">Contact Us</a>
                </div>
              </div>
              <span className="avtar1">
                <div className="icon1">
                  <a href="link" className="icon_username1">
                    Pasta Haha
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
