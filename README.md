# 📝 풀 페이지 제작기

쇼핑몰을 따라 만들어보고 나서, 어떤 걸 만들어봐야할지 고민이 많았다.  
미술쪽 친구가 있는데, 그 친구가 "나라면 상품 홍보 페이지를 만들래"라고 했다..!  
마침 풀 페이지 방식을 사용하는 것이 UI 트렌드 중 하나라는 말이 기억나서 구현해보기로 했다.  
나는 상품 홍보가 아니라, 내가 여태 해본 알바 경험을 적어보기로 했다.

## 📂 파일 구조

파일 구조는 아래와 같이 매우 간단하다.  
딱히 DB가 필요하거나, 관리 할 인터랙션이 많은 프로젝트가 아니라서 Redux조차 사용하지 않았다.

<img width="157" alt="스크린샷 2022-06-07 오후 8 21 04" src="https://user-images.githubusercontent.com/86224851/172367466-a873e47b-81af-4d6a-a59a-a24360f3784b.png">

## 🗂 src/App.js

```js
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

    // scrollY 값의 범위에 따라 scrollIndex를 setState
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

    // return을 통해 addEventListener를 지워주자
    // 메모리 누수 방지!
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
```

기초 구조는 여러 개의 페이지 컴포넌트를 나열하는 것이다.  
페이지마다 다양한 스타일을 구현하고싶다면 하나씩 다른 컴포넌트를 만드는 것도 좋지만, 나는 최대한 일관된 디자인으로 재사용을 하고싶었다.  
그래서 회사 로고, 이름, 기간, 일하면서 느낀 점을 props로 넣고, 최대한 css 구조를 통일했다.(로고의 위치가 Left, Right로 바뀌는 것만 다름)

scrollY에 따라 scrollIndex를 setState하는 부분에서, 약간 이상한 점이 있었다.  
5 페이지에서 6 페이지로 넘어갈 때만, setState가 작동하지 않았던 것이다.  
아무리 찾아봐도 명확한 이유가 없었고, 나름대로 내린 결론은 scrollY의 범위가 애매했다 정도다.  
내 작업환경에서는 pageHeight가 720으로 나오는데, 아무래도 페이지가 동작할 때는 완벽하게 720\* 5로 값이 나오지 않나보다.  
그래서 setState가 작동하는 범위를 좀 더 느슨하게 늘려줘봤다. 인식 범위를 100px 늘려봤더니 이번에는 setState가 제대로 작동했다.  
다른 페이지에서는 문제 없이 작동하기 때문에 굳이 느슨하게 풀어주지는 않았고, 마지막 부분인 5,6 페이지 사이 부분에서만 조정을 해줬다.

## 🗂 src/pages/LeftLogo.js

```js
import styled from "styled-components";

function LeftLogo({ img, comp, period, text }) {
  return (
    <Twopage className={comp}>
      <LogoDiv>
        <img src={img} alt="logo" />
      </LogoDiv>
      <TextDiv>
        <TitleDiv>
          <h1>{comp}</h1>
          <p>{period}</p>
        </TitleDiv>
        <p>{text}</p>
      </TextDiv>
    </Twopage>
  );
}

export default LeftLogo;
```

styled-components를 많이 사용했기 때문에, 코드를 전부 첨부하면 너무 길어져서 부분부분만 리뷰하도록 하겠다.  
구조는 매우 간단하다, 회사 로고가 왼쪽에 있고, 그 외 설명(텍스트)는 오른쪽에 정렬되어 있다.  
이를 통해, RightLogo.js의 구조도 쉽게 예상 가능하다.

## 🗂 src/components/ScrollNav.js

```js
import styled from "styled-components";
import ScrollLocation from "./ScrollLocatoin";

function ScrollNav({ scrollIndex, setScrollIndex }) {
  return (
    <StyledNav>
      <ScrollLocation scrollIndex={scrollIndex} num={1} href="#page-1" />
      <ScrollLocation scrollIndex={scrollIndex} num={2} href="#page-2" />
      <ScrollLocation scrollIndex={scrollIndex} num={3} href="#page-3" />
      <ScrollLocation scrollIndex={scrollIndex} num={4} href="#page-4" />
      <ScrollLocation scrollIndex={scrollIndex} num={5} href="#page-5" />
      <ScrollLocation scrollIndex={scrollIndex} num={6} href="#page-6" />
    </StyledNav>
  );
}

export default ScrollNav;
```

