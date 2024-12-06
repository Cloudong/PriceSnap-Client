import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ShoppingBudget from "./ShoppingBudget";
import ShoppingList from "./ShoppingList";
import { useUser } from "../../api/UserContext";

const Container = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

function ShoppingComponent({ hideButtons }) {
  const { token } = useUser();
  const [items, setItems] = useState([]);
  const [budget, setBudget] = useState(0);
  const [present, setPresent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchShoppingList = async () => {
      try {
        const response = await fetch(
          "https://rw2644hx4c.execute-api.us-east-1.amazonaws.com/api/carts",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("리스트 불러오기에 실패했습니다.");
        }

        const data = await response.json();
        setItems(data.cart.cart_items || []);
        setBudget(data.cart.budget);
        setPresent(data.cart.total_price);
        console.log(data);
      } catch (error) {
        console.error("리스트 불러오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchShoppingList();
    }
  }, [token]);

  return (
    <Container>
      <ShoppingBudget
        budget={budget == null ? 0 : budget}
        present={present == null ? 0 : present}
        hideButtons={hideButtons}
      />
      <ShoppingList
        items={items}
        setItems={setItems}
        isLoading={isLoading}
        hideButtons={hideButtons}
      />
    </Container>
  );
}

export default ShoppingComponent;
