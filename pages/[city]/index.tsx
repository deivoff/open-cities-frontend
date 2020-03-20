import React from 'react';
import Head from 'next/head';
import { Page } from '$components/layout';
import { Spiner } from '$components/spiner';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router'
import Error from 'next/error'
import { NextPage } from 'next';
import { useQuery } from '@apollo/react-hooks';
import { GetCity, GetCityVariables } from '$apollo/queries/types/GetCity';
import { GET_CITY } from '$apollo/queries/GetCity';

const DynamicMap = dynamic(() => import('$widgets/Map'), { ssr: false });

const MapPage: NextPage = () => {
  const { query } = useRouter();
  const url = query['city'] as string;

  const { data, error, loading } = useQuery<GetCity, GetCityVariables>(GET_CITY, {
    variables: {
      url
    }
  });

  if (loading && !data) return <Spiner />;
  if (error) return <Error statusCode={500} />;

  const { getCity } = data!;

  if (!getCity) return <Error statusCode={404}>Такого города у нас нет :с</Error>;

  const { name, center, zoom } = getCity;

  return (
    <>
      <Head>
        <title>Открытые города | {name} </title>
      </Head>
      <Page.Map>
        <DynamicMap city={url} center={center} zoom={zoom}/>
      </Page.Map>
    </>
  );
};

export default MapPage;
