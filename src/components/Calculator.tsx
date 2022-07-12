import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import CalculatorKey from "./CalculatorKey";
import { calculatorLayout } from "./calculatorLayout";

const StyledCalculator = styled.div`
  .calculator {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: 100%;
    background-color: #1795d4;
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
    overflow-x: scroll;
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

  const handleNumberClick = useCallback(
    (number: string) => {
      if (displayValue === "0") {
        setDisplayValue(number);
      } else {
        setDisplayValue(displayValue + number);
      }
    },
    [displayValue]
  );

  const handleOperationClick = useCallback(
    (operation: string) => {
      if (displayValue === "0") {
        setDisplayValue("0");
      } else {
        setDisplayValue(displayValue + operation);
      }
    },
    [displayValue]
  );

  const calculateResult = useCallback(() => {
    const result = eval(displayValue);
    setDisplayValue(result.toString());
  }, [displayValue]);

  const clearDisplay = () => {
    setDisplayValue("0");
  };

  const handleBackspace = useCallback(() => {
    if (displayValue.length > 1) {
      setDisplayValue(displayValue.slice(0, -1));
    } else {
      setDisplayValue("0");
    }
  }, [displayValue]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // handle number keys
      if (parseInt(e.key) >= 0 && parseInt(e.key) <= 9) {
        handleNumberClick(e.key);
      }

      // handle backspace key
      if (e.key === "Backspace") {
        handleBackspace();
      }

      // handle operator keys
      if (e.key === "*" || e.key === "/" || e.key === "+" || e.key === "-") {
        handleOperationClick(e.key);
      }

      // handle enter as equals key
      if (e.key === "Enter") {
        calculateResult();
      }
    };
    // add keydown event listener
    window.addEventListener("keydown", handleKeyDown);

    // remove keydown event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    calculateResult,
    displayValue,
    handleBackspace,
    handleNumberClick,
    handleOperationClick,
  ]);

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
                  keyType={
                    key.keyType as "number" | "operation" | "equals" | "clear"
                  }
                  displayValue={key.displayValue}
                  onClick={
                    key.keyType === "number"
                      ? handleNumberClick
                      : key.keyType === "operation"
                      ? handleOperationClick
                      : key.keyType === "clear"
                      ? clearDisplay
                      : key.keyType === "equals"
                      ? calculateResult
                      : handleBackspace
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
