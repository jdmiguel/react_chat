import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Footer from '.';

const FOOTER_PROPS = {
  currentMessage: '',
  onClickButton: () => {},
  onChangeMessage: () => {}
};

describe('Component: Footer', () => {
  it('should render', () => {
    const { container } = render(
      <Footer {...FOOTER_PROPS} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call function onClickButton', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(
      <Footer {...FOOTER_PROPS} onClickButton={handleClick}/>
    );
    const button = getByTestId('footer-button');

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it('should call function onChangeMessage', () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <Footer {...FOOTER_PROPS} onChangeMessage={handleChange}/>
    );

    fireEvent.change(getByPlaceholderText('Send a message...'), { target: { value: 'hi' } });
    expect(handleChange).toHaveBeenCalled();
  });
});