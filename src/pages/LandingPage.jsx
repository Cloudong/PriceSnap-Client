import styled from "styled-components";
import LandingImg from "../assets/LandingImg.png";
import Button from "../components/Button";
import MainBar from "../bar/MainBar";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
`;

const TextContainer = styled.div`
  display: flex;
  height: 663px;
  color: #432a00;
  flex-direction: column;

  &.main {
    background-image: url(${LandingImg});
    background-position: center;
    text-align: right;
    padding-right: 95px;
    align-items: flex-end;
    justify-content: center;
  }

  &.sub {
    text-align: left;
    padding-left: 95px;
    align-items: flex-start;
  }
`;

const TitleText = styled.h1`
  font-family: "Inter", sans-serif;
  white-space: pre-wrap;
  font-size: 48px;
  font-weight: 700;
  margin: 0;
`;

const SubTitleText = styled.h3`
  font-family: "Inter", sans-serif;
  white-space: pre-wrap;
  font-size: 28px;
  font-weight: 400;
  margin: 0;

  &.sub {
    color: rgba(67, 42, 0, 0.62);
  }
`;

const SubText = styled.h3`
  font-family: "Inter", sans-serif;
  white-space: pre-wrap;
  font-size: 24px;
  font-weight: 400;
`;

const UserContainer = styled.div`
  min-height: 180px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 95px;
  padding-top: 20px;
`;

function LandingPage() {
  const user = "jiwon";
  const navigate = useNavigate();
  //const { user } = useUser();
  const subtext =
    "계속 변동하는 물가에 맞게 생활하고 계신가요?\n합리적인 장바구니를 위해\nKU_PRICESNAP로 관리하세요.";
  return (
    <Container>
      <MainBar />
      {user ? (
        <>
          <TextContainer className="main">
            <SubTitleText>우리 가족 생활비를 위한</SubTitleText>
            <TitleText>물가 관리</TitleText>
            <SubText>{subtext}</SubText>
            <Button className="yellow" title="KU_PRICESNAP 사용하러 가기" />
          </TextContainer>
          <UserContainer>
            <TextContainer className="sub">
              <TitleText>이번주 동향</TitleText>
              <SubTitleText className="sub">
                물가 동향으로 효율적인 소비 생활을 계획해보세요!
              </SubTitleText>
            </TextContainer>
            <Button
              title="상세 물가 확인하기"
              className="brown"
              onClick={() => {
                navigate("/search");
              }}
            />
          </UserContainer>
          <UserContainer>
            <TextContainer className="sub">
              <TitleText>나의 장바구니</TitleText>
              <SubTitleText className="sub">
                장바구니 상품을 관리해보세요!
              </SubTitleText>
            </TextContainer>
            <Button title="장바구니 수정하기" className="yellow" />
          </UserContainer>
        </>
      ) : (
        <>
          <TextContainer className="main">
            <SubTitleText>우리 가족 생활비를 위한</SubTitleText>
            <TitleText>물가 관리</TitleText>
            <SubText>{subtext}</SubText>
            <Button className="yellow" title="KU_PRICESNAP 사용하러 가기" />
          </TextContainer>
        </>
      )}
    </Container>
  );
}

export default LandingPage;
