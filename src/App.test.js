import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { replaceCamelWithSpaces } from "./App";
test("button has correct initial color, and update when clicked", () => {
	render(<App />);
	// 버튼을 가지고 있고 알맞는 텍스트를 가지고 있는지 테스트
	const colorButton = screen.getByRole("button", {
		name: "Change to Midnight Blue",
	});
	expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });
	// click button
	fireEvent.click(colorButton);
	// expect the backgroud color to be blue
	expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });
	// expect the button text to be "Change to red"
	expect(colorButton).toHaveTextContent("Change to Medium Violet Red");
});

// 초기 - 버튼은 활성화 상태, 체크박스는 체크되지 않은 상태
test("initial conditions of button and checkbox", () => {
	render(<App />);
	// check that the button starts out enabled
	const colorButton = screen.getByRole("button", {
		name: "Change to Midnight Blue",
	});
	expect(colorButton).toBeEnabled();
	// check that the checkbox starts out unchecked
	const checkbox = screen.getByRole("checkbox");
	expect(checkbox).not.toBeChecked();
});

test("button disabled when checkbox checked, vise versa", () => {
	render(<App />);
	const colorButton = screen.getByRole("button", {
		name: "Change to Midnight Blue",
	});
	const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
	// checkbox first click
	fireEvent.click(checkbox);
	expect(colorButton).toBeDisabled();
	expect(checkbox).toBeChecked();
	// checkbox second click
	fireEvent.click(checkbox);
	expect(colorButton).toBeEnabled();
	expect(checkbox).not.toBeChecked();
});

// 버튼이 비활성화되었을 때 버튼의 색을 회색으로 바꿈
test("button color changes to gray when checkbox checked, vise versa", () => {
	render(<App />);
	const colorButton = screen.getByRole("button", {
		name: "Change to Midnight Blue",
	});
	const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
	// button disabled
	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle({ backgroundColor: "gray" });
	// button re-enabled
	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle({ backgroundColor: "Medium Violet Red" });
});

test("disabled color has gray color and changes to blue when click button", () => {
	render(<App />);
	const colorButton = screen.getByRole("button", {
		name: "Change to Midnight Blue",
	});
	const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
	// change button color to blue
	fireEvent.click(colorButton);
	// button disabled
	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle({ backgroundColor: "gray" });
	// button re-enabled
	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle({ backgroundColor: "Midnight Blue" });
});

describe("spaces before camel-case capital letters", () => {
	test("Works for no inner capital letter", () => {
		expect(replaceCamelWithSpaces("Red")).toBe("Red");
	});
	test("Works for one inner capital letter", () => {
		expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
	});
	test("Works for multiple inner capital letters", () => {
		expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
	});
});
