import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BoardPixel from "../../../src/client/components/BoardPixel";
import { describe, expect, test } from "@jest/globals";

Enzyme.configure({ adapter: new Adapter() });

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
