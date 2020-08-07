import React from 'react';
import cn from 'classnames';
import css from './Card.module.sass';

type Props = {
  className?: string;
}
interface Card extends React.FC<Props> {
  Title: React.FC<Props>;
  Body: React.FC<Props>;
}

export const Card: Card = ({ className = '', ...props }) => (
  <div
    className={cn(css['card'], className)}
    {...props}
  />
);

Card.Title = function Title({ className = '', ...props }) {
  return (
    <div
      className={cn(css['card__title'], className)}
      {...props}
    />
  );
};

Card.Body = function Body({ className = '', ...props }) {
  return (
    <div
      className={cn(css['card__body'], className)}
      {...props}
    />
  );
};
