import React, { useState, MouseEvent, useContext } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { Button, GoogleButton, Modal, Spiner } from '$components/index';
import {
  GET_GOOGLE_REDIRECT_URL,
  GET_CITIES,
  GetCities
} from '$apollo/queries';
import { AUTH_GOOGLE } from '$apollo/mutations';
import { AuthContext, User } from '$context/auth';

import s from './Header.module.sass';
// const ArrowMenu = require('../../assets/svg/ArrowMenu.svg');

const CitiesList: React.FC = () => {
  const { data, loading: citiesLoading, error: citiesError } = useQuery<GetCities>(GET_CITIES);

  if (citiesLoading || citiesError || !data) return null;

  const { cities } = data;

  return (
    <div className={cn(s['nav__dropdown'])}>
      <ul className={cn(s['nav__list'])}>
        {cities
          ? cities.map(({ name, url, zoom, center }) => (
              <li className={cn(s['nav__elem'])} key={name}>
                <Link href="[city]/map" as={`${url}/map`}>
                  {name}
                </Link>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

interface Profile {
  user: User;
  logout: () => void;
}
const Profile: React.FC<Profile> = ({ user: { name, photos }, logout }) => {
  return (
    <div className={s['nav__profile']}>
      <div className={cn(s['nav__elem'], s['_dropdown'])}>
        {name ? `${name.givenName} ${name.familyName}` : null}
        <div className={cn(s['nav__dropdown'], s['_profile'])}>
          <ul className={cn(s['nav__list'], s['_profile'])}>
            <li className={s['nav__elem']}>
              <Link href="/profile">Мой профиль</Link>
            </li>
            <li className={s['nav__elem']}>
              <Link href="/maps">Мои карты</Link>
            </li>
            <li className={s['nav__elem']}>
              <Link href="/researches">Мои исследования</Link>
            </li>
            <li className={s['nav__elem']} onClick={logout}>
              Выйти
            </li>
          </ul>
        </div>
      </div>
      <div className={s['nav__photo']}>
        <img
          alt="User thimbnail"
          src={photos ? (photos[photos.length - 1].url ? photos[photos.length - 1].url : '') : ''}
        />
      </div>
    </div>
  );
};

export const Header: React.FC = () => {
  const [isAuthModalOpen, setAuthModal] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const { token, user, login, logout } = useContext<AuthContext>(AuthContext);
  const apolloClient = useApolloClient();

  const openModalHandler = () => {
    setAuthModal(true);
  };

  const closeModalHandler = () => {
    setAuthModal(false);
  };

  const googleSignHandler = async (e: MouseEvent) => {
    e.preventDefault();
    setAuthLoading(true);

    async function authHandler(this: Window, e: MessageEvent) {
      // 'this' = children window
      this.close();
      window.removeEventListener('message', authHandler);
      const code = e.data;

      try {
        const { data } = await apolloClient.mutate({ mutation: AUTH_GOOGLE, variables: { code } });
        const { token: responseToken } = data.authGoogle;
        login(responseToken);
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setAuthLoading(false);
        setAuthModal(false);
      }
    }

    try {
      const { data } = await apolloClient.query({ query: GET_GOOGLE_REDIRECT_URL });
      const { url } = data.getGoogleOAuthRedirect;
      const loginWindow = window.open(url, 'OAuth')!;

      window.addEventListener('message', authHandler.bind(loginWindow));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return (
    <header className={cn(s.header)}>
      <Link href="/">
        <a className={s.logo}>Открытые города</a>
      </Link>
      <button type="button" className={s['nav__button']}>
        <span />
        <span />
        <span />
      </button>
      <nav className={s.nav}>
        <ul className={cn(s['nav__list'])}>
          <li className={cn(s['nav__elem'])}>
            <Link href="/about">О проекте</Link>
          </li>
          <li className={cn(s['nav__elem'])}>
            <Link href="/research">Исследования</Link>
          </li>
          <li className={cn(s['nav__elem'], s['_dropdown'])}>
            Города
            <CitiesList />
          </li>
        </ul>
        {authLoading ? (
          <div className={s['nav__spiner']}>
            <Spiner />
          </div>
        ) : token && user ? (
          <Profile user={user} logout={logout} />
        ) : (
          <Button onClick={openModalHandler}>Войти</Button>
        )}
        <Modal isOpen={isAuthModalOpen} onRequestClose={closeModalHandler} shouldCloseOnOverlayClick={true}>
          <Modal.Title>Вход через социальные сети</Modal.Title>
          {authLoading ? (
            <Spiner />
          ) : (
            <>
              <Modal.Body>Авторизуйтесь через следующие приложения:</Modal.Body>
              <GoogleButton onClick={googleSignHandler}>Google</GoogleButton>
            </>
          )}
        </Modal>
      </nav>
    </header>
  );
};