import React from "react";
import styled from "styled-components";

//전체 button style

const StyledButton = styled.button`
  min-width: 135px;
  height: 32px;
  display: inline-block;
  text-align: center;
  overflow: hidden;
  padding: 0 20px;
  font-family: "Inter-Regular", Helvetica;
  font-weight: 400;
  font-size: 14px;
  color: white;
  border-radius: 8px;

  &.yellow {
    background-color: #daa520;
    border: 1px solid #daa520;
  }

  &.brown {
    background-color: #432a00;
    border: 1px solid #432a00;
  }

  &.green {
    background-color: #48582f;
    border: 1px solid #48582f;
  }

  &.red {
    background-color: #d53d3d;
    border: 1px solid #d53d3d;
  }
`;

function Button(props) {
  const { title, onClick, className } = props;
  return (
    <StyledButton onClick={onClick} className={className}>
      {title || "button"}
    </StyledButton>
  );
}

export default Button;
