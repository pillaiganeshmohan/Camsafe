import React from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="fixed top-11 left-0 h-screen w-1/4 text-white p-5 dashboard mt-8 sm:hidden">
      <h1 className="text-6xl font-extrabold mb-10 -mt-6 ml-0 text-white tracking-wider">
        Dashboard
      </h1>
      <div className="flex flex-col items-center">
        <img
          src={require("../../assets/admin_img.png")}
          className="flex h-20 ml-4 mb-4"
          alt="Admin"
        />
        <h2 className=" flex text-5xl font-bold text-white">
          <i>Ganesh Pillai</i>
        </h2>
      </div>
      <div className="flex flex-col items-center mt-16">
        <a href="#signup" className="w-full">
          <button className="text-white text-3xl font-semibold bg-transparent border-none w-full hover:bg-blue_hover hover:text-3xl hover:w-full hover:rounded hover:p-2 hover:px-3 hover:text-white">
            SignUp Request
          </button>
        </a>
        <a href="#userdetail" className="w-full">
          <button className="text-white text-3xl font-semibold bg-transparent border-none w-full mt-5 hover:bg-blue_hover hover:text-3xl hover:w-full hover:rounded hover:p-2 hover:px-3 hover:text-white">
            User Details
          </button>
        </a>
        <a href="#contactdetails" className="w-full">
          <button className="text-white text-3xl font-semibold bg-transparent border-none w-full mt-5 hover:bg-blue_hover hover:text-3xl hover:w-full hover:rounded hover:p-2 hover:px-3 hover:text-white">
            Contact Us Queries
          </button>
        </a>
      </div>
    </div>
  );
};

export default AdminDashboard;
