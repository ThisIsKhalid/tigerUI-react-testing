import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";

test("renders the button with the correct text", () => {
  const buttonText = "Click me";
  render(<Button onClick={() => {}}>{buttonText}</Button>);

  const buttonElement = screen.getByText(buttonText);
  expect(buttonElement).toBeInTheDocument();
});

test("calls the onClick callback when the button is clicked", () => {
  const onClickMock = jest.fn();
  render(<Button onClick={onClickMock}>Click me</Button>);

  const buttonElement = screen.getByText("Click me");
  fireEvent.click(buttonElement);

  expect(onClickMock).toHaveBeenCalledTimes(1);
});
