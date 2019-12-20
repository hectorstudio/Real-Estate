import React from 'react';
import { shallow } from 'enzyme';

import Snackbar from '..';

describe('render', () => {
  it('Material UI Snackbar with custom message', () => {
    const wrapper = shallow(<Snackbar message="foo" />);

    expect(wrapper.prop('message')).toBe('foo');
  });

  it('Snackbar with open prop being a true if message exists', () => {
    const wrapper = shallow(<Snackbar message="foo" />);

    expect(wrapper.prop('open')).toBe(true);
  });

  it('Snackbar with open prop being a true if message not exists', () => {
    const wrapper = shallow(<Snackbar />);

    expect(wrapper.prop('open')).toBe(false);
  });
});
