import React, { useState } from "react";
import image1 from "../../assets/Ankit.jpg";
import "./Detailsimg.css";
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
    <div className="z-20">
      <div className="flex ">
        <img src={image1} alt="Ankit" onClick={toggleModal} className="flex h-60 w-60 sm:h-24 sm:w-24"/>
          </div>
            {modalOpen && (
              <div className="modal">
                <span className="close" onClick={toggleModal}>
                  &times;
                </span>
                <img src={image1} alt="Ankit" className="items-center auto-square w-80 h-96 mt-32 m-auto sm:w-80 sm:ml-10"/>
              </div>
            )}
    </div>
  );
};

export default Detailsimg;
