import React from 'react';
import cn from 'classnames';
import { FieldInputProps } from 'formik';
import { Label } from '$components/form';

import s from './Field.module.sass';

type TextArea = React.FC<FieldInputProps<string | number> & {
  label?: string;
  labelClassName?: string;
  className?: string
}>;

export const TextArea: TextArea = ({
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
      <textarea
        id={name}
        className={s['field__textarea']}
        {...props}
      />
    </div>
  );
};
