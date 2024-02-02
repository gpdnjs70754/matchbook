import logo from "./booksfrom_logo.png";
import ShareBtn from "./function/ShareBtn";

const Step3 = ({ matchRate }) => {
  return (
    <>
      <img className="small-logo" src={logo} alt="Logo" />
      <h1>Results</h1>

      <p>당신의 서재는 {matchRate}의 서재와 비슷하네요!</p>
      <p>{matchRate} 추천도서 중 n개의 도서를 선택했어요.</p>
      <a href="https://bookmaster.softr.app/" className="btn">
        더 많은 추천 보러가기
      </a>
      <div className="twobtn">
        <a href="https://bookmaster.softr.app/" className="btn white">
          다시 하기
        </a>
        <ShareBtn />
      </div>
    </>
  );
};

export default Step3;
