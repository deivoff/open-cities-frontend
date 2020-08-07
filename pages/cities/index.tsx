import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { H1, Page } from '$components/layout';
import { Header } from '$widgets/Header';

const CitiesMaps: NextPage = () => {
  return (
    <>
      <Head>
        <title>Городские карты | Открытые города</title>
        <meta name="google-site-verification" content="W-Z_tdIa68wRmSq14_MTbc9l7JhF30Uuv98Gw3NhOYM" />
      </Head>
      <Page>
        <Header />
        <Page.Wrapper>
          <H1>Здесь будут городские карты</H1>
        </Page.Wrapper>
      </Page>
    </>
  );
};

export default CitiesMaps;
