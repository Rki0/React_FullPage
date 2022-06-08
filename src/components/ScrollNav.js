import styled from "styled-components";
import ScrollLocation from "./ScrollLocatoin";

function ScrollNav({ scrollIndex, setScrollIndex }) {
  // 각 ScrollLocation을 클릭했을 때 페이지는 옮겨지는데, 페이지 표시는 그대로 다른 페이지에 남아있는 현상 발생!
  // 스크롤 동작을 인식해서 setScrollIndex를 하다보니, 스크롤을 하지않고 클릭으로만 페이지를 옮기면 변하지 않는 것으로 생각됨.

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
