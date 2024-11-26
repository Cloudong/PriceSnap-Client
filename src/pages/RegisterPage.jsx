import React, { useState } from "react";
import styled from "styled-components";
import MainBar from "../bar/MainBar";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import InputFieldContainer from "../components/InputFieldContainer";

const Container = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
`;

const RegisterForm = styled.form`
  width: 320px;
  height: 380px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin: 16px auto;
  border: 1px solid #d9d9d9;
  padding: 26px 32px 32px;
  border-radius: 8px;
`;

function RegisterPage() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http:///api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: id, password, name: name }),
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.log(id + " " + name + " " + password);
        console.error("Register error");
      }
    } catch (error) {
      console.error("Register error:", error);
    }
  };

  return (
    <Container>
      <MainBar />
      <RegisterForm onSubmit={handleRegister}>
        <InputFieldContainer
          label="닉네임"
          name="닉네임"
          value={name}
          placeholder="닉네임을 입력해주세요"
          onChange={(e) => setName(e.target.value)}
        />
        <InputFieldContainer
          label="아이디"
          name="아이디"
          value={id}
          placeholder="아이디를 입력해주세요"
          onChange={(e) => setId(e.target.value)}
        />
        <InputFieldContainer
          label="비밀번호"
          name="비밀번호"
          value={password}
          placeholder="비밀번호를 입력해주세요"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button title="회원가입" className="brown" />
      </RegisterForm>
    </Container>
  );
}

export default RegisterPage;
