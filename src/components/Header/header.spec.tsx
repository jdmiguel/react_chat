import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Header from '.';

const HEADER_PROPS = {
  onClick: () => {},
  unreadMessagesCounter: 10,
  isTyping: false
};

describe('Component: Header', () => {
  it('should render and display Online text', () => {
    const { container } = render(
      <Header {...HEADER_PROPS} />
    );
    const header = container.firstChild as HTMLDivElement;
    const stateText = header.querySelector('h2')?.innerHTML;

    expect(header).toMatchSnapshot();
    expect(stateText).toBe('Online');
  });

  it('should display Typing text', () => {
    const { container } = render(
      <Header {...HEADER_PROPS} isTyping={true} />
    );
    const header = container.firstChild as HTMLDivElement;
    const stateHeading = header.querySelector('h2');
    const stateText = stateHeading?.innerHTML;

    expect(stateHeading).toHaveClass('typing');
    expect(stateText).toBe('Typing...');
  });

  it('should call function onClick', () => {
    const handleClick = jest.fn();
    const { container } = render(
      <Header {...HEADER_PROPS} onClick={handleClick}/>
    );
    const header = container.firstChild as HTMLDivElement;
    const button = header.querySelector('button');

    fireEvent.click(button as HTMLButtonElement);
    expect(handleClick).toHaveBeenCalled();
  });
});