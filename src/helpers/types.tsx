export interface IMessage {
  id: number;
  direction: string;
  status: string;
  timestamp: string;
  text: string;
} 

export interface IShowedMessage {
  id: number;
  text: string;
  isUnread: boolean;
  messageClasses: string;
  hasIcon: boolean;
  iconClasses: string;
  iconName: string;
  date: string;
}       