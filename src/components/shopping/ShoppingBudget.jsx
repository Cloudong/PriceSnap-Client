import React from "react";
import styled from "styled-components";
import { FiDollarSign } from "react-icons/fi";

const Container = styled.div`
  width: 520px;
  height: 180px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid #432a00;
`;

const ContentContainer = styled.div`
  width: 269px;
  height: 48px;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Text = styled.div`
  font-family: "Inter", sans-serif;
  white-space: pre-wrap;
  font-size: 22px;
  font-weight: 600;
  min-width: 100px;

  &.budget {
    color: #daa520;
  }

  &.present {
    color: #47572f;
  }

  &.warning {
    color: #d53d3d;
  }

  &.stable {
    color: #47572f;
  }

  &.money {
    text-align: right;
    color: #432a00;
  }
`;

function ShoppingBudget(props) {
  const { budget, present } = props;
  const state = budget - present;
  return (
    <Container>
      <ContentContainer>
        <FiDollarSign color="#daa520" size={32} />
        <Text className="budget">예산</Text>
        <Text className="money">{`${budget}`}₩</Text>
      </ContentContainer>
      <ContentContainer>
        <FiDollarSign color="#47572f" size={32} />
        <Text className="present">현재</Text>
        <Text className="money">{`${present}`}₩</Text>
      </ContentContainer>
      <hr color="#432a00" width="520px" height="1px" />
      <ContentContainer>
        <FiDollarSign color="#432a00" size={32} />
        <Text className={state >= 0 ? "stable" : "warning"}>
          {state >= 0 ? "안정" : "초과"}
        </Text>
        <Text className="money">{state}₩</Text>
      </ContentContainer>
    </Container>
  );
}

export default ShoppingBudget;
