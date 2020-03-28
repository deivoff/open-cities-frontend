import React, { useState, MouseEvent, useContext } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import {
  useApolloClient, useMutation, useQuery,
} from '@apollo/react-hooks';
import {
  Button, GoogleButton, Modal, Spiner,
} from '$components/index';
import * as Nav from './components/Nav';
import {
  GET_GOOGLE_REDIRECT_URL,
  GET_CITIES,
  GetCities, GetGoogleRedirectURL,
} from '$apollo/queries';
import { AUTH_GOOGLE, AuthGoogle, AuthGoogleVariables } from '$apollo/mutations';
import { AuthContext, User } from '$context/auth';

import s from './Header.module.sass';
// const ArrowMenu = require('../../assets/svg/ArrowMenu.svg');

const CitiesList: React.FC = () => {
  const { data, loading, error } = useQuery<GetCities>(GET_CITIES);

  if (loading || error || !data) return null;

  const { cities } = data;

  return (
    <Nav.Dropdown>
      <Nav.List>
        {cities
          ? cities.map(({ name, url }) => (
            <Nav.Elem key={name}>
              <Link href="/city/[city]" as={`/city/${url}`}>
                <a>
                  {name}
                </a>
              </Link>
            </Nav.Elem>
          ))
          : null}
      </Nav.List>
    </Nav.Dropdown>
  );
};

const Profile: React.FC = () => {
  const [isAuthModalOpen, setAuthModal] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [
    authGoogle,
  ] = useMutation<AuthGoogle, AuthGoogleVariables>(AUTH_GOOGLE);

  const {
    token, user, login, logout,
  } = useContext<AuthContext>(AuthContext);
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

    async function authHandler(this: Window, event: MessageEvent) {
      // 'this' = children window
      if ((/^react-devtools/gi).test(event?.data?.source)) {
        return;
      }

      // eslint-disable-next-line react/no-this-in-sfc
      this.close();
      const { code } = event.data.payload;
      window.removeEventListener('message', authHandler);

      try {
        const { data, errors } = await authGoogle({ variables: { code } });

        if (errors || !data) return;

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
      const { data } = await apolloClient.query<GetGoogleRedirectURL>({
        query: GET_GOOGLE_REDIRECT_URL,
      });

      const { url } = data.getGoogleOAuthRedirect;
      const loginWindow = window.open(url, 'OAuth')!;

      window.addEventListener('message', authHandler.bind(loginWindow));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  if (authLoading) {
    return (
      <Nav.Spiner />
    );
  }

  if (!token || !user) {
    return (
      <>
        <Button onClick={openModalHandler} theme="success">Войти</Button>
        <Modal
          isOpen={isAuthModalOpen}
          onRequestClose={closeModalHandler}
          shouldCloseOnOverlayClick
        >
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
      </>
    );
  }

  const { name, photos, id } = user;
  let avatar = '';

  if (photos) {
    if (photos[photos.length - 1].url) {
      avatar = photos[photos.length - 1].url;
    }
  }
  return (
    <Nav.Profile>
      <Nav.Elem type="dropdown">
        {name ? `${name.givenName} ${name.familyName}` : null}
        <Nav.Dropdown type="profile">
          <Nav.List type="profile">
            <Nav.Elem>
              <Link href="/[user]" as={`/${id}`}><a>Мой профиль</a></Link>
            </Nav.Elem>
            <Nav.Elem>
              <Link href="/[user]/maps" as={`/${id}/maps`}><a>Мои карты</a></Link>
            </Nav.Elem>
            <Nav.Elem>
              <Link href="/[user]/researches" as={`/${id}/researches`}><a>Мои исследования</a></Link>
            </Nav.Elem>
            <Nav.Elem onClick={logout}>
              Выйти
            </Nav.Elem>
          </Nav.List>
        </Nav.Dropdown>
      </Nav.Elem>
      <Nav.Avatar src={avatar} />
    </Nav.Profile>
  );
};

export const Header: React.FC = () => (
  <header className={cn(s.header)}>
    <Link href="/">
      <a className={s.logo}>Открытые города</a>
    </Link>
    <Nav.Button />
    <Nav.Root>
      <Nav.List>
        <Nav.Elem>
          <Link href="/about"><a>О проекте</a></Link>
        </Nav.Elem>
        <Nav.Elem>
          <Link href="/researches"><a>Исследования</a></Link>
        </Nav.Elem>
        <Nav.Elem type="dropdown">
          Города
          <CitiesList />
        </Nav.Elem>
      </Nav.List>
      <Profile />
    </Nav.Root>
  </header>
);
