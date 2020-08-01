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
  TMessagesAction,
  TAppClassesState,
  IAppClassesAction,
} from '../../helpers/types';

import {
  messagesReducer,
  initialMessagesState,
  appClassesReducer,
} from './reducers';

const App: React.FC = () => {
  // Reducers
  const [{displayed: displayedMessages}, messagesDispatch]: [
    IMessagesState,
    Dispatch<TMessagesAction>,
  ] = useReducer(messagesReducer, initialMessagesState);
  const [appClassesState, appClassesDispatch]: [
    TAppClassesState,
    Dispatch<IAppClassesAction>,
  ] = useReducer(appClassesReducer, defaultAppClasses);

    // Refs
    const mainRef = useRef<any>();

  // States
  const [totalMessages, setTotalMessages] = useState(defaultMessagesCounter.TOTAL);
  const [displayedMessagesCounter, setDisplayedMessagesCounter] = useState(
    defaultMessagesCounter.STARTER,
  );
  const [unreadMessagesCounter, setUnreadMessagesCounter] = useState(
    getUnreadMessagesCounter(),
  );
  const [isLoadingOnScroll, setIsLoadingScroll] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [newMessageButtonClass, setNewMessageButtonClass] = useState('');

  // UseEffects
  useEffect(() => {
    setIsLoadingScroll(false);
  }, [displayedMessages]);

  useEffect(() => {
    if(displayedMessagesCounter > defaultMessagesCounter.TOTAL){
      messagesDispatch({ type: 'append' });
    } else {
      const messages = getDisplayedMessages(getFormattedMessages);
      const formatedMessages = messages(
        displayedMessagesCounter,
        displayedMessagesCounter + defaultMessagesCounter.MAX_DISPLAYED,
      );
      messagesDispatch({ type: 'display', messages: formatedMessages });
    }

  }, [displayedMessagesCounter]);

  // Handlers
  const handleAppClasses = useCallback(() => {
    appClassesState.includes('hide')
      ? appClassesDispatch({ type: 'show' })
      : appClassesDispatch({ type: 'hide' });
  }, [appClassesState]);

  const handleScroll = useCallback(
    (event: React.UIEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
      const isScrollDownLimit =
        scrollTop >= (scrollHeight - clientHeight) / defaultScrollValues.factor;
      const isRetrievingDataAllowed =
        displayedMessagesCounter < totalMessages;
      const currentDisplayedMessagesCounter = 
        displayedMessagesCounter + defaultMessagesCounter.MAX_DISPLAYED < totalMessages
        ? displayedMessagesCounter + defaultMessagesCounter.MAX_DISPLAYED
        : totalMessages;

      if (!isLoadingOnScroll && isScrollDownLimit && isRetrievingDataAllowed) {
        setIsLoadingScroll(true);
        setDisplayedMessagesCounter(
          currentDisplayedMessagesCounter
        );
      }
    },
    [displayedMessagesCounter, isLoadingOnScroll, totalMessages],
  );

  const handleOnUnreadMessages = () => {
    setUnreadMessagesCounter((counter) => counter - 1);
  };

  const handleChangeMessage = (event: React.ChangeEvent<any>) => {
    const message = event.target.value;

    setNewMessageButtonClass(message ? 'active' : '');
    setNewMessage(message);
  };

  const appendNewMessage = (message: string) => {
    const messageData = {
      ...defaultMessage,
      id: totalMessages + 1,
      text: message,
      date: getTimeNewMessage(),
    };

    if(displayedMessagesCounter >= defaultMessagesCounter.TOTAL){
      console.log('attach messageData: ', messageData)
      setDisplayedMessagesCounter((total) => total + 1);
      messagesDispatch({ type: 'attach', message: messageData});
      mainRef.current.scrollBy(defaultScrollValues.offsetX, defaultScrollValues.offsetY);
    } else {
      console.log('store messageData: ', messageData)
      messagesDispatch({ type: 'store', message: messageData });
    }

    setTotalMessages((total) => total + 1);
  };

  const handleClickButton = () => {
    if (newMessage) {
      appendNewMessage(newMessage);
      setNewMessage('');
      setNewMessageButtonClass('');
    }
  };

  return (
    <div className={appClassesState.join(' ')}>
      <Header
        onClick={handleAppClasses}
        unreadMessagesCounter={unreadMessagesCounter}
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
        buttonClass={newMessageButtonClass}
        onClickButton={handleClickButton}
      />
    </div>
  );
};

export default App;
