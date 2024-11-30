import React from "react";
import styled from "styled-components";
import MainBar from "../../bar/MainBar";
import Category from "../../components/price/Category";
import Button from "../../components/Button";

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

function PriceCategorySearchPage() {
  return (
    <Container>
      <MainBar />
      <Text className="title">상품 카테고리별 검색</Text>
      <Text className="sub">확인하고 싶은 카테고리를 클릭하세요</Text>
      <Category />
      <Button className="yellow" title="카테고리 선택 완료" />
      <Wrapper>
        <Text className="type">전월 대비</Text>
        <Text className="type">평균</Text>
        <Text className="type">전주 대비</Text>
      </Wrapper>
    </Container>
  );
}

export default PriceCategorySearchPage;
