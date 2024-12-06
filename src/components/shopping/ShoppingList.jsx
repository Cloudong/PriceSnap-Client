import React from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext } from "@hello-pangea/dnd";
import styled from "styled-components";
import ShoppingListItems from "./ShoppingListItems";
import ShoppingListButtons from "./ShoppingListButtons";
import { useUser } from "../../api/UserContext";

const ListContainer = styled.div`
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
  padding: 20px;
`;

function ShoppingList({ items, setItems, isLoading, hideButtons }) {
  const navigate = useNavigate();
  const { token } = useUser();

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setItems(reorderedItems);
  };

  const handleDelete = (index) => {
    setItems(items.filter((_, idx) => idx !== index));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        "https://rw2644hx4c.execute-api.us-east-1.amazonaws.com/api/carts/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: items.map((item, index) => ({
              ...item,
              priority: index,
            })),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("저장에 실패했습니다.");
      }

      alert("장바구니가 저장되었습니다.");
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleAddNew = () => {
    navigate("/search");
  };

  const handleDeleteLowest = () => {
    if (items.length === 0) {
      alert("삭제할 상품이 없습니다.");
      return;
    }
    setItems((prevItems) => prevItems.slice(0, -1));
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <ListContainer>
        <ShoppingListItems
          items={items}
          onDelete={handleDelete}
          hideButtons={hideButtons}
        />
        {!hideButtons && (
          <ShoppingListButtons
            onSave={handleSave}
            onAddNew={handleAddNew}
            onDeleteLowest={handleDeleteLowest}
          />
        )}
      </ListContainer>
    </DragDropContext>
  );
}

export default ShoppingList;
