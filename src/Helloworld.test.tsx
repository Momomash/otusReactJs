import * as React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Helloworld from "./Helloworld";

let container: any = null;
beforeEach(() => {
  // подготавливаем DOM-элемент, куда будем рендерить
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // подчищаем после завершения
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with userName", () => {


  act(() => {
    render(<Helloworld userName="Jenny" />, container);
  });
  expect(container.textContent).toBe("Hello World Jenny");

  act(() => {
    render(<Helloworld userName="Margaret" />, container);
  });
  expect(container.textContent).toBe("Hello World Margaret");
});