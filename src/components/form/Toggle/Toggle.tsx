import React from 'react';
import cn from 'classnames';
import { FieldInputProps } from 'formik';
import css from './Toggle.module.sass';

type Toggle = React.FC<FieldInputProps<boolean> & {
  className?: string;
}>
export const Toggle: Toggle = ({
  className = '',
  children,
  name,
  value,
  ...field
}) => (
  <div className={
    cn(
      css['toggle'],
      className,
    )
  }
  >
    <input
      type="checkbox"
      name={name}
      id={name}
      className={css['toggle__button']}
      {...field}
    />
    <label htmlFor={name} className={css['toggle__label']}>{children}</label>
  </div>
);
