import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Banner } from '$widgets/MainBanner';
import { getRandomInt } from '$utils/index';
import { Header } from '$widgets/Header';
import { Page } from '$components/layout';

const MAX_DOTS = 150;
const INITIAL_DOTS = 0;
const TIME_CREATE_DOTS_MS = 20;

const Home: NextPage = () => {
  const [dots, setDots] = useState([{ duration: getRandomInt(2, 6), key: 0 }]);
  const [activeDots, setActiveDots] = useState(INITIAL_DOTS);

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeDots < MAX_DOTS) {
        setDots([...dots, { duration: getRandomInt(3, 5), key: 0 }]);
        setActiveDots(activeDots + 1);
      }
    }, TIME_CREATE_DOTS_MS);
    return () => clearInterval(interval);
  }, [dots, activeDots]);

  return (
    <>
      <Head>
        <title>Главная | Открытые города</title>
        <meta name="google-site-verification" content="W-Z_tdIa68wRmSq14_MTbc9l7JhF30Uuv98Gw3NhOYM" />
      </Head>
      <Page>
        <Header fixed />
        <Page.Content>
          <Banner dots={dots} />
        </Page.Content>
      </Page>
    </>
  );
};


export default Home;
