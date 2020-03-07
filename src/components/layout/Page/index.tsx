import React from 'react';
import cn from 'classnames';
import css from './Page.module.sass';

interface Page extends React.FC {
  Wrapper: React.FC;
  Map: React.FC;
}
export const Page: Page = ({ children }) => {
  return <>{children}</>;
};

export const H1: React.FC = ({ children, ...rest }) => {
  return (
    <h1 className={cn(css['page__title'])} {...rest}>
      {children}
    </h1>
  );
};

Page.Wrapper = function Wrapper(props) {
  return <div className={cn(css['page__wrapper'])} {...props} />;
};

Page.Map = function Map(props) {
  return <div className={cn(css['page__map'])} {...props} />;
};


