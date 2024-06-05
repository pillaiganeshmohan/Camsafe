import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import HistoryHeader from "./HistoryHeader";
import Footer from "../Footer";
import DetailMaster from "./Detailsimg";
import DetailGallery from "./Detailsgallery";
import detail_bg from "../../assets/Detailed_View.png";
import Button from "../Button";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/subjectdetails/${id}/`);
        setRecord(response.data);
      } catch (error) {
        console.error('Error fetching record:', error);
      }
    };

    fetchRecord();
  }, [id,record]);

  if (!record) {
    return <div>Loading...</div>;
  }

  const images = record.images.map(img => ({
    src: img.image,
    alt: `Image ${img.id}`
  }));

  return (
    <div id="detail_page">
      <HistoryHeader />
      <img src={detail_bg} className="w-full h-[130vh] absolute top-16 left-0 -z-10 object-fill sm:h-full" />
      <div className="flex flex-col item-center justify-center detail-view ">
        <label className="p-5 text-4xl text-center mt-20"><b>Detailed View</b></label>
        <table>
          <thead className="flex justify-evenly z-10 sm:justify-center sm:gap-28">
         
            <th>
              <DetailGallery images={images} />
            </th>
          </thead>
        </table>
        <div className="flex flex-col justify-center items-center sm:w-full">
          <div className="flex w-6/12 justify-between py-2 sm:w-9/12">
            <label className="font-bold w-1/4 sm:w-1/2">Subject ID</label>
            <label className="w-1/4 sm:w-1/3">{record.id}</label>
          </div>
          <div className="flex w-6/12 justify-between py-2 sm:w-9/12">
            <label className="font-bold w-1/4 sm:w-1/2">Subject Name</label>
            <label className="w-1/4 sm:w-1/3">{record.name}</label>
          </div>
          <div className="flex w-6/12 justify-between py-2 sm:w-9/12">
            <label className="font-bold w-1/4 sm:w-1/2">Subject Gender</label>
            <label className="w-1/4 sm:w-1/3">{record?.gender?record.gender:'Unknown'}</label>
          </div>
          <div className="flex w-6/12 justify-between py-2 sm:w-9/12">
            <label className="font-bold w-1/4 sm:w-1/2">Subject Age</label>
            <label className="w-1/4 sm:w-1/3">{record.age}</label>
          </div>
          <div className="flex w-6/12 justify-between py-2 sm:w-9/12">
            <label className="font-bold w-1/4 sm:w-1/2">Subject Aadhar No.</label>
            <label className="w-1/4 sm:w-1/3">{record.aadhar_no}</label>
          </div>
          <div className="flex w-6/12 justify-between py-2 sm:w-9/12">
            <label className="font-bold w-1/4 sm:w-1/2">Subject Location</label>
            <label className="w-1/4 sm:w-1/3">{record.address}</label>
          </div>
          <div className="flex w-6/12 justify-between py-2 sm:w-9/12">
            <label className="font-bold w-1/4 sm:w-1/2">Longitude & Latitude</label>
            <label className="w-1/4 sm:w-1/3">{record.longitude}, {record.latitude}</label>
          </div>
          <div className="flex w-6/12 justify-between py-2 sm:w-9/12">
            <label className="font-bold w-1/4 sm:w-1/2">Subject Date & Day</label>
            <label className="w-1/4 sm:w-1/3">{new Date(record.date).toLocaleDateString()} & {new Date(record.date).toLocaleDateString('en-US', { weekday: 'long' })}</label>
          </div>
          <div className="flex w-6/12 justify-between py-2 sm:w-9/12">
            <label className="font-bold w-1/4 sm:w-1/2">Time of Capture</label>
            <label className="w-1/4 sm:w-1/3">{record.time}</label>
          </div>
       
          <Button name="Back" onClick={() => {navigate(-1)}} />
        </div>
      </div>
    </div>
  );
}
