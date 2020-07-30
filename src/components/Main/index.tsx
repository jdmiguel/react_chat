import React from 'react';

import Message from './Message';

import { IShowedMessage } from '../../helpers/types';

interface IMainProps {
  onScroll: (event: React.UIEvent) => void,
  onUnreadMessage: (id:number) => void,
  showedMessages: IShowedMessage[]
};

const Main:React.FC<IMainProps> = ({onScroll, showedMessages, onUnreadMessage}) => {
  return(
    <main onScroll={onScroll}>
      <div>
        {
          showedMessages.map(showedMessage => (
            <Message key={showedMessage.id} data={showedMessage} onUnreadMessage={onUnreadMessage}/>
          ))
        }
      </div>
    </main>
  )
}

export default Main;