import React, { useState } from "react";
import styled from "styled-components";
import MainBar from "../bar/MainBar";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import InputFieldContainer from "../components/InputFieldContainer";
import { useUser } from "../api/UserContext";

const Container = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
`;

const MyPageForm = styled.form`
  width: 320px;
  height: 276px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px auto;
  gap: 30px;
  border: 1px solid #d9d9d9;
  padding: 26px 32px 32px;
  border-radius: 8px;
`;

function MyPage() {
  const [name, setName] = useState("");
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://rw2644hx4c.execute-api.us-east-1.amazonaws.com/api/users/update-name",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newName: name }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      navigate("/");
      window.location.reload();
      console.log("닉네임 수정 성공");
    } catch (err) {
      console.log("닉네임 수정 실패");
    }
  };

  return (
    <Container>
      <MainBar />
      <MyPageForm onSubmit={handleSubmit}>
        <InputFieldContainer
          label="닉네임"
          name="닉네임"
          value={name}
          placeholder="닉네임을 입력해주세요"
          onChange={(e) => setName(e.target.value)}
        />
        <Button title="프로필 수정 완료" className="brown" />
        <Button
          title="로그아웃"
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="red"
        />
      </MyPageForm>
    </Container>
  );
}

export default MyPage;
