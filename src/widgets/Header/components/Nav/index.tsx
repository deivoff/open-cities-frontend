import React from 'react';
import cn from 'classnames';
import { Spiner as DefaultSpiner } from '$components/spiner';

import s from './Nav.module.sass';

type Root = React.FC;
export const Root: Root = ({ children }) => <nav className={s.nav}>{children}</nav>;

type List = React.FC<{
  className?: string;
  type?: 'profile'
}>;
export const List: List = ({ className, children, type }) => (
  <ul className={cn(
    cn(s['nav__list']),
    type && s[`_${type}`],
    className,
  )}
  >
    {children}
  </ul>
);

type Elem = React.FC<{
  className?: string,
  type?: 'dropdown',
  onClick?: React.DOMAttributes<any>['onClick']
}>;
export const Elem: Elem = ({
  className,
  children,
  type,
  onClick,
}) => (type ? (
  <div
    className={cn(
      s['nav__elem'],
      type && s[`_${type}`],
      className,
    )}
    onClick={onClick}
  >
    {children}
  </div>
)
  : (
    <li
      className={cn(
        s['nav__elem'],
        type && s[`_${type}`],
        className,
      )}
      onClick={onClick}
    >
      {children}
    </li>
  )
);

type Profile = React.FC;
export const Profile: Profile = ({
  children,
}) => <div className={s['nav__profile']}>{children}</div>;

type Dropdown = React.FC<{
  type?: 'profile'
}>;
export const Dropdown: Dropdown = ({
  children,
  type,
}) => (
  <div className={cn(
    s['nav__dropdown'],
    type && s[`_${type}`],
  )}
  >
    {children}
  </div>
);

type Spiner = React.FC;
export const Spiner: Spiner = () => (
  <div className={s['nav__spiner']}>
    <DefaultSpiner />
  </div>
);

type Button = React.FC;
export const Button: Button = () => (
  <button type="button" className={s['nav__button']}>
    <span />
    <span />
    <span />
  </button>
);

type Avatar = React.FC<{
  src: string;
}>
export const Avatar: Avatar = ({ src }) => (
  <div className={s['nav__photo']}>
    <img
      alt="User thimbnail"
      src={src}
    />
  </div>
);
