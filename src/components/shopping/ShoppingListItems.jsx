import React from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import ShoppingItem from "./ShoppingItem";

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DraggableItem = styled.div`
  display: flex;
  align-items: center;
  background: ${(props) => (props.$isDragging ? "#f5f5f5" : "white")};
  border-radius: 8px;
  transition: all 0.2s ease;
`;

const DragHandle = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  cursor: grab;
  color: #888;

  &::before,
  &::after {
    content: "•••";
    font-size: 14px;
    line-height: 4px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: max-content;
  margin-bottom: 70px;
`;

const Text = styled.div`
  font-family: "Inter", sans-serif;
  white-space: pre-wrap;
  color: #daa520;

  &.title {
    font-size: 28px;
    font-weight: 700;
    padding-top: 40px;
    padding-bottom: 8px;
  }

  &.sub {
    font-size: 24px;
    font-weight: 400;
  }
`;

function ShoppingListItems({ items, onDelete, hideButtons }) {
  if (items.length === 0) {
    return (
      <TextContainer>
        <Text className="title">등록된 장바구니 상품이 없습니다</Text>
        <Text className="sub">새로운 상품을 등록해보세요!</Text>
      </TextContainer>
    );
  }

  return (
    <Droppable droppableId="droppable">
      {(provided) => (
        <ItemList {...provided.droppableProps} ref={provided.innerRef}>
          {items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <DraggableItem
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  $isDragging={snapshot.isDragging}
                >
                  <div {...provided.dragHandleProps}>
                    <DragHandle />
                  </div>
                  <ShoppingItem
                    name={item.name}
                    price={item.price}
                    num={item.num}
                    handler={() => onDelete(index)}
                    hideButtons={hideButtons}
                  />
                </DraggableItem>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ItemList>
      )}
    </Droppable>
  );
}

export default ShoppingListItems;
