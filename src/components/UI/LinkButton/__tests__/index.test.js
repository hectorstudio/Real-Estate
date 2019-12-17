import React from 'react';
import { mount } from 'enzyme';

import Link from '..';

let props = {};
beforeEach(() => {
  props = {
    children: 'foo',
    to: 'bar',
  };
});

describe('render', () => {
  it('Material UI link component', () => {
    const wrapper = mount(<Link {...props} />);

    expect(wrapper.childAt(0).name()).toBe('ButtonBase');
  });
});
