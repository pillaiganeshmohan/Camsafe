import React from "react";
import HistoryHeader from "./HistoryHeader";
import Footer from "../Footer";
import DetailMaster from "./Detailsimg"
import DetailGallery from "./Detailsgallery"
import detail_bg from "../../assets/Detailed_View.png"
import Button from "../Button";

export default function Details() {
  return (
    <div id="detail_page">
      <HistoryHeader />
      <img src={detail_bg} className="w-full h-[130vh] absolute top-16 left-0 -z-10 object-fill sm:h-full" />
      <div className="flex flex-col item-center justify-center detail-view ">
      <label className="p-5 text-4xl text-center mt-20"><b>Detailed View</b></label>
        <table>
          <thead className="flex justify-evenly z-10 sm:justify-center sm:gap-28">
            <th><DetailMaster/></th>
            <th><DetailGallery/></th>
          </thead>
          </table>
          <div className="flex flex-col justify-center items-center sm:w-full">
            <div className="flex w-6/12 justify-between py-2 sm:w-9/12">
              <label className="font-bold w-1/4 sm:w-1/2">Subject ID</label>
              <label className="w-1/4 sm:w-1/3">1121</label>
            </div>
            <div className="flex w-6/12 justify-between py-2 sm:w-9/12">
              <label className="font-bold w-1/4 sm:w-1/2">Subject Name</label>
              <label className="w-1/4 sm:w-1/3">ABC XYZ</label>
            </div>
            <div className="flex w-6/12 justify-between py-2 sm:w-9/12">
              <label className="font-bold w-1/4 sm:w-1/2">Subject Gender</label>
              <label className="w-1/4 sm:w-1/3">Male</label>
            </div>
            <div className="flex w-6/12 justify-between py-2 sm:w-9/12">
              <label className="font-bold w-1/4 sm:w-1/2">Subject Age</label>
              <label className="w-1/4 sm:w-1/3">22</label>
            </div>
            <div className="flex w-6/12 justify-between py-2 sm:w-9/12">
              <label className="font-bold w-1/4 sm:w-1/2">Subject Aadhar No.</label>
              <label className="w-1/4 sm:w-1/3">XXXX XXXX XXXX</label>
            </div>
            <div className="flex w-6/12 justify-between py-2 sm:w-9/12">
              <label className="font-bold w-1/4 sm:w-1/2">Subject Location</label>
              <label className="w-1/4 sm:w-1/3">Belapur</label>
            </div>
            <div className="flex w-6/12 justify-between py-2 sm:w-9/12">
              <label className="font-bold w-1/4 sm:w-1/2">Longitude & Latitude</label>
              <label className="w-1/4 sm:w-1/3">13.2074° N, 74.7718° E</label>
            </div>
            <div className="flex w-6/12 justify-between py-2 sm:w-9/12">
              <label className="font-bold w-1/4 sm:w-1/2">Subject Date & Day</label>
              <label className="w-1/4 sm:w-1/3">XX/XX/XX & Thursday</label>
            </div>
            <div className="flex w-6/12 justify-between py-2 sm:w-9/12">
              <label className="font-bold w-1/4 sm:w-1/2">Percentage(%)</label>
              <label className="w-1/4 sm:w-1/3">70</label>
            </div>
            <a href="/history" className="-z-10 m-5"><Button name="Back"/></a>
          </div>
      </div>
    </div>
  );
}
