import React, { useState, useEffect } from "react";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://via.placeholder.com/1600x900",
    "https://via.placeholder.com/1600x900",
    "https://via.placeholder.com/1600x900",
    "https://via.placeholder.com/1600x900",
    "https://via.placeholder.com/1600x900",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="carousel">
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide}
          alt={`Slide ${index}`}
          style={{
            display: index === currentSlide ? "block" : "none",
            width: "100%",
            height: "auto",
            aspectRatio: "16 / 9",
          }}
        />
      ))}
    </div>
  );
};

export default Carousel;
