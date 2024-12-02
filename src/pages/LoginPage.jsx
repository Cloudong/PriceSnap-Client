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

const LoginForm = styled.form`
  width: 320px;
  height: 276px;
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

function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(id, password);
      navigate("/", { replace: true });
    } catch (err) {
      console.error("로그인 실패:", err);
    }
  };

  return (
    <Container>
      <MainBar />
      <LoginForm onSubmit={handleLogin}>
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
        <Button title="로그인" className="yellow" onClick={handleLogin} />
      </LoginForm>
    </Container>
  );
}

export default LoginPage;
