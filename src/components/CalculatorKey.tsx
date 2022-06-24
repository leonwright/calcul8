import React from "react";
import styled from "styled-components";

// interface for the CalculatorKey component props
interface CalculatorKeyProps {
  onClick: (number: string) => void;
  keyType: "number" | "operation" | "equals" | "clear";
  keyValue: string;
}

// Generate styled component for calculator key (button)
const StyledCalculatorKey = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25%;
  background-color: #fff;
  border-radius: 5px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #000;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  padding: 1rem;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const CalculatorKey = (props: CalculatorKeyProps) => {
  if (props.keyType === "number") {
    return (
      <StyledCalculatorKey
        id={`number-${props.keyValue}`}
        data-testid={`number-${props.keyValue}`}
        {...props}
        onClick={() => props.onClick(props.keyValue)}
      >
        {props.keyValue}
      </StyledCalculatorKey>
    );
  } else if (props.keyType === "operation") {
    return (
      <StyledCalculatorKey
        id={`operation-${props.keyValue}`}
        data-testid={`operation-${props.keyValue}`}
        {...props}
        onClick={() => props.onClick(props.keyValue)}
      >
        {props.keyValue}
      </StyledCalculatorKey>
    );
  } else {
    return (
      <StyledCalculatorKey
        id={`equals`}
        data-testid={`equals`}
        {...props}
        onClick={() => props.onClick(props.keyValue)}
      >
        {props.keyValue}
      </StyledCalculatorKey>
    );
  }
};

export default CalculatorKey;
