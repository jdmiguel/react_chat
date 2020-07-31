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
  defaultTotalMessages,
  defaultAppClasses,
  defaultMessagesCounter,
  factorScroll,
  getUnreadMessagesCounter,
  getDisplayedMessages,
  getFormattedMessages,
  getTimeNewMessage,
} from '../../helpers/utils';
import { IDisplayedMessage } from '../../helpers/types';

interface AppClassesAction {
  type: 'hide' | 'show';
}
interface DisplayedMessagesAction {
  type: 'display';
  messages: IDisplayedMessage[];
}

interface AppendedNewMessagesAction {
  type: 'append';
  message: IDisplayedMessage;
}

const appClassesReducer = (state: string[], action: AppClassesAction) => {
  switch (action.type) {
    case 'hide':
      return [...state, 'hide'];
    case 'show':
      return state.filter((appClass) => appClass !== 'hide');
    default:
      return state;
  }
};

const displayedMessagesReducer = (
  state: IDisplayedMessage[],
  action: DisplayedMessagesAction,
) => {
  switch (action.type) {
    case 'display':
      return [...state, ...action.messages];
    default:
      return state;  
  }
};

const AppendedNewMessagesReducer = (
  state: IDisplayedMessage[],
  action: AppendedNewMessagesAction,
) => {
  switch (action.type) {
    case 'append':
      return [...state, action.message];
    default:
      return state;  
  }
};

const App: React.FC = () => {
  // Reducers
  const [appClasses, appClassesDispatch]: [
    string[],
    Dispatch<AppClassesAction>,
  ] = useReducer(appClassesReducer, defaultAppClasses);

  const [displayedMessages, displayedMessagesDispatch]: [
    IDisplayedMessage[],
    Dispatch<DisplayedMessagesAction>,
  ] = useReducer(displayedMessagesReducer, []);
  
  const [appendedNewMessages, appendedNewMessagesDispatch]: [
    IDisplayedMessage[],
    Dispatch<AppendedNewMessagesAction>,
  ] = useReducer(AppendedNewMessagesReducer, []);

  // States
  const [totalMessages, setTotalMessages] = useState(defaultTotalMessages);
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

    displayedMessagesDispatch({ type: 'display', messages: formatedMessages });
  }, [displayedMessagesCounter]);

  // Handlers
  const handleAppClasses = useCallback(() => {
    appClasses.includes('hide')
      ? appClassesDispatch({ type: 'show' })
      : appClassesDispatch({ type: 'hide' });
  }, [appClasses]);

  const handleScroll = useCallback(
    (event: React.UIEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
      const isScrollDownLimit =
        scrollTop >= (scrollHeight - clientHeight) / factorScroll;
      const isRetrievingDataAllowed =
        displayedMessagesCounter < defaultTotalMessages;

      if (!isLoadingOnScroll && isScrollDownLimit && isRetrievingDataAllowed) {
        setIsLoadingScroll(true);
        setDisplayedMessagesCounter(
          displayedMessagesCounter + defaultMessagesCounter.MAX_DISPLAYED,
        );
      }
    },
    [displayedMessagesCounter, isLoadingOnScroll],
  );

  const handleOnUnreadMessages = () => {
    setUnreadMessagesCounter(counter => counter - 1);
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
      messageClasses: '',
      hasIcon: true,
      iconClasses: 'material-icons',
      iconName: 'done',
      date: getTimeNewMessage(),
    };

    appendedNewMessagesDispatch({ type: 'append', message: messageData });
    setTotalMessages(total => total + 1);
  }

  const handleClickButton = () => {
    if (newMessage) {
      appendNewMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className={appClasses.join(' ')}>
      <Header
        onClick={handleAppClasses}
        unreadMessagesCounter={unreadMessagesCounter}
      />
      <Main
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
