import React, { useState } from "react";

function AdminUserDetail() {
  const [approvalStatus, setApprovalStatus] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
  });

  const handleApproval = (rowNumber) => {
    setApprovalStatus((prevStatus) => ({
      ...prevStatus,
      [rowNumber]: !prevStatus[rowNumber],
    }));
  };

  return (
    <div className="flex flex-col items-center w-full" id="userdetail">
      <h1 className="flex font-extrabold text-6xl mt-24 sm:font-bold sm:text-5xl sm:text-center">
        <b>User Detail</b>
      </h1>
      <table className="mt-8 w-9/12">
        <thead className="">
          <tr className="bg-blue-500 text-white">
            <th className="p-3">Sr. No.</th>
            <th className="">Police Station Name</th>
            <th className="">Police Station Code</th>
            <th className="">User ID</th>
            <th className="">Thana Incharge</th>
            <th className="">Status</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4].map((rowNumber) => (
            <tr key={rowNumber} className="text-center font-medium">
              <td className="py-2 sm:p-2">{rowNumber}</td>
              <td className="py-2 sm:p-2">Chembur Police Station</td>
              <td className="py-2 sm:p-2">CPT0089</td>
              <td className="py-2 sm:p-2">438</td>
              <td className="py-2 sm:p-2">Ganesh Pillai</td>
              <td className="py-2 sm:p-2">
                {approvalStatus[rowNumber] ? (
                  <label
                    className="text-green-500 cursor-pointer"
                    onClick={() => handleApproval(rowNumber)}
                  >
                    Logged In
                  </label>
                ) : (
                  <label
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleApproval(rowNumber)}
                    disabled={!approvalStatus[rowNumber]}
                  >
                    Logged Out
                  </label>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUserDetail;