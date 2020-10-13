import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Link from "../../../src/client/components/Link";
import BoardPixel from "../../../src/client/components/BoardPixel";
import HomeForm from "../../../src/client/components/HomeForm";
import { TestAppGameProvider } from "../helpers/simulateGameContext";
import { TestAppGameProviderWithThreeRooms } from "../helpers/simulateGameContext";
import { describe, expect, test } from "@jest/globals";

Enzyme.configure({ adapter: new Adapter() });

describe("<HomeForm />", () => {
  const Wrapper = () => (
    <TestAppGameProvider>
      <HomeForm />
    </TestAppGameProvider>
  );

  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation(init => [init, setState]);

  beforeEach(() => {
    wrapper = mount(<Wrapper />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  test('when clicking on "join room" button, list of rooms should appear', () => {
    wrapper
      .find("button")
      .at(1)
      .simulate("click");
    expect(wrapper.find(".room-select-container").length).toBe(1);
  });
  test("when clicking on create without filling inputs, 2 errors appear", () => {
    wrapper
      .find("form")
      .at(0)
      .simulate("submit");
    expect(wrapper.find(".home-form__error").length).toBe(2);
  });
  test("when clicking on create with inputs", () => {
    wrapper
      .find("input")
      .at(0)
      .simulate("change", { target: { value: "Axel" } });
    wrapper
      .find("input")
      .at(1)
      .simulate("change", { target: { value: "Axelsroom" } });
    wrapper
      .find("button")
      .at(2)
      .simulate("click");
    expect(wrapper.find(".home-form__error").length).toBe(0);
  });
  test("when clicking on, join room, then create without filling inputs, 2 errors appear", () => {
    wrapper
      .find("button")
      .at(1)
      .simulate("click");
    wrapper
      .find("form")
      .at(0)
      .simulate("submit");
    expect(wrapper.find(".home-form__error").length).toBe(2);
  });
});

describe("<HomeForm /> testing with context state", () => {
  const Wrapper = () => (
    <TestAppGameProviderWithThreeRooms>
      <HomeForm />
    </TestAppGameProviderWithThreeRooms>
  );

  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Wrapper />);
  });

  test("testing already used room name", () => {
    wrapper
      .find("input")
      .at(0)
      .simulate("change", { target: { value: "Axel" } });
    wrapper
      .find("input")
      .at(1)
      .simulate("change", { target: { value: "axelS" } });
    wrapper
      .find("form")
      .at(0)
      .simulate("submit");
    expect(wrapper.find(".home-form__error").length).toBe(1);
  });
  test("testing already used room name", () => {
    wrapper
      .find("input")
      .at(0)
      .simulate("change", { target: { value: "Axel" } });
    wrapper
      .find("button")
      .at(1)
      .simulate("click");
    wrapper
      .find("button")
      .at(0)
      .simulate("click");
    wrapper
      .find("button")
      .at(1)
      .simulate("click");
    wrapper
      .find(".room-select__option")
      .at(1)
      .simulate("click");
    wrapper
      .find(".room-select__option")
      .at(0)
      .simulate("click");
    wrapper
      .find("form")
      .at(0)
      .simulate("submit");
    expect(wrapper.find(".room-select__option--selected").length).toBe(1);
  });
});
