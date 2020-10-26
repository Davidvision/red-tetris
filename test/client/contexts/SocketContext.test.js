import React, { useContext } from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {
  SocketContextProvider,
  SocketContext
} from "../../../src/client/context/SocketContext";
import { describe, expect, test } from "@jest/globals";

Enzyme.configure({ adapter: new Adapter() });

describe("SocketContext", () => {
  test("sets a provider with socketIOClient as value", () => {
    let contextValues;
    const SocketValueReaderComp = () => {
      contextValues = useContext(SocketContext);
      return null;
    };
    const Wrapper = () => (
      <SocketContextProvider>
        <SocketValueReaderComp />
      </SocketContextProvider>
    );
    mount(<Wrapper />);
    expect(Object.keys(contextValues)).toEqual(["socketIOClient"]);
  });
});
