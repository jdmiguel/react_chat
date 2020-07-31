import {
  IMessagesState,
  TMessagesAction,
  TAppClassesState,
  IAppClassesAction,
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
    case 'display':
      return {
        ...state,
        displayed: [...state.displayed, ...action.messages],
      };
    case 'append':
      return {
        ...state,
        displayed: [...state.displayed, ...state.appended],
      };
    case 'store':
      return {
        ...state,
        appended: [...state.appended, action.message],
      };
    case 'attach':
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
    case 'hide':
      return [...state, 'hide'];
    case 'show':
      return state.filter((appClass) => appClass !== 'hide');
    default:
      throw new Error();
  }
};
