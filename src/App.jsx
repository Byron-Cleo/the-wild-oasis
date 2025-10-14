import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Button";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: yellow;
`;

const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>the application has started</H1>
        <Button>Byron App</Button>
        <Button>XXXX</Button>
        <Input type="number" placeholder="Put correct number" />
      </StyledApp>
    </>
  );
}

export default App;
