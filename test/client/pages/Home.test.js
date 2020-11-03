import Home from "../../../src/client/pages/Home";
import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { TestAppGameProvider } from "../helpers/simulateGameContext";
import {
  TestAppSocketProvider,
  TestAppSocketProviderWithSocketClient
} from "../helpers/simulateSocketContext";
import {
  TestAppHomeProvider,
  TestAppHomeProviderWithThreeRooms
} from "../helpers/simulateHomeContext";
import { describe, expect, test } from "@jest/globals";

Enzyme.configure({ adapter: new Adapter() });

describe("<Home />", () => {
  const Wrapper = () => (
    <TestAppHomeProvider>
      <TestAppSocketProvider>
        <TestAppGameProvider>
          <Home />
        </TestAppGameProvider>
      </TestAppSocketProvider>
    </TestAppHomeProvider>
  );

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Wrapper />);
  });

  test('when clicking on "join room" button, list of rooms should appear', () => {
    wrapper.find(".switch-mode__button").at(1).simulate("click");
    expect(wrapper.find(".room-select-container").length).toBe(1);
  });
  test("when clicking on create without filling inputs, 2 errors appear", () => {
    wrapper.find("form").at(0).simulate("submit");
    expect(wrapper.find(".home-form__error").length).toBe(2);
  });
  test("no error swhen clicking on create with valid inputs", () => {
    wrapper
      .find("input")
      .at(0)
      .simulate("change", { target: { value: "Axel" } });
    wrapper
      .find("input")
      .at(1)
      .simulate("change", { target: { value: "Axelsroom" } });
    wrapper.find("form").at(0).simulate("submit");
    expect(wrapper.find(".home-form__error").length).toBe(0);
  });
  test("when clicking on, join room, then create without filling inputs, 2 errors appear", () => {
    wrapper.find("button").at(1).simulate("click");
    wrapper.find("form").at(0).simulate("submit");
    expect(wrapper.find(".home-form__error").length).toBe(2);
  });
});

describe("<HomeForm /> testing with context state", () => {
  const Wrapper = () => (
    <TestAppGameProvider>
      <TestAppHomeProviderWithThreeRooms>
        <TestAppSocketProviderWithSocketClient>
          <Home />
        </TestAppSocketProviderWithSocketClient>
      </TestAppHomeProviderWithThreeRooms>
    </TestAppGameProvider>
  );

  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Wrapper />);
  });

  test("already used room name", () => {
    wrapper
      .find("input")
      .at(0)
      .simulate("change", { target: { value: "Axel" } });
    wrapper
      .find("input")
      .at(1)
      .simulate("change", { target: { value: "axelS" } });
    wrapper.find("form").at(0).simulate("submit");
    expect(wrapper.find(".home-form__error").length).toBe(1);
  });
  test("can select a room", () => {
    wrapper
      .find("input")
      .at(0)
      .simulate("change", { target: { value: "Axel" } });
    wrapper.find(".switch-mode__button").at(1).simulate("click");
    wrapper.find(".switch-mode__button").at(0).simulate("click");
    wrapper.find(".switch-mode__button").at(1).simulate("click");
    wrapper.find(".room-select__option").at(1).simulate("click");
    wrapper.find(".room-select__option").at(0).simulate("click");
    wrapper.find("form").at(0).simulate("submit");
    expect(wrapper.find(".room-select__option--selected").length).toBe(1);
  });
  test("userName already in use in that room error", () => {
    wrapper
      .find("input")
      .at(0)
      .simulate("change", { target: { value: "axelRump" } });
    wrapper.find(".switch-mode__button").at(1).simulate("click");
    wrapper.find(".room-select__option").at(0).simulate("click");
    wrapper.find("form").at(0).simulate("submit");
    expect(wrapper.find(".home-form__error").length).toBe(1);
  });
  test("create private game works and changes page", () => {
    window.history.pushState = jest.fn();
    wrapper
      .find("input")
      .at(0)
      .simulate("change", { target: { value: "Hugo" } });
    wrapper
      .find("input")
      .at(1)
      .simulate("change", { target: { value: "PrivRoom" } });
    wrapper
      .find("input")
      .at(2)
      .simulate("change", { target: { checked: true } });
    wrapper.find("form").at(0).simulate("submit");
    expect(window.history.pushState).toBeCalled();
  });
});
