import React from 'react';
import { shallow } from 'enzyme';

import Building from '..';

jest.mock('../../../FileList', () => function FileList() { return null; });
jest.mock('../../../UploadList', () => function UploadList() { return null; });

describe('render', () => {
  it('Grid item, a root component', () => {
    const wrapper = shallow(<Building />);

    expect(wrapper.name()).toBe('Grid');
  });
});
