import React from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';

type DatePicker = React.FC<Omit<ReactDatePickerProps, 'dateFormat'>>
export const DatePicker: DatePicker = props => (
  <ReactDatePicker
    dateFormat="DD.MM.YYYY HH:mm"
    {...props}
  />
);
