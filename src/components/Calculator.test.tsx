import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Calculator from "./Calculator";
import { act } from "react-dom/test-utils";

// test that the calculator renders
test("renders the calculator", () => {
  render(<Calculator />);
  const calculator = screen.getByTestId("calculator");
  expect(calculator).toBeInTheDocument();
});

// test that the calculator displays the correct value
test("displays the correct value", () => {
  render(<Calculator />);
  const display = screen.getByTestId("display");
  expect(display).toHaveTextContent("0");
});

// test that the calculator displays the correct value after a number is pressed
test("displays the correct value after a number is pressed", async () => {
  render(<Calculator />);
  const number = screen.getByTestId("number-7");
  act(() => {
    number.click();
  });

  const display = await screen.findByTestId("display");
  expect(display).toHaveTextContent("7");
});

// test when an operator is pressed, the display value is updated
test("displays the correct value after an operator is pressed", async () => {
  render(<Calculator />);
  const number = screen.getByTestId("number-7");
  act(() => {
    number.click();
  });

  const operation = screen.getByTestId("operation-/");
  act(() => {
    operation.click();
  });

  const display = await screen.findByTestId("display");
  expect(display).toHaveTextContent("7");
});

// test divistion
test("division", async () => {
  render(<Calculator />);
  const number1 = screen.getByTestId("number-1");
  const number0 = screen.getByTestId("number-0");
  const number2 = screen.getByTestId("number-2");
  const operation = screen.getByTestId("operation-/");
  const equals = screen.getByTestId("equals");
  act(() => {
    number1.click();
    number0.click();
    operation.click();
    number2.click();
  });

  act(() => {
    equals.click();
  });

  const display = await screen.findByTestId("display");
  expect(display).toHaveTextContent("2");
});

// test multiplication
test("multiplication", async () => {
  render(<Calculator />);
  const number1 = screen.getByTestId("number-1");
  const number0 = screen.getByTestId("number-0");
  const number2 = screen.getByTestId("number-2");
  const operation = screen.getByTestId("operation-*");
  const equals = screen.getByTestId("equals");
  act(() => {
    number1.click();
  });

  act(() => {
    number0.click();
  });

  act(() => {
    operation.click();
  });

  act(() => {
    number2.click();
  });

  act(() => {
    equals.click();
  });

  const display = await screen.findByTestId("display");
  expect(display).toHaveTextContent("20");
});

// test addition
test("addition", async () => {
  render(<Calculator />);
  const number1 = screen.getByTestId("number-1");
  const number0 = screen.getByTestId("number-0");
  const number2 = screen.getByTestId("number-2");
  const operation = screen.getByTestId("operation-+");
  const equals = screen.getByTestId("equals");
  act(() => {
    number1.click();
  });

  act(() => {
    number0.click();
  });

  act(() => {
    operation.click();
  });

  act(() => {
    number2.click();
  });

  act(() => {
    equals.click();
  });

  const display = await screen.findByTestId("display");
  expect(display).toHaveTextContent("12");
});

// test subtraction
test("subtraction", async () => {
  render(<Calculator />);
  const number9 = screen.getByTestId("number-9");
  const number8 = screen.getByTestId("number-8");
  const number2 = screen.getByTestId("number-2");
  const operation = screen.getByTestId("operation--");
  const equals = screen.getByTestId("equals");
  act(() => {
    number9.click();
  });

  act(() => {
    number8.click();
  });

  act(() => {
    operation.click();
  });

  act(() => {
    number2.click();
  });

  act(() => {
    equals.click();
  });

  const display = await screen.findByTestId("display");
  expect(display).toHaveTextContent("96");
});

// test handleNumberClick
test("handleNumberClick", async () => {
  render(<Calculator />);
  const number = screen.getByTestId("number-7");
  act(() => {
    number.click();
  });

  const display = await screen.findByTestId("display");
  expect(display).toHaveTextContent("7");
});

// test clearDisplay
test("clearDisplay", async () => {
  render(<Calculator />);
  const number = screen.getByTestId("number-7");
  act(() => {
    number.click();
  });

  const clear = screen.getByTestId("clear");
  act(() => {
    clear.click();
  });

  const display = await screen.findByTestId("display");
  expect(display).toHaveTextContent("0");
});

// test keydown event
test("keydown event", async () => {
  render(<Calculator />);
  fireEvent.keyDown(window, { key: "7" });
  fireEvent.keyDown(window, { key: "+" });
  fireEvent.keyDown(window, { key: "7" });
  fireEvent.keyDown(window, { key: "Enter" });

  const display = await screen.findByTestId("display");
  expect(display).toHaveTextContent("14");
});
