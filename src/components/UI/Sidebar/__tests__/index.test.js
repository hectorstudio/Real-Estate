import React from 'react';
import { shallow } from 'enzyme';
import { useSelector } from 'react-redux';

import Sidebar from '..';

jest.mock('../../LinkButton', () => function LinkButton() { return null; });
jest.mock('../../LayoutPaper', () => function LayoutPaper() { return null; });
jest.mock('../../../../selectors/router', () => ({
  getPathname: () => 'bar',
}));
jest.mock('@material-ui/styles', () => ({
  makeStyles: () => () => ({
    activeItem: 'activeItem',
  }),
}));
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

let props = {};
beforeEach(() => {
  props = {
    items: [],
  };
});

describe('render', () => {
  it('List with custom class', () => {
    const wrapper = shallow(<Sidebar {...props} className="foo" />);

    expect(wrapper.prop('className')).toBe('foo');
  });

  it('single item with correct href address and label', () => {
    const items = [{
      label: 'label',
      to: 'foo',
    }];
    const wrapper = shallow(<Sidebar {...props} items={items} />);

    expect(wrapper.find('ListItem')).toHaveLength(1);
    expect(wrapper.find('ListItemText').children().text()).toBe('label');
    expect(wrapper.find('ListItem').prop('to')).toBe('foo');
  });

  it('single item marked as active', () => {
    useSelector.mockReturnValue('bar');
    const items = [{
      label: 'label',
      to: 'bar',
    }];
    const wrapper = shallow(<Sidebar {...props} items={items} />);

    expect(wrapper.find('ListItem').prop('className')).toBe('activeItem');
  });

  it('multiple items, last one with icon,', () => {
    const items = [
      {
        label: 'label1',
        to: 'foo',
      },
      {
        icon: 'fooIcon',
        label: 'label2',
        to: 'baz',
      },
    ];
    const wrapper = shallow(<Sidebar {...props} items={items} />);

    const listItemIcon = wrapper.find('List').childAt(1).find('ListItemIcon');

    expect(listItemIcon.childAt(0).children().text()).toBe('fooIcon');
  });

  it('multiple items, last one with active icon,', () => {
    useSelector.mockReturnValue('bar');
    const items = [
      {
        label: 'label1',
        to: 'foo',
      },
      {
        icon: 'fooIcon',
        label: 'label2',
        to: 'bar',
      },
    ];
    const wrapper = shallow(<Sidebar {...props} items={items} />);

    const listItemIcon = wrapper.find('List').childAt(1).find('ListItemIcon');

    expect(listItemIcon.prop('className')).toBe('activeItem');
  });
});
