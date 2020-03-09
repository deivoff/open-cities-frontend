import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { LayersControl, Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { MapControllers } from '$widgets/MapControllers';
import { Page } from '$components/layout';
import { GET_LAYERS, GetLayers, GetLayersVariables } from '$apollo/queries';
import Head from 'next/head';

interface MapProps {
  city: string;
  cityName: string;
  center: [number, number];
  zoom: number;
}

const useGetLayersQuery = (city: string) =>
  useQuery<GetLayers, GetLayersVariables>(GET_LAYERS, { variables: { city } });

export const MapPage: React.FC<MapProps> = ({ city, center, zoom, cityName }) => {
  const { data: layersData, loading: layersLoading, error: layersError } = useGetLayersQuery(city);

  if (layersError) return null;
  if (layersLoading || !layersData) return null;

  return (
    <>
      <Head>
        <title>Открытые города | {cityName} </title>
      </Head>
      <Page.Map>
        <Map center={center} zoom={zoom} style={{ height: 'calc(100vh - 80px)' }}>
          <MapControllers defaultCity={city} />
          <TileLayer
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {layersData && (
            <LayersControl position="topright">
              {layersData.layers.map(({ name, _id }) => (
                <LayersControl.Overlay name={name} key={_id}>
                  <Marker position={center}>
                    <Popup>
                      A pretty CSS3 popup.
                      <br />
                      Easily customizable.
                    </Popup>
                  </Marker>
                </LayersControl.Overlay>
              ))}
            </LayersControl>
          )}
        </Map>
      </Page.Map>
    </>
  );
};