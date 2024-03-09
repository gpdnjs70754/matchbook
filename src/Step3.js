import logo from "./assets/seoro-library_logo.png";
import CustomLoading from "./component/CustomLoading";
import ShareBtn from "./function/ShareBtn";

const Step3 = ({ masterData, userData, loading, masterlist }) => {
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
          <h4>내가 선택한 책</h4>
          <div className="user-select-box">
            {userData.map((item, index) => (
              <p key={index}>
                {item["제목"]} | 추천인:{" "}
                {(() => {
                  let recommenderArray = [];

                  const subArray = item["추천인"];
                  console.log(subArray);
                  console.log(masterlist);

                  for (let j = 0; j < subArray.length; j++) {
                    console.log(subArray[j]);
                    const masterName = masterlist[subArray[j]];
                    console.log(masterName);
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
        <ShareBtn />
      </div>
    </div>
  );
};

export default Step3;
