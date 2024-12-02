import React from "react";
import styled from "styled-components";
import Button from "../Button";

const Container = styled.div`
  width: 170px;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 4px;
`;

const Text = styled.div`
  font-family: "Inter", sans-serif;
  white-space: pre-wrap;

  &.title {
    font-size: 13px;
    font-weight: 700;
  }

  &.sub {
    font-size: 13px;
    font-weight: 400;
  }

  &.dosage {
    font-size: 10px;
    font-weight: 400;
    color: #979797;
  }
`;

function CurrentPriceItem(props) {
  const { product_name, current_month_price, price_decline, handler } = props;

  return (
    <Container>
      <TextContainer>
        <Text className="title">
          {product_name ? product_name : "상품 이름"}
        </Text>
        <Text className="sub">
          {current_month_price ? current_month_price : "이번달 물가"}
        </Text>
        <Text className="dosage">
          {price_decline ? price_decline : "변동률"}
        </Text>
      </TextContainer>
      <Button className="green" title="추가" onClick={handler} />
    </Container>
  );
}

export default CurrentPriceItem;
