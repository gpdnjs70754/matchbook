import logo from "./assets/booksfrom_logo.png";
import ShareBtn from "./function/ShareBtn";

const Step3 = ({ masterData }) => {
  return (
    <div className="step3-div">
      <img className="small-logo" src={logo} alt="Logo" />

      <img src={masterData[0][1]} alt="" className="master-profile" />
      <p>
        당신의 서재는{" "}
        <span style={{ fontWeight: "bold" }}>{masterData[0][0]}</span>의 서재와
        비슷하네요!
      </p>
      <p>
        {masterData[0][0]} 추천도서{" "}
        <span style={{ fontWeight: "bold" }}>{masterData[0][2]}</span>권 중{" "}
        <span style={{ fontWeight: "bold" }}>{masterData[1]}</span>
        권의 도서를 선택했어요.
      </p>
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
