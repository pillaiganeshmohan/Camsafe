import React from 'react'
import './Header.css'
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
            <li><a href="https://www.youtube.com/">Home</a></li>
            <li><a href="https://www.youtube.com/">Records</a></li>
            <li><a href="https://www.youtube.com/">About Us</a></li>
            <li><a href="https://www.youtube.com/">Contact Us</a></li>
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
            <button class="btnn"> <a href="https://www.youtube.com/watch?v=JvC7aA24m4Q&list=PLu0W_9lII9agx66oZnT6IyhcMIbUMNMdt&index=4">User</a> </button>
            <button class="btnn"> <a href="https://www.youtube.com/watch?v=JvC7aA24m4Q&list=PLu0W_9lII9agx66oZnT6IyhcMIbUMNMdt&index=4">Admin</a> </button>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header