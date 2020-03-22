import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Modal } from '$components/modal';
import {
  CREATE_GEO, CreateGeo, CreateGeoVariables,
} from '$apollo/mutations';
import { GET_GEOS, GetGeos, GetGeosVariables } from '$apollo/queries';
import { CreateForm, Values } from './CreateForm';

type CreateGeoModal = React.FC<{
  layerId: CreateGeoVariables['layer']
}>

const useCreateGeoMutation = (
  layerId: string,
) => useMutation<CreateGeo, CreateGeoVariables>(CREATE_GEO, {
  update: (cache, { data }) => {
    const options = {
      query: GET_GEOS,
      variables: {
        layerId,
      },
    };
    const returnedGeo = data!.createGeo;
    const cashedGeos = cache.readQuery<GetGeos, GetGeosVariables>(options);
    cache.writeQuery<GetGeos, GetGeosVariables>({
      ...options,
      data: {
        geos: [...cashedGeos!.geos, returnedGeo],
      },
    });
  },
});

export const CreateGeoModal: CreateGeoModal = ({ layerId }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [createGeo] = useCreateGeoMutation(layerId);
  const openModalHandler = () => {
    setModalOpen(true);
  };

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  const handlerSubmit = (values: Values) => createGeo({
    variables: {
      ...values,
      layer: layerId,
    },
  });
  return (
    <>
      <button type="button" onClick={openModalHandler}>
        Добавить точку
      </button>
      <Modal isOpen={isModalOpen} onRequestClose={closeModalHandler} shouldCloseOnOverlayClick>
        <CreateForm handlerSubmit={handlerSubmit} />
      </Modal>
    </>
  );
};
