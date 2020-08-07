import React, { useState } from 'react';
import { LayerForm } from './LayerForm';
import { Modal } from '$components/modal';
import { IconButton } from '$components/layout';

interface CreateLayerProps {
  mapId: string;
}

const CreateLayerModal: React.FC<CreateLayerProps> = ({ mapId }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModalHandler = () => {
    setModalOpen(true);
  };

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  return (
    <>
      <IconButton
        icon="Plus"
        theme="main-blue"
        onClick={openModalHandler}
        type="button"
      >
        Добавить слой
      </IconButton>
      <Modal isOpen={isModalOpen} onRequestClose={closeModalHandler} shouldCloseOnOverlayClick>
        <LayerForm
          formClose={closeModalHandler}
          mapId={mapId}
        />
      </Modal>
    </>
  );
};

export default CreateLayerModal;
