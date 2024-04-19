import React from 'react'
import HistoryHeader from "./HistoryHeader";
import detail_bg from '../../assets/Contact Us Grad.png';
import history_img from "../../assets/history.png"
import { Link } from 'react-router-dom';

function History() {
  return (
      <div className="flex flex-col items-center w-full">
        <HistoryHeader />
        <img src={detail_bg} className="w-full absolute top-16 left-0 -z-10 object-fill sm:h-full" />
      <div className="flex flex-col item-center justify-center">
          <div className="flex flex-row sm:flex-col">
            <div className="flex flex-col">
              <label className="p-5 text-6xl ml-14 mt-28 font-bold sm:mt-20 sm:text-3xl sm:text-center sm:ml-0">History</label>
              <label className="text-2xl ml-20 font-semibold sm:text-xs sm:text-center sm:-mt-4 sm:ml-0">Here is a list of criminals records that has been found <br/> in our database</label>
            </div>
            <img src={history_img} className="mt-20 ml-auto sm:mt-3 sm:max-w-60 sm:mt-0 sm:mr-20" />
        </div>
        <div className="overflow-x-auto">
        <table className="mt-8 w-9/12 ml-auto mr-auto sm:w-fit">
            <thead className="">
              <tr className="bg-blue-500 text-white sm:text-xs">
                <th className="p-3">Sub. Id</th>
                <th className="">Sub. Name</th>
                <th className="">Date</th>
                <th className="">Day</th>
                <th className="">Footage Id</th>
                <th className="">Camera Id</th>
                <th className="">Detailed View</th>
              </tr>
            </thead>
            <tbody className="sm:text-xs sm:font-normal">
              <tr className="text-center font-medium sm:text-xs">
                <td className="py-2 sm:p-1.5">1121</td>
                <td className="py-2 sm:p-1.5">ABC XYZ</td>
                <td className="py-2 sm:p-1.5">13/4/2024</td>
                <td className="py-2 sm:p-1.5">Saturday</td>
                <td className="py-2 sm:p-1.5">1253.64</td>
                <td className="py-2 sm:p-0.5">24r665.6y</td>
                <td className="py-2 cursor-pointer hover:underline sm:p-1.5"><a href="/detailed-view">View Details</a></td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      </div>
  )
}

export default History
