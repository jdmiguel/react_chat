import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Footer from '.';

const FOOTER_PROPS = {
  currentMessage: '',
  onClickButton: () => {},
  onChangeMessage: () => {}
};

describe('Component: Footer', () => {
  it('should render and display deactive button', () => {
    const { container, getByTestId } = render(
      <Footer {...FOOTER_PROPS} />
    );

    expect(getByTestId('footer-button')).not.toHaveClass('active');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call onClickButton function', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(
      <Footer {...FOOTER_PROPS} onClickButton={handleClick}/>
    );
    const button = getByTestId('footer-button');

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it('should call onChangeMessage function', () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <Footer {...FOOTER_PROPS} onChangeMessage={handleChange}/>
    );

    fireEvent.change(getByPlaceholderText('Send a message...'), { target: { value: 'hi' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('should button be active', async () => {
    const { getByTestId } = render(
      <Footer {...FOOTER_PROPS} currentMessage="hi"/>
    );

    expect(getByTestId('footer-button')).toHaveClass('active');
  });
});