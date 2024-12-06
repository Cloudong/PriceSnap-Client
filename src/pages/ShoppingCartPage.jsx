import React from "react";
import styled from "styled-components";
import MainBar from "../bar/MainBar";
import ShoppingComponent from "../components/shopping/ShoppingComponent";

const Container = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ShoppingContainer = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
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
    padding-bottom: 30px;
  }

  &.type {
    color: #daa520;
    font-size: 32px;
    font-weight: 700;
  }
`;

function ShoppingCartPage() {
  return (
    <Container>
      <MainBar />
      <Text className="title">장바구니 관리</Text>
      <Text className="sub">수정하고 싶은 상품을 선택하세요</Text>
      <ShoppingContainer>
        <ShoppingComponent hideButtons={false} />
      </ShoppingContainer>
    </Container>
  );
}

export default ShoppingCartPage;
