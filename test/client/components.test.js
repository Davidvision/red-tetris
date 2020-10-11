import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Link from "../../src/client/components/Link";
import BoardPixel from "../../src/client/components/BoardPixel";
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
    wrapper
      .find("div")
      .at(0)
      .simulate("click");
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
    wrapper
      .find("div")
      .at(0)
      .simulate("click");
    expect(window.history.pushState).toBeCalledTimes(0);
  });
});

describe("<BoardPixel />", () => {
  test('without color props, should have "board-pixel--0" as className', () => {
    const Wrapper = () => <BoardPixel />;

    const wrapper = mount(<Wrapper />);
    const resultLength = wrapper.find(".board-pixel--0").length;
    expect(resultLength).toBe(1);
  });

  test('with props color=1, should have "board-pixel--1" and board-pixel__piece as classNames', () => {
    const Wrapper = () => <BoardPixel color={1} />;

    const wrapper = mount(<Wrapper />);
    const mountedDiv = wrapper.find("div").at(0);
    expect(
      ["board-pixel--1", "board-pixel__piece"].every(c =>
        mountedDiv.hasClass(c)
      )
    ).toBe(true);
  });
});
