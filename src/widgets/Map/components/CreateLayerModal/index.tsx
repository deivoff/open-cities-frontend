import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Modal } from '$components/modal';
import { CreateForm, Values } from './CreateForm';
import { CREATE_LAYER, CreateLayer, CreateLayerVariables } from '$apollo/mutations';
import { GET_LAYERS, GetLayers, GetLayersVariables } from '$apollo/queries';
import { IconButton } from '$components/layout';

interface CreateLayerProps {
  city: string;
}

const useCreateLayerMutation = (
  city: string,
) => useMutation<CreateLayer, CreateLayerVariables>(CREATE_LAYER, {
  update: (cache, { data }) => {
    const options = {
      query: GET_LAYERS,
      variables: {
        city,
      },
    };

    const returnedLayer = data!.createLayer;
    const cashedLayers = cache.readQuery<GetLayers, GetLayersVariables>(options);
    cache.writeQuery<GetLayers, GetLayersVariables>({
      ...options,
      data: {
        layers: [...cashedLayers!.layers, returnedLayer],
      },
    });
  },
});


const CreateLayerModal: React.FC<CreateLayerProps> = ({ city }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [createLayer] = useCreateLayerMutation(city);

  const openModalHandler = () => {
    setModalOpen(true);
  };

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  const handlerSubmit = (values: Values) => createLayer({
    variables: {
      ...values,
      city,
    },
  });

  return (
    <>
      <IconButton icon="plus" theme="info" onClick={openModalHandler} type="button">
        Добавить слой
      </IconButton>
      <Modal isOpen={isModalOpen} onRequestClose={closeModalHandler} shouldCloseOnOverlayClick>
        <CreateForm handlerSubmit={handlerSubmit} />
      </Modal>
    </>
  );
};

export default CreateLayerModal;
