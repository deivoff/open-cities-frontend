import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Modal } from '$components/modal';
import { CreateForm, Values } from './CreateForm';
import {
  CREATE_LAYER, CreateLayer, CreateLayerVariables,
  CREATE_GEOS, CreateGeos, CreateGeosVariables,
} from '$apollo/mutations';
import {
  GET_GEOS, GetGeos, GetGeosVariables,
} from '$apollo/queries';
import { IconButton } from '$components/layout';
import { GeoInput } from '$types/globalTypes';

interface CreateLayerProps {
  mapId: string;
}

const useCreateLayerMutation = (
  mapId: string,
) => useMutation<CreateLayer, CreateLayerVariables>(CREATE_LAYER, {
  // update: (cache, { data }) => {
  //   const options = {
  //     query: GET_LAYERS,
  //     variables: {
  //       city,
  //     },
  //   };
  //
  //   const returnedLayer = data!.createLayer;
  //   const cashedLayers = cache.readQuery<GetLayers, GetLayersVariables>(options);
  //   cache.writeQuery<GetLayers, GetLayersVariables>({
  //     ...options,
  //     data: {
  //       layers: [...cashedLayers!.layers, returnedLayer],
  //     },
  //   });
  // },
});

const useCreateGeosMutation = (
  layerId: string,
) => useMutation<CreateGeos, CreateGeosVariables>(CREATE_GEOS, {
  update: (cache, { data }) => {
    if (layerId) {
      const options = {
        query: GET_GEOS,
        variables: {
          layerId,
        },
      };

      const returnedGeos = data!.createGeos;
      const cachedGeos = cache.readQuery<GetGeos, GetGeosVariables>(options) || { geos: [] };

      cache.writeQuery<GetGeos, GetGeosVariables>({
        ...options,
        data: {
          geos: [...cachedGeos.geos, ...returnedGeos],
        },
      });
    }
  },
});


const CreateLayerModal: React.FC<CreateLayerProps> = ({ mapId }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [geos, setGeos] = useState<GeoInput[]>([]);
  const [layerId, setLayerId] = useState('');
  // const [createLayer, { data }] = useCreateLayerMutation(city);
  const [createGeos] = useCreateGeosMutation(layerId);

  // useEffect(() => {
  //   if (data) {
  //     setLayerId(data.createLayer._id);
  //   }
  // }, [data, setLayerId]);

  useEffect(() => {
    if (layerId) {
      createGeos({
        variables: {
          geos,
        },
      });
    }
  }, [createGeos, layerId, geos]);

  const openModalHandler = () => {
    setModalOpen(true);
  };

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  const handlerSubmit = (values: Values) => {
    // createLayer({
    //   variables: {
    //     ...values,
    //     city,
    //   },
    // });
  };

  return (
    <>
      <IconButton icon="plus" theme="info" onClick={openModalHandler} type="button">
        Добавить слой
      </IconButton>
      <Modal isOpen={isModalOpen} onRequestClose={closeModalHandler} shouldCloseOnOverlayClick>
        <CreateForm
          handlerSubmit={handlerSubmit}
          onGeosComplete={geosFromCSV => setGeos(geosFromCSV)}
          layerId={layerId}
        />
      </Modal>
    </>
  );
};

export default CreateLayerModal;
