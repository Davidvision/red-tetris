import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import useRouter from "../../src/client/hooks/useRouter";
import Link from "../../src/client/components/Link";
import { describe, expect, test } from "@jest/globals";
import { createMemoryHistory } from "history";

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
});

// describe("<useRouter />", () => {
//   test("should return test1 comp", () => {
//     const pages = [
//       {
//         regex: /^\/test$/gm,
//         path: "/test",
//         component: <Test />,
//         title: "Test 1 title"
//       },
//       {
//         regex: /^\/test2$/gm,
//         path: "/test2",
//         component: <Test2 />,
//         title: "Test 2 title"
//       }
//     ];

//     const Component = () => {
//       const [currentPageComponent] = useRouter(pages);

//       return (
//         <div>
//           <Link {...pages[0]}>
//             <p>link to test</p>
//           </Link>
//           <Link {...pages[1]}>
//             <p>link to test2</p>
//           </Link>
//           <div id="renderTestComp">{currentPageComponent}</div>
//         </div>
//       );
//     };

//     window.history.pushState = jest.fn();
//     const wrapper = mount(<Component />);
//     wrapper
//       .find("div")
//       .at(0)
//       .simulate("click");
//     expect(
//       wrapper
//         .find("#renderTestComp")
//         .props()
//         .children[0].equals(<Test />)
//     ).to.equal(true);
//   });
// });

// const Test = () => <p>Test</p>;

// const Test2 = () => <p>Test2</p>;
