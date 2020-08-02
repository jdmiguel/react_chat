import React, {
  useRef,
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
  defaultAppClasses,
  defaultMessagesCounter,
  defaultScrollValues,
  getUnreadMessagesCounter,
  getDisplayedMessages,
  getFormattedMessages,
  defaultMessage,
  getTimeNewMessage,
} from '../../helpers/utils';

import {
  IMessagesState,
  TAppClassesState
} from '../../helpers/types';

import {
  messagesReducer,
  initialMessagesState,
  appClassesReducer,
} from './reducers';

import { 
  TMessagesAction, 
  IAppClassesAction 
}  from './actionTypes';

const App: React.FC = () => {
  // UseReducers
  const [{displayed: displayedMessages}, messagesDispatch]: [
    IMessagesState,
    Dispatch<TMessagesAction>,
  ] = useReducer(messagesReducer, initialMessagesState);
  const [appClassesState, appClassesDispatch]: [
    TAppClassesState,
    Dispatch<IAppClassesAction>,
  ] = useReducer(appClassesReducer, defaultAppClasses);

    // UseRefs
  const mainRef = useRef<any>();
  const totalMessages = useRef(defaultMessagesCounter.TOTAL);

  // UseStates
  const [displayedMessagesCounter, setDisplayedMessagesCounter] = useState(
    defaultMessagesCounter.STARTER,
  );
  const [unreadMessagesCounter, setUnreadMessagesCounter] = useState(
    getUnreadMessagesCounter(),
  );
  const [areNewMessagesAppended, setAreNewMessagesAppended] = useState(false);
  const [isLoadingOnScroll, setIsLoadingScroll] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  // UseEffects
  useEffect(() => {
    setIsLoadingScroll(false);
  }, [displayedMessages]);

  useEffect(() => {
    if(displayedMessagesCounter > defaultMessagesCounter.TOTAL){
      messagesDispatch({ type: 'APPEND_NEW_MESSAGES' });
      setAreNewMessagesAppended(true);
    } else {
      const messages = getDisplayedMessages(getFormattedMessages);
      const formatedMessages = messages(
        displayedMessagesCounter,
        displayedMessagesCounter + defaultMessagesCounter.MAX_DISPLAYED,
      );
      messagesDispatch({ type: 'DISPLAY_MESSAGES', messages: formatedMessages });
    }

  }, [displayedMessagesCounter]);

  // Handlers
  const handleAppClasses = useCallback(() => {
    appClassesState.includes('hide')
      ? appClassesDispatch({ type: 'SHOW' })
      : appClassesDispatch({ type: 'HIDE' });
  }, [appClassesState]);

  const handleScroll = useCallback(
    (event: React.UIEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
      const isScrollDownLimit =
        scrollTop >= (scrollHeight - clientHeight) / defaultScrollValues.factor;
      const isRetrievingDataAllowed =
        displayedMessagesCounter < totalMessages.current && !areNewMessagesAppended;
      const currentDisplayedMessagesCounter = 
        displayedMessagesCounter + defaultMessagesCounter.MAX_DISPLAYED < totalMessages.current
        ? displayedMessagesCounter + defaultMessagesCounter.MAX_DISPLAYED
        : totalMessages.current;

      if (!isLoadingOnScroll && isScrollDownLimit && isRetrievingDataAllowed) {
        setIsLoadingScroll(true);
        setDisplayedMessagesCounter(
          currentDisplayedMessagesCounter
        );
      }
    },
    [displayedMessagesCounter, isLoadingOnScroll, areNewMessagesAppended],
  );

  const handleOnUnreadMessages = () => {
    setUnreadMessagesCounter((counter) => counter - 1);
  };

  const handleChangeMessage = (event: React.ChangeEvent<any>) => {
    const message = event.target.value;

    setNewMessage(message);
  };

  const appendNewMessage = (message: string) => {
    const messageData = {
      ...defaultMessage,
      id: totalMessages.current + 1,
      text: message,
      date: getTimeNewMessage(),
    };

    if(displayedMessagesCounter >= defaultMessagesCounter.TOTAL){
      messagesDispatch({ type: 'DISPLAY_NEW_MESSAGE', message: messageData});
      mainRef.current.scrollBy(defaultScrollValues.offsetX, defaultScrollValues.offsetY);
    } else {
      messagesDispatch({ type: 'STORE_NEW_MESSAGE', message: messageData });
    }

    totalMessages.current++;
  };

  const handleClickButton = () => {
    appendNewMessage(newMessage);
    setNewMessage('');
  };

  return (
    <div className={appClassesState.join(' ')}>
      <Header
        onClick={handleAppClasses}
        unreadMessagesCounter={unreadMessagesCounter}
        isTyping={!!newMessage}
      />
      <Main
        ref={mainRef}
        onScroll={handleScroll}
        displayedMessages={displayedMessages}
        onUnreadMessage={handleOnUnreadMessages}
      />
      <Footer
        currentMessage={newMessage}
        onChangeMessage={handleChangeMessage}
        onClickButton={handleClickButton}
      />
    </div>
  );
};

export default App;
