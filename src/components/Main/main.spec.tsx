import React from 'react';
import { render } from '@testing-library/react';

import Main from '.';

const MAIN_PROPS = {
  onScroll: (event: React.UIEvent) => () => {},
  onUnreadMessage: () => {},
  displayedMessages: [],
};

describe('Component: Main', () => {
  it('should render', () => {
    const { container } = render(
      <Main {...MAIN_PROPS} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});