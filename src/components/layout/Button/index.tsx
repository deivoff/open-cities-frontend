import React from 'react';
import cn from 'classnames';
import css from './Button.module.sass';

type Theme = 'success' | 'white' | 'google';
type DefaultProps<T = {}> = React.ButtonHTMLAttributes<{}> & T;

type Button = React.FC<DefaultProps<{
  theme?: Theme;
}>>
export const Button: Button = ({
                                 type = 'button',
  className,
  theme = 'success',
                                 ...rest
}) => {
  return (
    <button
      className={cn(
        css.button,
        css[`$_${theme}`],
        className
      )}
      type={type}
      {...rest}
    />);
};


type GoogleButton = React.FC<DefaultProps>;
export const GoogleButton: GoogleButton = ({
                                       type = 'button',
                                       ...rest
}) => {
  return <button className={css['google-button']} type={type} {...rest} />;
};

type IconButton = React.FC<DefaultProps<{
  icon: string;
  theme?: Theme;
}>>
export const IconButton: IconButton = ({
                                         type = 'button',
                                         icon,
  className,
  theme = 'white',
                                         ...rest }) => {
  return (
    <button
      className={cn(
        css['icon-button'],
        css[`$_${theme}`],
        className
      )}
      type={type}
      {...rest}
    />);
};
