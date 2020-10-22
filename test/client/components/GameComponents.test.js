import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BoardPixel from "../../../src/client/components/BoardPixel";
import Board from "../../../src/client/components/Board";
import { describe, expect, test } from "@jest/globals";
import { boardWithOnePiece } from "../helpers/simulateGameContextValues";
import CatContainer from "../../../src/client/components/CatContainer";
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

describe("<Board />", () => {
  test("with one piece of type 5, should have 4 board-pixel--6 classes", () => {
    const Wrapper = () => <Board board={boardWithOnePiece} />;

    const wrapper = mount(<Wrapper />);
    const resultLength = wrapper.find(".board-pixel--6").length;
    expect(resultLength).toBe(4);
  });
});

describe("<CatContainer />", () => {
  test("first div has .game__cat-container class", () => {
    const Wrapper = () => <CatContainer />;

    const wrapper = mount(<Wrapper />);
    expect(
      wrapper
        .find("div")
        .at(0)
        .hasClass("game__cat-container")
    ).toBe(true);
  });
});
