import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import { useMutation } from '@apollo/react-hooks';
import { Button } from '$components/layout';
import { Modal } from '$components/modal';
import { CreateMap, CreateMapVariables } from '$apollo/mutations';
import { CREATE_MAP } from '$apollo/mutations/CreateMap';
import { AccessType, GeometryType } from '$types/globalTypes';
import { getBoundsArray } from '$utils/index';

const INITIAL_ZOOM = 2;

const CreateMapModal = () => {
  const [isOpen, setOpen] = useState(false);
  const [bbox, setBbox] = useState<any[]>([]);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [createMap] = useMutation<CreateMap, CreateMapVariables>(CREATE_MAP);

  const handlerOpen = () => {
    setOpen(true);
  };

  const handlerClose = () => {
    setOpen(false);
  };

  const handlerSubmit = async ({
    name,
    description,
    type,
  }: Values) => {
    await createMap({
      variables: {
        type,
        mapSettings: {
          name,
          description,
          settings: {
            zoom,
            bbox,
          },
        },
      },
    });
  };
  return (
    <>
      <Button onClick={handlerOpen}>
        Создать карту
      </Button>
      <Modal isOpen={isOpen} onRequestClose={handlerClose}>
        <CreateMapForm handleSubmit={handlerSubmit} />
        <LeafletMap
          zoom={zoom}
          center={[0, 0]}
          style={{
            height: '200px',
          }}
          onzoomend={event => setZoom(event.target.getZoom())}
          ondragend={event => setBbox(getBoundsArray(event.target))}
        >
          <TileLayer
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </LeafletMap>
      </Modal>
    </>
  );
};

type Values = Pick<CreateMapVariables['mapSettings'], 'name' | 'description'> & {
  type: AccessType,
};
type Props = {
  handleSubmit: (values: Values) => void
}
const CreateMapForm: React.FC<Props> = ({ handleSubmit }) => {
  const formik = useFormik<Values>({
    initialValues: {
      name: '',
      description: '',
      type: AccessType.default,
    },
    onSubmit: async values => handleSubmit(values),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="type">Тип карты</label>
      <select
        id="type"
        name="type"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.type}
      >
        {Object.values(AccessType).map((value => (
          <option key={value} value={value}>{value}</option>
        )))}
      </select>

      <label htmlFor="name">Название слоя</label>
      <input
        id="name"
        name="name"
        placeholder="Ваше название"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
      />

      <label htmlFor="description">Описание слоя</label>
      <textarea
        id="description"
        name="description"
        placeholder="Ваше описание"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.description}
      />

      <Button type="submit">Создать карту</Button>
    </form>
  );
};

export default CreateMapModal;
