import logo from "./assets/seoro-library_logo.png";
import CustomLoading from "./component/CustomLoading";
import ShareBtn from "./function/ShareBtn";
import { useState } from "react";
import Toast from "./function/Toast";

const Step3 = ({ masterData, userData, loading, masterlist }) => {
  const [toast, setToast] = useState(false);
  const handleCopyClick = async () => {
    try {
      // Copy the address to the clipboard
      await navigator.clipboard.writeText(
        "https://gpdnjs70754.github.io/matchbook/"
      );
      setToast(true);
      console.log(
        "Address copied to clipboard:",
        "https://gpdnjs70754.github.io/matchbook/"
      );
    } catch (err) {
      console.error("Unable to copy address to clipboard:", err);
    }
  };
  return (
    <div className="step3-div">
      <img className="small-logo" src={logo} alt="Logo" />

      {loading ? (
        <div className="loading-box">
          <CustomLoading />
          <p>결과를 계산중이에요..!</p>
        </div>
      ) : (
        <div className="result-box">
          <img src={masterData[0][1]} alt="" className="master-profile" />
          <p>
            당신의 서재는{" "}
            <span style={{ fontWeight: "bold" }}>{masterData[0][0]}</span>의
            서재와 비슷하네요!
          </p>
          <p>
            {masterData[0][0]} 추천도서{" "}
            <span style={{ fontWeight: "bold" }}>{masterData[0][2]}</span>권 중{" "}
            <span style={{ fontWeight: "bold" }}>{masterData[1]}</span>
            권의 도서를 선택했어요.
          </p>
          <br />
          <br />
          <p>[내가 선택한 책]</p>

          <div className="user-select-box">
            <hr className="hairline" />
            {userData.map((item, index) => (
              <p key={index}>
                <span style={{ fontWeight: "bold" }}>• {item["제목"]}</span> |
                추천인:{" "}
                {(() => {
                  let recommenderArray = [];

                  const subArray = item["추천인"];

                  for (let j = 0; j < subArray.length; j++) {
                    const masterName = masterlist[subArray[j]];
                    recommenderArray.push(masterName);
                  }

                  return recommenderArray.join(", "); // Joining array elements into a string
                })()}
              </p>
            ))}
          </div>
        </div>
      )}

      <a href="https://seoro-library.softr.app/" className="btn">
        더 많은 추천 보러가기
      </a>
      <div className="twobtn">
        <a
          href="https://gpdnjs70754.github.io/matchbook/"
          className="btn white"
        >
          다시 하기
        </a>
        <div>
          <div onClick={handleCopyClick} className="btn white">
            공유하기
          </div>
        </div>
        {/* <ShareBtn /> */}
      </div>
      {toast && <Toast setToast={setToast} text="링크가 복사되었습니다." />}
    </div>
  );
};

export default Step3;
