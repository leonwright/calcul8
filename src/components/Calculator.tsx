import React, { useEffect } from "react";
import styled from "styled-components";
import CalculatorKey from "./CalculatorKey";
import { calculatorLayout } from "./calculatorLayout";

// Generate styled component for the calculator
const StyledCalculator = styled.div`
  .calculator {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: 100%;
    background-color: #f5f5f5;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  .calculator-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50%;
    background-color: #fff;
    border: 1px solid #ccc;
  }
  .calculator-display-value {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 2rem;
    font-weight: bold;
    color: #000;
    text-align: center;
  }
  .calculator-keypad {
    display: flex;

    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: #fff;
    overflow: hidden;
  }
  .calculator-keypad-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: fit-content;
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 1rem;
    overflow: hidden;
  }
`;

const Calculator = () => {
  const [displayValue, setDisplayValue] = React.useState("0");

  // when a number is pressed, update the display value
  const handleNumberClick = (number: string) => {
    if (displayValue === "0") {
      setDisplayValue(number);
    } else {
      setDisplayValue(displayValue + number);
    }
  };

  // when an operator is pressed, update the display value
  const handleOperationClick = (operation: string) => {
    if (displayValue === "0") {
      setDisplayValue("0");
    } else {
      setDisplayValue(displayValue + operation);
    }
  };

  // calculate the result of the display value
  const calculateResult = () => {
    const result = eval(displayValue);
    setDisplayValue(result.toString());
  };

  return (
    <StyledCalculator>
      <div data-testid="calculator" className="calculator">
        <div className="calculator-display">
          <div
            className="calculator-display-value"
            data-testid="display"
            id="display"
          >
            {displayValue}
          </div>
        </div>
        <div className="calculator-keypad">
          {calculatorLayout.map((row, rowIndex) => (
            <div className="calculator-keypad-row" key={rowIndex}>
              {row.map((key, keyIndex) => (
                <CalculatorKey
                  key={keyIndex}
                  keyValue={key.keyValue}
                  keyType={key.keyType as "number" | "operation" | "equals"}
                  onClick={
                    key.keyType === "number"
                      ? handleNumberClick
                      : key.keyType === "operation"
                      ? handleOperationClick
                      : calculateResult
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </StyledCalculator>
  );
};

export default Calculator;
