import React, { useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { NextPage } from 'next';
import { useApolloClient, useLazyQuery } from '@apollo/react-hooks';
import { Page } from '$components/layout';
import { Spiner } from '$components/spiner';
import {
  GET_CITY_MAP,
  GetCityMap,
  GetCityMapVariables,
} from '$apollo/queries';

const DynamicMap = dynamic(() => import('$widgets/Map'), { ssr: false });
const useCityMapSettings = () => useLazyQuery<GetCityMap, GetCityMapVariables>(GET_CITY_MAP);

const MapPage: NextPage = () => {
  const { query } = useRouter();
  const url = query['city'] as string;
  const [getSettings, { data, error, loading }] = useCityMapSettings();

  useEffect(() => {
    if (url) getSettings({ variables: { url } });
  }, [url, getSettings]);

  if (loading || !data) return <Spiner />;
  if (error) return <Error statusCode={500} />;

  const { city } = data!;
  debugger;

  if (!city) return <Error statusCode={404}>Такого города у нас нет :с</Error>;

  const { map: { name, center, zoom } } = city;

  return (
    <>
      <Head>
        <title>
          Открытые города |
          {name}
        </title>
      </Head>
      <Page.Map>
        <DynamicMap city={url} center={center} zoom={zoom} />
      </Page.Map>
    </>
  );
};

export default MapPage;
