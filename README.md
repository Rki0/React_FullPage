# ๐ ํ ํ์ด์ง ์ ์๊ธฐ

์ผํ๋ชฐ์ ๋ฐ๋ผ ๋ง๋ค์ด๋ณด๊ณ  ๋์, ์ด๋ค ๊ฑธ ๋ง๋ค์ด๋ด์ผํ ์ง ๊ณ ๋ฏผ์ด ๋ง์๋ค.  
๋ฏธ์ ์ชฝ ์น๊ตฌ๊ฐ ์๋๋ฐ, ๊ทธ ์น๊ตฌ๊ฐ "๋๋ผ๋ฉด ์ํ ํ๋ณด ํ์ด์ง๋ฅผ ๋ง๋ค๋"๋ผ๊ณ  ํ๋ค..!  
๋ง์นจ ํ ํ์ด์ง ๋ฐฉ์์ ์ฌ์ฉํ๋ ๊ฒ์ด UI ํธ๋ ๋ ์ค ํ๋๋ผ๋ ๋ง์ด ๊ธฐ์ต๋์ ๊ตฌํํด๋ณด๊ธฐ๋ก ํ๋ค.  
๋๋ ์ํ ํ๋ณด๊ฐ ์๋๋ผ, ๋ด๊ฐ ์ฌํ ํด๋ณธ ์๋ฐ ๊ฒฝํ์ ์ ์ด๋ณด๊ธฐ๋ก ํ๋ค.

## ๐ ํ์ผ ๊ตฌ์กฐ

ํ์ผ ๊ตฌ์กฐ๋ ์๋์ ๊ฐ์ด ๋งค์ฐ ๊ฐ๋จํ๋ค.  
๋ฑํ DB๊ฐ ํ์ํ๊ฑฐ๋, ๊ด๋ฆฌ ํ  ์ธํฐ๋์์ด ๋ง์ ํ๋ก์ ํธ๊ฐ ์๋๋ผ์ Redux์กฐ์ฐจ ์ฌ์ฉํ์ง ์์๋ค.

<img width="157" alt="แแณแแณแแตแซแแฃแบ 2022-06-07 แแฉแแฎ 8 21 04" src="https://user-images.githubusercontent.com/86224851/172367466-a873e47b-81af-4d6a-a59a-a24360f3784b.png">

# Ver.2

