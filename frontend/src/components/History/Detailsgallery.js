import React, { useState } from "react";
import "./Detailsimg.css";
import Gallery from "../History/Gallery";

const Detailsgallery = ({ images }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="z-50">
      <div className="flex w-full">
        {images.length > 0 && (
          <img
            src={images[images.length-1].src}
            alt={images[images.length-1].alt}
            onClick={toggleModal}
            className="flex h-60 w-60 sm:h-24 sm:w-24 cursor-pointer"
          />
        )}
      </div>
      {modalOpen && (
        <div className="modal">
          <span className="close" onClick={toggleModal}>&times;</span>
          <Gallery images={images} />
        </div>
      )}
    </div>
  );
};

export default Detailsgallery;
