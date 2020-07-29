import React from 'react';

type MessageProps = {
  classesName: string[];
};

const Message:React.FC<MessageProps> = ({classesName}) => {
  return(
    <div className={classesName.join(' ')}>
      <div className="message-content">
        <p>Ok</p>
        <i className="material-icons">
          done_all
        </i>
      </div>
      <div className="message-time">
        <p>10:30 - September 30, 2020</p>
      </div>
    </div>
  )
}

export default Message;