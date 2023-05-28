import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
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
