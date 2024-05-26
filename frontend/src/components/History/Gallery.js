import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import ImageSlider from './ImageSlider';

function Gallery() {
  const [slides, setSlides] = useState([]);
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

  const containerStyles = {
    width: isMobile ? '240px' : '500px',
    height: isMobile ? '250px' : '500px',
    margin: 'auto',
  };
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
    <div className='mt-14'>
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
    </div>
  );
}

export default Gallery;
