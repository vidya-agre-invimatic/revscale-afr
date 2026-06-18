import moment from 'moment';

export const formatDate = (date: string | Date, format = 'MMM D, YYYY'): string =>
  moment(date).format(format);

export const formatDateTime = (date: string | Date): string =>
  moment(date).format('MMM D, YYYY h:mm A');

export const classNames = (...classes: (string | undefined | null | false)[]): string =>
  classes.filter(Boolean).join(' ');
