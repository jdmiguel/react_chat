import React from 'react';

import Message from './Message'

const Main:React.FC = () => {
  return(
    <main>
      <div>
        <Message classesName={['message']}/>
        <Message classesName={['message', 'received']}/>
        <Message classesName={['message', 'received']}/>
        <Message classesName={['message']}/>
        <Message classesName={['message']}/>
        <Message classesName={['message']}/>
        <Message classesName={['message', 'received']}/>
        <Message classesName={['message']}/>
        <Message classesName={['message']}/>
      </div>
    </main>
  )
}

export default Main;