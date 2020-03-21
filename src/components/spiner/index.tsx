import React from 'react';
import cn from 'classnames';
import css from './spiner.module.sass';

type Spiner = React.FC<{
  className?: string;
}>
export const Spiner: Spiner = ({ className }) => (
  <div className={cn(css.spiner, className)}>
    <div className={css['lds-ellipsis']}>
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);
