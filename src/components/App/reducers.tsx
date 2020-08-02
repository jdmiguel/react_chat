
import { 
  TMessagesAction, 
  IAppClassesAction 
} from './actionTypes';

import {
  IMessagesState,
  TAppClassesState,
} from '../../helpers/types';

// Messages
export const initialMessagesState: IMessagesState = {
  displayed: [],
  appended: [],
};

export const messagesReducer = (
  state: IMessagesState,
  action: TMessagesAction,
): IMessagesState => {
  switch (action.type) {
    case 'DISPLAY_MESSAGES':
      return {
        ...state,
        displayed: [...state.displayed, ...action.messages],
      };
    case 'SET_AS_READ':
      const displayedMessages = [...state.displayed];
      const currentMessageId = displayedMessages.findIndex(message => message.id === action.id);
      displayedMessages[currentMessageId].isUnread = false;

      return {
        ...state,
        displayed: [...displayedMessages],
      };  
    case 'APPEND_NEW_MESSAGES':
      return {
        ...state,
        displayed: [...state.displayed, ...state.appended],
      };
    case 'STORE_NEW_MESSAGE':
      return {
        ...state,
        appended: [...state.appended, action.message],
      };
    case 'DISPLAY_NEW_MESSAGE':
      return {
        ...state,
        displayed: [...state.displayed, action.message],
      };
    default:
      return {
        ...state,
      };
  }
};

// AppClasses
export const appClassesReducer = (
  state: TAppClassesState,
  action: IAppClassesAction,
) => {
  switch (action.type) {
    case 'HIDE':
      return [...state, 'hide'];
    case 'SHOW':
      return state.filter((appClass) => appClass !== 'hide');
    default:
      throw new Error();
  }
};
