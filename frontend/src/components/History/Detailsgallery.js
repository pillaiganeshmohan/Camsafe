import React, { useState, useEffect } from "react";
import axios from 'axios';
import image1 from "../../assets/Ankit.jpg";
import "./Detailsimg.css";
import Gallery from "../History/Gallery";
import { GrGallery } from "react-icons/gr";
// const images = [
//   { id: 1, src: require("../../assets/Ankit.jpg"), alt: "Ankit" },
//   // Add more images as needed
// ];

const Detailsgallery = () => {
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
    <div>
      <div className="flex w-full">
        <img src={responseData[0]?.images[0]?.image} alt="Ankit" onClick={toggleModal} className="flex h-60 w-60 sm:h-24 sm:w-24 cursor-pointer" />
        <GrGallery className="absolute left-3/4 size-7 text-black cursor-pointer" onClick={toggleModal}/>
      </div>
      {modalOpen && (
        <div className="modal">
          <span className="close" onClick={toggleModal}> &times;</span>
            <Gallery/>
        </div>
        )}
    </div>
  );
};

export default Detailsgallery;
