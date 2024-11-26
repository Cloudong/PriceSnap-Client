import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import MainBar from "../../bar/MainBar";

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
  const navigate = useNavigate();
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
        <Text className="type">전주 대비</Text>
      </Wrapper>
    </Container>
  );
}

export default PriceMainPage;
