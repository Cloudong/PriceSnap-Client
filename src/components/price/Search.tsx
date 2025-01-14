import React, { useState } from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";

const InputContainer = styled.div`
  width: 917px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 50px;
`;

const InputField = styled.input`
  display: block;
  width: 830px;
  height: 40px;
  border: 1px solid #d9d9d9;
  border-radius: 100px;
  padding-left: 20px;
  font-size: 16px;

  &:focus {
    outline: 3px auto grey;
    outline-offset: 2px;
    border-color: transparent;
  }
`;

function Search({ onSearch }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputContainer>
        <InputField
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="검색어를 입력하세요"
        />
        <FiSearch
          style={{ cursor: "pointer" }}
          onClick={handleSubmit}
          size={24}
        />
      </InputContainer>
    </form>
  );
}

export default Search;
