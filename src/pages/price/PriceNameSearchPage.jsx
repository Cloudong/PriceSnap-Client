import React, { useState } from "react";
import styled from "styled-components";
import MainBar from "../../bar/MainBar";
import Search from "../../components/price/Search";
import PriceItem from "../../components/price/PriceItem";
import { useUser } from "../../api/UserContext";

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
  padding: 60px 0;
  gap: 20px;
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

function PriceNameSearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const { token } = useUser();

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth()).padStart(2, "0"); // 현재 월 (0부터 시작하므로 +1)
  const currentSuffix = `_${currentYear}${currentMonth}`;

  const handleSearch = async (name) => {
    try {
      const response = await fetch(
        `https://rw2644hx4c.execute-api.us-east-1.amazonaws.com/api/products/search/name?name=${name}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    }
  };

  return (
    <Container>
      <MainBar />
      <Text className="title">상품 이름별 검색</Text>
      <Text className="sub">확인하고 싶은 상품 이름을 클릭하세요</Text>
      <Search onSearch={handleSearch} />
      <Wrapper>
        <Text className="type">전월 대비</Text>
        <Text className="type">평균</Text>
        <Text className="type">전전월 대비</Text>
      </Wrapper>
      <PriceWrapper>
        {Array.isArray(searchResults.products) &&
          searchResults.products
            .filter((item) => item.product_id.endsWith(currentSuffix)) // 현재 달 데이터만 필터링
            .map((item) => (
              <PriceItem
                key={item.product_id}
                product_id={item.product_id} // product_id 수정 불필요
                product_name={item.product_name}
                current_month_price={item.current_month_price}
                previous_month_price={item.previous_month_price}
                previous_two_months_price={item.previous_two_months_price}
              />
            ))}
      </PriceWrapper>
    </Container>
  );
}

export default PriceNameSearchPage;
