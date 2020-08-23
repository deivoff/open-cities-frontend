import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/react-hooks';
import Error from 'next/error';
import Head from 'next/head';
import { GET_CITY_MAP_ID, GetCityMapId } from '$apollo/queries';
import { Spiner } from '$components/spiner';
import { Card, H1, Page } from '$components/layout';
import { Header } from '$widgets/Header';
import { CreateLayer as LayerCreateForm } from '$widgets/Layer';

const AddLayerToCityMapPage: NextPage = () => {
  const { query } = useRouter();
  const url = query['city'] as string;

  const [getCityMapId, { data, loading, error }] = useLazyQuery<GetCityMapId>(GET_CITY_MAP_ID);

  useEffect(() => {
    if (url) getCityMapId({ variables: { url } });
  }, [url, getCityMapId]);

  if (loading || !data) return <Spiner />;
  if (error) return <Error statusCode={500} />;

  const { city } = data;

  if (!city) return <Error statusCode={404}>Такого города у нас нет :с</Error>;

  const { map: { _id, name } } = city;
  return (
    <>
      <Head>
        <title>
          {name}. Добавление слоя | Открытые города
        </title>
      </Head>
      <Page>
        <Header />
        <Page.Wrapper>
          <H1>Добавление слоя</H1>
          <Card>
            <Card.Title>Загрузка</Card.Title>
            <LayerCreateForm mapId={_id} />
          </Card>
        </Page.Wrapper>
      </Page>
    </>
  );
};

export default AddLayerToCityMapPage;
