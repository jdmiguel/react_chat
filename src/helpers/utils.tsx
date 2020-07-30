import data from './data.json';

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

export const getShowedMessages = (start: number, end: number) =>
  data.slice(start, end);

export const getClassesMessage = (type: string) =>
  `message ${type === 'in' ? 'incoming' : ''}`;

export const getIconClassesMessage = (type: string, status: string) =>
  type === 'out' ? `material-icons ${status === 'read' ? 'read' : ''}` : '';

export const getIconNameMessage = (type: string, status: string) =>
  type === 'out' ? (status === 'sent' ? 'done' : 'done_all') : '';

export const getTimeMessage = (id: number, timeStamp: string) => {
  const currentDate = Date.now();
  const selectedDate = new Date(currentDate - (parseInt(timeStamp) / id * factorDate));

  const hour = selectedDate.getHours() < 10 ? `0${selectedDate.getHours()}` : selectedDate.getHours();
  const minutes = selectedDate.getMinutes();
  const month = months.find(month => selectedDate.getMonth() === month.value)?.text;
  const day = selectedDate.getDate();
  const year = selectedDate.getFullYear();

  return `${hour}:${minutes} - ${month} ${day}, ${year}`;
};

