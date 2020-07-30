import React, { useRef, useEffect } from 'react';

import { observerOptions } from '../../../helpers/utils';
import { IShowedMessage } from '../../../helpers/types';

interface IMessageProps {
  data: IShowedMessage,
  onUnreadMessage: (id:number) => void
};

const Message:React.FC<IMessageProps> = ({ data: { id, text, messageClasses, isUnread, hasIcon, iconClasses, iconName, date }, onUnreadMessage }) => {
  const handleIntersect = (entries:IntersectionObserverEntry[]) => {
    if(entries[0].intersectionRatio > 0.98 && isUnread) {
      onUnreadMessage(id);
    } 
  };

  const messageRef = useRef<any>();
  const observerRef = useRef<IntersectionObserver>(new IntersectionObserver(handleIntersect, observerOptions));
 
  useEffect(() => {
    const { current: currentObserver } = observerRef;
    const { current: currentMessage } = messageRef;

    currentMessage && observerRef.current.observe(currentMessage);

    return () => {
      if (currentMessage) {
        currentObserver.unobserve(currentMessage);
      }
    };
    
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