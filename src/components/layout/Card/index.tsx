import React from 'react';
import cn from 'classnames';
import css from './Card.module.sass';


interface Card extends React.FC {
  Title: React.FC;
  Body: React.FC;
}

export const Card: Card = props => {
  return <div className={cn(css['card'])} {...props} />;
};

Card.Title = function Title(props) {
  return <div className={cn(css['card__title'])} {...props} />;
};

Card.Body = function Body(props) {
  return <div className={cn(css['card__body'])} {...props} />;
};
