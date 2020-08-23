import React from 'react';
import ReactSelect, { Props as SelectProps, CommonProps } from 'react-select';
import cn from 'classnames';
import { Label } from '$components/form';

import s from './Field.module.sass';

type Option<T> = {
  label: string;
  value: T;
}
type Props<T> = SelectProps<T> & {
  name: string;
  label?: string;
  labelClassName?: string;
  className?: string;
}
const Select = <T, >({
  label,
  labelClassName = '',
  className = '',
  ...props
}: Props<T>): JSX.Element => {
  const { name } = props;

  return (
    <div className={cn(s['field'], className)}>
      {label
      && <Label htmlFor={name} className={s['field__label']}>{label}</Label>}
      <ReactSelect
        id={name}
        className={cn(s['field__select'], className)}
        classNamePrefix={s['field-select']}
        {...props}
      />
    </div>
  );
};

export default Select;
