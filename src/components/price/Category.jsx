import React, { useState } from "react";
import styled from "styled-components";
import categoriesData from "../../data/category.json";

const CategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px;
  padding-top: 70px;
`;

const CategoryWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
`;

const CategoryColumn = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  border: 1px solid #afb1b6;
`;

const CategoryItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? "#DAA520" : "#FFFFFF")};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.isSelected ? "#DAA520" : "#FFFFFF")};
  }
`;

const CategoryName = styled.span`
  font-size: 14px;
  color: ${(props) => (props.isSelected ? "#FFFFFF" : "#61646B")};
`;

const Category = () => {
  const [selectedItems, setSelectedItems] = useState({});

  const handleSelect = (depth, id) => {
    setSelectedItems((prev) => ({
      ...prev,
      [depth]: id,
    }));
  };

  const renderCategories = () => {
    const columns = [];
    let currentCategories = categoriesData.categories;
    let depth = 0;

    while (currentCategories && currentCategories.length > 0) {
      const currentDepth = depth;
      columns.push(
        <CategoryColumn key={`depth-${depth}`}>
          {currentCategories.map((category) => (
            <CategoryItem
              key={category.id}
              isSelected={selectedItems[currentDepth] === category.id}
              onClick={() => handleSelect(currentDepth, category.id)}
            >
              <CategoryName
                isSelected={selectedItems[currentDepth] === category.id}
              >
                {category.name}
              </CategoryName>
            </CategoryItem>
          ))}
        </CategoryColumn>
      );

      const selectedCategory = currentCategories.find(
        // eslint-disable-next-line no-loop-func
        (cat) => cat.id === selectedItems[depth]
      );
      currentCategories = selectedCategory?.subCategories;
      depth++;
    }

    return columns;
  };

  return (
    <CategoryContainer>
      <CategoryWrapper>{renderCategories()}</CategoryWrapper>
    </CategoryContainer>
  );
};

export default Category;
