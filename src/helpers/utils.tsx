import data from '../db.json';
import { IMessage } from './types';

// dates
const months = [
  { value: 1, text: 'January' },
  { value: 2, text: 'February' },
  { value: 3, text: 'March' },
  { value: 4, text: 'April' },
  { value: 5, text: 'May' },
  { value: 6, text: 'June' },
  { value: 7, text: 'July' },
  { value: 8, text: 'August' },
  { value: 9, text: 'September' },
  { value: 10, text: 'October' },
  { value: 11, text: 'November' },
  { value: 12, text: 'December' }
];
const factorDate = 8;

// app initial constants
export const defaultAppClasses = ['app'];
export enum defaultMessagesCounter {
  STARTER = 0,
  MAX_DISPLAYED = 10,
  MAX_RENDERED = 20,
  TOTAL = data.length
};
export enum defaultScrollValues {
  factor = 1.1,
  offsetX = 0,
  offsetY = 100
};
export const defaultMessage = {
  id: 0,
  text: '',
  isUnread: false,
  messageClasses: 'message',
  hasIcon: true,
  iconClasses: 'material-icons',
  iconName: 'done',
  date: 0,
};

export const getUnreadMessagesCounter = () => data.reduce((acc:number = 0, next:IMessage) => {
  if(next.direction === 'in' && next.status === 'received') {
    acc++;
  }
  return acc;
},0); 

export const observerOptions = {
  root: document.querySelector('main'),
  rootMargin: '0px',
  threshold: 1.0
}

const getClassesMessage = (type: string) =>
  `message ${type === 'in' ? 'incoming' : ''}`;

const getIsUnread = (type: string, status: string) =>
  !!(type === 'in' && status === 'received');  

const getIconClassesMessage = (type: string, status: string) =>
  type === 'out' ? `material-icons ${status === 'read' ? 'read' : ''}` : '';

const getIconNameMessage = (type: string, status: string) =>
  type === 'out' ? (status === 'sent' ? 'done' : 'done_all') : '';

const getDate = (date: Date) => {
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();;
  const month = months.find(month => date.getMonth() === month.value)?.text;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${hour}:${minutes} - ${month} ${day}, ${year}`;
}  

const getTimeMessage = (id: number, timeStamp: string) => {
  const currentTimestamp = Date.now();
  const selectedDate = new Date(currentTimestamp - (parseInt(timeStamp) / id * factorDate));

  return getDate(selectedDate);
};

export const getTimeNewMessage = () => getDate(new Date());

export const getDisplayedMessages = (formattingFunction:any) => (start: number, end: number) => {
  const messages = data.slice(start, end);
  return formattingFunction(messages);
}

export const getFormattedMessages = (messages:IMessage[]) => 
  messages.map((message) => ({
    id: message.id,
    text: message.text,
    isUnread: getIsUnread(message.direction, message.status),
    messageClasses: getClassesMessage(message.direction).trimEnd(),
    hasIcon: message.direction === 'out',
    iconClasses: getIconClassesMessage(message.direction, message.status).trimEnd(),
    iconName: getIconNameMessage(message.direction,message.status),
    date: getTimeMessage(message.id, message.timestamp)
  })
);

