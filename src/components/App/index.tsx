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
    const messages = getDisplayedMessages(getFormattedMessages);
    const formatedMessages = messages(
      displayedMessagesCounter,
      displayedMessagesCounter + defaultMessagesCounter.MAX_DISPLAYED,
    );

    if(displayedMessagesCounter > defaultMessagesCounter.TOTAL){
      messagesDispatch({ type: 'append' });
    } else {
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

      if (!isLoadingOnScroll && isScrollDownLimit && isRetrievingDataAllowed) {
        setIsLoadingScroll(true);
        setDisplayedMessagesCounter(
          displayedMessagesCounter + defaultMessagesCounter.MAX_DISPLAYED,
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
      id: totalMessages + 1,
      text: message,
      isUnread: false,
      messageClasses: 'message',
      hasIcon: true,
      iconClasses: 'material-icons',
      iconName: 'done',
      date: getTimeNewMessage(),
    };

    if(displayedMessagesCounter >= defaultMessagesCounter.TOTAL){
      messagesDispatch({ type: 'attach', message: messageData});
      mainRef.current.scrollBy(defaultScrollValues.offsetX, defaultScrollValues.offsetY)
    } else {
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
