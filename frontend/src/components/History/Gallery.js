import React from 'react';
import { useMediaQuery } from 'react-responsive';
import ImageSlider from './ImageSlider';

const Gallery = ({ images }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

  const containerStyles = {
    width: isMobile ? '240px' : '500px',
    height: isMobile ? '250px' : '500px',
    margin: 'auto',
  };

  // Reverse the received array and map it to the required format
  const slides = images.slice().reverse().map(img => ({
    url: img.src,
    title: img.alt || 'Unknown', // Use alt text as title if available
  }));

  return (
    <div className='mt-14'>
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
    </div>
  );
};

export default Gallery;
