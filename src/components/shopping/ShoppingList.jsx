import React, { useState } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ShoppingItem from "./ShoppingItem";

const ListContainer = styled.div`
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
  padding: 20px;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DraggableItem = styled.div.attrs((props) => ({
  style: {
    background: props.$isDragging ? "#f5f5f5" : "white",
    transition: "all 0.2s ease",
  },
}))`
  display: flex;
  align-items: center;
  border-radius: 8px;
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

function ShoppingList() {
  const [items, setItems] = useState([
    { id: "item-1", name: "타이레놀", price: "5,000원", num: "2개" },
    { id: "item-2", name: "후시딘", price: "8,000원", num: "1개" },
    { id: "item-3", name: "게보린", price: "3,000원", num: "3개" },
    { id: "item-4", name: "비타민C", price: "15,000원", num: "1개" },
    { id: "item-5", name: "파스", price: "4,500원", num: "2개" },
  ]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setItems(reorderedItems);
  };

  const handleDelete = (index) => {
    setItems(items.filter((_, idx) => idx !== index));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ListContainer>
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
                        handler={() => handleDelete(index)}
                      />
                    </DraggableItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ItemList>
          )}
        </Droppable>
      </ListContainer>
    </DragDropContext>
  );
}

export default ShoppingList;
