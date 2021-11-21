import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import "mutationobserver-shim";

const customRender = (ui: any, options = {}) =>
  render(ui, {
    ...options,
  });

export { customRender as render };
