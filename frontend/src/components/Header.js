import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom';
function Header() {

  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  return (
    <header>
      <div class="main">
        <nav class="left">
          <div className='logo_header'>
            <div className='CamLogo'><img src={require('../assets/loginlogo.png')} alt="logo" /></div>
            <div className='CamS'><span>CamSafe</span></div>
          </div>

          <ul className='nav-op'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/history">Records</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </nav>

        <nav class="right">
          <div class="dropdown">
            <button onClick={() => myFunction()} class="dropbtn"></button>
            <div id="myDropdown" class="dropdown-content">
              <Link to="/">Home</Link>
              <Link to="/history">Records</Link>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact Us</Link>
            </div>
          </div>

          <ul class="navbar">
            <button class="btnn"><Link to="/signup">User</Link></button>
            <button class="btnn"><Link to="/adminsignup">Admin</Link></button>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header