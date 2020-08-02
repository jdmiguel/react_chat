import React from 'react';
import { render } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils'

import Message from '.';

afterEach(() => {
  mockAllIsIntersecting(true);
})

const MESSAGE_PROPS = {
  data: {
    id: 0,
    text: 'Hi',
    messageClasses: '',
    isUnread: false,
    hasIcon: false,
    iconClasses: '',
    iconName: '',
    date: '10:00 - April 12, 2020',
  },
  onUnreadMessage: () => {}
};

describe('Component: Message', () => {
  it('should render as outcoming message and display text properly', () => {
    const { container } = render(
      <Message {...MESSAGE_PROPS} />
    );
    const messageWrapper = container.firstChild as HTMLDivElement;
    const text = messageWrapper.querySelector('.message-content > p')?.innerHTML;

    expect(messageWrapper).toMatchSnapshot();
    expect(text).toBe('Hi');
  });

  it('should render as outcoming message and as sent', () => {
    const MESSAGE_PROPS_UPDATED = {...MESSAGE_PROPS, data: {...MESSAGE_PROPS.data, hasIcon:true }}
    const { container } = render(
      <Message {...MESSAGE_PROPS_UPDATED} />
    );
    const messageWrapper = container.firstChild as HTMLDivElement;

    expect(messageWrapper).toMatchSnapshot();
  });

  it('should render as outcoming message and as received', () => {
    const MESSAGE_PROPS_UPDATED = {...MESSAGE_PROPS, data: {...MESSAGE_PROPS.data, hasIcon:true, iconName: 'done_all'}}
    const { container } = render(
      <Message {...MESSAGE_PROPS_UPDATED} />
    );
    const messageWrapper = container.firstChild as HTMLDivElement;

    expect(messageWrapper).toMatchSnapshot();
});

  it('should render as outcoming message and as read', () => {
      const MESSAGE_PROPS_UPDATED = {...MESSAGE_PROPS, data: {...MESSAGE_PROPS.data, hasIcon:true, iconClasses: 'read', iconName: 'done_all'  }}
      const { container } = render(
        <Message {...MESSAGE_PROPS_UPDATED} />
      );
      const messageWrapper = container.firstChild as HTMLDivElement;
  
      expect(messageWrapper).toMatchSnapshot();
  });

  it('should render as incoming message', () => {
    const MESSAGE_PROPS_UPDATED = {...MESSAGE_PROPS, data: {...MESSAGE_PROPS.data, messageClasses:'message incoming'}}
    const { container } = render(
      <Message {...MESSAGE_PROPS_UPDATED} />
    );
    const messageWrapper = container.firstChild as HTMLDivElement;

    expect(messageWrapper).toMatchSnapshot();
  });
});