import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { NextPage } from 'next';
import { useLazyQuery } from '@apollo/react-hooks';
import { Page } from '$components/layout';
import { Spiner } from '$components/spiner';
import {
  GET_CITY, GetCity,
} from '$apollo/queries';
import { Header } from '$widgets/Header';
import { CityMap } from '$widgets/Map';

const CityMapPage: NextPage = () => {
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
      <Header />
      <Page.Map>
        <CityMap
          bbox={map.settings.bbox}
          layers={map.layers}
          mapId={map._id}
        />
      </Page.Map>
    </>
  );
};

export default CityMapPage;
