import { useState } from "react";


const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };



  return (


    <div className="img-slider">
      <button onClick={goToPrevious} className='rightArrowStyles'>
        ❰
      </button>
      <div><img src={slides[currentIndex].url} alt="slide" className="img-size" /></div>

      <button onClick={goToNext} className="rightArrowStyles">
        ❱
      </button>
      <div className="dot-container" >
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
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

