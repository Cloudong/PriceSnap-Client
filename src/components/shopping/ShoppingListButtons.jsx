import React from "react";
import styled from "styled-components";
import Button from "../Button";

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  flex-direction: column;
`;

function ShoppingListButtons({ onSave, onAddNew, onDeleteLowest }) {
  return (
    <ButtonGroup>
      <Button title="저장하기" className="brown" onClick={onSave} />
      <Button
        title="새로운 상품 추가하기"
        className="green"
        onClick={onAddNew}
      />
      <Button
        title="우선순위 최하위 상품 삭제하기"
        className="yellow"
        onClick={onDeleteLowest}
      />
    </ButtonGroup>
  );
}

export default ShoppingListButtons;
