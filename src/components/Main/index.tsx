import React from 'react';

import Message from './Message';

import { IDisplayedMessage } from '../../helpers/types';

interface IMainProps {
  onScroll: (event: React.UIEvent) => void;
  onUnreadMessage: () => void;
  displayedMessages: IDisplayedMessage[];
}

const Main = React.forwardRef<HTMLElement, IMainProps>(
  ({ onScroll, displayedMessages, onUnreadMessage }, forwardedRef) => (
    <main ref={forwardedRef} onScroll={onScroll}>
      <div>
        {displayedMessages.map((displayedMessage) => (
          <Message
            key={displayedMessage.id}
            data={displayedMessage}
            onUnreadMessage={onUnreadMessage}
          />
        ))}
      </div>
    </main>
  ),
);

export default Main;
