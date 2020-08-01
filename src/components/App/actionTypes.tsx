// Messages

import { IDisplayedMessage } from '../../helpers/types';

export interface IMessagesDisplayMessagesAction {
  type: 'DISPLAY_MESSAGES';
  messages: IDisplayedMessage[];
}

export interface IMessagesAppendMessagesAction {
  type: 'APPEND_NEW_MESSAGES';
}
export interface IMessagesStoreMessageAction {
  type: 'STORE_NEW_MESSAGE';
  message: IDisplayedMessage;
}
export interface IMessagesAttachMessageAction {
  type: 'DISPLAY_NEW_MESSAGE';
  message: IDisplayedMessage;
}

export type TMessagesAction =
  | IMessagesDisplayMessagesAction
  | IMessagesAppendMessagesAction
  | IMessagesStoreMessageAction
  | IMessagesAttachMessageAction;

// AppClasses

export interface IAppClassesAction {
  type: 'HIDE' | 'SHOW';
}