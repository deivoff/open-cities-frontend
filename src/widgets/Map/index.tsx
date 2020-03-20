import { MapControllers } from '$widgets/MapControllers';
import { LayersControl, Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet';
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_LAYERS, GetLayers, GetLayersVariables } from '$apollo/queries';

interface MapProps {
  city: string;
  center: [number, number];
  zoom: number;
}

const useGetLayersQuery = (city: string) =>
  useQuery<GetLayers, GetLayersVariables>(GET_LAYERS, { variables: { city } });

const Map: React.FC<MapProps> = ({ center, zoom, city }) => {
  const { data: layersData, loading: layersLoading, error: layersError } = useGetLayersQuery(city);

  if (layersError) return null;
  if (layersLoading || !layersData) return null;

  return (<LeafletMap center={center} zoom={zoom} style={{ height: 'calc(100vh - 80px)' }}>
    <MapControllers defaultCity={city}/>
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
                <br/>
                Easily customizable.
              </Popup>
            </Marker>
          </LayersControl.Overlay>
        ))}
      </LayersControl>
    )}
  </LeafletMap>);
};

export default Map;
