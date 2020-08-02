import React from 'react';
import { InView } from 'react-intersection-observer';

import { observerOptions } from '../../../helpers/utils';
import { IDisplayedMessage } from '../../../helpers/types';

interface IMessageProps {
  data: IDisplayedMessage;
  onUnreadMessage: (id: number) => void;
}

const Message: React.FC<IMessageProps> = ({
  data: {
    id,
    text,
    messageClasses,
    isUnread,
    hasIcon,
    iconClasses,
    iconName,
    date,
  },
  onUnreadMessage,
}) => (
  <InView
    {...observerOptions}
    as="div"
    className={messageClasses}
    onChange={(inView) => {
      if (inView && isUnread) {
        onUnreadMessage(id);
      }
    }}
  >
    <div className="message-content">
      <p>{text}</p>
      {hasIcon && (
        <i className={iconClasses && iconClasses}>{iconName && iconName}</i>
      )}
    </div>
    <div className="message-time">
      <p>{date}</p>
    </div>
  </InView>
);

export default Message;
