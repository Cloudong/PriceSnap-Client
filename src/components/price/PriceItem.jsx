import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Button";
import { useUser } from "../../api/UserContext";

const Container = styled.div`
  width: 809px;
  height: 60px;
  padding-left: 80px;
  padding-right: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  border: 1px solid #432a00;
`;

const TextContainer = styled.div`
  width: 350px;
  display: flex;
  text-align: center;
  align-items: center;
  gap: 70px;
`;

const Text = styled.div`
  font-family: "Inter", sans-serif;
  white-space: pre-wrap;

  &.title {
    width: 120px;
    font-size: 24px;
    font-weight: 700;
    text-align: left;
  }

  &.increment {
    width: 100px;
    font-size: 20px;
    font-weight: 800;
    color: #d53d3d;
  }

  &.decrement {
    width: 100px;
    font-size: 20px;
    font-weight: 800;
    color: #8fa86a;
  }

  &.count {
    width: 30px;
    color: #000;
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    border: 0.8px solid #000;
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
    product_id,
    product_name,
    current_month_price,
    previous_month_price,
    previous_two_months_price,
  } = props;

  const [count, setCount] = useState(1);
  const { token } = useUser();

  const handleAddToCart = async () => {
    try {
      const response = await fetch(
        "https://rw2644hx4c.execute-api.us-east-1.amazonaws.com/api/carts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            product_id: product_id,
            quantity: count,
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

  const handleDecrement = () => {
    setCount((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const getTextClassproduct_Name = (price) => {
    return price > 100 ? "increment" : "decrement";
  };

  return (
    <Container>
      <Text className="title">{product_name ? product_name : "상품 이름"}</Text>
      <TextContainer>
        <Text className={`${getTextClassproduct_Name(previous_month_price)}`}>
          {previous_month_price ? previous_month_price : "null"}
        </Text>
        <Text className={`${getTextClassproduct_Name(current_month_price)}`}>
          {current_month_price ? current_month_price : "null"}
        </Text>
        <Text
          className={`${getTextClassproduct_Name(previous_two_months_price)}`}
        >
          {previous_two_months_price ? previous_two_months_price : "null"}
        </Text>
      </TextContainer>
      <CountContainer>
        <CountButton onClick={handleDecrement}>-</CountButton>
        <Text className="count">{count}</Text>
        <CountButton onClick={() => setCount((prev) => prev + 1)}>
          +
        </CountButton>
      </CountContainer>
      <Button className="green" title="추가" onClick={handleAddToCart} />
    </Container>
  );
}

export default PriceItem;
