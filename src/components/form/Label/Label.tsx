import React, { LabelHTMLAttributes } from 'react';
import cn from 'classnames';

import s from './Label.module.sass';

type LabelProps = LabelHTMLAttributes<any> & {
  className?: string;
}
type Label = React.FC<LabelProps>
export const Label: Label = ({
  className,
  ...props
// eslint-disable-next-line jsx-a11y/label-has-associated-control
}) => (<label className={cn(s['label'], className)} {...props} />);

export const getLabelClassNames = (...classNames: string[]) => cn(s['label'], ...classNames);
