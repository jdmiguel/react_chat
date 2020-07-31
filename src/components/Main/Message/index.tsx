import React, { useRef, useEffect } from 'react';

import { observerOptions } from '../../../helpers/utils';
import { IDisplayedMessage } from '../../../helpers/types';

interface IMessageProps {
  data: IDisplayedMessage;
  onUnreadMessage: () => void;
};

const Message:React.FC<IMessageProps> = ({ data: { id, text, messageClasses, isUnread, hasIcon, iconClasses, iconName, date }, onUnreadMessage }) => {
  const messageRef = useRef<any>();

  const handleIntersect = (entries:IntersectionObserverEntry[], observer: IntersectionObserver) => {
    if(entries[0].intersectionRatio > 0.98 && isUnread) {
      observer.unobserve(messageRef.current);
      onUnreadMessage();
    } 
  };

  const observerRef = useRef<IntersectionObserver>(new IntersectionObserver(handleIntersect, observerOptions));
 
  useEffect(() => {
    const { current: currentMessage } = messageRef;

    currentMessage && observerRef.current.observe(currentMessage);
  }, []);

  return(
    <div ref={messageRef} className={messageClasses}>
      <div className="message-content">
        <p>{text}</p>
        { hasIcon && 
          <i className={iconClasses && iconClasses}>
            {iconName && iconName}
          </i>
        }
      </div>
      <div className="message-time">
        <p>{date}</p>
      </div>
    </div>
  )
}

export default Message;