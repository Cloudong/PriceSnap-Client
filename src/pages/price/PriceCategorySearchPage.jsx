import React, { useState } from "react";
import styled from "styled-components";
import MainBar from "../../bar/MainBar";
import Category from "../../components/price/Category";
import Button from "../../components/Button";
import PriceItem from "../../components/price/PriceItem";

const Container = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

function PriceCategorySearchPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const handleSearch = async () => {
    if (!selectedCategoryId) {
      alert("카테고리를 선택해주세요");
      return;
    }

    try {
      const response = await fetch(
        `https://rw2644hx4c.execute-api.us-east-1.amazonaws.com/api/products/search/category?category=${selectedCategoryId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setSearchResults(data.data);
    } catch (error) {
      console.error("카테고리 검색 중 오류 발생:", error);
    }
  };

  return (
    <Container>
      <MainBar />
      <Text className="title">상품 카테고리별 검색</Text>
      <Text className="sub">확인하고 싶은 카테고리를 클릭하세요</Text>
      <Category onCategorySelect={handleCategorySelect} />
      <Button
        className="yellow"
        title="카테고리 선택 완료"
        onClick={handleSearch}
      />
      <Wrapper>
        <Text className="type">전월 대비</Text>
        <Text className="type">평균</Text>
        <Text className="type">전전월 대비</Text>
      </Wrapper>
      <PriceWrapper>
        {Array.isArray(searchResults.products) &&
          searchResults.products.map((item) => (
            <PriceItem
              key={item.product_id}
              id={item.product_id}
              name={item.product_name}
              current_month_price={item.current_month_price}
              previous_month_price={item.previous_month_price}
              previous_two_months_price={item.previous_two_months_price}
            />
          ))}
      </PriceWrapper>
    </Container>
  );
}

export default PriceCategorySearchPage;
