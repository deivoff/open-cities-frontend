import React, { useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { NextPage } from 'next';
import { useLazyQuery } from '@apollo/react-hooks';
import { Page } from '$components/layout';
import { Spiner } from '$components/spiner';
import {
  GET_CITY, GetCity,
} from '$apollo/queries';

const DynamicMap = dynamic(() => import('$widgets/Map'), { ssr: false });

const MapPage: NextPage = () => {
  const { query } = useRouter();
  const url = query['city'] as string;
  const [getCity, { data, loading, error }] = useLazyQuery<GetCity>(GET_CITY);

  useEffect(() => {
    if (url) getCity({ variables: { url } });
  }, [url, getCity]);

  if (loading || !data) return <Spiner />;
  if (error) return <Error statusCode={500} />;

  const { city } = data;

  if (!city) return <Error statusCode={404}>Такого города у нас нет :с</Error>;

  const { map, name } = city;
  return (
    <>
      <Head>
        <title>
          {name} | Открытые города
        </title>
      </Head>
      <Page.Map>
        <DynamicMap map={map} />
      </Page.Map>
    </>
  );
};

export default MapPage;
