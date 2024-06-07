import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function Admincontactus() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/users/")
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data)) {
          setUserData(data);
        } else {
          console.error("API response is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [userData]);

  const handleApproval = (userEmail) => {
    axios
      .post("http://127.0.0.1:8000/api/logout/", { email: userEmail })
      .then(() => {
        setUserData((prevUserData) =>
          prevUserData.map((user) =>
            user.email === userEmail ? { ...user, login_status: false } : user
          )
        );
        toast.success('User Logged out successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.error("Error logging out user: ", error.response.data.error);
        toast.error(error.response.data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

      });
  };

  return (
    <div className="flex flex-col items-center w-full" id="contactdetails">
      <h1 className="flex font-extrabold text-6xl mt-24 sm:font-bold sm:text-5xl sm:text-center">
        <b>Contact Us Queries</b>
      </h1>
      <table className="mt-8 w-9/12">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="p-3">First Name</th>
            <th className="">Last Name</th>
            <th className="">Email</th>
            <th className="">How can we help you</th>

          </tr>
        </thead>
        <tbody>
          {userData.filter((user) => user.login_status).map((user, index) => (
            <tr key={user.id} className="text-center font-medium">
              <td className="py-2 sm:p-2">{index + 1}</td>
              <td className="py-2 sm:p-2">{user.email}</td>
              <td className="py-2 sm:p-2">{user.police_station_code}</td>
              <td className="py-2 sm:p-2">{user.id}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admincontactus;
