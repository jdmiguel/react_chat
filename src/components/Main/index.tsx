import React from 'react';

import Message from './Message';

import { IShowedMessage } from '../../helpers/types';

interface IMainProps {
  showedMessages: IShowedMessage[]
};

const Main:React.FC<IMainProps> = ({showedMessages}) => {
  return(
    <main>
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