์ฝ๊ฐ์ ์๋ฐ์ดํธ๊ฐ ์๋ค.  
[Ver.1](#ver1)์์ ๋งํ๋๋๋ก useRef๋ฅผ ์ฌ์ฉํด์ ์คํฌ๋กค์ ์์น๋ฅผ ๋ฐ์์ค๋ ๊ฒ์ ๊ตฌํํด๋ดค๋ค.  
์๋ฐ์ดํธ๋ฅผ ํ๋ ์ค ์๋กญ๊ฒ ์๊ฒ๋ ๊ธฐ๋ฅ๋ ์์ผ๋ฏ๋ก, ๋ฆฌ๋ทฐ๋ฅผ ์งํํด ๋ณด๊ฒ ๋ค.

## ๐ src/App.js

```js
import React, { useEffect, useState, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Home from "./pages/Home";
import LeftLogo from "./pages/LeftLogo";
import RightLogo from "./pages/RightLogo";
import ScrollNav from "./components/ScrollNav";

function App() {
  // ํ์ด์ง ์์น์ ๋ฐ๋ผ scrollIndex๋ฅผ ์ค์ . nav์ ํ์ฌ ํ์ด์ง๋ฅผ ํ์ํ๊ธฐ ์ํด ์ฌ์ฉ.
  const [scrollIndex, setScrollIndex] = useState(1);

  // ํ์ฌ ์คํฌ๋กค ์์น๋ฅผ ์ ์ฅํ๊ธฐ ์ํด ์ฌ์ฉ.
  const [scrollY, setScrollY] = useState(0);

  // ํ์ด์ง ํ๋์ ๋์ด๋ฅผ ๋ณ์์ ์ ์ฅ == 100vh
  const pageHeight = window.innerHeight;

  // ์ปดํฌ๋ํธ dom์ ์ ๊ทผํ๊ธฐ ์ํ ref
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    window.addEventListener("scroll", handleFollow);

    return () => {
      window.removeEventListener("scroll", handleFollow);
    };
  });

  const handleFollow = () => {
    // top์์๋ถํฐ ์ผ๋ง๋ ๋จ์ด์ก๋์ง ์ป๊ธฐ ์ํด ref๋ฅผ ํ์ฉํ getBoundingClientRect()
    // width, height ๋ฑ๋ฑ
    const scroll = scrollRef.current.getBoundingClientRect();

    // getBoundingClientRect()์ top, y๊ฐ์ ์์๋ก ๋์ค๊ธฐ ๋๋ฌธ์ -1์ ๊ณฑํจ
    setScrollY(scroll.top * -1);

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
              text="๋๋์ ์ ์จ๋ด์๋ค"
            />
          </div>
          <div id="page-3">
            <RightLogo
              img="/assets/SEVEN.png"
              comp="Seven Eleven"
              period="2017.07 ~ 2017.09"
              text="๋๋์ ์ ์จ๋ด์๋ค"
            />
          </div>
          <div id="page-4">
            <LeftLogo
              img="/assets/SPAO.svg"
              comp="SPAO"
              period="2019.09 ~ 2020.03"
              text="๋๋์ ์ ์จ๋ด์๋ค"
            />
          </div>
          <div id="page-5">
            <RightLogo
              img="/assets/CAFE.png"
              comp="CAFE TAIN"
              period="2021.07 ~ 2022.05"
              text="๋๋์ ์ ์จ๋ด์๋ค"
            />
          </div>
          <div id="page-6">
            <LeftLogo
              img="/assets/ACADEMY.png"
              comp="Parallax Academy"
              period="2022.05 ~ Now"
              text="๋๋์ ์ ์จ๋ด์๋ค"
            />
          </div>
        </div>
      </StyledBox>
    </TopDiv>
  );
}

export default App;

// nav์ ์์น๋ฅผ ์กฐ์ ํ๊ธฐ ์ํ ์ ์ฒด div ์ค์ 
const TopDiv = styled.div`
  position: relative;
`;

// styled-components๋ก ๊ธ๋ก๋ฒ ์คํ์ผ ์ค์ ํ๋ ๋ฐฉ๋ฒ
const GlobalStyle = createGlobalStyle`
  html {
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
    overflow: scroll;
  }

  // Chrome, Safari, Opera ๋ธ๋ผ์ฐ์ ์์ ์คํฌ๋กค๋ฐ ์จ๊ธฐ๊ธฐ
  html::-webkit-scrollbar {
    display: none;
  }
`;

const StyledBox = styled.div`
  .container {
    font-size: 50px;
    font-weight: bold;

    // ๋ถ๋ชจ ํ๊ทธ์ scroll-snap-type์ ํ๊ธฐ ๋ณด๋ค๋ html์ ํ๋ ๊ฒ์ด ์ข๋ค๋ stackoverflow์ ๋ต๋ณ!
    // https://stackoverflow.com/questions/54784885/css-scroll-snap-isnt-working-on-divs-in-react-app
    // html์ ์ ์ฉํ ๊ฒฐ๊ณผ vh ๋จ์๋ก๋ ๊ฐ๋ฅํ๋ค! ์ด๋ฅผ getBoundingClientRect()๋ ๊ฐ์ด ํ์ฉํด์
    // top ๊ฐ or y ๊ฐ์ ํ์ฉํ์!
    height: 100vh;
  }

  .container > div {
    scroll-snap-align: start;
  }
`;
```

๊ฐ์ฅ ํฌ๊ฒ ๋ณํ ๊ฒ์ ๋น์ฐ useRef์ ์ฌ์ฉ์ด๋ค.  
์ด์ ์๋ window.pageYOffset์ ์ฌ์ฉํด์ ์คํฌ๋กค๋ ๊ฑฐ๋ฆฌ๋ฅผ ์ธก์ ํ์ง๋ง, ์ด๋ฒ์๋ ๊ฐ์ฅ ๊ฒ์ ์๋ ์ปดํฌ๋ํธ์ธ < TopDiv >์ ref๋ฅผ ์ค์ ํด์ ํด๋น ์ปดํฌ๋ํธ์ ๋ณํ๋ฅผ ์ธก์ ํ๋ค.  
๋ฐ๋ก getBoundingClientRect()๋ฅผ ์ด์ฉํ๋ ๊ฒ์ด๋ค.  
ํนํ๋ ์ด ํจ์์ ์ฌ์ฉ์ผ๋ก ์ธํด, Ver.1์์ ํด๊ฒฐํ์ง ๋ชปํ๋ ์คํฌ๋กค ๊ฐ ์ธก์ ์ด ์๋๋ ํ์๋ ํด๊ฒฐ ํ  ์ ์์๋ค.  
์ด ํจ์๋ ์๋ฆฌ๋จผํธ์ width, height, top, bottom, x, y ๋ฑ๋ฑ ์ขํ๋ ๊ฑฐ๋ฆฌ์ ๊ฐ๋ค์ ๋ฆฌํดํด์ค๋ค. ๋๋ ์์์๋ถํฐ ์คํฌ๋กค๋ ๊ฑฐ๋ฆฌ๋ฅผ ์ป๊ณ ์ ํ์ผ๋ฏ๋ก top์ ์ฌ์ฉํ๋ ๊ฒ์ผ๋ก ๊ฒฐ์ ํ๋ค.  
์ฌ๊ธฐ์ top, y๋ ์์๊ฐ ์ถ๋ ฅ๋๊ธฐ ๋๋ฌธ์ -1์ ๊ณฑํด์ setState๋ก ํ์ฉํ๋ค.  
Ver.1์์ scrollY๊ฐ์ด ์ ๋งคํ๊ฒ ๋ง์ ๋จ์ด์ ธ์ UX๊ฐ ์ข์ง์์๋ค๋ ๋ฌธ์ ์ ์ด ์์๋ค.  
์ด๋ ๊ฐ ๋ฒ์๋ง๋ค 100px์ ์ค์ฌ์ ์กฐ๊ธ ๋ ๋งค๋๋ฝ๊ฒ ScrollNav๊ฐ ๋ณ๊ฒฝ๋๋๋ก ๋ง๋ค์ด์ ํด๊ฒฐํ๋ค.  
์ ๋ฌธ์ ๋ค์ ๊ทผ๋ณธ์ ์ผ๋ก ํด๊ฒฐํด์คฌ๋ ๋ถ๋ถ์ ์ฌ์ค styled-components์ ์๋ค.  
stackoverflow๋ฅผ ํ์ฐธ ์ฐพ์๋ณธ ๊ฒฐ๊ณผ, scroll-snap-type์ ๋ถ๋ชจ ์์๊ฐ ์๋ html์ ์ ์ฉํ๋๊ฒ ๋ ๋ฐ๋์งํ๋ค๋ ๋ต๋ณ์ ์ฐพ์ ์ ์์๋ค.  
๊ทธ๋์ scroll-snap๊ณผ ๊ด๋ จ๋ ์์ฑ๋ค์ ์ ๋ถ html์ ์ฎ๊ฒผ๊ณ , ์ด ๋๋ถํฐ ๋ฌธ์ ๋ค์ด ์ฐจ๊ทผ์ฐจ๊ทผ ํด๊ฒฐ๋๊ธฐ ์์ํ๋ค.  
์ด๋ฐ ๋ฐฉ์์ผ๋ก ํด๊ฒฐ๋ ์ด์ ๋ scroll ์ด๋ฒคํธ๋ html, body์์ ๋ฐ์ํ๋ ์ด๋ฒคํธ์ด๊ธฐ ๋๋ฌธ์ด๋ผ๊ณ  ํ๋ค.

## ๐ src/ScrollNav.js

```js
import styled from "styled-components";
import ScrollLocation from "./ScrollLocatoin";

function ScrollNav({ scrollIndex }) {
  // fill() ๋ฉ์๋๋ฅผ ์ฌ์ฉํ๊ณ ์ ํ์ง๋ง, ๊ทธ๊ฑด ๋น ๋ฐฐ์ด์ ํ๋์ ๊ฐ์ผ๋ก ์ฑ์ฐ๊ธฐ ๋๋ฌธ์ from() ๋ฉ์๋๋ก ์ ํ.
  // 6์ ๊ธธ์ด๋ฅผ ๊ฐ์ง๋, undefined๋ก ๊ตฌ์ฑ๋ ๋ฐฐ์ด ์์ฑ
  // value์๋ ๊ฐ ์์ ๊ฐ์ธ undefined๊ฐ ๋ค์ด๊ฐ๊ณ , index์๋ ์ธ๋ฑ์ค ๋ฒํธ๊ฐ ๋ค์ด๊ฐ.
  // index + 1์ ๊ฐ์ ๊ฐ value์ ์ ์ฅ
  // [1,2,3,4,5,6] ์์ฑ
  const length = Array.from({ length: 6 }, (value, index) => index + 1);

  return (
    <StyledNav>
      {length.map((value, index) => {
        return (
          <ScrollLocation
            scrollIndex={scrollIndex}
            num={value}
            href={`#page-${value}`}
          />
        );
      })}
    </StyledNav>
  );
}

