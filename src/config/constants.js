export const highestRankingPoints = 8920;
export const mostRecentDate = '2018-12-31';
export const lowestRanking = 1279;

export const stuff = ['2018-01-01', '2018-01-08', '2018-01-15'];

export const labelDates = [
  '2018-01-01',
  '2018-01-08',
  '2018-01-15',
  '2018-01-29',
  '2018-02-05',
  '2018-02-12',
  '2018-02-19',
  '2018-02-26',
  '2018-03-05',
  '2018-03-19',
  '2018-04-02',
  '2018-04-09',
  '2018-04-16',
  '2018-04-23',
  '2018-04-30',
  '2018-05-07',
  '2018-05-14',
  '2018-05-21',
  '2018-05-28',
  '2018-06-11',
  '2018-06-18',
  '2018-06-25',
  '2018-07-02',
  '2018-07-16',
  '2018-07-23',
  '2018-07-30',
  '2018-08-06',
  '2018-08-13',
  '2018-08-20',
  '2018-08-27',
  '2018-09-10',
  '2018-09-17',
  '2018-09-24',
  '2018-10-01',
  '2018-10-08',
  '2018-10-15',
  '2018-10-22',
  '2018-10-29',
  '2018-11-05',
  '2018-11-12',
  '2018-11-19',
  '2018-11-26',
  '2018-12-03',
  '2018-12-10',
  '2018-12-17',
  '2018-12-24',
  '2018-12-31',
];

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const labelMonths = ['January', 'March', 'May', 'July', 'September', 'December'];

const removeDuplicates = array =>
  array.reduce((unique, item) => (unique.includes(item) ? unique : [...unique, item]), []);

export const getLabels = dates => {
  const months = dates.map(date => {
    const d = new Date(date);
    return monthNames[d.getMonth()];
  });

  return removeDuplicates(months);
};
