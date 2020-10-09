import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import useRouter from "../../src/client/hooks/useRouter";
import Link from "../../src/client/components/Link";
import { describe, expect, test } from "@jest/globals";

Enzyme.configure({ adapter: new Adapter() });

describe("<useRouter />", () => {
  test("should return test2 component", () => {
    const pages = [
      {
        regex: /^\/test$/gm,
        path: "/test",
        component: <Test />,
        title: "Test 1 title",
      },
      {
        regex: /^\/test2$/gm,
        path: "/test2",
        component: <Test2 />,
        title: "Test 2 title",
      },
    ];

    const Wrapper = () => {
      const [currentPageComponent] = useRouter(pages);

      return (
        <div>
          <Link {...pages[1]}>
            <p>link to test</p>
          </Link>
          <div>{currentPageComponent}</div>
        </div>
      );
    };
    const wrapper = mount(<Wrapper />);
    wrapper.find("div").at(1).simulate("click");
    expect(
      wrapper
        .find("p")
        .at(1)
        .equals(<p>Test2</p>)
    ).toEqual(true);
  });

  test("should call removeEventListener on unmount", () => {
    const pages = [
      {
        regex: /^\/test$/gm,
        path: "/test",
        component: <Test />,
        title: "Test 1 title",
      },
      {
        regex: /^\/test2$/gm,
        path: "/test2",
        component: <Test2 />,
        title: "Test 2 title",
      },
    ];
    const Wrapper = () => {
      const [currentPageComponent] = useRouter(pages);

      return (
        <div>
          <Link {...pages[1]}>
            <p>link to test</p>
          </Link>
          <div>{currentPageComponent}</div>
        </div>
      );
    };
    window.removeEventListener = jest.fn();
    const wrapper = mount(<Wrapper />);
    wrapper.unmount();
    expect(window.removeEventListener).toBeCalled();
  });
});

const Test = () => <p>Test</p>;

const Test2 = () => <p>Test2</p>;
