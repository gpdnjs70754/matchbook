import React, { useEffect, useState } from "react";
import "../css/Loading.css"; // Import the CSS file with styles
import load1 from "../assets/loading1.png";
import load2 from "../assets/loading2.png";
import load3 from "../assets/loading3.png";
import load4 from "../assets/loading4.png";

const CustomLoading = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const loadImg = [load1, load2, load3, load4];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 200); // Change image every 0.5 seconds

    return () => clearInterval(intervalId);
  }, 4);

  return (
    <div className="image-slider-container">
      <img
        src={loadImg[currentImageIndex]}
        alt={`Image ${currentImageIndex + 1}`}
        className="current-image"
      />
    </div>
  );
};

export default CustomLoading;
