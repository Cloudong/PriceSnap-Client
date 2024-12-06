import React from "react";
import styled from "styled-components";
import Button from "../Button";

const Container = styled.div`
  width: 320px;
  height: 100px;
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
    font-size: 21px;
    font-weight: 700;
  }

  &.sub {
    font-size: 19px;
    font-weight: 400;
  }

  &.dosage {
    font-size: 17px;
    font-weight: 400;
    color: #979797;
  }
`;

function ShoppingItem(props) {
  const { name, price, num, handler, hideButtons } = props;

  return (
    <Container>
      <TextContainer>
        <Text className="title">{name ? name : "상품 이름"}</Text>
        <Text className="sub">{price ? price : "상품 가격"}</Text>
        <Text className="dosage">{num ? num : "담은 개수"}</Text>
      </TextContainer>
      {!hideButtons && (
        <Button className="delete" title="삭제" onClick={handler} />
      )}
    </Container>
  );
}

export default ShoppingItem;
