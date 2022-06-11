import styled from "styled-components";
import ScrollLocation from "./ScrollLocatoin";

function ScrollNav({ scrollIndex }) {
  // 각 ScrollLocation을 클릭했을 때 페이지는 옮겨지는데, 페이지 표시는 그대로 다른 페이지에 남아있는 현상 발생!
  // 스크롤 동작을 인식해서 setScrollIndex를 하다보니, 스크롤을 하지않고 클릭으로만 페이지를 옮기면 변하지 않는 것으로 생각됨.
  // 이는 html에 scroll-behavior: smooth;를 부여해서 해결했다.
  // 부드러운 스크롤이 장점 중 하나인 풀 페이지 특성을 살리면서
  // 클릭으로 인한 스크롤 이벤트 무시도 해결 가능하다.
  // 클릭하면 그 페이지로 이동하면서 스크롤이 되기 때문에 ScrollLocation 색상도 바뀜.

  // fill() 메서드를 사용하고자 했지만, 그건 빈 배열을 하나의 값으로 채우기 때문에 from() 메서드로 전환.
  // 6의 길이를 가지는, undefined로 구성된 배열 생성
  // value에는 각 원소 값인 undefined가 들어가고, index에는 인덱스 번호가 들어감.
  // index + 1의 값을 각 value에 저장
  // [1,2,3,4,5,6] 생성
  const length = Array.from({ length: 6 }, (value, index) => index + 1);

  return (
    <StyledNav>
      {/* <ScrollLocation scrollIndex={scrollIndex} num={1} href="#page-1" />
      <ScrollLocation scrollIndex={scrollIndex} num={2} href="#page-2" />
      <ScrollLocation scrollIndex={scrollIndex} num={3} href="#page-3" />
      <ScrollLocation scrollIndex={scrollIndex} num={4} href="#page-4" />
      <ScrollLocation scrollIndex={scrollIndex} num={5} href="#page-5" />
      <ScrollLocation scrollIndex={scrollIndex} num={6} href="#page-6" /> */}

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
