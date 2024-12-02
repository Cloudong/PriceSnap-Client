import styled from "styled-components";
import LandingImg from "../assets/LandingImg.png";
import Button from "../components/Button";
import MainBar from "../bar/MainBar";
import { useNavigate } from "react-router-dom";
import { useUser } from "../api/UserContext";
import { useState, useEffect } from "react";
import CurrentPriceItem from "../components/price/CurrentPriceItem";
import ShoppingBudget from "../components/shopping/ShoppingBudget";
import ShoppingList from "../components/shopping/ShoppingList";

const Container = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 50px;
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
  padding-top: 40px;
`;

const ShoppingContainer = styled.div`
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 95px;
  padding-top: 20px;
`;

const TrendContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 0 95px;
  margin-top: 20px;
`;

function LandingPage() {
  const [trendItems, setTrendItems] = useState([]);
  const navigate = useNavigate();
  const { user } = useUser();
  const subtext =
    "계속 변동하는 물가에 맞게 생활하고 계신가요?\n합리적인 장바구니를 위해\nKU_PRICESNAP로 관리하세요.";

  const handleAddToCart = async (item) => {
    try {
      const response = await fetch(
        "https://rw2644hx4c.execute-api.us-east-1.amazonaws.com/api/carts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            product_id: item.id,
            quantity: 1,
          }),
        }
      );

      if (response.ok) {
        alert("장바구니에 추가되었습니다.");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "장바구니 추가에 실패했습니다.");
      }
    } catch (error) {
      console.error("장바구니 추가 중 오류 발생:", error);
      alert("장바구니 추가에 실패했습니다.");
    }
  };

  useEffect(() => {
    const fetchTrends = async () => {
      if (!user) {
        console.log("user not logged in");
        return;
      }

      try {
        const response = await fetch(
          "https://rw2644hx4c.execute-api.us-east-1.amazonaws.com/api/products/trend",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await response.json();
        setTrendItems(data.data);
      } catch (error) {
        console.error("Error fetching trends:", error);
      }
    };

    fetchTrends();
  }, [user]);

  return (
    <Container>
      <MainBar />
      {user ? (
        <>
          <TextContainer className="main">
            <SubTitleText>{`${user.name}님 안녕하세요`}</SubTitleText>
            <TitleText>우리 가족 생활비를 위한 물가 관리</TitleText>
            <SubText>{subtext}</SubText>
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
          <TrendContainer>
            {Array.isArray(trendItems) &&
              trendItems.map((item) => (
                <CurrentPriceItem
                  key={item.id}
                  product_name={item.name}
                  current_month_price={item.current_month_price}
                  price_decline={item.price_decline}
                  handler={() => handleAddToCart(item)}
                />
              ))}
          </TrendContainer>
          <UserContainer>
            <TextContainer className="sub">
              <TitleText>나의 장바구니</TitleText>
              <SubTitleText className="sub">
                장바구니 상품을 관리해보세요!
              </SubTitleText>
            </TextContainer>
            <ShoppingContainer>
              <ShoppingBudget readOnly={true} />
              <Wrapper>
                <ShoppingList readOnly={true} />
              </Wrapper>
            </ShoppingContainer>
            <Button
              title="장바구니 수정하기"
              className="yellow"
              onClick={() => navigate("/shopping")}
            />
          </UserContainer>
        </>
      ) : (
        <>
          <TextContainer className="main">
            <SubTitleText>우리 가족 생활비를 위한</SubTitleText>
            <TitleText>물가 관리</TitleText>
            <SubText>{subtext}</SubText>
            <Button
              className="yellow"
              title="KU_PRICESNAP 사용하러 가기"
              onClick={() => navigate("/login")}
            />
          </TextContainer>
        </>
      )}
    </Container>
  );
}

export default LandingPage;
