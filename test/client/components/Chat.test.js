import React, { useContext, useEffect } from "react";
import Enzyme, { mount } from "enzyme";
import { Context as GameContext } from "../../../src/client/context/GameContext";
import Adapter from "enzyme-adapter-react-16";
import { TestAppGameProvider } from "../helpers/simulateGameContext";
import { TestAppSocketProvider } from "../helpers/simulateSocketContext";
import { TestAppHomeProvider } from "../helpers/simulateHomeContext";
import { describe, expect, test } from "@jest/globals";
import Chat from "../../../src/client/components/Chat";
import { sampleMessages1 } from "../helpers/simulateGameContextValues";

Enzyme.configure({ adapter: new Adapter() });

describe("<Chat />", () => {
  const Wrapper = () => (
    <TestAppHomeProvider>
      <TestAppSocketProvider>
        <TestAppGameProvider>
          <Chat />
        </TestAppGameProvider>
      </TestAppSocketProvider>
    </TestAppHomeProvider>
  );

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Wrapper />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test("displays properly when changing input value", () => {
    wrapper
      .find("input")
      .at(0)
      .simulate("change", {
        target: { value: "Axel" }
      });
    expect(wrapper.find("input").at(0).props().value).toBe("Axel");
  });
  test("clicking on submit button triggers handleSubmit function and input becomes empty", () => {
    wrapper
      .find("input")
      .at(0)
      .simulate("change", {
        target: { value: "Axel" }
      });
    wrapper.find("form").at(0).simulate("submit");
    expect(wrapper.find("input").at(0).props().value.length).toBe(0);
  });
  test("clicking on submit button without providing value in the input returns", () => {
    wrapper.find("form").at(0).simulate("submit");
    expect(wrapper.find("input").at(0).props().value.length).toBe(0);
  });
});

describe("<Chat /> with messages in Gamecontext", () => {
  test("1 message should be displayed", () => {
    const MessageSetterComp = ({ children }) => {
      const { setMessage } = useContext(GameContext);
      useEffect(() => {
        setMessage(sampleMessages1);
      }, []);
      return <>{children}</>;
    };

    const Wrapper = () => (
      <TestAppHomeProvider>
        <TestAppSocketProvider>
          <TestAppGameProvider>
            <MessageSetterComp>
              <Chat />
            </MessageSetterComp>
          </TestAppGameProvider>
        </TestAppSocketProvider>
      </TestAppHomeProvider>
    );
    let wrapper = mount(<Wrapper />);
    expect(wrapper.find("li").length).toBe(1);
  });
});
