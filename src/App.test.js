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

// test("button turns blue when clicked", () => {
//   render(<App />);
// 	const colorButton = screen.getByRole("button", { name: "Change to blue" });
// });