export default ScrollNav;

const StyledNav = styled.nav`
  // position: absolute;
  position: fixed;
  top: 50%;
  right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 100;
  height: 130px;
`;
```

์ฝ๋ ์ ํฐ ๋ณํ๋ ์๋ค. ์์ ํ๊ณ ์ ํ๋ ๋ถ๋ถ์ด src/App.js์์ styled-components๋ก ํด๊ฒฐ๋๊ธฐ ๋๋ฌธ์ด๋ค.  
ํด๋ฆญ์ ํ๋ฉด ํด๋น < ScrollLocation >๊ฐ ์์์ด ๋ณ๊ฒฝ๋๊ธฐ๋ฅผ ์ํ๋๋ฐ, ์ ์ด๊ฑธ ๋ฐ๋ฌ๋๋ฉด, a ํ๊ทธ ํน์ฑ์ ํ๋ฉด์ด ์คํฌ๋กค๋๋ฉด์ ์์ง์ด๋๊ฒ ์๋๋ผ, ํ๋ฒ์ ๊ทธ ์์๋ก ์ ํ๋๊ธฐ ๋๋ฌธ์ด์๋ค.  
๊ทธ๋ฐ๋ฐ ์์  scr/App.js์์ scroll-behavior: smooth;๋ฅผ ๋ถ์ฌํ๋๋ a ํ๊ทธ๋ฅผ ํด๋ฆญํด๋ ์์ฐ์ค๋ฝ๊ฒ ์คํฌ๋กค ๋์์ ํ๋ฉฐ ์์ง์ฌ์, ๊ตณ์ด ์ด ๊ธฐ๋ฅ์ ์ถ๊ฐํ  ํ์๊ฐ ์์ด์ก๋ค.  
์คํฌ๋กค ๋๋ฉด์ ์์ฐ์ค๋ฝ๊ฒ < ScrollLocation >์ด ๋ณ๊ฒฝ๋์๊ธฐ ๋๋ฌธ์ด๋ค.  
Ver.1์์ ๋งํ๋ ๊ฒ์ฒ๋ผ map() ๋ฉ์๋๋ฅผ ํตํด์ ์ฝ๋๋ฅผ ์ข๋ ๊ฐ๋ตํ๊ฒ ๋ง๋  ๊ฒ ์ ๋์ ๋ณํ๊ฐ ์๋ค.  
Array.from() ๋ฉ์๋๋ฅผ ํ์ฉํด์ 1~6์ ์์๋ก ๊ฐ์ง๋ ๋ฐฐ์ด์ ์์ฑํ๊ณ , ๊ทธ๋ฅผ ํ์ฉํด map()์ ํ๋ค.

## ๐ src/RightLogo.js

```js
import styled from "styled-components";

