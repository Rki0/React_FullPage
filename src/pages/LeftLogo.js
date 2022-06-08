import styled from "styled-components";

function LeftLogo({ img, comp, period, text }) {
  return (
    <Twopage className={comp}>
      <LogoDiv>
        <img src={process.env.PUBLIC_URL + img} alt="logo" />
        {/* <img src={img} alt="logo" /> */}
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

const Twopage = styled.div`
  width: 100%;
  height: 100vh;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-around;

  &.Beskin {
    background: linear-gradient(
      90deg,
      white 0 45%,
      #e27eb1 45% 50%,
      #005da9 50% 55%,
      white 55% 100%
    );
  }

  &.SPAO {
    background: linear-gradient(
      -45deg,
      #ab2123 0 10%,
      white 10% 90%,
      #ab2123 90% 10%
    );
  }
`;

const LogoDiv = styled.div`
  img {
    width: 500px;
    height: auto;
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
