import React from 'react';
import cn from 'classnames';
import { FieldInputProps } from 'formik';
import { Label } from '$components/form';

import s from './Field.module.sass';

type Input = React.FC<FieldInputProps<string | number> & {
  label?: string;
  labelClassName?: string;
  className?: string
}>;

export const Input: Input = ({
  label,
  labelClassName = '',
  className = '',
  ...props
}) => {
  const { name } = props;
  return (
    <div className={cn(s['field'], className)}>
      {label
      && <Label htmlFor={name} className={s['field__label']}>{label}</Label>}
      <input
        id={name}
        type="text"
        className={s['field__input']}
        {...props}
      />
    </div>
  );
};
