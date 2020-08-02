// Messages

import { IDisplayedMessage } from '../../helpers/types';

export interface IMessagesDisplayMessagesAction {
  type: 'DISPLAY_MESSAGES';
  messages: IDisplayedMessage[];
  shouldBeCropped: boolean;
  lastMessageDisplayedId: number;
  direction: string;
}

export interface IMessagesSetAsReadAction {
  type: 'SET_AS_READ';
  id: number;
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
  | IMessagesSetAsReadAction
  | IMessagesAppendMessagesAction
  | IMessagesStoreMessageAction
  | IMessagesAttachMessageAction;

// AppClasses

export interface IAppClassesAction {
  type: 'HIDE' | 'SHOW';
}