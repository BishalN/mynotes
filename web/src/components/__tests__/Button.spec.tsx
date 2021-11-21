import Reacr from "react";

import { render } from "../../../test-util";
import renderer from "react-test-renderer";
import { Button, OauthButton } from "../Button";

describe("Button", () => {
  it("should render correctly", () => {
    const { getByTestId } = render(<Button />);
    const component = getByTestId("button");

    expect(component).toBeVisible();
  });

  it("renders component unchanged", () => {
    const tree = renderer.create(<Button />);
    expect(tree).toMatchSnapshot();
  });

  it("renders spinner when button loading is passed", () => {
    const { getByRole } = render(<Button loading />);

    const spinner = getByRole("loading");
    expect(spinner).toBeVisible();
  });
});
