import React from 'react';

import { IShowedMessage } from '../../../helpers/types';

interface IMessageProps {
  data: IShowedMessage
};

const Message:React.FC<IMessageProps> = ({ data: { text, messageClasses, hasIcon, iconClasses, iconName, date } }) => {
  return(
    <div className={messageClasses}>
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