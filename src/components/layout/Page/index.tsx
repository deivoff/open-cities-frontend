import React from 'react';
import cn from 'classnames';
import s from './Page.module.sass';

interface Page extends React.FC {
  Wrapper: React.FC;
  Map: React.FC;
  Content: React.FC;
}
export const Page: Page = ({ children }) => <div className={s['page']}>{children}</div>;

export const H1: React.FC = ({ children, ...rest }) => (
  <h1 className={cn(s['page__title'])} {...rest}>
    {children}
  </h1>
);

Page.Wrapper = function Wrapper(props) {
  return (
    <div className={cn(s['page__content'])}>
      <div className={cn(s['page__wrapper'])} {...props} />
    </div>
  );
};

Page.Content = function Content(props) {
  return <div className={cn(s['page__content'])} {...props} />;
};

Page.Map = function Map(props) {
  return <div className={cn(s['page__map'])} {...props} />;
};
