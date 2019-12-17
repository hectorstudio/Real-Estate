import React from 'react';
import { shallow } from 'enzyme';

import Home from '..';

jest.mock('../../FileList', () => function FileList() { return null; });
jest.mock('../../UploadList', () => function UploadList() { return null; });

describe('render', () => {
  it('root element', () => {
    const wrapper = shallow(<Home />);

    expect(wrapper.children()).toHaveLength(1);
  });
});
