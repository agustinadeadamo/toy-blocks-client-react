import React from "react";
import { shallow, mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import { create } from "react-test-renderer";
import ConnectedNodes, { Nodes } from "./Nodes";
import Node from "../components/Node";
import Block from "../components/Block";

describe("<Nodes />", () => {
  const actions = {
    checkNodeStatuses: jest.fn()
  };
  const blockActions = {
    checkNodeStatuses: jest.fn()
  };

  const nodes = {
    list: [
      {
        url: 'https://thawing-springs-53971.herokuapp.com',
        online: false,
        name: 'Node 1',
        loading: false,
        blocks: [{id: '1', data: 'data'}, {id: '2', data: 'data'}],
        loadingBlocks: false,
        errorBlocks: false
      },
      {
        url: 'https://secret-lowlands-62331.herokuapp.com',
        online: false,
        name: 'Node 2',
        loading: false,
        blocks: [{id: '1', data: 'data'}, {id: '2', data: 'data'}],
        loadingBlocks: false,
        errorBlocks: false
      }
    ]
  };

  it("should contain <Node />", () => {
    const wrapper = shallow(
      <Nodes
        blockActions={blockActions}
        actions={actions}
        nodes={nodes}
      />
    );

    expect(wrapper.find(Node).length).toEqual(2);
  });

  it("should contain <Block />", () => {
    const wrapper = mount(
      <Nodes
        actions={actions}
        blockActions={blockActions}
        nodes={nodes}
      />
    );

    expect(wrapper.find(Block).children().length).toEqual(4);
  });

  it("should match snapshot", () => {
    const middlewares = [thunk];
    const store = configureMockStore(middlewares)({nodes});
    const component = create(
      <Provider store={store}>
        <ConnectedNodes />
      </Provider>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
