import React, { useReducer, Dispatch, useEffect } from 'react';

import Header from '../Header';
import Main from '../Main';
import Footer from '../Footer';

import { getShowedMessages, getFormattedMessages } from '../../helpers/utils';
import { IShowedMessage } from '../../helpers/types';

const initialAppClasses = ['app'];
enum initialShowedMessage {
  init = 0,
  end = 10,
};

interface AppClassesAction { type: 'hide' | 'show' };
interface ShowedMessagesAction { type: 'add', messages: IShowedMessage[]};

const appClassesReducer = (classes: string[], action: AppClassesAction) => {
  switch (action.type) {
    case 'hide':
      return [...classes,'hide'];
    case 'show':
      return classes.filter(appClass => appClass !== 'hide');
  }
};

const showedMessagesReducer = (messages: IShowedMessage[], action: ShowedMessagesAction) => {
  switch (action.type) {
    case 'add':
      return [...messages, ...action.messages];
  }
};

const App:React.FC = () => {
  const [appClasses, appClassesDispatch]: [
    string[],
    Dispatch<AppClassesAction>,
  ] = useReducer(appClassesReducer, initialAppClasses);

  const [showedMessages, showedMessagesDispatch]: [
    IShowedMessage[],
    Dispatch<ShowedMessagesAction>,
  ] = useReducer(showedMessagesReducer, []);

  useEffect(() => {
    const formatedMessages = getFormattedMessages(getShowedMessages(initialShowedMessage.init,initialShowedMessage.end));

    showedMessagesDispatch({type: 'add', messages: formatedMessages});
  },[])


  const handleAppClasses = () => {
    appClasses.includes('hide') ? appClassesDispatch({type: 'show'}) : appClassesDispatch({type: 'hide'})
  }

  return(
    <div className={appClasses.join(' ')}>
      <Header onClick={handleAppClasses}/>
      <Main showedMessages={showedMessages}/>
      <Footer/>
    </div>
  )
}

export default App;
