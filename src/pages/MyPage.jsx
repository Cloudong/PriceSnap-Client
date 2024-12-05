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
  const { logout, token, user, setUser } = useUser();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://rw2644hx4c.execute-api.us-east-1.amazonaws.com/api/users/update-name",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            newName: name,
          }),
        }
      );

      if (response.ok) {
        const updatedUser = { ...user, name: name };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);

        alert("닉네임이 성공적으로 변경되었습니다.");
        navigate("/");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error("Error updating name:", error);
      alert("닉네임 변경에 실패했습니다.");
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
        <Button type="submit" title="프로필 수정 완료" className="brown" />
        <Button
          type="button"
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
