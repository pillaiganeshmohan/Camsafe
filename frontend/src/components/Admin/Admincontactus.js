import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function Admincontactus() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/contact_us/")
      .then((response) => {
        const data = response.data;
          setUserData(data);

      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);


  return (
    <div className="flex flex-col items-center w-full" id="contactdetails">
      <h1 className="flex font-extrabold text-6xl mt-24 sm:font-bold sm:text-5xl sm:text-center">
        <b>Contact Us Queries</b>
      </h1>
      <table className="my-8 w-9/12">
        <thead>
          <tr className="bg-blue-500 text-white">
          <th className="p-3">Sr no</th>
            <th className="p-3">First Name</th>
            <th className="">Last Name</th>
            <th className="">Email</th>
            <th className="">How can we help you</th>

          </tr>
        </thead>
        <tbody>
          {userData.filter((user) => user.id).map((user, index) => (
            <tr key={user.id} className="text-center font-medium">
              <td className="py-2 sm:p-2">{index + 1}</td>
              <td className="py-2 sm:p-2">{user.name}</td>
              <td className="py-2 sm:p-2">{user.lastname}</td>
              <td className="py-2 sm:p-2">{user.email}</td>
              <td className="py-2 sm:p-2">{user.message}</td>


            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admincontactus;
