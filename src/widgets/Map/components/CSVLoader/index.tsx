import CSVReader from 'react-csv-reader';
import React, { useEffect, useState } from 'react';
import { GeoInputExtended, GeometryType, LayerProperty } from '$types/index';
import { useAuth } from '$context/auth';

type Props = {
  onDotsNormalize: (dots: GeoInputExtended[]) => void
  layer?: string;
}
type LayerPropertyWithGeometry = null | {
  geometry: {
    coordinates: [string, string],
    type: GeometryType;
  }
  properties: LayerProperty[];
}

const CSVLoader: React.FC<Props> = ({ onDotsNormalize, layer }) => {
  const [testRow, setTestRow] = useState<any>(null);
  const { user } = useAuth();
  const [rows, setRows] = useState<any[]>([]);

  const handlerOnPropertyComplete = (settings: LayerPropertyWithGeometry) => {
    if (settings && layer) {
      onDotsNormalize(rows.map(elem => ({
        geometry: {
          coordinates: [
            elem[settings.geometry.coordinates[0]],
            elem[settings.geometry.coordinates[1]],
          ],
          type: settings.geometry.type,
        },
        properties: {},
        access: user!.access,
        author: user!.id,
        layer,
      })));
    }
  };

  return (
    <>
      <CSVReader
        onFileLoaded={
          data => {
            const firstElem = data[0];
            setTestRow(firstElem);
            setRows(data);
          }
        }
        parserOptions={{
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          transformHeader: header => header.toLowerCase().replace(/\W/g, '_'),
        }}
      />
      { testRow && (
        <CreateProperties property={testRow} onPropertyComplete={handlerOnPropertyComplete} />
      )}
    </>
  );
};

type CreateProperties = React.FC<{
  property: NonNullable<any>;
  onPropertyComplete: (settings: LayerPropertyWithGeometry) => void
}>
const CreateProperties: CreateProperties = ({ property, onPropertyComplete }) => {
  const [geometryPaths, setGeometryPaths] = useState<[string, string]>(['', '']);
  const [type, setType] = useState(GeometryType.Point);
  const [settings, setSettings] = useState<LayerPropertyWithGeometry>(null);
  const isGeometryPathsExist = geometryPaths.every(path => path);

  useEffect(() => {
    Object.keys(property).forEach((key: string) => {
      if (key === 'latitude') {
        setGeometryPaths(prevState => [prevState[0], key]);
      }

      if (key === 'longitude') {
        setGeometryPaths(prevState => [key, prevState[1]]);
      }
    });

    setSettings({
      geometry: {
        coordinates: geometryPaths,
        type,
      },
      properties: [],
    });
  }, [setSettings, type, geometryPaths, property]);

  useEffect(() => {
    if (settings) {
      onPropertyComplete(settings);
    }
  }, [onPropertyComplete, settings]);

  return (
    <div>
      <ul>
        <li>
          <div>
            <div>Координаты объекта</div>
            { isGeometryPathsExist ? (
              <ul>
                <li>
                  Широта:
                  {property[geometryPaths[0]]}
                </li>
                <li>
                  Долгота:
                  {property[geometryPaths[1]]}
                </li>
              </ul>
            ) : (
              <div>Настроки по умолчанию не найдены :с</div>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CSVLoader;
