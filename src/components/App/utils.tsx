import data from '../../db.json';

// Helpers
import {
  months,
  factorDate
} from '../../helpers/constants';
import { IMessage } from '../../helpers/types';

// Pure functions
export const getUnreadMessagesCounter = () =>
  data.reduce((acc = 0, next: IMessage) => {
    if (next.direction === 'in' && next.status === 'received') {
      acc++;
    }
    return acc;
  }, 0);

const getClassesMessage = (type: string) =>
  `message ${type === 'in' ? 'incoming' : ''}`;

const getIsUnread = (type: string, status: string) =>
  !!(type === 'in' && status === 'received');

const getIconClassesMessage = (type: string, status: string) =>
  type === 'out' ? `material-icons ${status === 'read' ? 'read' : ''}` : '';

const getIconNameMessage = (type: string, status: string) =>
  type === 'out' ? (status === 'sent' ? 'done' : 'done_all') : '';

export const getDate = (date: Date) => {
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const month = months.find((month) => date.getMonth() === month.value)?.text;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${hour}:${minutes} - ${month} ${day}, ${year}`;
};

const getTimeMessage = (id: number, timeStamp: string) => {
  const currentTimestamp = Date.now();
  const selectedDate = new Date(
    currentTimestamp - (parseInt(timeStamp) / id) * factorDate,
  );

  return getDate(selectedDate);
};

export const getDisplayedMessages = (formattingFunction: any) => (
  start: number,
  end: number,
) => {
  const messages = data.slice(start, end);
  return formattingFunction(messages);
};

export const getFormattedMessages = (messages: IMessage[]) =>
  messages.map((message) => ({
    id: message.id,
    text: message.text,
    isUnread: getIsUnread(message.direction, message.status),
    messageClasses: getClassesMessage(message.direction).trimEnd(),
    hasIcon: message.direction === 'out',
    iconClasses: getIconClassesMessage(
      message.direction,
      message.status,
    ).trimEnd(),
    iconName: getIconNameMessage(message.direction, message.status),
    date: getTimeMessage(message.id, message.timestamp),
  }));