function LeftLogo({ img, comp, period, text }) {
  return (
    <Threepage className={comp}>
      <TextDiv>
        <TitleDiv>
          <h1>{comp}</h1>
          <p>{period}</p>
        </TitleDiv>
        <p>{text}</p>
      </TextDiv>
      <LogoDiv>
        <img src={process.env.PUBLIC_URL + img} alt="logo" />
      </LogoDiv>
      {comp === "CAFE TAIN" ? (
        <PS>*์๊ธฐ ๋ก๊ณ ๋ ๋ค๋ฅธ ์นดํ์๋๋ค. ๊ฐ์ธ ์นดํ๋ผ์ ๋ก๊ณ ๊ฐ ์์ต๋๋ค.*</PS>
      ) : null}
    </Threepage>
  );
}

export default LeftLogo;

const PS = styled.p`
  position: absolute;
  font-size: 15px;
  bottom: 10px;
  right: 50px;
`;
```

์ด ๋ถ๋ถ๋ ์ฝ๊ฐ์ ์์ ์ด ์์๋ค.  
๊ฐ์ธ ์นดํ ์๋ฅด๋ฐ์ดํธ์์ผ๋ฏ๋ก, ๋ก๊ณ ๊ฐ ์์๋ค...  
๊ทธ๋์ ๋ถ๋์ดํ๊ฒ ์คํ๋ฒ์ค ๋ก๊ณ ๋ฅผ ์ฌ์ฉํ๊ณ , ํผ์  ๋ฐฉ์ง์ฉ์ผ๋ก ๋ค๋ฅธ ๋ก๊ณ ๋ฅผ ์ฌ์ฉํ๋ค๊ณ  ๊ณต์งํ๊ณ  ์ถ์๋ค.  
์นดํ ์๋ฅด๋ฐ์ดํธ์์๋ง ํ์ํ๊ณ  ์ถ๊ธฐ ๋๋ฌธ์ props๋ก ๋ฐ์์จ ๊ฒ ์ค comp attr๋ฅผ ํตํด, ์นดํ ์๋ฅด๋ฐ์ดํธ์ธ์ง ํ์ธํ ๋ค ๊ณต์ง๋ฅผ ํ์ํ๋ ์ผํญ์ฐ์ฐ์๋ฅผ ์ฌ์ฉํ๋ค.

## ๐ค ํ๊ณ 

์๊ฐ๋ณด๋ค ๊ธด ์๊ฐ์ด ๊ฑธ๋ ธ๋ค. CSS๋ก๋ ์ถฉ๋ถํ ์ฝ๊ฒ ๊ตฌํํ  ์ ์์ ๊ฒ์ด๋ผ ์๊ฐํ๋๋ฐ, ์๊ฐ๋ณด๋ค js๋ถ๋ถ์์ ๋ง์ด ๋งํ์ ๊ทธ๋ฐ ๊ฒ ๊ฐ๋ค.(React๋ผ๊ณ  ํด์ผํ๋ ค๋)  
๋ค ์์ฑํ๊ณ ๋์ ๋ณด๋๊น ๋ค์์๋ ์ด๋ ต์ง ์๊ฒ ๋ง๋ค ์ ์์ ๊ฒ ๊ฐ๋ค.  
๊ตฌํํ๋ ๋ฐฉ๋ฒ์ด ์ด๋ ต๋ค๊ธฐ ๋ณด๋ค๋, scroll ์ด๋ฒคํธ๋ฅผ ์ด๋์ listenํด์ผ ํ๋์ง ๋ฑ ์ง์ฝ์ ์ธ ์ง์์ด ๋ถ์กฑํด์ ์ฒด๊ฐ ๋์ด๋๊ฐ ๋์๋ ๊ฒ ๊ฐ๋ค.  
React ํ๋ก์ ํธ๋ฅผ ๋ง๋ค๋ฉด์ ํญ์ ๋๋ผ์ง๋ง, Github์ ๋น๋ ํ์ผ์ ์ฌ๋ฆฌ๋ ๊ฒ๊น์ง ๊ณ ๋ คํด์ img์ src๊ฐ์ ๊ฒ๋ค์ ๋ฏธ๋ฆฌ๋ฏธ๋ฆฌ ์๋ง๊ฒ ์์ฑํ๋ ๊ฒ์ด ์ ์ ๊ฑด๊ฐ์ ์ด๋กญ๋ค.

# Ver.1

## ๐ src/App.js

```js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Home from "./pages/Home";
import LeftLogo from "./pages/LeftLogo";
import RightLogo from "./pages/RightLogo";
import ScrollNav from "./components/ScrollNav";

