import React from 'react';

import Message from './Message';

import { IShowedMessage } from '../../helpers/types';

interface IMainProps {
  onScroll: (event: React.UIEvent) => void
  showedMessages: IShowedMessage[]
};

const Main:React.FC<IMainProps> = ({onScroll, showedMessages}) => {
  return(
    <main onScroll={onScroll}>
      <div>
        {
          showedMessages.map(showedMessage => (
            <Message key={showedMessage.id} data={showedMessage} />
          ))
        }
      </div>
    </main>
  )
}

export default Main;