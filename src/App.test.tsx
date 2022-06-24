import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// test that the app renders
test("renders the app", () => {
  render(<App />);
  const app = screen.getByTestId("app");
  expect(app).toBeInTheDocument();
});
