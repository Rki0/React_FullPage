import styled from "styled-components";

function ScrollLocation({ scrollIndex, num, href }) {
  return (
    <>
      <StyledA href={href} num={num} scrollIndex={scrollIndex} />
    </>
  );
}

export default ScrollLocation;

// 파리미터 사용을 위해 함수 내부에 선언했더니 에러는 아니지만 경고 메세지가 너무 많이 발생.
// 이는 아래와 같은 방법으로 props를 가져와 사용해서 styled-components를 밖으로 빼주면 해결 가능!
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
