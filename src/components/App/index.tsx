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
  totalMessages,
  initialAppClasses,
  initialShowedMessageCounter,
  factorScroll,
  getUnreadMessagesCounter,
  getShowedMessages,
  getFormattedMessages,
} from '../../helpers/utils';
import { IShowedMessage } from '../../helpers/types';

interface AppClassesAction {
  type: 'hide' | 'show';
}
interface ShowedMessagesAction {
  type: 'add';
  messages: IShowedMessage[];
}

const appClassesReducer = (classes: string[], action: AppClassesAction) => {
  switch (action.type) {
    case 'hide':
      return [...classes, 'hide'];
    case 'show':
      return classes.filter((appClass) => appClass !== 'hide');
  }
};

const showedMessagesReducer = (
  messages: IShowedMessage[],
  action: ShowedMessagesAction,
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

  const [showedMessages, showedMessagesDispatch]: [
    IShowedMessage[],
    Dispatch<ShowedMessagesAction>,
  ] = useReducer(showedMessagesReducer, []);

  // States
  const [showedMessagesCounter, setShowedMessagesCounter] = useState(
    initialShowedMessageCounter.STARTER,
  );
  const [unreadMessagesCounter, setUnreadMessagesCounter] = useState(
    getUnreadMessagesCounter(),
  );
  const [isLoadingOnScroll, setIsLoadingScroll] = useState(false);

  useEffect(() => {
    setIsLoadingScroll(false);
  }, [showedMessages]);

  useEffect(() => {
    const messages = getShowedMessages(getFormattedMessages);
    const formatedMessages = messages(showedMessagesCounter, showedMessagesCounter + initialShowedMessageCounter.MAX_SHOWED);

    showedMessagesDispatch({ type: 'add', messages: formatedMessages });
  }, [showedMessagesCounter]);

  const handleAppClasses = useCallback(() => {
    appClasses.includes('hide')
      ? appClassesDispatch({ type: 'show' })
      : appClassesDispatch({ type: 'hide' });
  }, [appClasses]);

  const handleScroll = useCallback(
    (event: React.UIEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
      const isScrollDownLimit = scrollTop >= (scrollHeight - clientHeight) / factorScroll;
      const isRetrievingDataAllowed = showedMessagesCounter < totalMessages;

      if (!isLoadingOnScroll && isScrollDownLimit && isRetrievingDataAllowed) {
        setIsLoadingScroll(true);
        setShowedMessagesCounter(showedMessagesCounter + initialShowedMessageCounter.MAX_SHOWED);
      }
    },
    [showedMessagesCounter, isLoadingOnScroll],
  );

  const handleOnUnreadMessages = (id:number) => {
    setUnreadMessagesCounter( counter => counter - 1);
  }

  const handleUserMessageChange = (event: React.ChangeEvent<any>) => {
    console.log(event.target.value);
  };

  const handleUserMessageClick = () => {
    console.log('handleUserMessageClick');
  };

  return (
    <div className={appClasses.join(' ')}>
      <Header
        onClick={handleAppClasses}
        unreadMessagesCounter={unreadMessagesCounter}
      />
      <Main onScroll={handleScroll} showedMessages={showedMessages} onUnreadMessage={handleOnUnreadMessages}/>
      <Footer onChange={handleUserMessageChange} onClick={handleUserMessageClick} />
    </div>
  );
};

export default App;
