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
  const renderedMessages = useRef(defaultMessagesCounter.MAX_DISPLAYED);
  const scrollDirection = useRef('down');

  // UseStates
  const [displayedMessagesCounter, setDisplayedMessagesCounter] = useState(
    defaultMessagesCounter.MAX_DISPLAYED,
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
      const firstMessage = scrollDirection.current === 'down' 
        ? displayedMessagesCounter - defaultMessagesCounter.MAX_DISPLAYED
        : displayedMessagesCounter - defaultMessagesCounter.MAX_RENDERED;

      const formatedMessages = messages(
        firstMessage,
        displayedMessagesCounter,
      ); 
      const shouldBeCropped = renderedMessages.current > defaultMessagesCounter.MAX_RENDERED;

      messagesDispatch({
        type: 'DISPLAY_MESSAGES',
        messages: formatedMessages,
        shouldBeCropped,
        lastMessageDisplayedId: displayedMessagesCounter,
        direction: scrollDirection.current
      });

      if(shouldBeCropped) {
        renderedMessages.current = defaultMessagesCounter.MAX_RENDERED;
      }
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
      const isScrollUpLimit = scrollTop <= 50;
      const isScrollDownLimit =
        scrollTop >= (scrollHeight - clientHeight) / defaultScrollValues.factor;
      const isRetrievingDataAllowed =
        displayedMessagesCounter < totalMessages.current && !areNewMessagesAppended;
      const addedDisplayedMessagesCounter = 
        displayedMessagesCounter + defaultMessagesCounter.MAX_DISPLAYED < totalMessages.current
        ? displayedMessagesCounter + defaultMessagesCounter.MAX_DISPLAYED
        : totalMessages.current;
      const removedDisplayedMessagesCounter = displayedMessagesCounter - defaultMessagesCounter.MAX_DISPLAYED;  

      if (!isLoadingOnScroll && isScrollDownLimit && isRetrievingDataAllowed) {
        scrollDirection.current = 'down';
        setIsLoadingScroll(true);
        setDisplayedMessagesCounter(
          addedDisplayedMessagesCounter
        );
        renderedMessages.current += defaultMessagesCounter.MAX_DISPLAYED;
      }

      if (displayedMessagesCounter > 20 && !isLoadingOnScroll && isScrollUpLimit) {
        scrollDirection.current = 'up';
        setIsLoadingScroll(true);
        setDisplayedMessagesCounter(
          removedDisplayedMessagesCounter
        );
        renderedMessages.current += defaultMessagesCounter.MAX_DISPLAYED;
      }
    },
    [displayedMessagesCounter, isLoadingOnScroll, areNewMessagesAppended],
  );

  const handleOnUnreadMessages = (id: number) => {
    messagesDispatch({ type: 'SET_AS_READ', id });
    setUnreadMessagesCounter((counter) => counter - 1);
  };

  const handleChangeMessage = (event: React.ChangeEvent<any>) => {
    const message = event.target.value;

    setNewMessage(message);
  };

  const appendNewMessage = useCallback((message: string) => {
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
  }, [displayedMessagesCounter]);

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
