import {allMonths} from 'config/dates';

export const getAverage = values => {
  if (!values.length) return 0;
  const sum = values.reduce((a, b) => a + b, 0);
  return sum / values.length;
};

export const getMonth = date => {
  const d = new Date(date);
  return allMonths[d.getMonth()];
};

export const getMax = values => {
  if (!values.length) return 0;
  return Math.max(...values);
};
