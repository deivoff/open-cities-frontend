import React from 'react';
import cn from 'classnames';
import css from './Button.module.sass';

type Button = React.FC<React.ButtonHTMLAttributes<{}>>;
export const Button: Button = ({ type = 'button', ...rest }) => {
  return <button className={cn(css.button, css['_success'])} type={type} {...rest} />;
};

export const GoogleButton: Button = ({ type = 'button', ...rest}) => {
  return <button className={css['google-button']} type={type} {...rest} />;
};
