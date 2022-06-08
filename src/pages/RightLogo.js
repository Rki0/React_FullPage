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
        {/* <img src={process.env.PUBLIC_URL + img} alt="logo" /> */}
        <img src={img} alt="logo" />
      </LogoDiv>
    </Threepage>
  );
}

export default LeftLogo;

const Threepage = styled.div`
  width: 100%;
  height: 100vh;
  background: green;
  display: flex;
  align-items: center;
  justify-content: space-around;

  // comp를 className으로 설정해서 각각 다르게 배경 색상 설정
  // 띄어쓰기가 있으므로 앞부분만 사용해도 됨. 대신 중복은 반드시 피할 것!
  &.Seven {
    background: linear-gradient(
      90deg,
      white 0 20%,
      #015a43 20% 30%,
      white 30% 70%,
      #e20a15 70% 80%,
      white 80% 100%
    );
  }

  &.CAFE {
    background: linear-gradient(90deg, #0b7043 50%, white 50%);
  }
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;

  p {
    &:last-child {
      font-size: 32px;
    }
  }
`;

const TitleDiv = styled.div`
  h1 {
    font-size: 52px;
    margin: 0;
  }

  p {
    font-size: 36px;
    margin: 0;
  }
`;

const LogoDiv = styled.div`
  img {
    width: 500px;
    height: auto;
  }
`;
