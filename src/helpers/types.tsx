// Messages
export interface IMessage {
  id: number;
  direction: string;
  status: string;
  timestamp: string;
  text: string;
}

export interface IDisplayedMessage {
  id: number;
  text: string;
  isUnread: boolean;
  messageClasses: string;
  hasIcon: boolean;
  iconClasses: string;
  iconName: string;
  date: string;
}

export interface IMessagesState {
  displayed: IDisplayedMessage[];
  appended: IDisplayedMessage[];
}
export interface IMessagesDisplayMessagesAction {
  type: 'display';
  messages: IDisplayedMessage[];
}

export interface IMessagesAppendMessagesAction {
  type: 'append';
}
export interface IMessagesStoreMessageAction {
  type: 'store';
  message: IDisplayedMessage;
}
export interface IMessagesAttachMessageAction {
  type: 'attach';
  message: IDisplayedMessage;
}

export type TMessagesAction =
  | IMessagesDisplayMessagesAction
  | IMessagesAppendMessagesAction
  | IMessagesStoreMessageAction
  | IMessagesAttachMessageAction;

// AppClasses

export type TAppClassesState = string[];
export interface IAppClassesAction {
  type: 'hide' | 'show';
}
