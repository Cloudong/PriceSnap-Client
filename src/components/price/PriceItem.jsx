import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Button";

const Container = styled.div`
  width: 809px;
  height: 60px;
  padding-left: 110px;
  padding-right: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  border: 1px solid #432a00;
`;

const TextContainer = styled.div`
  display: flex;
  text-align: left;
  gap: 70px;
`;

const Text = styled.div`
  font-family: "Inter", sans-serif;
  white-space: pre-wrap;

  &.title {
    font-size: 24px;
    font-weight: 700;
  }

  &.increment {
    font-size: 20px;
    font-weight: 800;
    color: #8fa86a;
  }

  &.decrement {
    font-size: 20px;
    font-weight: 800;
    color: #d53d3d;
  }

  &.count {
    color: #000;
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    border: 0.8px solid #000;
    min-width: 28px;
  }
`;

const CountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 10px;
`;

const CountButton = styled.button`
  width: 22px;
  height: 22px;
  display: inline-block;
  text-align: center;
  overflow: hidden;
  border-radius: 7px;
  background: #d9d9d9;
  border: 1px solid #d9d9d9;
`;

function PriceItem(props) {
  const {
    name,
    current_week_price,
    previous_month_price,
    previous_week_price,
  } = props;

  const [count, setCount] = useState(1);

  const handleDecrement = () => {
    setCount((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const getTextClassName = (price) => {
    return price > 0 ? "increment" : "decrement";
  };

  return (
    <Container>
      <Text className="title">{name ? name : "상품 이름"}</Text>
      <TextContainer>
        <Text className={`${getTextClassName(previous_month_price)}`}>
          {previous_month_price ? previous_month_price : "null"}
        </Text>
        <Text className={`${getTextClassName(current_week_price)}`}>
          {current_week_price ? current_week_price : "null"}
        </Text>
        <Text className={`${getTextClassName(previous_week_price)}`}>
          {previous_week_price ? previous_week_price : "null"}
        </Text>
      </TextContainer>
      <CountContainer>
        <CountButton onClick={handleDecrement}>-</CountButton>
        <Text className="count">{count}</Text>
        <CountButton onClick={() => setCount((prev) => prev + 1)}>
          +
        </CountButton>
      </CountContainer>
      <Button className="green" title="추가" />
    </Container>
  );
}

export default PriceItem;
