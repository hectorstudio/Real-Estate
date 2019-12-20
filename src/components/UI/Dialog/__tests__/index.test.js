import React from 'react';
import { shallow } from 'enzyme';

import Dialog from '..';

let props;
beforeEach(() => {
  props = {
    content: 'content',
    onCancel: jest.fn(),
    onOk: jest.fn(),
    title: 'title',
  };
});

describe('render', () => {
  it('title and content', () => {
    const wrapper = shallow(<Dialog {...props} />);

    expect(wrapper.find('DialogTitle').children().text()).toBe(props.title);
    expect(wrapper.find('DialogContent').children().text()).toBe(props.content);
  });

  it('cancel button with onCancel prop assigned', () => {
    const wrapper = shallow(<Dialog {...props} />);

    wrapper.find('DialogActions').childAt(0).prop('onClick')('foo');

    expect(props.onCancel).toHaveBeenCalledWith('foo');
  });

  it('ok button with onOk prop assigned', () => {
    const wrapper = shallow(<Dialog {...props} />);

    wrapper.find('DialogActions').childAt(1).prop('onClick')('foo');

    expect(props.onOk).toHaveBeenCalledWith('foo');
  });

  it('cancelButton with custom text', () => {
    const wrapper = shallow(<Dialog {...props} cancelText="foo" />);

    const button = wrapper.find('DialogActions').childAt(0);

    expect(button.children().text()).toBe('foo');
  });

  it('okButton with custom text', () => {
    const wrapper = shallow(<Dialog {...props} okText="foo" />);

    const button = wrapper.find('DialogActions').childAt(1);

    expect(button.children().text()).toBe('foo');
  });

  it('Dialog with open prop set as true', () => {
    const wrapper = shallow(<Dialog {...props} open />);

    expect(wrapper.prop('open')).toBe(true);
  });
});
