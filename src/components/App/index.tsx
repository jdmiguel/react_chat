import React, {
  useReducer,
  Dispatch,
  useEffect,
  useState,
  useCallback,
} from 'react';

import Header from '../Header';
import Main from '../Main';
import Footer from '../Footer';

import {
  initialtotalMessages,
  initialAppClasses,
  initialDisplayedMessageCounter,
  factorScroll,
  getUnreadMessagesCounter,
  getDisplayedMessages,
  getFormattedMessages,
} from '../../helpers/utils';
import { IDisplayedMessage } from '../../helpers/types';

interface AppClassesAction {
  type: 'hide' | 'show';
}
interface DisplayedMessagesAction {
  type: 'add';
  messages: IDisplayedMessage[];
}

const appClassesReducer = (classes: string[], action: AppClassesAction) => {
  switch (action.type) {
    case 'hide':
      return [...classes, 'hide'];
    case 'show':
      return classes.filter((appClass) => appClass !== 'hide');
  }
};

const displayedMessagesReducer = (
  messages: IDisplayedMessage[],
  action: DisplayedMessagesAction,
) => {
  switch (action.type) {
    case 'add':
      return [...messages, ...action.messages];
  }
};

const App: React.FC = () => {
  // Reducers
  const [appClasses, appClassesDispatch]: [
    string[],
    Dispatch<AppClassesAction>,
  ] = useReducer(appClassesReducer, initialAppClasses);

  const [displayedMessages, displayedMessagesDispatch]: [
    IDisplayedMessage[],
    Dispatch<DisplayedMessagesAction>,
  ] = useReducer(displayedMessagesReducer, []);

  // States
  const [totalMessages, setTotalMessages] = useState(initialtotalMessages);
  const [displayedMessagesCounter, setDisplayedMessagesCounter] = useState(
    initialDisplayedMessageCounter.STARTER,
  );
  const [unreadMessagesCounter, setUnreadMessagesCounter] = useState(
    getUnreadMessagesCounter(),
  );
  const [isLoadingOnScroll, setIsLoadingScroll] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [newMessageButtonClass, setNewMessageButtonClass] = useState('');

  useEffect(() => {
    setIsLoadingScroll(false);
  }, [displayedMessages]);

  useEffect(() => {
    const messages = getDisplayedMessages(getFormattedMessages);
    const formatedMessages = messages(displayedMessagesCounter, displayedMessagesCounter + initialDisplayedMessageCounter.MAX_DISPLAYED);

    displayedMessagesDispatch({ type: 'add', messages: formatedMessages });
  }, [displayedMessagesCounter]);

  const handleAppClasses = useCallback(() => {
    appClasses.includes('hide')
      ? appClassesDispatch({ type: 'show' })
      : appClassesDispatch({ type: 'hide' });
  }, [appClasses]);

  const handleScroll = useCallback(
    (event: React.UIEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
      const isScrollDownLimit = scrollTop >= (scrollHeight - clientHeight) / factorScroll;
      const isRetrievingDataAllowed = displayedMessagesCounter < initialtotalMessages;

      if (!isLoadingOnScroll && isScrollDownLimit && isRetrievingDataAllowed) {
        setIsLoadingScroll(true);
        setDisplayedMessagesCounter(displayedMessagesCounter + initialDisplayedMessageCounter.MAX_DISPLAYED);
      }
    },
    [displayedMessagesCounter, isLoadingOnScroll],
  );

  const handleOnUnreadMessages = () => {
    setUnreadMessagesCounter( counter => counter - 1);
  }

  const handleUserMessageChange = (event: React.ChangeEvent<any>) => {
    const message = event.target.value;

    setNewMessageButtonClass(message ? 'active' : '');
    setNewMessage(message);
  };

  const handleUserMessageClick = () => {
    if(newMessage){
      console.log('handleUserMessageClick');
      setNewMessage('');
    }
  };

  return (
    <div className={appClasses.join(' ')}>
      <Header
        onClick={handleAppClasses}
        unreadMessagesCounter={unreadMessagesCounter}
      />
      <Main onScroll={handleScroll} displayedMessages={displayedMessages} onUnreadMessage={handleOnUnreadMessages}/>
      <Footer currentMessage={newMessage} onChangeMessage={handleUserMessageChange} buttonClass={newMessageButtonClass} onClickButton={handleUserMessageClick} />
    </div>
  );
};

export default App;
