import React, { useState } from 'react'
import './Header.css'
import image from '../assets/maleicon.png'
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
            <li><Link to="/history">Records</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </nav>

        <nav class="right">
          <ul class="navbar">
            <div class="dropdown">
              <button onClick={() => myFunction()} class="dropbtn"></button>
              <div id="myDropdown" class="dropdown-content">
              <Link to="/">Home</Link>
              <Link to="/history">Records</Link>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact Us</Link>
              </div>
            </div>
            <span className='avtar'>
              <div className='icon'>Pasta Haha
                <img src={image} />
                <button class="btnn2"> <a href="https://www.youtube.com/watch?v=JvC7aA24m4Q&list=PLu0W_9lII9agx66oZnT6IyhcMIbUMNMdt&index=4">Logout</a> </button>
              </div>
            </span> 

            
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header