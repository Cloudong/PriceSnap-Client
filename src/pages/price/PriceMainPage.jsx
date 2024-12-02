import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import MainBar from "../../bar/MainBar";
import { useUser } from "../../api/UserContext";
import PriceItem from "../../components/price/PriceItem";

const Container = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 80px;
  gap: 50px;
`;

const Text = styled.div`
  font-family: "Inter", sans-serif;
  white-space: pre-wrap;

  &.title {
    font-size: 40px;
    font-weight: 700;
    padding-top: 40px;
    padding-bottom: 8px;
  }

  &.sub {
    color: #757575;
    font-size: 28px;
    font-weight: 400;
  }

  &.type {
    color: #daa520;
    font-size: 32px;
    font-weight: 700;
  }
`;

function PriceMainPage() {
  const [price, setPrice] = useState([]);
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    const fetchPrice = async () => {
      if (!user) {
        console.log("user not logged in");
        return;
      }

      try {
        const response = await fetch(
          "https://rw2644hx4c.execute-api.us-east-1.amazonaws.com/api/products/search",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await response.json();
        setPrice(data);
        console.log("success on fetch price");
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchPrice();
  }, [user]);

  return (
    <Container>
      <MainBar />
      <Text className="title">상품별 물가</Text>
      <Text className="sub">확인하고 싶은 물가 목록을 클릭하세요</Text>
      <Wrapper>
        <Button
          className="yellow"
          title="이름별 검색하기"
          onClick={() => {
            navigate("/search/keyward");
          }}
        />
        <Button
          className="brown"
          title="카테고리별 검색하기"
          onClick={() => {
            navigate("/search/category");
          }}
        />
      </Wrapper>
      <Wrapper>
        <Text className="type">전월 대비</Text>
        <Text className="type">평균</Text>
        <Text className="type">전전월 대비</Text>
      </Wrapper>
      <Wrapper>
        {Array.isArray(price.data) &&
          price.data.map((item) => (
            <PriceItem
              key={item.product_id}
              id={item.id}
              name={item.product_name}
              current_week_price={item.current_week_price}
              previous_month_price={item.previous_month_price}
              previous_two_months_price={item.previous_two_months_price}
            />
          ))}
      </Wrapper>
    </Container>
  );
}

export default PriceMainPage;
