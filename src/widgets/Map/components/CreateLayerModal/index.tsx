import React, { useState } from 'react';
import { LayerForm } from './LayerForm';
import { Modal } from '$components/modal';
import { IconButton } from '$components/layout';

interface CreateLayerProps {
  mapId: string;
}

const CreateLayerModal: React.FC<CreateLayerProps> = ({ mapId }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  // useEffect(() => {
  //   if (data) {
  //     setLayerId(data.createLayer._id);
  //   }
  // }, [data, setLayerId]);

  // useEffect(() => {
  //   if (layerId) {
  //     createGeos({
  //       variables: {
  //         geos,
  //       },
  //     });
  //   }
  // }, [createGeos, layerId, geos]);

  const openModalHandler = () => {
    setModalOpen(true);
  };

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  // const handlerSubmit = (values: Values) => {
  //   createLayer({
  //     variables: {
  //       ...values,
  //       mapId,
  //     },
  //   });
  // };

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
          onSubmit={closeModalHandler}
          mapId={mapId}
        />
      </Modal>
    </>
  );
};

export default CreateLayerModal;
