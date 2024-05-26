import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const slideStyles = {
  width: '100%',
  height: '100%',
  borderRadius: '10px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const arrowStyles = baseStyles => ({
  ...baseStyles,
  position: 'absolute',
  top: '50%',
  transform: 'translate(0, -50%)',
  fontSize: '45px',
  color: '#fff',
  zIndex: 1,
  cursor: 'pointer',
});

const sliderStyles = {
  position: 'relative',
  height: '100%',
};

const dotsContainerStyles = {
  display: 'flex',
  justifyContent: 'center',
};

const dotStyle = {
  margin: '0 3px',
  cursor: 'pointer',
  fontSize: '20px',
};

const ImageSlider = ({ slides = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

  if (slides.length === 0) {
    return <div style={sliderStyles} className='text-white flex items-center justify-center text-5xl'>No slides available</div>;
  }

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    setCurrentIndex(isFirstSlide ? slides.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    setCurrentIndex(isLastSlide ? 0 : currentIndex + 1);
  };

  const goToSlide = slideIndex => {
    setCurrentIndex(slideIndex);
  };

  const slideStylesWithBackground = {
    ...slideStyles,
    backgroundImage: `url(${slides[currentIndex].url})`,
  };

  const leftArrowStyles = arrowStyles({
    left: isMobile ? '-50px' : '-40%',
  });

  const rightArrowStyles = arrowStyles({
    right: isMobile ? '-50px' : '-40%',
  });

  return (
    <div style={sliderStyles}>
      <div onClick={goToPrevious} style={leftArrowStyles}>
        ❰
      </div>
      <div onClick={goToNext} style={rightArrowStyles}>
        ❱
      </div>
      <div style={slideStylesWithBackground}></div>
      <div style={dotsContainerStyles}>
        {slides.map((_, slideIndex) => (
          <div
            key={slideIndex}
            style={dotStyle}
            onClick={() => goToSlide(slideIndex)}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
