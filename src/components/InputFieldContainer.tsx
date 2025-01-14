import React from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Text = styled.div`
  font-family: "Inter", sans-serif;
  white-space: pre-wrap;
  font-size: 18px;
  font-weight: 400;
`;

const InputField = styled.input`
  display: block;
  width: 240px;
  height: 16px;
  padding: 12px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;

  &:focus {
    outline: 3px auto grey;
    outline-offset: 2px;
    border-color: transparent;
  }
`;

const InputFieldContainer = ({
  label,
  name,
  type,
  value,
  placeholder,
  onChange,
}) => (
  <InputContainer>
    <Text>{label}</Text>
    <InputField
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  </InputContainer>
);

export default InputFieldContainer;
