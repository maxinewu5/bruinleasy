import React, { useState } from "react";
import "./Property.css";

const leftArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  borderRadius: "50%",
  height: "50px",
  paddingRight: "10px",
  paddingLeft: "10px",
  paddingBottom: "8px",
  left: "22px",
  justifyContent: "center",
  fontSize: "45px",
  color: "#FFD77B",
  zIndex: 1,
  cursor: "pointer",
  backgroundColor: "#162031"
};

const rightArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  borderRadius: "50%",
  height: "50px",
  paddingRight: "10px",
  paddingLeft: "10px",
  paddingBottom: "8px",
  right: "22px",
  justifyContent: "center",
  fontSize: "45px",
  color: "#FFD77B",
  zIndex: 1,
  cursor: "pointer",
  backgroundColor: "#162031"
};

const ImageSlider = ({ slides }) => {
const [currentIndex, setCurrentIndex] = useState(0);
  if(slides.length <= 1)
  {
    return (
        <img className = "property_img_inside" src={slides[currentIndex]} alt="Slide" />
    )
  }
  else{

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
  return (
    <React.Fragment>
      <div style={leftArrowStyles} onClick={goToPrevious}>
        ↩
      </div>
      <div style={rightArrowStyles} onClick={goToNext}>
        ↪
      </div>
        <img className = "property_img_inside" src={slides[currentIndex]} alt="Slide" />
    </React.Fragment>
  );
};
}

export default ImageSlider;
