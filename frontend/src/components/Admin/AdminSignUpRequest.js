import React, { useState } from "react";

const ApprovalStatus = () => {
  const [data, setData] = useState([
    { sr_no: 1, police_station_name: 'Panvel', police_station_code: 'CT00065', user_id: 423 , thana_incharge: 'Ganesh Pillai', status: 'pending' },
    { sr_no: 2, police_station_name: 'Chembur', police_station_code: 'CT00032', user_id: 465, thana_incharge: 'Priyanshi Sharma', status: 'pending' },
    { sr_no: 3, police_station_name: 'CBD', police_station_code: 'CT00145', user_id: 523, thana_incharge: 'Jannat Shaikh', status: 'pending' },
    { sr_no: 4, police_station_name: 'Panvel', police_station_code: 'CT00065', user_id: 423 , thana_incharge: 'Ganesh Pillai', status: 'pending' },
    { sr_no: 5, police_station_name: 'Chembur', police_station_code: 'CT00032', user_id: 465, thana_incharge: 'Priyanshi Sharma', status: 'pending' },
    { sr_no: 6, police_station_name: 'CBD', police_station_code: 'CT00145', user_id: 523, thana_incharge: 'Jannat Shaikh', status: 'pending' },
    { sr_no: 7, police_station_name: 'Panvel', police_station_code: 'CT00065', user_id: 423 , thana_incharge: 'Ganesh Pillai', status: 'pending' },
    { sr_no: 8, police_station_name: 'Chembur', police_station_code: 'CT00032', user_id: 465, thana_incharge: 'Priyanshi Sharma', status: 'pending' },
    { sr_no: 9, police_station_name: 'CBD', police_station_code: 'CT00145', user_id: 523, thana_incharge: 'Jannat Shaikh', status: 'pending' }
  ]);

  const updateStatus = (sr_no, newStatus) => {
    setData(prevData =>
      prevData.map(item =>
        item.sr_no === sr_no ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <div className="flex flex-col items-center w-full" id="signup">
      <h1 className="flex font-extrabold text-6xl mt-24 sm:mt-32 sm:font-bold sm:text-5xl sm:text-center"><b>SignUp Request</b></h1>
      <table className="mt-8 w-9/12 ">
        <thead className="">
          <tr className="bg-blue-500 text-white">
            <th className="p-3">Sr. No.</th>
            <th className="">Police Station Name</th>
            <th className="">Police Station Code</th>
            <th className="">User id</th>
            <th className="">Thana Incharge</th>
            <th className="">Approval</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr className="text-center font-medium" key={item.sr_no}>
              <td className="py-2 sm:p-1.5">{item.sr_no}</td>
              <td className="py-2 sm:p-1.5">{item.police_station_name}</td>
              <td className="py-2 sm:p-1.5">{item.police_station_code}</td>
              <td className="py-2 sm:p-1.5">{item.user_id}</td>
              <td className="py-2 sm:p-1.5">{item.thana_incharge}</td>
              <td className="py-2 sm:p-1.5">
                {item.status === 'pending' ? (
                  <>
                    <button className="btnsignup mr-2" onClick={() => updateStatus(item.sr_no, 'accepted')}>
                      ✔️
                    </button>
                    <button className="btnsignup" onClick={() => updateStatus(item.sr_no, 'rejected')}>
                      ❌
                    </button>
                  </>
                ) : item.status === 'accepted' ? (
                  '✔️'
                ) : (
                  '❌'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovalStatus;
