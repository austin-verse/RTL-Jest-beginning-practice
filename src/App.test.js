import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { replaceCamelWithSpaces } from "./App";
// 내부 상태(state)를 테스트하는 것이 아닌, 해당 버튼에 설정된 초기 조건(condition)을 테스트하는 것
test("button has correct initial color, and update when clicked", () => {
	// 가상 DOM 랜더링
	render(<App />);
	// 가상 DOM에서 테스트할 요소 찾기
	// find an element with a role of button and its text "Change to blue"
	// 버튼을 가지고 있고 알맞는 텍스트를 가지고 있는지 테스트
	const colorButton = screen.getByRole("button", { name: "Change to blue" });

	// 단언문
	// expect the backgroud color to be red
	expect(colorButton).toHaveStyle({ backgroundColor: "red" });

	// click button
	fireEvent.click(colorButton);

	// expect the backgroud color to be blue
	expect(colorButton).toHaveStyle({ backgroundColor: "blue" });

	// expect the button text to be "Change to red"
	expect(colorButton).toHaveTextContent("Change to red");
});

// 체크 박스를 추가하여 체크 박스가 켜진 상태일 경우 버튼이 비활성화 되고 체크박스를 끄면 버튼이 다시 활성화됨
// 초기 - 버튼은 활성화 상태, 체크박스는 체크되지 않은 상태

test("initial conditions", () => {
	render(<App />);
	// check that the button starts out enabled
	const colorButton = screen.getByRole("button", { name: "Change to blue" });
	expect(colorButton).toBeEnabled();
	// check that the checkbox starts out unchecked
	const checkbox = screen.getByRole("checkbox");
	expect(checkbox).not.toBeChecked();
});

// 체크박스에 체크를 하고 버튼 비활성화 여부 확인
// 체크박스 체크를 해제하고 버튼의 활성화 여부 확인
// 버튼에 대한 단언으로 toBeEnabled 매처 사용
// 반대로는 toBeDisabled 매처 사용
// 초기조건 테스트와 분리

test("button disabled when checkbox checked, vise versa", () => {
	render(<App />);
	const colorButton = screen.getByRole("button", { name: "Change to blue" });
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
// 플로우 1. 버튼 비활성화 -> 버튼 회색 -> 버튼 활성화 -> 버튼 빨간색
// 플로우 2. 버튼 클릭 -> 버튼 비활성화 -> 버튼 회색
// 플로우 3. 버튼 활성화 -> 버튼 파랑색
test("button color changes to gray when checkbox checked, vise versa", () => {
	render(<App />);
	const colorButton = screen.getByRole("button", { name: "Change to blue" });
	const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

	// button disabled
	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

	// button re-enabled
	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle({ backgroundColor: "red" });
});

test("disabled color has gray color and changes to blue when click button", () => {
	render(<App />);
	const colorButton = screen.getByRole("button", { name: "Change to blue" });
	const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

	// change button color to blue
	fireEvent.click(colorButton);

	// button disabled
	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

	// button re-enabled
	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle({ backgroundColor: "blue" });
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