function App() {
  // ํ์ด์ง ์์น์ ๋ฐ๋ผ scrollIndex๋ฅผ ์ค์ . nav์ ํ์ฌ ํ์ด์ง๋ฅผ ํ์ํ๊ธฐ ์ํด ์ฌ์ฉ.
  const [scrollIndex, setScrollIndex] = useState(1);

  // ํ์ฌ ์คํฌ๋กค ์์น๋ฅผ ์ ์ฅํ๊ธฐ ์ํด ์ฌ์ฉ.
  const [scrollY, setScrollY] = useState(0);

  // ํ์ด์ง ํ๋์ ๋์ด๋ฅผ ๋ณ์์ ์ ์ฅ == 100vh
  const pageHeight = window.innerHeight;

  const handleFollow = () => {
    // ํ์ฌ ์คํฌ๋กค ์์น๋ฅผ scrollY์ ์ ์ฅ
    setScrollY(window.pageYOffset);

    // scrollY ๊ฐ์ ๋ฒ์์ ๋ฐ๋ผ scrollIndex๋ฅผ setState
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

    // return์ ํตํด addEventListener๋ฅผ ์ง์์ฃผ์
    // ๋ฉ๋ชจ๋ฆฌ ๋์ ๋ฐฉ์ง!
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
              text="๋๋์ ์ ์จ๋ด์๋ค"
            />
          </div>
          <div id="page-3">
            <RightLogo
              img="/assets/SEVEN.png"
              comp="Seven Eleven"
              period="2017.07 ~ 2017.09"
              text="๋๋์ ์ ์จ๋ด์๋ค"
            />
          </div>
          <div id="page-4">
            <LeftLogo
              img="/assets/SPAO.svg"
              comp="SPAO"
              period="2019.09 ~ 2020.03"
              text="๋๋์ ์ ์จ๋ด์๋ค"
            />
          </div>
          <div id="page-5">
            <RightLogo
              img="/assets/CAFE.png"
              comp="CAFE TAIN"
              period="2021.07 ~ 2022.05"
              text="๋๋์ ์ ์จ๋ด์๋ค"
            />
          </div>
          <div id="page-6">
            <LeftLogo
              img="/assets/ACADEMY.png"
              comp="Parallax Academy"
              period="2022.05 ~ Now"
              text="๋๋์ ์ ์จ๋ด์๋ค"
            />
          </div>
        </div>
      </StyledBox>
    </TopDiv>
  );
}

