import React from 'react';
import { shallow } from 'enzyme';

import App from '..';

jest.mock('../../Header', () => function Header() { return null; });
jest.mock('../../Home', () => function Home() { return null; });
jest.mock('../../Message', () => function Message() { return null; });
jest.mock('../../PrivateRoute', () => function PrivateRoute() { return null; });
jest.mock('../../Profile', () => function Profile() { return null; });

describe('App', () => {
  describe('render', () => {
    it('header and container', () => {
      const wrapper = shallow(<App />);

      expect(wrapper.find('.container')).toHaveLength(1);
    });
  });
});
