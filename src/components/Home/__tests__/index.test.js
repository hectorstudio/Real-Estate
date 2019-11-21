import React from 'react';
import { mount } from 'enzyme';

import Home from '..';

describe('render', () => {
  it('root element', () => {
    const wrapper = mount(<Home />);

    expect(wrapper.find('.root')).toHaveLength(1);
  });
});
