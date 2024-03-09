import React, { useState, useEffect } from "react";
import fetchData, { fetchImgData } from "./api";
import "./App.css";
import countRecommender from "./matchingLogic";
import logo from "./assets/seoro-library_logo.png";
import Step3 from "./Step3";
import BookSlide from "./component/BookSlide";
import CustomLoading from "./component/CustomLoading";
import checkedImg from "./assets/checkd.png";
import userSelect from "./userSelect";
import { Helmet } from "react-helmet-async";

const App = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading2, setLoading2] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [matchRate, setMatchRate] = useState(0);
  const [slideImg, setSlideImg] = useState([]);
  const [masterlist, setMasterlist] = useState({});

  // 최초 실행 시 불러오는 기능
  useEffect(() => {
    const fetchInitialData = async () => {
      // Fetch data only when the "Start" button is clicked
      if (step === 2) {
        setLoading2(true);
        const airtableData = await fetchData();

        setData(airtableData);
        setLoading2(false);
      }
    };
    const fetchInitialImg = async () => {
      if (step === 1) {
        setLoading1(true);
        const imgData = await fetchImgData();
        setSlideImg(imgData);
        setLoading1(false);
      }
    };
    fetchInitialImg();
    fetchInitialData();
  }, [step]);

  const handleStart = () => {
    setStep(2);
  };

  // const handleImgNext = () => {
  //   setImgStep(imgStep + 1);
  // };

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
    // Move to step 3
    setStep(3);
    setLoading3(true);

    //결과 계산하기
    const calculatedMatchRate = await countRecommender(selectedImages, data);
    setMatchRate(calculatedMatchRate);
    setMasterlist(await userSelect(selectedImages));

    // loading3 completed
    setLoading3(false);
  };

  return (
    <div className="App">
      {/* <Helmet>
        <title>서로의서재</title>
        <meta
          property="og:description"
          content="나의 서재는 누구와 가장 비슷할까요?"
        />
        <meta property="og:image" content={logo} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://gpdnjs70754.github.io/matchbook/"
        />
      </Helmet> */}
      <header className="App-header">
        {step === 1 && (
          <div className="step1-div">
            <img className="logo" src={logo} alt="Logo" />
            <p>나는 누구와 가장 비슷한 책 취향을 가지고 있을까요?</p>
            <div className="step1-img-box">
              {loading1 ? <CustomLoading /> : <BookSlide images={slideImg} />}
            </div>

            <button className="btn" onClick={handleStart}>
              책 고르러가기
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
                          selectedImages.includes(item) ? "selected-img" : null
                        }
                        src={item["표지 링크"]}
                        alt={item.Description}
                        onClick={() => handleImageSelect(item)}
                      />
                      {selectedImages.includes(item) ? (
                        <img
                          className="img-checked"
                          src={checkedImg}
                          alt=""
                          onClick={() => handleImageSelect(item)}
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
            <button className="btn step2" onClick={handleSubmit}>
              결과보기
            </button>
            {/* )} */}
          </div>
        )}

        {step === 3 && (
          <>
            <Step3
              loading={loading3}
              masterData={matchRate}
              userData={selectedImages}
              masterlist={masterlist}
            />
          </>
        )}
      </header>
    </div>
  );
};

export default App;
