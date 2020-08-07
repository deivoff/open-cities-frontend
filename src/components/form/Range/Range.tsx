import React from 'react';
import { FieldInputProps } from 'formik';
import cn from 'classnames';

import css from './Range.module.sass';

type Range = React.FC<FieldInputProps<number> & {
  className?: string;
  units?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
}>
export const Range: Range = ({
  className = '',
  units = '',
  children,
  name,
  value,
  ...field
}) => (
  <div className={
    cn(
      css['range'],
      className,
    )
  }
  >
    <label htmlFor={name} className={css['range__label']}>{children}: {value}{units}</label>
    <input type="range" className={css['range__input']} name={name} value={value} {...field} />
  </div>
);
