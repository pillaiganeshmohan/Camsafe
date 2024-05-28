import React, { useState,useEffect } from "react";
import axios from 'axios';
import "./Detailsimg.css";
const images = [
  { id: 1, src: require("../../assets/Ankit.jpg"), alt: "Ankit" },
  // Add more images as needed
];

function setSlides(fetchedSlides: any) {
  throw new Error("Function not implemented.");
}

const Detailsimg = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const [responseData, setResponseData] = useState([])

  const token = localStorage.getItem('token')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/subjectdetails', {
          headers: {
            'Authorization': `Bearer ${token}`, // replace with your actual token
          },
        });
        const data = response.data;
        setResponseData(response.data)
        if (data.length > 0) {
          const fetchedSlides = data[0].images.map(img => ({
            url: img.image,
            title: '', // You can set title if needed, e.g., data[0].name
          }));
          setSlides(fetchedSlides);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="z-20">
      <div className="flex ">
        <img src={responseData[0]?.master_front_profile} alt="Ankit" onClick={toggleModal} className="flex h-60 w-60 sm:h-24 sm:w-24 cursor-pointer"/>
          </div>
            {modalOpen && (
              <div className="modal">
                <span className="close" onClick={toggleModal}>
                  &times;
                </span>
                <img src={responseData[0]?.master_front_profile} alt="Ankit" className="items-center auto-square w-80 h-96 mt-32 m-auto sm:w-80 sm:ml-10"/>
              </div>
            )}
    </div>
  );
};

export default Detailsimg;
