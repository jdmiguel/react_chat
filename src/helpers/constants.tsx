import data from '../db.json';

// dates
export const months = [
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
  { value: 12, text: 'December' },
];
export const factorDate = 8;

// app initial constants
export enum defaultMessagesCounter {
  STARTER = 0,
  MAX_DISPLAYED = 10,
  MAX_RENDERED = 20,
  TOTAL = data.length,
}
export enum defaultScrollValues {
  factor = 1.2,
  offsetX = 0,
  offsetY = 100,
  minHeightToLoad = 200,
}
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

// message observer options
export const observerOptions = {
  root: document.querySelector('main'),
  rootMargin: '0px',
  threshold: 1.0,
};

