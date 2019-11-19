import React from 'react';
import { mount } from 'enzyme';

import TextField from '..';

describe('render', () => {
  it('Material UI TextField component', () => {
    const wrapper = mount(<TextField />);

    expect(wrapper.childAt(0).name()).toBe('TextField');
  });
});
