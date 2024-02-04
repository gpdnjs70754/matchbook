import React from "react";
import "../css/BookSlide.css"; // Import the CSS file with styles

const BookSlide = ({ images }) => {
  return (
    <div className="image-flow-container">
      <div className="twobtn">
        <div className="image-flow-wrapper">
          {images.map((image, index) => (
            <img
              key={index}
              src={image["교보표지"]}
              alt={`${index}`}
              className="image-flow-item"
            />
          ))}
        </div>
        <div className="image-flow-wrapper">
          {images.map((image, index) => (
            <img
              key={index}
              src={image["교보표지"]}
              alt={`${index}`}
              className="image-flow-item"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookSlide;
