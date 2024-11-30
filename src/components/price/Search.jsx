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

function Search(props) {
  const { handleSearch } = props;
  const [search, setSearch] = useState("");

  return (
    <InputContainer>
      <InputField
        label="검색창"
        value={search}
        placeholder="약 이름을 입력해주세요"
        onChange={(e) => setSearch(e.target.value)}
      />
      <FiSearch size="48" onClick={handleSearch} />
    </InputContainer>
  );
}

export default Search;
