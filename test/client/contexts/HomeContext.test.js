import React, { useContext, useEffect } from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { threeRoomsMockup } from "../helpers/simulateRoomsData";
import { Context as HomeContext } from "../../../src/client/context/HomeContext";
import { TestAppHomeProvider } from "../helpers/simulateHomeContext";
import { describe, expect, test } from "@jest/globals";

Enzyme.configure({ adapter: new Adapter() });

describe("HomeContext action functions", () => {
  test("setUserName('Hugo') sets 'Hugo' as userName", () => {
    let contextValues;
    const UserNameSetterComp = () => {
      const { setUserName, state } = useContext(HomeContext);
      contextValues = state;
      useEffect(() => {
        setUserName("Hugo");
      }, []);
      return null;
    };
    const Wrapper = () => (
      <TestAppHomeProvider>
        <UserNameSetterComp />
      </TestAppHomeProvider>
    );

    mount(<Wrapper />);
    expect(contextValues.userName).toBe("Hugo");
  });

  test("setAvailableRooms() with 3 rooms sets 3 rooms", () => {
    let contextValues;
    const AvailableRoomsSetterComp = () => {
      const { setAvailableRooms, state } = useContext(HomeContext);
      contextValues = state;
      useEffect(() => {
        setAvailableRooms(threeRoomsMockup);
      }, []);
      return null;
    };
    const Wrapper = () => (
      <TestAppHomeProvider>
        <AvailableRoomsSetterComp />
      </TestAppHomeProvider>
    );

    mount(<Wrapper />);
    expect(contextValues.availableRooms).toEqual(threeRoomsMockup);
  });
});
