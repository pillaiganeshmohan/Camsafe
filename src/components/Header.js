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
          <span>CamSafe</span>
          <ul className='nav-op'>
            <li><Link to="/">Home</Link></li>
            <li><a href="https://www.youtube.com/">Records</a></li>
            <li><a href="https://www.youtube.com/">About Us</a></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </nav>

        <nav class="right">
          <ul class="navbar">
            <div class="dropdown">
              <button onClick={() => myFunction()} class="dropbtn"></button>
              <div id="myDropdown" class="dropdown-content">
                <a href="link">Home</a>
                <a href="link">Records</a>
                <a href="link">About Us</a>
                <a href="link4">Contact Us</a>
              </div>
            </div>
            <button class="btnn"><Link to="/signup">User</Link></button>
            <button class="btnn"><Link to="/adminsignup">Admin</Link></button>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header