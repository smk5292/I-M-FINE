import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import CustomSlider from "./CustomSlider";

function MySlider({ paramName, paramDesc, onSliderChange, modelName, min, max }) {
  const handleSliderChange = (_, newValue) => {
    // Slider 값이 변경될 때 호출되는 콜백 함수
    onSliderChange(paramName, newValue);
  };

  const sliderStyle = {
    marginTop: "1em", // 여기에 마진 값을 설정하세요.
    display: "flex",
    // flex: '2',
    marginLeft: "10em",
    marginRight: "10em",
    alignItems: "center",
  };

  const paramStyle = {
    fontFamily: "bmFont",
    fontSize: "3.5em",
    color: "white",
    flex: "1",
    marginRight: "2em",
  };

  const sliderTextStyle = {
    fontFamily: "bmFont",
    color: "white",
    textAlign: "center",
    marginTop: "1.5em",
  };

  return (
    <div style={{ marginBottom: "3em" }}>
      <div style={sliderStyle}>
        <div style={paramStyle}>{paramName}</div>
        <div>
          <CustomSlider
            data={modelName}
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            defaultValue={max/2}
            min={min}
            max={max}
            step={0.05}
            onChange={handleSliderChange}
          />
        </div>
      </div>
      <div style={sliderTextStyle}>
        <h4>{paramDesc}</h4>
      </div>
    </div>
  );
}

const Parameter = () => {
  const location = useLocation();
  const data = location.state.data;
  const [isVisible, setIsVisible] = useState(false);
  const [inputText, setInputText] = useState("");

  const curIdx = data === "GPT" ? 0 : data === "LLAMA" ? 1 : 2;

  const params = [
    ["EPS", "ATTN", "MLP"],
    ["ATTN", "MLP"],
    ["TONE", "STYLE", "REGION"],
  ];

  const paramDescs = [
    [
      "높을수록 데이터 의존성 증가",
      "높을수록 단어 간 순서 의존성 증가",
      "높을수록 단어간 연관성 증가",
    ],
    [
      "높을수록 데이터 의존성 증가",
      "높을수록 단어 간 순서 의존성 증가",      
    ],
    [
      "높을수록 색감이 선명해짐",
      "높을수록 입체적으로 변함",
      "높을수록 서양풍이 강해짐",
    ],
  ];

  const [sliderValues, setSliderValues] = useState(
    new Array(params[curIdx].length).fill(1.0)
  );

  const handleSliderChange = (paramName, newValue) => {
    setSliderValues((prevValues) => {
      const index = params[curIdx].indexOf(paramName);
      if (index !== -1) {
        const newValues = [...prevValues];
        newValues[index] = newValue;
        console.log(newValues);
        return newValues;
      }
      return prevValues;
    });
  };

  useEffect(() => {
    setIsVisible(true);
  }, [curIdx]);

  const containerStyle = {
    display: "flex",
    flex: 3, // 3 부분을 차지하도록 설정
    height: "100vh", // 화면 전체 높이로 설정
    alignItems: "center", // 수평 중앙 정렬
    flexDirection: "column", // 세로 방향으로 나눔
  };

  const topPaneStyle = {
    flex: 1, // 1:2 비율로 나누기 위해 flex 속성 사용
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%", // 부모 컨테이너의 높이를 100%로 설정합니다.
    // overflow: "auto", // 내용이 넘칠 경우 스크롤 가능하도록 설정
  };

  const bottomPaneStyle = {
    flex: 2,
    width: "100%",
    flexDirection: "column",
    overflow: "auto",
    paddingTop: "1.2em",
    opacity: isVisible ? 1 : 0,
    transition: "opacity 1s",
  };

  const headingStyle = {
    color: "white", // 텍스트 색상을 파란색으로 변경
    fontFamily: "hyundaiFont", // 폰트를 Arial로 설정
    fontSize: "3.5em", // 폰트 크기를 24px로 설정
  };

  const arrowStyle = {
    flex: 1, // 1 부분을 차지하도록 설정
    textAlign: "center",
  };

  return (
    <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
      <div style={arrowStyle}>
        <Link to="/choose">
          <img
            src="/arrow_img.png"
            alt="좌측 화살표"
            style={{ transform: "scaleX(-1)" }}
          />
        </Link>
      </div>
      <div style={containerStyle}>
        <div style={topPaneStyle}>
          <h1 style={headingStyle}>{data} 파라미터 조정</h1>
          {data !== "Stable Diffusion" && (
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="텍스트를 입력하시면 변화된 결과를 보여드립니다."
              style={{
                width: "100%",
                boxSizing: "border-box",
                marginTop: "1em",
              }}
            />
          )}
        </div>
        <div class="scroll-hide" style={bottomPaneStyle}>
          {params[curIdx].map((param, index) => (
            <MySlider
              modelName={data}
              paramName={param}
              paramDesc={paramDescs[curIdx][index]}
              onSliderChange={handleSliderChange}
              min={data === 'Stable Diffusion' ? 0.0 : 0.1}
              max={data === 'Stable Diffusion' ? 1.0 : 2.0}
            />
          ))}
        </div>
      </div>
      <div style={arrowStyle}>
        <Link to="/Modelify" state={{ sliderValues, data, inputText }}>
          <img src="/arrow_img.png" alt="우측 화살표" />
        </Link>
      </div>
    </div>
  );
};

export default Parameter;