컴포넌트를 너무 나열한 느낌이 들어서 보기 안 좋긴하지만, 페이지 수가 많지 않아서 그대로 뒀다.  
더 깔끔하게 만들고자 한다면? 나라면 숫자 배열(1 ~ 6)을 하나 만든 뒤 map을 통해서 num, href만 계속 바꾸는 형식으로 만들 것 같다.

<img width="1440" alt="스크린샷 2022-06-07 오후 8 50 01" src="https://user-images.githubusercontent.com/86224851/172372298-634ff0e4-4adc-40cf-8e4e-ca005fc70736.png">

페이지 우측 중앙에 위치한 네비게이션을 구현한 컴포넌트로, 각각의 버튼들은 a 태그를 활용해 다른 페이지로 이동하므로, 모두 개별 컴포넌트(ScrollLocation.js)로 만들었다.

prop으로 들어가 있는 scrollIndex은 변하는 값으로, 페이지 고유 고정값인 num과 비교되어 현재 어떤 페이지를 보고 있는지 css로 표시하는데 쓰일 것이다.  
바로 살펴보자.

## 🗂 src/components/ScrollLocation.js

```js
import styled from "styled-components";

function ScrollLocation({ scrollIndex, num, href }) {
  return (
    <>
      <StyledA href={href} num={num} scrollIndex={scrollIndex} />
    </>
  );
}

export default ScrollLocation;

const StyledA = styled.a`
  all: unset;
  cursor: pointer;
  display: block;
  width: 10px;
  height: 10px;
  border: 2px solid black;
  border-radius: 50%;
  background-color: ${(props) =>
    props.scrollIndex === props.num ? "black" : "transparent"};

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;
```

scrollIndex와 num을 비교해서 보고 있는 페이지만 black 색상의 버튼으로 바꿔준다.  
styled-components에서 props를 사용하고 있기 때문에, 함수 내부에 선언할 수도 있는데, 그렇게 되면 에러는 아니지만, 경고 메세지가 뜨게 된다.  
나는 이를 무시하고 계속 만들어나가다가 결국 몇 천개가 쌓여 속도가 느려지는 것을 보고 함수 밖으로 빼줬다..  
함수 바깥에서 props를 사용해야한다면, 함수 내부에 styled-components를 적어놓고, 필요한 값을 props로 준 뒤에, 함수 바깥에서 위 코드와 같이 사용하면 된다.

<img width="192" alt="스크린샷 2022-06-07 오후 9 07 17" src="https://user-images.githubusercontent.com/86224851/172375118-305c47aa-1466-4aa8-b6d4-be5da0429619.png">

위 사진은 2 페이지를 보고 있을 때 ScrollNav를 캡쳐한 것이다.  
scrollIndex는 2의 값을 받아왔고, ScrollLocation 컴포넌트 중 num이 2인 것만 색이 black으로 변한 것을 볼 수 있다.  
물론 a 태그를 사용했으므로, 클릭 시 해당 번호의 페이지로 이동한다.  
여기서 문제가 생겼다.  
scrollIndex의 setState가 스크롤 이벤트를 인지해서 동작하는 것이라서, 클릭으로 이동하는 a 태그에는 setState가 반응하지않는다.  
따라서, 5 페이지에서 2 페이지로 a 태그 클릭을 통해 이동하더라도 ScrollNav의 형태에는 스크롤을 하기 전까지 변화를 인식하지 못한다.

## 🤔 문제점

문제가 많다...!  
앞서 말한 문제들 외에 App.js에서 또 제가 있었다.  
난 스크롤에 따라 한 페이지가 완벽하게 스크롤되는 것을 구현하고자 했는데,  
그렇게 구현하면 스크롤 이벤트를 인식 못해서 ScrollNav가 먹통이 되버리는 것이었다!  
물론, 풀페이지 홈페이지는 페이지의 부드러운 스크롤이 더 우선적이라고 생각되지만, 계속 찾아본 결과 useRef를 사용하는 방법이 묘수가 될 것 같아서 우선 ScrollNav를 살리는 것을 택했다.  
이번에는 useRef를 적용해서 한 페이지가 완벽하게, 부드럽게 넘어가는 것까지 살리는 것을 목표로 수정해봐야겠다.
