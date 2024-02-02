import React from "react";

const CopyAddressComponent = () => {
  const handleCopyClick = async () => {
    try {
      // Copy the address to the clipboard
      await navigator.clipboard.writeText(
        "https://gpdnjs70754.github.io/matchbook/"
      );
      console.log(
        "Address copied to clipboard:",
        "https://gpdnjs70754.github.io/matchbook/"
      );
    } catch (err) {
      console.error("Unable to copy address to clipboard:", err);
    }
  };

  return (
    <div>
      <div onClick={handleCopyClick} className="btn white">
        공유하기
      </div>
    </div>
  );
};

export default CopyAddressComponent;
