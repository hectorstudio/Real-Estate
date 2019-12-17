import React from 'react';
import { shallow } from 'enzyme';

import Profile from '..';

describe('render', () => {
  it('root element', () => {
    const wrapper = shallow(<Profile />);

    expect(wrapper.name()).toBe('Container');
  });
});