export default App;
```

๊ธฐ์ด ๊ตฌ์กฐ๋ ์ฌ๋ฌ ๊ฐ์ ํ์ด์ง ์ปดํฌ๋ํธ๋ฅผ ๋์ดํ๋ ๊ฒ์ด๋ค.  
ํ์ด์ง๋ง๋ค ๋ค์ํ ์คํ์ผ์ ๊ตฌํํ๊ณ ์ถ๋ค๋ฉด ํ๋์ฉ ๋ค๋ฅธ ์ปดํฌ๋ํธ๋ฅผ ๋ง๋๋ ๊ฒ๋ ์ข์ง๋ง, ๋๋ ์ต๋ํ ์ผ๊ด๋ ๋์์ธ์ผ๋ก ์ฌ์ฌ์ฉ์ ํ๊ณ ์ถ์๋ค.  
๊ทธ๋์ ํ์ฌ ๋ก๊ณ , ์ด๋ฆ, ๊ธฐ๊ฐ, ์ผํ๋ฉด์ ๋๋ ์ ์ props๋ก ๋ฃ๊ณ , ์ต๋ํ css ๊ตฌ์กฐ๋ฅผ ํต์ผํ๋ค.(๋ก๊ณ ์ ์์น๊ฐ Left, Right๋ก ๋ฐ๋๋ ๊ฒ๋ง ๋ค๋ฆ)

scrollY์ ๋ฐ๋ผ scrollIndex๋ฅผ setStateํ๋ ๋ถ๋ถ์์, ์ฝ๊ฐ ์ด์ํ ์ ์ด ์์๋ค.  
5 ํ์ด์ง์์ 6 ํ์ด์ง๋ก ๋์ด๊ฐ ๋๋ง, setState๊ฐ ์๋ํ์ง ์์๋ ๊ฒ์ด๋ค.  
์๋ฌด๋ฆฌ ์ฐพ์๋ด๋ ๋ชํํ ์ด์ ๊ฐ ์์๊ณ , ๋๋ฆ๋๋ก ๋ด๋ฆฐ ๊ฒฐ๋ก ์ scrollY์ ๋ฒ์๊ฐ ์ ๋งคํ๋ค ์ ๋๋ค.  
๋ด ์์ํ๊ฒฝ์์๋ pageHeight๊ฐ 720์ผ๋ก ๋์ค๋๋ฐ, ์๋ฌด๋๋ ํ์ด์ง๊ฐ ๋์ํ  ๋๋ ์๋ฒฝํ๊ฒ 720\* 5๋ก ๊ฐ์ด ๋์ค์ง ์๋๋ณด๋ค.  
๊ทธ๋์ setState๊ฐ ์๋ํ๋ ๋ฒ์๋ฅผ ์ข ๋ ๋์จํ๊ฒ ๋๋ ค์ค๋ดค๋ค. ์ธ์ ๋ฒ์๋ฅผ 100px ๋๋ ค๋ดค๋๋ ์ด๋ฒ์๋ setState๊ฐ ์ ๋๋ก ์๋ํ๋ค.  
๋ค๋ฅธ ํ์ด์ง์์๋ ๋ฌธ์  ์์ด ์๋ํ๊ธฐ ๋๋ฌธ์ ๊ตณ์ด ๋์จํ๊ฒ ํ์ด์ฃผ์ง๋ ์์๊ณ , ๋ง์ง๋ง ๋ถ๋ถ์ธ 5,6 ํ์ด์ง ์ฌ์ด ๋ถ๋ถ์์๋ง ์กฐ์ ์ ํด์คฌ๋ค.

## ๐ src/pages/LeftLogo.js

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

styled-components๋ฅผ ๋ง์ด ์ฌ์ฉํ๊ธฐ ๋๋ฌธ์, ์ฝ๋๋ฅผ ์ ๋ถ ์ฒจ๋ถํ๋ฉด ๋๋ฌด ๊ธธ์ด์ ธ์ ๋ถ๋ถ๋ถ๋ถ๋ง ๋ฆฌ๋ทฐํ๋๋ก ํ๊ฒ ๋ค.  
๊ตฌ์กฐ๋ ๋งค์ฐ ๊ฐ๋จํ๋ค, ํ์ฌ ๋ก๊ณ ๊ฐ ์ผ์ชฝ์ ์๊ณ , ๊ทธ ์ธ ์ค๋ช(ํ์คํธ)๋ ์ค๋ฅธ์ชฝ์ ์ ๋ ฌ๋์ด ์๋ค.  
์ด๋ฅผ ํตํด, RightLogo.js์ ๊ตฌ์กฐ๋ ์ฝ๊ฒ ์์ ๊ฐ๋ฅํ๋ค.

## ๐ src/components/ScrollNav.js

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

์ปดํฌ๋ํธ๋ฅผ ๋๋ฌด ๋์ดํ ๋๋์ด ๋ค์ด์ ๋ณด๊ธฐ ์ ์ข๊ธดํ์ง๋ง, ํ์ด์ง ์๊ฐ ๋ง์ง ์์์ ๊ทธ๋๋ก ๋๋ค.  
๋ ๊น๋ํ๊ฒ ๋ง๋ค๊ณ ์ ํ๋ค๋ฉด? ๋๋ผ๋ฉด ์ซ์ ๋ฐฐ์ด(1 ~ 6)์ ํ๋ ๋ง๋  ๋ค map์ ํตํด์ num, href๋ง ๊ณ์ ๋ฐ๊พธ๋ ํ์์ผ๋ก ๋ง๋ค ๊ฒ ๊ฐ๋ค.

<img width="1440" alt="แแณแแณแแตแซแแฃแบ 2022-06-07 แแฉแแฎ 8 50 01" src="https://user-images.githubusercontent.com/86224851/172372298-634ff0e4-4adc-40cf-8e4e-ca005fc70736.png">

ํ์ด์ง ์ฐ์ธก ์ค์์ ์์นํ ๋ค๋น๊ฒ์ด์์ ๊ตฌํํ ์ปดํฌ๋ํธ๋ก, ๊ฐ๊ฐ์ ๋ฒํผ๋ค์ a ํ๊ทธ๋ฅผ ํ์ฉํด ๋ค๋ฅธ ํ์ด์ง๋ก ์ด๋ํ๋ฏ๋ก, ๋ชจ๋ ๊ฐ๋ณ ์ปดํฌ๋ํธ(ScrollLocation.js)๋ก ๋ง๋ค์๋ค.

prop์ผ๋ก ๋ค์ด๊ฐ ์๋ scrollIndex์ ๋ณํ๋ ๊ฐ์ผ๋ก, ํ์ด์ง ๊ณ ์  ๊ณ ์ ๊ฐ์ธ num๊ณผ ๋น๊ต๋์ด ํ์ฌ ์ด๋ค ํ์ด์ง๋ฅผ ๋ณด๊ณ  ์๋์ง css๋ก ํ์ํ๋๋ฐ ์ฐ์ผ ๊ฒ์ด๋ค.  
๋ฐ๋ก ์ดํด๋ณด์.

## ๐ src/components/ScrollLocation.js

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

scrollIndex์ num์ ๋น๊ตํด์ ๋ณด๊ณ  ์๋ ํ์ด์ง๋ง black ์์์ ๋ฒํผ์ผ๋ก ๋ฐ๊ฟ์ค๋ค.  
styled-components์์ props๋ฅผ ์ฌ์ฉํ๊ณ  ์๊ธฐ ๋๋ฌธ์, ํจ์ ๋ด๋ถ์ ์ ์ธํ  ์๋ ์๋๋ฐ, ๊ทธ๋ ๊ฒ ๋๋ฉด ์๋ฌ๋ ์๋์ง๋ง, ๊ฒฝ๊ณ  ๋ฉ์ธ์ง๊ฐ ๋จ๊ฒ ๋๋ค.  
๋๋ ์ด๋ฅผ ๋ฌด์ํ๊ณ  ๊ณ์ ๋ง๋ค์ด๋๊ฐ๋ค๊ฐ ๊ฒฐ๊ตญ ๋ช ์ฒ๊ฐ๊ฐ ์์ฌ ์๋๊ฐ ๋๋ ค์ง๋ ๊ฒ์ ๋ณด๊ณ  ํจ์ ๋ฐ์ผ๋ก ๋นผ์คฌ๋ค..  
ํจ์ ๋ฐ๊นฅ์์ props๋ฅผ ์ฌ์ฉํด์ผํ๋ค๋ฉด, ํจ์ ๋ด๋ถ์ styled-components๋ฅผ ์ ์ด๋๊ณ , ํ์ํ ๊ฐ์ props๋ก ์ค ๋ค์, ํจ์ ๋ฐ๊นฅ์์ ์ ์ฝ๋์ ๊ฐ์ด ์ฌ์ฉํ๋ฉด ๋๋ค.

<img width="192" alt="แแณแแณแแตแซแแฃแบ 2022-06-07 แแฉแแฎ 9 07 17" src="https://user-images.githubusercontent.com/86224851/172375118-305c47aa-1466-4aa8-b6d4-be5da0429619.png">

์ ์ฌ์ง์ 2 ํ์ด์ง๋ฅผ ๋ณด๊ณ  ์์ ๋ ScrollNav๋ฅผ ์บก์ณํ ๊ฒ์ด๋ค.  
scrollIndex๋ 2์ ๊ฐ์ ๋ฐ์์๊ณ , ScrollLocation ์ปดํฌ๋ํธ ์ค num์ด 2์ธ ๊ฒ๋ง ์์ด black์ผ๋ก ๋ณํ ๊ฒ์ ๋ณผ ์ ์๋ค.  
๋ฌผ๋ก  a ํ๊ทธ๋ฅผ ์ฌ์ฉํ์ผ๋ฏ๋ก, ํด๋ฆญ ์ ํด๋น ๋ฒํธ์ ํ์ด์ง๋ก ์ด๋ํ๋ค.  
์ฌ๊ธฐ์ ๋ฌธ์ ๊ฐ ์๊ฒผ๋ค.  
scrollIndex์ setState๊ฐ ์คํฌ๋กค ์ด๋ฒคํธ๋ฅผ ์ธ์งํด์ ๋์ํ๋ ๊ฒ์ด๋ผ์, ํด๋ฆญ์ผ๋ก ์ด๋ํ๋ a ํ๊ทธ์๋ setState๊ฐ ๋ฐ์ํ์ง์๋๋ค.  
๋ฐ๋ผ์, 5 ํ์ด์ง์์ 2 ํ์ด์ง๋ก a ํ๊ทธ ํด๋ฆญ์ ํตํด ์ด๋ํ๋๋ผ๋ ScrollNav์ ํํ์๋ ์คํฌ๋กค์ ํ๊ธฐ ์ ๊น์ง ๋ณํ๋ฅผ ์ธ์ํ์ง ๋ชปํ๋ค.

## ๐ค ๋ฌธ์ ์ 

๋ฌธ์ ๊ฐ ๋ง๋ค...!  
์์ ๋งํ ๋ฌธ์ ๋ค ์ธ์ App.js์์ ๋ ์ ๊ฐ ์์๋ค.  
๋ ์คํฌ๋กค์ ๋ฐ๋ผ ํ ํ์ด์ง๊ฐ ์๋ฒฝํ๊ฒ ์คํฌ๋กค๋๋ ๊ฒ์ ๊ตฌํํ๊ณ ์ ํ๋๋ฐ,  
๊ทธ๋ ๊ฒ ๊ตฌํํ๋ฉด ์คํฌ๋กค ์ด๋ฒคํธ๋ฅผ ์ธ์ ๋ชปํด์ ScrollNav๊ฐ ๋จนํต์ด ๋๋ฒ๋ฆฌ๋ ๊ฒ์ด์๋ค!  
๋ฌผ๋ก , ํํ์ด์ง ํํ์ด์ง๋ ํ์ด์ง์ ๋ถ๋๋ฌ์ด ์คํฌ๋กค์ด ๋ ์ฐ์ ์ ์ด๋ผ๊ณ  ์๊ฐ๋์ง๋ง, ๊ณ์ ์ฐพ์๋ณธ ๊ฒฐ๊ณผ useRef๋ฅผ ์ฌ์ฉํ๋ ๋ฐฉ๋ฒ์ด ๋ฌ์๊ฐ ๋  ๊ฒ ๊ฐ์์ ์ฐ์  ScrollNav๋ฅผ ์ด๋ฆฌ๋ ๊ฒ์ ํํ๋ค.  
์ด๋ฒ์๋ useRef๋ฅผ ์ ์ฉํด์ ํ ํ์ด์ง๊ฐ ์๋ฒฝํ๊ฒ, ๋ถ๋๋ฝ๊ฒ ๋์ด๊ฐ๋ ๊ฒ๊น์ง ์ด๋ฆฌ๋ ๊ฒ์ ๋ชฉํ๋ก ์์ ํด๋ด์ผ๊ฒ ๋ค.
