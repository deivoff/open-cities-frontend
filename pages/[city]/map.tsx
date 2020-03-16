import React from 'react';
import Head from 'next/head';
import { Page } from '$components/layout';
import dynamic from 'next/dynamic';

interface MapPageProps {
  city: string;
  cityName: string;
  center: [number, number];
  zoom: number;
}
const DynamicMap = dynamic(() => import('$widgets/Map'), {ssr: false});

const MapPage: React.FC<MapPageProps> = ({ city, center, zoom, cityName }) => {
  return (
    <>
      <Head>
        <title>Открытые города | {cityName} </title>
      </Head>
      <Page.Map>
        <DynamicMap city={city} center={center} zoom={zoom}/>
      </Page.Map>
    </>
  );
};

export default MapPage;
