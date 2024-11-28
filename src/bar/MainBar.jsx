import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/Logo.png";
import Button from "../components/Button";
import { FiUser } from "react-icons/fi";
import { useUser } from "../api/UserContext";

const Container = styled.div`
  width: calc(100%);
  display: flex;
  justify-content: space-between;
  padding: 22px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-right: 22px;
  gap: 10px;

  &.icon {
    align-items: center;
    gap: 15px;
  }
`;

const LogoImage = styled.div`
  width: 205px;
  height: 38px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  margin-left: 22px;
`;

const NavItem = styled(NavLink)`
  text-decoration: none;
  color: inherit;

  &.active {
    opacity: 1;
  }

  &:hover {
    text-decoration: underline;
  }
`;

function MainBar() {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <Container>
      <NavItem to="/" exact="true">
        <LogoImage image={Logo}></LogoImage>
      </NavItem>
      {user ? (
        <ButtonContainer className="icon">
          <FiUser
            size="30"
            onClick={() => {
              navigate("/mypage");
            }}
          />
        </ButtonContainer>
      ) : (
        <ButtonContainer>
          <NavItem to="/login">
            <Button title="로그인" className="yellow"></Button>
          </NavItem>
          <NavItem to="/register">
            <Button title="회원가입" className="brown"></Button>
          </NavItem>
        </ButtonContainer>
      )}
    </Container>
  );
}

export default MainBar;
