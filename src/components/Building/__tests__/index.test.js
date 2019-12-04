import React from 'react';
import { shallow } from 'enzyme';

import Building from '..';

jest.mock('../../FileList', () => function FileList() { return null; });
jest.mock('../../UploadList', () => function UploadList() { return null; });

describe('render', () => {
  it('root element', () => {
    const wrapper = shallow(<Building />);

    expect(wrapper.children()).toHaveLength(3);
  });
});
