import React, { useState, useEffect } from "react";
import fetchData from "./api";
import Loading from "react-loading";
import "./App.css";
import countRecommender from "./matchingLogic";
import logo from "./assets/booksfrom_logo.png";
import Step3 from "./Step3";
import BookSlide from "./comfonent/BookSlide";
import CustomLoading from "./comfonent/\bCustomLoading";
import checkedImg from "./assets/checkd.png";

const App = () => {
  const [step, setStep] = useState(1);
  const [imgStep, setImgStep] = useState(1);
  const [data, setData] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading2, setLoading2] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [matchRate, setMatchRate] = useState(0);
  const [slideImg, setSlideImg] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      // Fetch data only when the "Start" button is clicked
      if (step === 2) {
        setLoading2(true);
        const airtableData = await fetchData();
        // console.log(airtableData);
        setData(airtableData);
        setLoading2(false);
      }
    };
    const fetchInitialImg = async () => {
      setLoading1(true);
      const imgData = await fetchData();
      setSlideImg(imgData);
      setLoading1(false);
    };
    fetchInitialImg();
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
    }
  };

  const handleSubmit = async () => {
    const calculatedMatchRate = await countRecommender(selectedImages);
    setMatchRate(calculatedMatchRate);

    // Move to step 3
    setStep(3);
  };

  return (
    <div className="App">
      <header className="App-header">
        {step === 1 && (
          <div>
            <img className="logo" src={logo} alt="Logo" />
            <p>나는 누구와 가장 비슷한 책 취향을 가지고 있을까요?</p>
            <div className="step1-img-box">
              {loading1 ? <CustomLoading /> : <BookSlide images={slideImg} />}
            </div>

            <button className="btn" onClick={handleStart}>
              Start
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="step2-div">
            <img className="small-logo" src={logo} alt="Logo" />

            <p>읽었거나 읽고 싶었던 책을 모두 골라주세요.</p>
            {loading2 ? (
              <CustomLoading />
            ) : (
              <div className="image-grid">
                {data
                  // .slice((imgStep - 1) * 4, imgStep * 4)
                  .map((item, index) => (
                    <div key={index} className="img-box">
                      <img
                        className={
                          selectedImages.includes(item["추천인"])
                            ? "selected-img"
                            : null
                        }
                        src={item["표지 링크"]}
                        alt={item.Description}
                        onClick={() => handleImageSelect(item["추천인"])}
                      />
                      {selectedImages.includes(item["추천인"]) ? (
                        <img
                          className="img-checked"
                          src={checkedImg}
                          alt=""
                          onClick={() => handleImageSelect(item["추천인"])}
                        />
                      ) : null}
                    </div>
                  ))}
              </div>
            )}

            {/* {imgStep < 6 ? (
              <button className="btn" onClick={handleImgNext}>
                Next
              </button>
            ) : ( */}
            <button className="btn" onClick={handleSubmit}>
              결과보기
            </button>
            {/* )} */}
          </div>
        )}

        {step === 3 && (
          <>
            <Step3 matchRate={matchRate} />
          </>
        )}
      </header>
    </div>
  );
};

export default App;
