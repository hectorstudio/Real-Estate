import React from 'react';
import { shallow } from 'enzyme';

import Header from '..';

describe('render', () => {
  it('root element', () => {
    const wrapper = shallow(<Header />);

    expect(wrapper.find('.root')).toHaveLength(1);
  });
});
