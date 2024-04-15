import React, { useState } from "react";
import image1 from "../../assets/Ankit.jpg";
import "./Detailsimg.css";
import Gallery from "../History/Gallery";
const images = [
  { id: 1, src: require("../../assets/Ankit.jpg"), alt: "Ankit" },
  // Add more images as needed
];

const Detailsimg = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };


  return (
    <div>
      <div className="flex w-full">
        <img src={image1} alt="Ankit" onClick={toggleModal} className="flex h-60 w-60 sm:h-24 sm:w-24"/>
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

export default Detailsimg;
