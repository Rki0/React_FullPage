import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Home from "./pages/Home";
import LeftLogo from "./pages/LeftLogo";
import RightLogo from "./pages/RightLogo";
import ScrollNav from "./components/ScrollNav";

function App() {
  // 페이지 위치에 따라 scrollIndex를 설정. nav에 현재 페이지를 표시하기 위해 사용.
  const [scrollIndex, setScrollIndex] = useState(1);

  // 현재 스크롤 위치를 저장하기 위해 사용.
  const [scrollY, setScrollY] = useState(0);

  // 페이지 하나의 높이를 변수에 저장 == 100vh
  const pageHeight = window.innerHeight;

  const handleFollow = () => {
    // 현재 스크롤 위치를 scrollY에 저장
    setScrollY(window.pageYOffset);
    // setScrollY(window.scrollY);

    // 스크롤 위치에 따라 scrollIndex 설정
    // scrollIndex를 6으로 설정하는 과정에서 계속 5까지밖에 인식을 못하는 상황이 발생
    // 이유를 아무리 찾아봐도 안나와서 추론해본 결과...페이지 당 범위를 너무 칼같이 정해놓은게 아닐까 생각됨
    // 6페이지의 상단이 5*pageHeight 이므로 이 값이 아무래도 딱 떨어지지 못하는 상황이지 않았을까...
    // 그래서 5페이지와 6페이지는 각각을 인식하는 범위를 50씩 줄여서, 5페이지가 끝나기 50px 전부터 6페이지로 인식하도록 설정했다.
    // 50씩 줄여도 동작하긴 하는데, 버벅일 때가 있어서 100까지 늘렸다.
    if (scrollY >= 0 && scrollY < pageHeight) {
      setScrollIndex(1);
    } else if (scrollY >= pageHeight && scrollY < pageHeight * 2) {
      setScrollIndex(2);
    } else if (scrollY >= pageHeight * 2 && scrollY < pageHeight * 3) {
      setScrollIndex(3);
    } else if (scrollY >= pageHeight * 3 && scrollY < pageHeight * 4) {
      setScrollIndex(4);
    } else if (scrollY >= pageHeight * 4 && scrollY < pageHeight * 5 - 100) {
      setScrollIndex(5);
    } else if (scrollY >= pageHeight * 5 - 100 && scrollY < pageHeight * 6) {
      setScrollIndex(6);
    }
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    };

    watch();

    return () => {
      window.removeEventListener("scroll", handleFollow);
    };
  });

  return (
    <TopDiv>
      <ScrollNav scrollIndex={scrollIndex} />

      <StyledBox>
        <div className="container">
          <div id="page-1">
            <Home />
          </div>
          <div id="page-2">
            <LeftLogo
              img="/assets/BERA.png"
              comp="Beskin Robbins"
              period="2016.12 ~ 2017.06"
              text="느낀점을 써봅시다"
            />
          </div>
          <div id="page-3">
            <RightLogo
              img="/assets/SEVEN.png"
              comp="Seven Eleven"
              period="2017.07 ~ 2017.09"
              text="느낀점을 써봅시다"
            />
          </div>
          <div id="page-4">
            <LeftLogo
              img="/assets/SPAO.svg"
              comp="SPAO"
              period="2019.09 ~ 2020.03"
              text="느낀점을 써봅시다"
            />
          </div>
          <div id="page-5">
            <RightLogo
              img="/assets/CAFE.png"
              comp="CAFE TAIN"
              period="2021.07 ~ 2022.05"
              text="느낀점을 써봅시다"
            />
          </div>
          <div id="page-6">
            <LeftLogo
              img="/assets/ACADEMY.png"
              comp="Parallax Academy"
              period="2022.05 ~ Now"
              text="느낀점을 써봅시다"
            />
          </div>
        </div>
      </StyledBox>
    </TopDiv>
  );
}

export default App;

// nav의 위치를 조절하기 위한 전체 div 설정
const TopDiv = styled.div`
  position: relative;
`;

const StyledBox = styled.div`
  .container {
    font-size: 50px;
    font-weight: bold;

    // height를 100%로 설정해야 스크롤 위치값 관련 코드들이 동작..!!
    // 문제는 %로 바꿨더니, 한 페이지씩 넘어가던게, 일반 스크롤처럼 동작하는걸로 돌아옴..
    // height: 100vh;
    height: 100%;
    scroll-behavior: smooth;
    scroll-snap-type: y mandatory;
    overflow: scroll;
  }

  .container::-webkit-scrollbar {
    display: none;
  }

  .container > div {
    scroll-snap-align: start;
  }
`;
