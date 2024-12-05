import React, { useState } from "react";
import styled from "styled-components";
import { FiDollarSign } from "react-icons/fi";
import Button from "../Button";
import { useUser } from "../../api/UserContext";

const Container = styled.div`
  width: 100%;
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

const TextMain = styled.div`
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

const BudgetInputContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 20px;
`;

const BudgetInput = styled.input`
  width: 200px;
  height: 40px;
  padding: 0 10px;
  border: 2px solid #daa520;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #47572f;
  }
`;

function ShoppingBudget({ budget, present, hideButtons }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState("");
  const state = budget - present;
  const user = useUser();

  const handleSetBudget = async () => {
    if (!newBudget || isNaN(newBudget)) {
      alert("올바른 금액을 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(
        "https://rw2644hx4c.execute-api.us-east-1.amazonaws.com/api/budgets",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            budget: parseInt(newBudget),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("예산 설정에 실패했습니다.");
      }

      // API 호출 성공 후 페이지 새로고침
      window.location.reload();
    } catch (error) {
      console.error("예산 설정 실패:", error);
      alert("예산 설정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (budget == null && !hideButtons) {
    return (
      <>
        {isEditing ? (
          <BudgetInputContainer>
            <BudgetInput
              type="number"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
              placeholder="예산을 입력하세요"
            />
            <Button title="설정" className="brown" onClick={handleSetBudget} />
            <Button
              title="취소"
              className="yellow"
              onClick={() => setIsEditing(false)}
            />
          </BudgetInputContainer>
        ) : (
          <Button
            title="예산 설정하기"
            className="green"
            onClick={() => setIsEditing(true)}
          />
        )}
        <TextMain className="title">등록된 예산이 없습니다</TextMain>
        <TextMain className="sub">내 예산을 설정해보세요!</TextMain>
      </>
    );
  }

  return (
    <Container>
      <ContentContainer>
        <FiDollarSign color="#daa520" size={32} />
        <Text className="budget">예산</Text>
        <Text className="money">{`${budget}`}₩</Text>
        {!hideButtons && (
          <Button
            title="수정"
            className="green"
            onClick={() => setIsEditing(true)}
          />
        )}
      </ContentContainer>
      {isEditing && (
        <BudgetInputContainer>
          <BudgetInput
            type="number"
            value={newBudget}
            onChange={(e) => setNewBudget(e.target.value)}
            placeholder="새로운 예산을 입력하세요"
          />
          <Button title="설정" className="brown" onClick={handleSetBudget} />
          <Button
            title="취소"
            className="yellow"
            onClick={() => setIsEditing(false)}
          />
        </BudgetInputContainer>
      )}
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
