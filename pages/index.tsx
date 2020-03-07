import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Banner, getRandomInt } from '$widgets/MainBanner';

const MAX_DOTS = 200;
const INITIAL_DOTS = 0;
const TIME_CREATE_DOTS_MS = 20;

const Home: NextPage = () => {
  const [dots, setDots] = useState([{ duration: getRandomInt(4, 8), key: 0 }]);
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
        <title>Открытые города | Главная </title>
      </Head>
      <Banner dots={dots}/>
    </>
  );
};


export default Home;
