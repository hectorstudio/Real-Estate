import React from 'react';
import { mount } from 'enzyme';

import App from '..';

describe('App', () => {
  describe('render', () => {
    it('root element', () => {
      const wrapper = mount(<App />);

      expect(wrapper.find('.root')).toHaveLength(1);
    });
  });
});
