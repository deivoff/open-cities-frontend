import React from 'react';
import cn from 'classnames';
import css from './Button.module.sass';

type Theme = 'success' | 'white' | 'google' | 'info' | 'disabled';
type DefaultProps<T = {}> = React.ButtonHTMLAttributes<{}> & T;

type Button = React.FC<DefaultProps<{
  theme?: Theme;
}>>
export const Button: Button = ({
  type = 'button',
  className,
  theme = 'success',
  ...rest
}) => (
  <button
    className={cn(
      css.button,
      css[`_${theme}`],
      className,
    )}
    type={type}
    {...rest}
  />
);


type GoogleButton = React.FC<DefaultProps>;
export const GoogleButton: GoogleButton = ({
  type = 'button',
  ...rest
}) => <button className={css['google-button']} type={type} {...rest} />;

type IconButton = React.FC<DefaultProps<{
  icon: string;
  theme?: Theme;
}>>
export const IconButton: IconButton = ({
  type = 'button',
  icon,
  className,
  theme = 'disabled',
  children,
  ...rest
}) => (
  <button
    className={cn(
      css['icon-button'],
      className,
    )}
    type={type}
    {...rest}
  >
    <div className={cn(
      css['icon-button__icon'],
      css[`_${theme}`],
    )}
    />
    {children && (
      <span className={cn(
        css['icon-button__text'], css[`_${theme}`],
      )}
      >
        {children}
      </span>
    )}
  </button>
);
