import React from "react";
import "./AdminDashboard.css";
import image from "../../assets/Male_User.png";

function AdminHeader({ toggleDashboard }) {
  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn1")) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
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
          <nav className="left1" onClick={toggleDashboard}>
            <h1 className="h1style1 text-6xl font-extrabold sm:font-semibold sm:text-3xl sm:mr-40 sm:-mb-3 ">ADMIN</h1>
            <ul className="nav-op1 ml-64">
              <li>
                <a href="https://www.youtube.com/">Home</a>
              </li>
              <li>
                <a href="https://www.youtube.com/">Records</a>
              </li>
              <li>
                <a href="https://www.youtube.com/">About Us</a>
              </li>
              <li>
                <a href="https://www.youtube.com/">Contact Us</a>
              </li>
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
                  <a href="#signup">SignUp Request</a>
                  <a href="#userdetail">User Details</a>
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

export default AdminHeader;
