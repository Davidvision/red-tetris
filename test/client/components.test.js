import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Link from "../../src/client/components/Link";
import { describe, expect, test } from "@jest/globals";

Enzyme.configure({ adapter: new Adapter() });

describe("<Link />", () => {
  test('should call window.pushState with {}, "test title", "test', () => {
    const Wrapper = () => (
      <Link path="/test" title="test title">
        <p>link to test</p>
      </Link>
    );

    window.history.pushState = jest.fn();
    const wrapper = mount(<Wrapper />);
    wrapper.find("div").at(0).simulate("click");
    expect(window.history.pushState).toBeCalledWith({}, "test title", "/test");
  });
  test("should not call window.pushState", () => {
    const Wrapper = () => (
      <Link path="/" title="test title">
        <p>link to /</p>
      </Link>
    );

    window.history.pushState = jest.fn();
    const wrapper = mount(<Wrapper />);
    wrapper.find("div").at(0).simulate("click");
    expect(window.history.pushState).toBeCalledTimes(0);
  });
});
