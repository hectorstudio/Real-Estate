import React from 'react';
import { shallow } from 'enzyme';

import Header from '..';

jest.mock('../../UI/Link', () => function Link() { return null; });

describe('render', () => {
  it('root element', () => {
    const wrapper = shallow(<Header />);

    expect(wrapper.name()).toBe('AppBar');
  });
});
