import React, { useEffect, useState, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
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

  // 컴포넌트 dom에 접근하기 위한 ref
  const scrollRef = useRef(null);

  useEffect(() => {
    // ref로 가져온 element가 렌더링 전이라면 실행 안 함.
    // useEffect로 scrollRef.current를 보고 있으므로 return 된다고해서 문제되지는 않음
    // 문제 발생! scrollRef.current를 봤더니, 컴포넌트 렌더링 완료 시점부터는 동작을 안해서
    // scrollY가 업데이트 되지 않는 문제가 있었음. 그래서 재랜더링마다 실행하는 걸로 변경!
    if (!scrollRef.current) return;

    window.addEventListener("scroll", handleFollow);

    return () => {
      window.removeEventListener("scroll", handleFollow);
    };
  });

  const handleFollow = () => {
    // top에서부터 얼마나 떨어졌는지 얻기 위해 ref를 활용한 getBoundingClientRect()
    // width, height 등등
    const scroll = scrollRef.current.getBoundingClientRect();

    // getBoundingClientRect()의 top, y값은 음수로 나오기 때문에 -1을 곱함
    setScrollY(scroll.top * -1);

    // 스크롤 위치에 따라 scrollIndex 설정
    // scrollIndex를 6으로 설정하는 과정에서 계속 5까지밖에 인식을 못하는 상황이 발생
    // 이유를 아무리 찾아봐도 안나와서 추론해본 결과...페이지 당 범위를 너무 칼같이 정해놓은게 아닐까 생각됨
    // 6페이지의 상단이 5*pageHeight 이므로 이 값이 아무래도 딱 떨어지지 못하는 상황이지 않았을까...
    // 그래서 5페이지와 6페이지는 각각을 인식하는 범위를 50씩 줄여서, 5페이지가 끝나기 50px 전부터 6페이지로 인식하도록 설정했다.
    // 50씩 줄여도 동작하긴 하는데, 버벅일 때가 있어서 100까지 늘렸다.
    // 문제 발생!
    // 의도한 기능을 모두 정상 작동 시킨 뒤에 알게된 것인데
    // 페이지 하나가 스크롤 될 때 scrollY가 719.5 이런식으로 pageHeight에 약간 모자르게 끝남
    // 그로 인해서, scrollNav가 한 칸씩 밀려서 작동하는 것처럼 보임...
    // 범위에 약간의 수정이 필요할 것 같음. pageHeight - 10 정도로 하면 충분할 것으로 예상
    // 조금 더 나은 UX를 위해서 매끄러운 느낌을 줄 필요가 있음. 지금은 너무 페이지가 완전 바뀌기 직전에 nav가 변경됨.
    // 10에서 100정도로 키우자.
    if (scrollY >= 0 && scrollY < pageHeight - 100) {
      setScrollIndex(1);
    } else if (scrollY >= pageHeight - 100 && scrollY < pageHeight * 2 - 100) {
      setScrollIndex(2);
    } else if (
      scrollY >= pageHeight * 2 - 100 &&
      scrollY < pageHeight * 3 - 100
    ) {
      setScrollIndex(3);
    } else if (
      scrollY >= pageHeight * 3 - 100 &&
      scrollY < pageHeight * 4 - 100
    ) {
      setScrollIndex(4);
    } else if (
      scrollY >= pageHeight * 4 - 100 &&
      scrollY < pageHeight * 5 - 100
    ) {
      setScrollIndex(5);
    } else if (scrollY >= pageHeight * 5 - 100 && scrollY < pageHeight * 6) {
      setScrollIndex(6);
    }
  };

  return (
    <TopDiv ref={scrollRef}>
      <GlobalStyle />
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
              text="성인이 되어 했던 첫 아르바이트이자, 첫 서비스업이었다. 학업과 병행하면서 했는데, 이를 통해 학업과 아르바이트에 어떻게 시간을 분배해야할지 잘 알게 되었다. 첫 알바이다보니, 내가 어떤 동료를 선호하고, 어떤 일처리 방식을 선호하는지도 알게되었다."
            />
          </div>
          <div id="page-3">
            <RightLogo
              img="/assets/SEVEN.png"
              comp="Seven Eleven"
              period="2017.07 ~ 2017.09"
              text="방학 기간에 해봤던 편의점 아르바이트는 말그대로 지옥이었다. 화장실도 없고, 야간 시간이라 취객도 정말 많았다. 이 때, 서비스 정신을 극한까지 단련했다고 생각한다. 재고 관리도 해보면서 시스템이 어떻게 돌아가는지 직접 경험해보는 것도 재미있었다."
            />
          </div>
          <div id="page-4">
            <LeftLogo
              img="/assets/SPAO.svg"
              comp="SPAO"
              period="2019.09 ~ 2020.03"
              text="군 전역 직후 시작했던 아르바이트여서 그런지 동료나 손님에게 서비스면에서 칭찬을 많이 받았다. 이전까지의 알바들과는 다르게 팀 단위로 동료들이 있었고, 지금까지의 알바 중 사회생활 기술을 가장 많이 늘릴 수 있었던 아르바이트였다."
            />
          </div>
          <div id="page-5">
            <RightLogo
              img="/assets/CAFE.png"
              comp="CAFE TAIN"
              period="2021.07 ~ 2022.05"
              text="경력이 없는 상태로 지원했던 카페였다. 항상 해보고싶었던 아르바이트라서 지원은 많이 했는데, 경력 때문에 다 떨어지고 유일하게 면접을 갔던 곳이다. 나중에 왜 경력이 없는데 채용하셨냐고 여쭤보니 근면성실함을 높게 봤기 때문이라고 하셨다. 자신감 업!"
            />
          </div>
          <div id="page-6">
            <LeftLogo
              img="/assets/ACADEMY.png"
              comp="Parallax Academy"
              period="2022.05 ~ Now"
              text="22년 6월 11일인 지금도 하고 있는 아르바이트이다. 이 또한 경력이 없었지만, 지난 카페에 지원했던 것과 마찬가지로 일단 부딪혀보았다. 마찬가지로 근면성실함을 보고 뽑아주셨고, 현재 열심히 다니고 있는 중이다. 항상 근면성실함은 중요한 덕목이구나.."
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

// styled-components로 글로벌 스타일 설정하는 방법
const GlobalStyle = createGlobalStyle`
  html {
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
    overflow: scroll;
  }

  // Chrome, Safari, Opera 브라우저에서 스크롤바 숨기기
  html::-webkit-scrollbar {
    display: none;
  }
`;

const StyledBox = styled.div`
  .container {
    font-size: 50px;
    font-weight: bold;

    // height를 100%로 설정해야 스크롤 위치값 관련 코드들이 동작..!!
    // 문제는 %로 바꿨더니, 한 페이지씩 넘어가던게, 일반 스크롤처럼 동작하는걸로 돌아옴..
    // 일주일만에 이유를 찾았다!
    // 부모 태그에 scroll-snap-type을 하기 보다는 html에 하는 것이 좋다는 stackoverflow의 답변!
    // https://stackoverflow.com/questions/54784885/css-scroll-snap-isnt-working-on-divs-in-react-app
    // html에 적용한 결과 vh 단위로도 가능했다! 이를 getBoundingClientRect()랑 같이 활용해서
    // top 값 or y 값을 활용하자!
    height: 100vh;
    // height: 100%;
    // scroll-snap-type: y mandatory;
    // overflow: scroll;
  }

  .container > div {
    scroll-snap-align: start;
  }
`;
