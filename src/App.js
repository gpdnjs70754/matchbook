import React, { useState, useEffect } from "react";
import fetchData from "./api";
import Loading from "react-loading";
import "./App.css";
import countRecommender from "./matchingLogic";

const App = () => {
  const [step, setStep] = useState(1);
  const [imgStep, setImgStep] = useState(1);
  const [data, setData] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [matchRate, setMatchRate] = useState(0);

  useEffect(() => {
    const fetchInitialData = async () => {
      // Fetch data only when the "Start" button is clicked
      if (step === 2) {
        setLoading(true);
        const airtableData = await fetchData();
        console.log(airtableData);
        setData(airtableData);
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [step]);

  const handleStart = () => {
    setStep(2);
  };

  const handleImgNext = () => {
    setImgStep(imgStep + 1);
  };

  const handleImageSelect = (imageUrl) => {
    // Toggle selection
    const isSelected = selectedImages.includes(imageUrl);
    if (isSelected) {
      setSelectedImages(selectedImages.filter((url) => url !== imageUrl));
    } else {
      setSelectedImages([...selectedImages, imageUrl]);
      // console.log(imageUrl);
    }
  };

  const handleSubmit = async () => {
    const calculatedMatchRate = await countRecommender(selectedImages);
    setMatchRate(calculatedMatchRate);

    // Move to step 3
    setStep(3);
  };

  const Step3 = () => {
    return (
      <>
        <h1>Results</h1>
        <p>Your selected images:</p>
        <div className="image-grid">
          {selectedImages.map((imageUrl, index) => (
            <div key={index}>
              <img
                src={imageUrl}
                alt={`Selected ${index + 1}`}
                onClick={() => handleImageSelect(imageUrl)}
              />
            </div>
          ))}
        </div>
        <p>Match rate: match: {matchRate}</p>
      </>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        {step === 1 && (
          <>
            <h1>Image Selection App</h1>
            <p>Choose the images that match your preferences.</p>
            <button onClick={handleStart} disabled={loading}>
              {loading ? "Loading..." : "Start"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h1>Choose Images</h1>
            <p>Select 4 images that match your preferences.</p>
            <div className="image-grid">
              {data.slice((imgStep - 1) * 4, imgStep * 4).map((item) => (
                <div key={item["제목"]}>
                  <img
                    src={item["표지 링크"]}
                    alt={item.Description}
                    onClick={() => handleImageSelect(item["추천인"])}
                  />
                </div>
              ))}
            </div>
            {imgStep < 6 ? (
              <button onClick={handleImgNext}>Next</button>
            ) : (
              <button onClick={handleSubmit}>Submit</button>
            )}
          </>
        )}

        {step === 3 && (
          <>
            <Step3 />
          </>
        )}

        {loading && (
          <div>
            <Loading type="spin" color="#000" height={50} width={50} />
            <p>Matching images, please wait...</p>
          </div>
        )}
      </header>
    </div>
  );
};

export default App;
