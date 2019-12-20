import React from 'react';
import { shallow } from 'enzyme';

import Paper from '..';

describe('render', () => {
  it('material UI paper component with children', () => {
    const wrapper = shallow(<Paper>foo</Paper>);

    expect(wrapper.prop('children')).toBe('foo');
  });

  it('material UI paper component with custom class', () => {
    const wrapper = shallow(<Paper className="foo" />);

    expect(wrapper.prop('className')).toBe('foo');
  });
});
