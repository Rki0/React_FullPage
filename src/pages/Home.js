import styled from "styled-components";

function Home() {
  return (
    <Onepage>
      <Title>
        What Am I Doing <br />
        Part-Time Job
      </Title>

      <StackDiv>
        <img
          src={process.env.PUBLIC_URL + "/assets/HTML_logo.png"}
          alt="html"
        />
        <img src={process.env.PUBLIC_URL + "/assets/CSS_logo.png"} alt="css" />
        <img src={process.env.PUBLIC_URL + "/assets/JS_logo.png"} alt="js" />
        <img
          src={process.env.PUBLIC_URL + "/assets/REACT_logo.png"}
          alt="react"
        />
        {/* <img src="/assets/HTML_logo.png" alt="html" />
        <img src="/assets/CSS_logo.png" alt="css" />
        <img src="/assets/JS_logo.png" alt="js" />
        <img src="/assets/REACT_logo.png" alt="react" /> */}
      </StackDiv>
    </Onepage>
  );
}

export default Home;

const Onepage = styled.div`
  width: 100%;
  height: 100vh;
  background: no-repeat url(process.env.PUBLIC_URL + /assets/Home.jpg);
  background-size: cover;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Title = styled.h1`
  color: black;
  -webkit-text-stroke: 3px black;
`;

const StackDiv = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 10px;
  right: 10px;

  img {
    display: block;
    width: 30px;
    height: auto;
    background-color: transparent;
  }
`;
