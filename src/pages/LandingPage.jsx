import styled from "styled-components";
import LandingImg from "../assets/LandingImg.png";

const Container = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
`;

const TextContainer = styled.div`
  display: flex;
  height: 770px;
  background-image: url(${LandingImg});
  background-position: center;
  color: #432a00;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
  text-align: right;
  padding-right: 200px;
`;

const TitleText = styled.h1`
  font-family: "Inter", sans-serif;
  white-space: pre-wrap;
  font-size: 48px;
  font-weight: 700;
  margin: 0;
`;

const SubTitleText = styled.h1`
  font-family: "Inter", sans-serif;
  white-space: pre-wrap;
  font-size: 32px;
  font-weight: 400;
  margin: 0;
`;

const SubText = styled.h3`
  font-family: "Inter", sans-serif;
  white-space: pre-wrap;
  font-size: 24px;
  font-weight: 400;
`;

function LandingPage() {
  const subtext =
    "계속 변동하는 물가에 맞게 생활하고 계신가요?\n합리적인 장바구니를 위해\nKU_PRICESNAP로 관리하세요.";
  return (
    <Container>
      <TextContainer>
        <SubTitleText>우리 가족 생활비를 위한</SubTitleText>
        <TitleText>물가 관리</TitleText>
        <SubText>{subtext}</SubText>
      </TextContainer>
    </Container>
  );
}

export default LandingPage;
