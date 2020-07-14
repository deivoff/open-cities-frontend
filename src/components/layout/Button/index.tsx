import React from 'react';
import cn from 'classnames';
import { Theme } from '../utils';
import { Icon } from '../Icon';

import css from './Button.module.sass';

type DefaultProps<T = {}> = React.ButtonHTMLAttributes<{}> & T;

type Button = React.FC<DefaultProps<{
  theme?: Theme;
}>>
export const Button: Button = ({
  type = 'button',
  className,
  theme = 'main-green',
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

type IconButton = React.FC<DefaultProps<React.ComponentProps<Icon>>>
export const IconButton: IconButton = ({
  type = 'button',
  icon,
  className,
  theme = 'disabled',
  children,
  svg = {},
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
    <Icon theme={theme} icon={icon} svg={svg} />
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
