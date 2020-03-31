import CSVReader from 'react-csv-reader';
import React, { useCallback, useEffect, useState } from 'react';
import { GeoInput, GeometryType, LayerSettings } from '$types/index';
import { useAuth } from '$context/auth';

type Props = {
  onDotsNormalize: (dots: GeoInput[]) => void
  layerId: string,
}
type LayerPropertyWithGeometry = {
  geometry: {
    coordinates: [string, string],
    type: GeometryType;
  }
  settings: LayerSettings;
}

const CSVLoader: React.FC<Props> = ({ onDotsNormalize, layerId }) => {
  const [testRow, setTestRow] = useState<any>(null);
  const [
    normalizedData,
    setNormalizedData,
  ] = useState<GeoInput[] | null>(null);
  const { user } = useAuth();
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    if (layerId && normalizedData) {
      onDotsNormalize(normalizedData);
    }
  }, [onDotsNormalize, layerId, normalizedData]);

  const handlerOnPropertyComplete = useCallback((settings: LayerPropertyWithGeometry) => {
    setNormalizedData(rows
      .filter(elem => elem[settings.geometry.coordinates[0]] && [settings.geometry.coordinates[0]])
      .map(elem => ({
        geometry: {
          coordinates: [
            elem[settings.geometry.coordinates[0]],
            elem[settings.geometry.coordinates[1]],
          ],
          type: settings.geometry.type,
        },
        settings: {
          type: 'test',
        },
        layer: layerId,
      })));
  }, [rows, layerId]);

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
  const [type] = useState(GeometryType.Point);
  const [settings, setSettings] = useState<LayerPropertyWithGeometry | null>(null);
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
  }, [property]);

  useEffect(() => {
    const isPathsExist = geometryPaths.every(path => path);

    if (isPathsExist) {
      setSettings({
        geometry: {
          coordinates: geometryPaths,
          type,
        },
        settings: {},
      });
    }
  }, [type, geometryPaths]);

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
