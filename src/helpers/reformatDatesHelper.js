import moment from 'moment';
// eslint-disable-next-line import/prefer-default-export
export const formatDates = (data) => {
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'dateTimeStart' || key === 'dateTimeFinish') {
      data[key] = moment(value).format('X');
    }
  });
  return data;
};

export const reformatDates = (data) => {
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'dateTimeStart' || key === 'dateTimeFinish') {
      data[key] = moment(value, 'X').format('MM/DD/yyyy HH:mm');
    }
  });
  return data;
};
