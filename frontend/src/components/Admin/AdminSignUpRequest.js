import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Modal from "react-modal";

// Set the app element for accessibility
Modal.setAppElement("#root");

const ApprovalStatus = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const updateStatus = (userEmail, newStatus) => {
    axios
      .post("http://127.0.0.1:8000/api/user-activation/", { email: userEmail })
      .then((response) => {
        toast.success(newStatus, {
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

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const customStyles = {
    content: {
      width: '50%',  // Width of the modal
      height: '50%', // Height of the modal
      margin: 'auto', // Center the modal horizontally
      top: '50%',  // Center the modal vertically
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)', // Center the modal
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)', // Overlay background color
    },
  };

  return (
    <div className="flex flex-col items-center w-full" id="signup">
      <h1 className="flex font-extrabold text-6xl mt-24 sm:mt-32 sm:font-bold sm:text-5xl sm:text-center">
        <b>SignUp Request</b>
      </h1>
      <table className="mt-8 w-9/12">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="p-3">Sr. No.</th>
            <th className="">Email</th>
            <th className="">Police Station Code</th>
            <th className="">User ID</th>
            <th className="">Thana Incharge</th>
            <th className="">Approval</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr className="text-center font-medium" key={user.id}>
              <td className="py-2 sm:p-1.5">{index + 1}</td>
              <td className="py-2 sm:p-1.5 text-left cursor-pointer hover:underline" onClick={() => openModal(user)}>
                {user.email}
              </td>
              <td className="py-2 sm:p-1.5">{user.police_station_code}</td>
              <td className="py-2 sm:p-1.5">{user.id}</td>
              <td className="py-2 sm:p-1.5">{user.thana_incharge}</td>
              <td className="py-2 sm:p-1.5">
                {user.status === "pending" ? (
                  <>
                    <button
                      className="btnsignup mr-2 cursor-pointer"
                      onClick={() => updateStatus(user.email, "accepted")}
                    >
                      ✔️
                    </button>
                    <button
                      className="btnsignup cursor-pointer"
                      onClick={() => updateStatus(user.email, "rejected")}
                    >
                      ❌
                    </button>
                  </>
                ) : user.is_active === false ? (
                  <button
                    className="btnsignup cursor-pointer"
                    onClick={() => updateStatus(user.email, "User Activated Successfully")}
                  >
                    ✔️
                  </button>
                ) : (
                  <button
                    className="btnsignup cursor-pointer"
                    onClick={() => updateStatus(user.email, "User Deactivated Successfully")}
                  >
                    ❌
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={customStyles} contentLabel="User Details">
        {selectedUser && (
          <div>
            <h2 className="w-full flex items-center justify-center text-4xl font-semibold">User Details</h2>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Contact No.:</strong> {selectedUser.contact_no}</p>
            <p><strong>Police Station Name:</strong> {selectedUser.police_station_name}</p>
            <p><strong>Police Station Code:</strong> {selectedUser.police_station_code}</p>
            <p><strong>User ID:</strong> {selectedUser.id}</p>
            <p><strong>Thana Incharge:</strong> {selectedUser.thana_incharge}</p>
            <p><strong>User Role:</strong> {selectedUser.user_role}</p>
            <p><strong>State:</strong> {selectedUser.state}</p>
            <p><strong>District:</strong> {selectedUser.district}</p>
            <p><strong>Taluka:</strong> {selectedUser.taluka}</p>
            <p><strong>Pincode:</strong> {selectedUser.pin_code}</p>


            <button onClick={closeModal} className="flex w-full items-center justify-center text-2xl text-red-600 font-bold ">Close</button>
          </div>
        )}
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default ApprovalStatus;
