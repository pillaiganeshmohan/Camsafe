import React, { useState, useEffect } from "react";
import snowtops from "../../assets/Samiktha.jpg";
import lights from "../../assets/Jannat.jpg";
import mountains1 from "../../assets/Priyanshi.jpg";

const Gallery = () => {
  const [slideIndex, setSlideIndex] = useState(1);

  useEffect(() => {
    showDivs(slideIndex);
  }, [slideIndex]);

  function plusDivs(n) {
    setSlideIndex((prevIndex) => prevIndex + n);
  }

  function showDivs(n) {
    let i;
    const x = document.getElementsByClassName("mySlides");
    if (n > x.length) setSlideIndex(1);
    if (n < 1) setSlideIndex(x.length);
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "block";
  }

  return (
    <div className="w-full flex justify-center mt-16">
      <div className="w-full md:w-3/4 lg:w-1/2 relative">
        <div className="mySlides">
          <img src={snowtops} alt="French Alps" className="items-center auto-square w-80 h-96 ml-52 sm:w-80 sm:ml-0" />
          <div className="flex flex-col bg-transparent items-center  text-white text-lg p-4">
                    <p className="mb-4">Location:</p>
                    <p className="mb-4">Percentage:</p>
                    <p className="mb-4">Longitude & Latitude:</p>
                    <p className="mb-4">Date & Day:</p>
          </div>
        </div>

        <div className="mySlides hidden">
          <img src={lights} alt="Northern Lights" className="items-center auto-square w-80 h-96 ml-52 sm:w-80 sm:ml-0" />
          <div className="flex flex-col bg-transparent items-center  text-white text-lg p-4">
                    <p className="mb-4">Location:</p>
                    <p className="mb-4">Percentage:</p>
                    <p className="mb-4">Longitude & Latitude:</p>
                    <p className="mb-4">Date & Day:</p>
          </div>
        </div>

        <div className="mySlides hidden">
          <img src={mountains1} alt="Beautiful Mountains" className="items-center auto-square w-80 h-96 ml-52 sm:w-80 sm:ml-0" />
          <div className="flex flex-col bg-transparent items-center  text-white text-lg p-4">
                    <p className="mb-4">Location:</p>
                    <p className="mb-4">Percentage:</p>
                    <p className="mb-4">Longitude & Latitude:</p>
                    <p className="mb-4">Date & Day:</p>
          </div>
        </div>
        <button className="w-10 h-10 absolute top-1/4 -left-8 bg-white text-black flex items-center justify-center" onClick={() => plusDivs(-1)}>&#10094;</button>
        <button className="w-10 h-10 absolute top-1/4 -right-8 bg-white text-black flex items-center justify-center" onClick={() => plusDivs(1)}>&#10095;</button>
      </div>
    </div>
  );
};

export default Gallery;
